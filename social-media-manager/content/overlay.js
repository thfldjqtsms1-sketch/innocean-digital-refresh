// Overlay UI for displaying post information

const SMMOverlay = {
    enabled: true,
    showInfo: ['likes', 'comments', 'date'],

    // Create overlay element for a post
    createOverlay(postData, platform) {
        const overlay = document.createElement('div');
        overlay.className = 'smm-overlay';
        overlay.setAttribute('data-platform', platform);
        overlay.setAttribute('data-post-id', postData.id);

        // Info section
        const infoSection = document.createElement('div');
        infoSection.className = 'smm-overlay-info';

        if (this.showInfo.includes('views') && postData.views !== undefined) {
            infoSection.appendChild(this.createInfoItem('👁', postData.views, 'views'));
        }

        if (this.showInfo.includes('likes') && postData.likes !== undefined) {
            infoSection.appendChild(this.createInfoItem('❤️', postData.likes, 'likes'));
        }

        if (this.showInfo.includes('comments') && postData.comments !== undefined) {
            infoSection.appendChild(this.createInfoItem('💬', postData.comments, 'comments'));
        }

        if (this.showInfo.includes('shares') && postData.shares !== undefined) {
            infoSection.appendChild(this.createInfoItem('🔗', postData.shares, 'shares'));
        }

        if (this.showInfo.includes('date') && postData.uploadDate) {
            const dateStr = this.formatDate(postData.uploadDate);
            infoSection.appendChild(this.createInfoItem('📅', dateStr, 'date'));
        }

        overlay.appendChild(infoSection);

        // Download button
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'smm-download-btn';
        downloadBtn.innerHTML = '⬇️';
        downloadBtn.title = '다운로드';
        downloadBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.handleDownload(postData, platform);
        };
        overlay.appendChild(downloadBtn);

        return overlay;
    },

    // Create an info item
    createInfoItem(icon, value, type) {
        const item = document.createElement('span');
        item.className = `smm-info-item smm-info-${type}`;
        item.innerHTML = `${icon} <span class="smm-info-value">${SMM.formatNumber(value)}</span>`;
        return item;
    },

    // Format date for display
    formatDate(date) {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        const now = new Date();
        const diff = now - date;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) return '오늘';
        if (days === 1) return '어제';
        if (days < 7) return `${days}일 전`;
        if (days < 30) return `${Math.floor(days / 7)}주 전`;
        if (days < 365) return `${Math.floor(days / 30)}개월 전`;
        return `${Math.floor(days / 365)}년 전`;
    },

    // Handle download button click
    async handleDownload(postData, platform) {
        const filename = SMMDownloader.generateFilename(
            platform,
            postData.id,
            postData.isVideo ? 'video' : 'image'
        );

        if (postData.mediaUrl) {
            await SMMDownloader.download(postData.mediaUrl, filename, platform);
        } else {
            console.error('No media URL found for post:', postData.id);
        }
    },

    // Add overlay to a post element
    addToElement(element, postData, platform) {
        if (!this.enabled) return;

        // Check if overlay already exists
        if (element.querySelector('.smm-overlay')) return;

        // Make sure element has relative positioning
        const computedStyle = window.getComputedStyle(element);
        if (computedStyle.position === 'static') {
            element.style.position = 'relative';
        }

        const overlay = this.createOverlay(postData, platform);
        element.appendChild(overlay);
    },

    // Remove overlay from element
    removeFromElement(element) {
        const overlay = element.querySelector('.smm-overlay');
        if (overlay) {
            overlay.remove();
        }
    },

    // Toggle overlay visibility
    toggle(enabled) {
        this.enabled = enabled;
        const overlays = document.querySelectorAll('.smm-overlay');
        overlays.forEach(overlay => {
            overlay.style.display = enabled ? 'flex' : 'none';
        });
    },

    // Update which info to show
    setShowInfo(infoTypes) {
        this.showInfo = infoTypes;
        // Refresh all overlays
        this.refreshAll();
    },

    // Refresh all overlays
    refreshAll() {
        // This should be overridden by platform handlers
        window.dispatchEvent(new CustomEvent('smm-refresh-overlays'));
    },

    // Initialize overlay settings
    async init() {
        const settings = await SMM.getSettings();
        this.enabled = settings.showOverlay !== false;
        this.showInfo = settings.overlayInfo || ['likes', 'comments', 'date'];

        // Listen for settings changes
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === 'updateOverlay') {
                this.enabled = request.enabled;
                this.toggle(request.enabled);
                sendResponse({ success: true });
            } else if (request.action === 'updateOverlayInfo') {
                this.setShowInfo(request.infoTypes);
                sendResponse({ success: true });
            }
        });
    }
};

// Initialize overlay
SMMOverlay.init();

window.SMMOverlay = SMMOverlay;
