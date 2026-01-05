// Social Media Manager - Background Service Worker

// Handle extension installation
chrome.runtime.onInstalled.addListener(() => {
    console.log('Social Media Manager installed');

    // Set default settings
    chrome.storage.sync.set({
        sortBy: 'date',
        sortOrder: 'desc',
        showOverlay: true,
        overlayInfo: ['likes', 'comments', 'date']
    });
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'download') {
        handleDownload(request.data);
        sendResponse({ success: true });
    } else if (request.action === 'openBackgroundTab') {
        // Open tab in background (not focused)
        chrome.tabs.create({
            url: request.url,
            active: false  // This makes it a background tab
        }, (tab) => {
            console.log('[SMM] Opened background tab:', tab.id);
            sendResponse({ success: true, tabId: tab.id });
        });
        return true;
    } else if (request.action === 'getSettings') {
        chrome.storage.sync.get(['sortBy', 'sortOrder', 'showOverlay', 'overlayInfo'], (settings) => {
            sendResponse(settings);
        });
        return true; // Keep channel open for async response
    } else if (request.action === 'saveSettings') {
        chrome.storage.sync.set(request.settings, () => {
            sendResponse({ success: true });
        });
        return true;
    }
});

// Handle file download
async function handleDownload(data) {
    const { url, filename, platform } = data;

    try {
        // For TikTok, try to get watermark-free version
        let downloadUrl = url;

        if (platform === 'tiktok' && url.includes('tiktok')) {
            // Try to extract video ID and get clean URL
            downloadUrl = await getTikTokCleanUrl(url);
        }

        chrome.downloads.download({
            url: downloadUrl,
            filename: filename || `${platform}_${Date.now()}.mp4`,
            saveAs: true
        });
    } catch (error) {
        console.error('Download failed:', error);
        // Fallback to original URL
        chrome.downloads.download({
            url: url,
            filename: filename || `${platform}_${Date.now()}.mp4`,
            saveAs: true
        });
    }
}

// Get TikTok video URL without watermark
async function getTikTokCleanUrl(originalUrl) {
    // This is a simplified approach - for production, use proper API
    // The watermark-free URL is typically in a different format
    return originalUrl;
}
