// Sorting functionality for posts

const SMMSorter = {
    currentSort: {
        by: 'date',
        order: 'desc'
    },

    // Sort posts by specified criteria
    sortPosts(posts, sortBy, sortOrder = 'desc') {
        const sorted = [...posts].sort((a, b) => {
            let valueA, valueB;

            switch (sortBy) {
                case 'views':
                    valueA = SMM.parseNumber(a.views) || 0;
                    valueB = SMM.parseNumber(b.views) || 0;
                    break;
                case 'likes':
                    valueA = SMM.parseNumber(a.likes) || 0;
                    valueB = SMM.parseNumber(b.likes) || 0;
                    break;
                case 'comments':
                    valueA = SMM.parseNumber(a.comments) || 0;
                    valueB = SMM.parseNumber(b.comments) || 0;
                    break;
                case 'shares':
                    valueA = SMM.parseNumber(a.shares) || 0;
                    valueB = SMM.parseNumber(b.shares) || 0;
                    break;
                case 'date':
                default:
                    valueA = a.uploadDate ? new Date(a.uploadDate).getTime() : 0;
                    valueB = b.uploadDate ? new Date(b.uploadDate).getTime() : 0;
                    break;
            }

            if (sortOrder === 'asc') {
                return valueA - valueB;
            }
            return valueB - valueA;
        });

        return sorted;
    },

    // Reorder DOM elements based on sorted posts
    reorderElements(container, posts, getElementByPost) {
        if (!container || !posts.length) return;

        // Create a document fragment for efficient DOM manipulation
        const fragment = document.createDocumentFragment();

        posts.forEach(post => {
            const element = getElementByPost(post);
            if (element) {
                fragment.appendChild(element);
            }
        });

        // Clear and append sorted elements
        container.innerHTML = '';
        container.appendChild(fragment);
    },

    // Apply sorting to the page
    async applySort(sortBy, sortOrder) {
        this.currentSort = { by: sortBy, order: sortOrder };

        // Save settings
        await SMM.saveSettings({ sortBy, sortOrder });

        // Dispatch event for handlers to react
        window.dispatchEvent(new CustomEvent('smm-sort-changed', {
            detail: { sortBy, sortOrder }
        }));
    },

    // Initialize with saved settings
    async init() {
        const settings = await SMM.getSettings();
        this.currentSort = {
            by: settings.sortBy || 'date',
            order: settings.sortOrder || 'desc'
        };

        // Listen for settings changes from popup
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === 'updateSort') {
                this.applySort(request.sortBy, request.sortOrder);
                sendResponse({ success: true });
            }
        });
    }
};

// Initialize sorter
SMMSorter.init();

window.SMMSorter = SMMSorter;
