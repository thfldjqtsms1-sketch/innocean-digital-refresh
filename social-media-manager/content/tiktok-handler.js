// TikTok Handler - Content Script for TikTok (Improved Version)

(function () {
    'use strict';

    console.log('[SMM] TikTok Handler loading...');

    const TikTokHandler = {
        platform: 'tiktok',
        posts: [],
        container: null,
        initialized: false,

        // Initialize handler
        async init() {
            console.log('[SMM] TikTok Handler initializing...');

            // Check if we're on a profile page
            if (!this.isProfilePage()) {
                console.log('[SMM] Not a profile page, waiting for navigation...');
                this.watchForNavigation();
                return;
            }

            // Wait for content to load
            await this.waitForContent();

            // Collect posts
            setTimeout(() => {
                this.collectPosts();
                this.initialized = true;
                console.log('[SMM] TikTok Handler ready!');
            }, 2000);

            // Set up observers
            this.setupObserver();
            this.setupMessageListener();

            // Listen for sort changes
            window.addEventListener('smm-sort-changed', (e) => {
                console.log('[SMM] Sort changed:', e.detail);
                this.applySort(e.detail.sortBy, e.detail.sortOrder);
            });
        },

        // Check if on profile page
        isProfilePage() {
            const path = window.location.pathname;
            // Profile pages start with /@username
            return path.startsWith('/@') && !path.includes('/video/');
        },

        // Watch for SPA navigation
        watchForNavigation() {
            let lastUrl = location.href;

            const observer = new MutationObserver(() => {
                if (location.href !== lastUrl) {
                    lastUrl = location.href;
                    console.log('[SMM] Navigation detected:', lastUrl);

                    if (this.isProfilePage()) {
                        setTimeout(() => this.init(), 1500);
                    }
                }
            });

            observer.observe(document.body, { childList: true, subtree: true });
        },

        // Wait for main content to load
        waitForContent() {
            return new Promise((resolve) => {
                const check = () => {
                    // Look for video items on the page
                    const items = this.findVideoItems();
                    if (items.length > 0) {
                        console.log(`[SMM] Found ${items.length} video items`);
                        resolve();
                    } else {
                        setTimeout(check, 500);
                    }
                };
                check();

                // Timeout after 10 seconds
                setTimeout(resolve, 10000);
            });
        },

        // Find video items using multiple strategies
        findVideoItems() {
            // Strategy 1: data-e2e attributes
            let items = document.querySelectorAll('[data-e2e="user-post-item"]');
            if (items.length > 0) return items;

            // Strategy 2: Links to videos
            const videoLinks = document.querySelectorAll('a[href*="/video/"]');
            const containers = new Set();
            videoLinks.forEach(link => {
                // Find the parent container that holds the thumbnail
                let parent = link;
                for (let i = 0; i < 5; i++) {
                    parent = parent.parentElement;
                    if (parent && parent.querySelector('img')) {
                        containers.add(parent);
                        break;
                    }
                }
            });
            if (containers.size > 0) return Array.from(containers);

            // Strategy 3: Look for thumbnail images in grid
            const images = document.querySelectorAll('img[alt]');
            const thumbContainers = new Set();
            images.forEach(img => {
                const link = img.closest('a[href*="/video/"]');
                if (link) {
                    thumbContainers.add(link.parentElement || link);
                }
            });

            return Array.from(thumbContainers);
        },

        // Get the container holding video grid
        getContainer() {
            // Find the first video item and get its parent
            const items = this.findVideoItems();
            if (items.length > 0) {
                this.container = items[0].parentElement;
                return this.container;
            }
            return null;
        },

        // Collect all video posts
        collectPosts() {
            const items = this.findVideoItems();
            console.log(`[SMM] Collecting ${items.length} posts...`);

            this.posts = [];

            items.forEach((item, index) => {
                const postData = this.extractPostData(item, index);
                if (postData) {
                    this.posts.push(postData);

                    // Add overlay
                    if (typeof SMMOverlay !== 'undefined') {
                        SMMOverlay.addToElement(item, postData, this.platform);
                    }
                }
            });

            console.log(`[SMM] Collected ${this.posts.length} posts with data`);

            // Also try to get data from page JSON
            this.enrichWithPageData();
        },

        // Extract data from a video item
        extractPostData(element, index) {
            try {
                // Find video link
                const link = element.querySelector('a[href*="/video/"]') ||
                    element.closest('a[href*="/video/"]') ||
                    element;

                const href = link.href || link.getAttribute('href') || '';
                const videoId = href.match(/video\/(\d+)/)?.[1] || `tiktok_${index}`;

                // Find view count - TikTok shows views as text like "1.2M"
                let views = '0';
                const viewsEl = element.querySelector('[class*="video-count"], [class*="views"], strong, [data-e2e="video-views"]');
                if (viewsEl) {
                    views = viewsEl.textContent.trim();
                } else {
                    // Look for any text that looks like a view count
                    const allText = element.querySelectorAll('strong, span');
                    allText.forEach(el => {
                        const text = el.textContent.trim();
                        if (/^\d+(\.\d+)?[KMB]?$/i.test(text)) {
                            views = text;
                        }
                    });
                }

                // Get thumbnail
                const img = element.querySelector('img');
                const thumbnail = img?.src || '';

                return {
                    id: videoId,
                    element: element,
                    url: href.startsWith('http') ? href : `https://www.tiktok.com${href}`,
                    thumbnail: thumbnail,
                    views: views,
                    likes: '0',
                    comments: '0',
                    shares: '0',
                    uploadDate: new Date(),
                    mediaUrl: '',
                    isVideo: true
                };
            } catch (e) {
                console.error('[SMM] Error extracting post:', e);
                return null;
            }
        },

        // Enrich posts with data from page's JSON
        enrichWithPageData() {
            try {
                // TikTok stores data in script tags with specific IDs
                const scripts = document.querySelectorAll('script[id*="SIGI_STATE"], script[id*="__UNIVERSAL_DATA"]');

                scripts.forEach(script => {
                    try {
                        const data = JSON.parse(script.textContent);
                        const itemModule = data.ItemModule || data['ItemModule'] || {};

                        this.posts.forEach(post => {
                            const item = itemModule[post.id];
                            if (item) {
                                post.views = item.stats?.playCount || item.playCount || post.views;
                                post.likes = item.stats?.diggCount || item.diggCount || '0';
                                post.comments = item.stats?.commentCount || item.commentCount || '0';
                                post.shares = item.stats?.shareCount || item.shareCount || '0';

                                if (item.createTime) {
                                    post.uploadDate = new Date(item.createTime * 1000);
                                }

                                // Update overlay with new data
                                if (typeof SMMOverlay !== 'undefined') {
                                    SMMOverlay.removeFromElement(post.element);
                                    SMMOverlay.addToElement(post.element, post, this.platform);
                                }
                            }
                        });

                        console.log('[SMM] Enriched posts with page data');
                    } catch (e) {
                        // Ignore parse errors
                    }
                });
            } catch (e) {
                console.error('[SMM] Error enriching data:', e);
            }
        },

        // Set up message listener for popup communication
        setupMessageListener() {
            chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
                console.log('[SMM] Received message:', request);

                if (request.action === 'updateSort') {
                    this.applySort(request.sortBy, request.sortOrder);
                    sendResponse({ success: true, postCount: this.posts.length });
                } else if (request.action === 'updateOverlay') {
                    if (typeof SMMOverlay !== 'undefined') {
                        SMMOverlay.toggle(request.enabled);
                    }
                    sendResponse({ success: true });
                } else if (request.action === 'getStatus') {
                    sendResponse({
                        platform: this.platform,
                        postCount: this.posts.length,
                        initialized: this.initialized
                    });
                }

                return true;
            });
        },

        // Apply sorting
        applySort(sortBy, sortOrder) {
            console.log(`[SMM] Applying sort: ${sortBy} ${sortOrder}`);

            if (this.posts.length === 0) {
                console.log('[SMM] No posts to sort, re-collecting...');
                this.collectPosts();
            }

            if (this.posts.length === 0) {
                console.log('[SMM] Still no posts found');
                return;
            }

            // Sort posts
            const sorted = [...this.posts].sort((a, b) => {
                let valueA, valueB;

                switch (sortBy) {
                    case 'views':
                        valueA = this.parseNumber(a.views);
                        valueB = this.parseNumber(b.views);
                        break;
                    case 'likes':
                        valueA = this.parseNumber(a.likes);
                        valueB = this.parseNumber(b.likes);
                        break;
                    case 'comments':
                        valueA = this.parseNumber(a.comments);
                        valueB = this.parseNumber(b.comments);
                        break;
                    case 'shares':
                        valueA = this.parseNumber(a.shares);
                        valueB = this.parseNumber(b.shares);
                        break;
                    case 'date':
                    default:
                        valueA = new Date(a.uploadDate).getTime();
                        valueB = new Date(b.uploadDate).getTime();
                        break;
                }

                return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
            });

            // Reorder DOM
            const container = this.getContainer();
            if (container) {
                console.log('[SMM] Reordering DOM elements...');
                sorted.forEach(post => {
                    if (post.element && post.element.parentNode) {
                        container.appendChild(post.element);
                    }
                });

                this.showSortIndicator(sortBy, sortOrder);
            }

            this.posts = sorted;
        },

        // Parse number string (e.g., "1.2M" -> 1200000)
        parseNumber(str) {
            if (typeof str === 'number') return str;
            if (!str) return 0;

            str = String(str).trim().replace(/,/g, '');

            const multipliers = { k: 1000, K: 1000, m: 1000000, M: 1000000, b: 1000000000, B: 1000000000 };

            for (const [suffix, mult] of Object.entries(multipliers)) {
                if (str.includes(suffix)) {
                    return Math.round(parseFloat(str) * mult);
                }
            }

            return parseInt(str, 10) || 0;
        },

        // Show sort indicator
        showSortIndicator(sortBy, sortOrder) {
            const existing = document.querySelector('.smm-sort-indicator');
            if (existing) existing.remove();

            const labels = {
                views: '조회수',
                likes: '좋아요',
                comments: '댓글',
                shares: '공유',
                date: '날짜'
            };

            const indicator = document.createElement('div');
            indicator.className = 'smm-sort-indicator';
            indicator.innerHTML = `<span class="icon">📊</span><span>${labels[sortBy]} ${sortOrder === 'asc' ? '↑' : '↓'} (${this.posts.length}개)</span>`;
            indicator.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: rgba(0,0,0,0.9);
        color: white;
        padding: 10px 16px;
        border-radius: 20px;
        font-size: 14px;
        z-index: 99999;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      `;

            document.body.appendChild(indicator);

            setTimeout(() => {
                indicator.style.opacity = '0';
                indicator.style.transition = 'opacity 0.3s';
                setTimeout(() => indicator.remove(), 300);
            }, 3000);
        },

        // Set up mutation observer
        setupObserver() {
            const observer = new MutationObserver(
                this.debounce(() => {
                    if (this.isProfilePage() && !this.initialized) {
                        this.collectPosts();
                    }
                }, 1000)
            );

            observer.observe(document.body, { childList: true, subtree: true });
        },

        // Debounce helper
        debounce(func, wait) {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), wait);
            };
        }
    };

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => TikTokHandler.init());
    } else {
        TikTokHandler.init();
    }

    window.TikTokHandler = TikTokHandler;
})();
