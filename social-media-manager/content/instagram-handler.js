// Instagram Handler - Content Script for Instagram (v6 - Full Features)
// Floating panel, auto-collect, download support

(function () {
    'use strict';

    console.log('[SMM] Instagram Handler v6 loading...');

    const InstagramHandler = {
        platform: 'instagram',
        posts: [],
        initialized: false,
        lastUrl: '',
        observer: null,
        floatingPanel: null,
        pageCache: {}, // Cache to store posts by page URL

        // Initialize handler
        init() {
            console.log('[SMM] Instagram Handler initializing...');
            console.log('[SMM] Current URL:', window.location.href);

            this.lastUrl = window.location.href;
            this.setupNavigationWatch();
            this.setupMessageListener();
            this.setupScrollObserver();
            this.createFloatingPanel();

            // Wait for page to be ready then collect
            setTimeout(() => {
                this.collectPosts();
                this.initialized = true;
                this.updatePanel();
                console.log('[SMM] Instagram Handler ready!');
            }, 2000);

            // Listen for sort changes
            window.addEventListener('smm-sort-changed', (e) => {
                this.applySort(e.detail.sortBy, e.detail.sortOrder);
            });
        },

        // Create floating panel for stats and controls
        createFloatingPanel() {
            if (this.floatingPanel) return;

            const panel = document.createElement('div');
            panel.id = 'smm-floating-panel';
            panel.innerHTML = `
                <div class="smm-panel-header">
                    <span>📊 SMM</span>
                    <button class="smm-panel-minimize">−</button>
                </div>
                <div class="smm-panel-content">
                    <div class="smm-panel-stats">
                        <div>게시물: <strong id="smm-post-count">0</strong></div>
                        <div>상태: <span id="smm-status">준비 중...</span></div>
                    </div>
                    <div class="smm-panel-actions">
                        <button id="smm-collect-btn" title="게시물 수집">🔄 수집</button>
                        <button id="smm-scroll-btn" title="자동 스크롤로 전체 로드">⬇️ 전체 로드</button>
                        <button id="smm-stop-btn" title="수집 정지" style="display:none; background:rgba(255,50,50,0.5);">⏹️ 정지</button>
                    </div>
                    <div class="smm-panel-sort">
                        <select id="smm-sort-select">
                            <option value="date">날짜순</option>
                            <option value="views">조회수순</option>
                            <option value="likes">좋아요순</option>
                            <option value="comments">댓글순</option>
                        </select>
                        <button id="smm-sort-btn">정렬 ↓</button>
                    </div>
                </div>
            `;
            panel.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                background: linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045);
                color: white;
                padding: 0;
                border-radius: 16px;
                font-size: 13px;
                z-index: 99999;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                min-width: 200px;
                overflow: hidden;
            `;

            document.body.appendChild(panel);
            this.floatingPanel = panel;

            // Add panel styles
            const style = document.createElement('style');
            style.textContent = `
                #smm-floating-panel .smm-panel-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 14px;
                    background: rgba(0,0,0,0.2);
                    font-weight: 600;
                    cursor: move;
                }
                #smm-floating-panel .smm-panel-minimize {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    padding: 0 5px;
                }
                #smm-floating-panel .smm-panel-content {
                    padding: 12px 14px;
                }
                #smm-floating-panel .smm-panel-stats {
                    margin-bottom: 10px;
                    font-size: 12px;
                }
                #smm-floating-panel .smm-panel-stats div {
                    margin: 3px 0;
                }
                #smm-floating-panel .smm-panel-actions {
                    display: flex;
                    gap: 6px;
                    margin-bottom: 10px;
                }
                #smm-floating-panel .smm-panel-actions button,
                #smm-floating-panel .smm-panel-sort button {
                    flex: 1;
                    padding: 8px;
                    border: none;
                    border-radius: 8px;
                    background: rgba(255,255,255,0.2);
                    color: white;
                    cursor: pointer;
                    font-size: 12px;
                    transition: background 0.2s;
                }
                #smm-floating-panel .smm-panel-actions button:hover,
                #smm-floating-panel .smm-panel-sort button:hover {
                    background: rgba(255,255,255,0.35);
                }
                #smm-floating-panel .smm-panel-sort {
                    display: flex;
                    gap: 6px;
                }
                #smm-floating-panel .smm-panel-sort select {
                    flex: 1;
                    padding: 8px;
                    border: none;
                    border-radius: 8px;
                    background: rgba(255,255,255,0.2);
                    color: white;
                    cursor: pointer;
                    font-size: 12px;
                }
                #smm-floating-panel .smm-panel-sort select option {
                    background: #333;
                    color: white;
                }
                #smm-floating-panel.minimized .smm-panel-content {
                    display: none;
                }
            `;
            document.head.appendChild(style);

            // Event listeners
            panel.querySelector('.smm-panel-minimize').onclick = () => {
                panel.classList.toggle('minimized');
            };

            panel.querySelector('#smm-collect-btn').onclick = () => {
                this.collectPosts();
                this.updatePanel();
            };

            panel.querySelector('#smm-scroll-btn').onclick = () => {
                // Hide scroll btn, show stop btn
                panel.querySelector('#smm-scroll-btn').style.display = 'none';
                panel.querySelector('#smm-stop-btn').style.display = 'block';
                this.autoScrollAndCollect();
            };

            panel.querySelector('#smm-stop-btn').onclick = () => {
                this.stopScrolling();
            };

            panel.querySelector('#smm-sort-btn').onclick = () => {
                const sortBy = panel.querySelector('#smm-sort-select').value;
                this.applySort(sortBy, 'desc');
            };

            // Make panel draggable
            this.makeDraggable(panel);
        },

        // Make element draggable
        makeDraggable(element) {
            const header = element.querySelector('.smm-panel-header');
            let isDragging = false;
            let offsetX, offsetY;

            header.onmousedown = (e) => {
                if (e.target.tagName === 'BUTTON') return;
                isDragging = true;
                offsetX = e.clientX - element.getBoundingClientRect().left;
                offsetY = e.clientY - element.getBoundingClientRect().top;
                header.style.cursor = 'grabbing';
            };

            document.onmousemove = (e) => {
                if (!isDragging) return;
                element.style.left = (e.clientX - offsetX) + 'px';
                element.style.top = (e.clientY - offsetY) + 'px';
                element.style.right = 'auto';
            };

            document.onmouseup = () => {
                isDragging = false;
                header.style.cursor = 'move';
            };
        },

        // Update floating panel stats
        updatePanel() {
            if (!this.floatingPanel) return;

            const countEl = this.floatingPanel.querySelector('#smm-post-count');
            const statusEl = this.floatingPanel.querySelector('#smm-status');

            if (countEl) countEl.textContent = this.posts.length;
            if (statusEl) statusEl.textContent = this.initialized ? '준비됨' : '수집 중...';
        },

        // Auto scroll to load all posts
        async autoScrollAndCollect() {
            const statusEl = this.floatingPanel?.querySelector('#smm-status');
            if (statusEl) statusEl.textContent = '스크롤 중...';

            let lastCount = 0;
            let sameCountTimes = 0;
            this.isScrolling = true;
            this.scrollPaused = false;

            // Handle visibility change
            const handleVisibility = () => {
                if (document.hidden) {
                    this.scrollPaused = true;
                    if (statusEl) statusEl.textContent = `⏸️ 일시정지 (${this.posts.length}개) - 탭으로 돌아오세요`;
                    this.showToast('⚠️ 탭을 벗어나면 수집이 일시정지됩니다!');
                } else {
                    this.scrollPaused = false;
                    if (statusEl) statusEl.textContent = `▶️ 재개 중... (${this.posts.length}개)`;
                }
            };
            document.addEventListener('visibilitychange', handleVisibility);

            const scroll = () => {
                return new Promise((resolve) => {
                    // Wait if tab is hidden
                    const waitForVisible = () => {
                        if (!this.scrollPaused) {
                            window.scrollTo(0, document.body.scrollHeight);
                            setTimeout(resolve, 1500);
                        } else {
                            setTimeout(waitForVisible, 500);
                        }
                    };
                    waitForVisible();
                });
            };

            while (sameCountTimes < 3 && this.isScrolling) {
                await scroll();
                this.collectPosts();
                this.updatePanel();

                if (this.posts.length === lastCount) {
                    sameCountTimes++;
                } else {
                    sameCountTimes = 0;
                    lastCount = this.posts.length;
                }

                if (statusEl && !this.scrollPaused) {
                    statusEl.textContent = `스크롤 중... (${this.posts.length}개)`;
                }
            }

            // Cleanup
            document.removeEventListener('visibilitychange', handleVisibility);
            this.isScrolling = false;

            // Reset buttons
            this.resetScrollButtons();

            if (statusEl) statusEl.textContent = `✅ 완료! (${this.posts.length}개)`;
            window.scrollTo(0, 0);
            this.showToast(`✅ ${this.posts.length}개 게시물 수집 완료!`);
        },

        // Stop scrolling manually
        stopScrolling() {
            if (this.isScrolling) {
                this.isScrolling = false;
                const statusEl = this.floatingPanel?.querySelector('#smm-status');
                if (statusEl) statusEl.textContent = `⏹️ 정지됨 (${this.posts.length}개)`;
                this.showToast(`⏹️ 수집 정지: ${this.posts.length}개 수집됨`);
                this.resetScrollButtons();
            }
        },

        // Reset scroll/stop button visibility
        resetScrollButtons() {
            if (this.floatingPanel) {
                this.floatingPanel.querySelector('#smm-scroll-btn').style.display = 'block';
                this.floatingPanel.querySelector('#smm-stop-btn').style.display = 'none';
            }
        },

        // Get cache key from URL (normalize to base profile/reel page)
        getCacheKey(url) {
            // Extract base page URL (profile reels page)
            const reelsMatch = url.match(/instagram\.com\/([^\/]+)\/reels/);
            if (reelsMatch) return `reels:${reelsMatch[1]}`;

            const profileMatch = url.match(/instagram\.com\/([^\/]+)\/?$/);
            if (profileMatch) return `profile:${profileMatch[1]}`;

            return null;
        },

        // Save current posts to cache
        saveToCache() {
            const key = this.getCacheKey(window.location.href);
            if (key && this.posts.length > 0) {
                // Store post data without DOM elements (serialize-safe)
                this.pageCache[key] = this.posts.map(p => ({
                    id: p.id,
                    url: p.url,
                    views: p.views,
                    likes: p.likes,
                    comments: p.comments,
                    mediaUrl: p.mediaUrl,
                    index: p.index,
                    isVideo: p.isVideo
                }));
                console.log(`[SMM] Cached ${this.posts.length} posts for ${key}`);
            }
        },

        // Restore posts from cache
        restoreFromCache() {
            const key = this.getCacheKey(window.location.href);
            if (key && this.pageCache[key]) {
                console.log(`[SMM] Found cache for ${key}: ${this.pageCache[key].length} posts`);
                return this.pageCache[key];
            }
            return null;
        },

        // Watch for SPA navigation
        setupNavigationWatch() {
            setInterval(() => {
                if (window.location.href !== this.lastUrl) {
                    console.log('[SMM] URL changed from', this.lastUrl, 'to', window.location.href);

                    // Save current page data before leaving
                    this.saveToCache();

                    this.lastUrl = window.location.href;
                    this.initialized = false;

                    setTimeout(() => {
                        // Try to restore from cache first
                        const cached = this.restoreFromCache();
                        if (cached) {
                            this.posts = [];
                            // Collect current DOM elements and merge with cached data
                            this.collectPosts();

                            // Restore cached stats to current posts
                            const cachedMap = new Map(cached.map(p => [p.id, p]));
                            this.posts.forEach(post => {
                                const cachedPost = cachedMap.get(post.id);
                                if (cachedPost) {
                                    post.views = cachedPost.views;
                                    post.likes = cachedPost.likes;
                                    post.comments = cachedPost.comments;
                                }
                            });

                            console.log(`[SMM] Restored ${this.posts.length} posts from cache`);
                            this.showToast(`✅ ${this.posts.length}개 캐시에서 복원됨`);
                        } else {
                            this.posts = [];
                            this.collectPosts();
                        }

                        this.initialized = true;
                        this.updatePanel();
                    }, 2000);
                }
            }, 1000);
        },

        // Watch for new posts loaded by scrolling
        setupScrollObserver() {
            let lastCount = 0;
            setInterval(() => {
                const currentCount = document.querySelectorAll('a._a6hd[href*="/reel/"], a._a6hd[href*="/p/"]').length;
                if (currentCount > lastCount) {
                    console.log(`[SMM] New items loaded: ${lastCount} -> ${currentCount}`);
                    lastCount = currentCount;
                    this.collectPosts();
                    this.updatePanel();
                }
            }, 2000);
        },

        // Find all reel/post items
        findAllItems() {
            const items = [];
            const links = document.querySelectorAll('a._a6hd[href*="/reel/"], a._a6hd[href*="/p/"]');

            links.forEach(link => {
                let container = link.parentElement;
                while (container && !container.classList.contains('x1qjc9v5')) {
                    container = container.parentElement;
                }

                let row = container;
                while (row && !row.classList.contains('_ac7v')) {
                    row = row.parentElement;
                }

                if (container && row) {
                    items.push({ link, container, row });
                }
            });

            return items;
        },

        // Extract stats from an item
        extractStats(item) {
            const { link } = item;
            let likes = 0, comments = 0, views = 0;

            const overlay = link.querySelector('._aajz');
            if (overlay) {
                // Likes and comments
                const statsSection = overlay.querySelector('._aaj-');
                if (statsSection) {
                    const listItems = statsSection.querySelectorAll('li');
                    if (listItems.length >= 1) {
                        const likeSpan = listItems[0].querySelector('span.html-span');
                        if (likeSpan) likes = this.parseKoreanNumber(likeSpan.textContent.trim());
                    }
                    if (listItems.length >= 2) {
                        const commentSpan = listItems[1].querySelector('span.html-span');
                        if (commentSpan) comments = this.parseKoreanNumber(commentSpan.textContent.trim());
                    }
                }

                // Views
                const viewsContainer = overlay.querySelector('._aaj_');
                if (viewsContainer) {
                    const viewsSection = viewsContainer.querySelector('._aajy');
                    if (viewsSection) {
                        const viewSpan = viewsSection.querySelector('span.html-span');
                        if (viewSpan) views = this.parseKoreanNumber(viewSpan.textContent.trim());
                    }
                }
            }

            return { likes, comments, views };
        },

        // Extract thumbnail URL for download
        extractMediaUrl(item) {
            const { link } = item;

            // Get background image from the thumbnail div
            const thumbDiv = link.querySelector('div[style*="background-image"]');
            if (thumbDiv) {
                const style = thumbDiv.getAttribute('style');
                const match = style.match(/url\("([^"]+)"\)/);
                if (match) {
                    return match[1];
                }
            }

            return null;
        },

        // Parse Korean number format
        parseKoreanNumber(str) {
            if (!str) return 0;
            str = String(str).trim().replace(/,/g, '');

            if (str.includes('만')) return Math.round(parseFloat(str.replace('만', '')) * 10000);
            if (str.includes('천')) return Math.round(parseFloat(str.replace('천', '')) * 1000);
            if (str.includes('억')) return Math.round(parseFloat(str.replace('억', '')) * 100000000);
            if (str.toLowerCase().includes('k')) return Math.round(parseFloat(str.toLowerCase().replace('k', '')) * 1000);
            if (str.toLowerCase().includes('m')) return Math.round(parseFloat(str.toLowerCase().replace('m', '')) * 1000000);

            return parseInt(str, 10) || 0;
        },

        // Collect all posts (accumulate, don't reset)
        collectPosts() {
            console.log('[SMM] Collecting posts...');

            const items = this.findAllItems();

            // Build set of already collected IDs
            const seenIds = new Set(this.posts.map(p => p.id));
            const startCount = this.posts.length;

            items.forEach((item, index) => {
                const href = item.link.getAttribute('href') || '';
                const postId = this.extractPostId(href);

                if (postId && !seenIds.has(postId)) {
                    seenIds.add(postId);

                    const stats = this.extractStats(item);
                    const mediaUrl = this.extractMediaUrl(item);

                    const postData = {
                        id: postId,
                        element: item.container,
                        link: item.link,
                        row: item.row,
                        url: `https://www.instagram.com${href}`,
                        views: stats.views,
                        likes: stats.likes,
                        comments: stats.comments,
                        mediaUrl: mediaUrl,
                        index: this.posts.length, // Use actual position
                        isVideo: href.includes('/reel/')
                    };

                    this.posts.push(postData);

                    // Add download button to each item
                    this.addDownloadButton(item.container, postData);
                }
            });

            const newCount = this.posts.length - startCount;
            console.log(`[SMM] Collected ${newCount} new posts, total: ${this.posts.length}`);
        },

        // Add download button to post
        addDownloadButton(container, postData) {
            if (container.querySelector('.smm-dl-btn')) return;

            const btn = document.createElement('button');
            btn.className = 'smm-dl-btn';
            btn.innerHTML = '⬇️';
            btn.title = '다운로드';
            btn.style.cssText = `
                position: absolute;
                top: 8px;
                right: 8px;
                background: rgba(0,0,0,0.7);
                border: none;
                border-radius: 50%;
                width: 32px;
                height: 32px;
                cursor: pointer;
                z-index: 100;
                font-size: 14px;
                opacity: 0;
                transition: opacity 0.2s;
            `;

            container.style.position = 'relative';
            container.appendChild(btn);

            container.addEventListener('mouseenter', () => btn.style.opacity = '1');
            container.addEventListener('mouseleave', () => btn.style.opacity = '0');

            btn.onclick = async (e) => {
                e.preventDefault();
                e.stopPropagation();
                await this.downloadPost(postData);
            };
        },

        // Download a post (video or image)
        async downloadPost(postData) {
            console.log('[SMM] Downloading:', postData.id, 'isVideo:', postData.isVideo);

            // For reels/videos, use indown.io in background tab
            if (postData.isVideo) {
                const indownUrl = `https://indown.io/reels/ko?url=${encodeURIComponent(postData.url)}`;

                // Open in background tab via background script
                chrome.runtime.sendMessage({
                    action: 'openBackgroundTab',
                    url: indownUrl
                });

                this.showToast('🎬 백그라운드에서 영상 다운로드 중...');
                return;
            }

            // For images, use igdl.tv in background tab (same as video approach)
            const igdlUrl = `https://snap.igdl.tv/?url=${encodeURIComponent(postData.url)}`;

            chrome.runtime.sendMessage({
                action: 'openBackgroundTab',
                url: igdlUrl
            });

            this.showToast('📷 백그라운드에서 이미지 다운로드 중...');
        },

        // Show toast notification
        showToast(message) {
            const existing = document.querySelector('.smm-toast');
            if (existing) existing.remove();

            const toast = document.createElement('div');
            toast.className = 'smm-toast';
            toast.textContent = message;
            toast.style.cssText = `
                position: fixed;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%);
                background: #333;
                color: white;
                padding: 14px 24px;
                border-radius: 30px;
                font-size: 14px;
                z-index: 99999;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            `;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        },

        // Extract post ID from URL
        extractPostId(href) {
            const reelMatch = href.match(/\/reel\/([A-Za-z0-9_-]+)/);
            if (reelMatch) return reelMatch[1];

            const postMatch = href.match(/\/p\/([A-Za-z0-9_-]+)/);
            if (postMatch) return postMatch[1];

            return null;
        },

        // Set up message listener
        setupMessageListener() {
            chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
                console.log('[SMM] Received message:', request.action);

                if (request.action === 'updateSort') {
                    this.applySort(request.sortBy, request.sortOrder);
                    sendResponse({ success: true, postCount: this.posts.length });
                } else if (request.action === 'updateOverlay') {
                    sendResponse({ success: true });
                } else if (request.action === 'getStatus') {
                    sendResponse({
                        platform: this.platform,
                        postCount: this.posts.length,
                        initialized: this.initialized,
                        url: window.location.href
                    });
                }

                return true;
            });
        },

        // Apply sorting
        applySort(sortBy, sortOrder) {
            console.log(`[SMM] Applying sort: ${sortBy} ${sortOrder}`);

            if (this.posts.length === 0) {
                this.collectPosts();
            }

            if (this.posts.length === 0) {
                console.log('[SMM] No posts found!');
                return;
            }

            // Sort posts
            const sorted = [...this.posts].sort((a, b) => {
                let valueA, valueB;

                switch (sortBy) {
                    case 'views': valueA = a.views; valueB = b.views; break;
                    case 'likes': valueA = a.likes; valueB = b.likes; break;
                    case 'comments': valueA = a.comments; valueB = b.comments; break;
                    case 'date': default: valueA = a.index; valueB = b.index; break;
                }

                return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
            });

            console.log('[SMM] Top 5 after sort:');
            sorted.slice(0, 5).forEach((p, i) => {
                const val = sortBy === 'views' ? p.views : sortBy === 'likes' ? p.likes : p.comments;
                console.log(`  ${i + 1}. ${p.id}: ${sortBy}=${val}`);
            });

            // Reorder DOM
            this.reorderDOM(sorted);
            this.posts = sorted;

            this.showSortIndicator(sortBy, sortOrder, sorted.length);
        },

        // Reorder DOM elements
        reorderDOM(sortedPosts) {
            const rows = document.querySelectorAll('div._ac7v');
            if (rows.length === 0) return;

            const gridContainer = rows[0].parentElement;
            if (!gridContainer) return;

            console.log(`[SMM] Reordering ${sortedPosts.length} posts`);

            const sortedContainers = sortedPosts.map(post => post.element).filter(el => el);
            let containerIndex = 0;

            rows.forEach(row => {
                const cells = row.querySelectorAll(':scope > div');
                cells.forEach(cell => {
                    if (containerIndex < sortedContainers.length) {
                        const newContent = sortedContainers[containerIndex];
                        if (newContent && cell !== newContent && newContent.parentNode) {
                            const placeholder = document.createElement('div');
                            cell.parentNode.insertBefore(placeholder, cell);
                            newContent.parentNode.insertBefore(cell, newContent);
                            placeholder.parentNode.insertBefore(newContent, placeholder);
                            placeholder.remove();
                        }
                        containerIndex++;
                    }
                });
            });
        },

        // Show sort indicator
        showSortIndicator(sortBy, sortOrder, count) {
            const existing = document.querySelector('.smm-sort-toast');
            if (existing) existing.remove();

            const labels = { views: '조회수', likes: '좋아요', comments: '댓글', date: '날짜' };

            const toast = document.createElement('div');
            toast.className = 'smm-sort-toast';
            toast.innerHTML = `✅ ${labels[sortBy]} ${sortOrder === 'asc' ? '오름차순' : '내림차순'} 정렬 완료 (${count}개)`;
            toast.style.cssText = `
                position: fixed;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%);
                background: #333;
                color: white;
                padding: 14px 24px;
                border-radius: 30px;
                font-size: 14px;
                z-index: 99999;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            `;

            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        },

        formatNumber(num) {
            if (num >= 10000) return (num / 10000).toFixed(1) + '만';
            if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
            return String(num);
        }
    };

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => InstagramHandler.init());
    } else {
        InstagramHandler.init();
    }

    window.InstagramHandler = InstagramHandler;
})();
