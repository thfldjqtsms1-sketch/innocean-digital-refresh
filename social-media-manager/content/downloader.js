// Download functionality for TikTok and Instagram

const SMMDownloader = {

    // Download a file
    async download(url, filename, platform) {
        try {
            // Try direct download first
            const response = await fetch(url, {
                mode: 'cors',
                credentials: 'include'
            });

            if (response.ok) {
                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = filename;
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
                return true;
            }
        } catch (e) {
            console.log('Direct download failed, using background script');
        }

        // Fallback to background script
        await SMM.sendMessage('download', {
            data: { url, filename, platform }
        });

        return true;
    },

    // Get TikTok video URL without watermark
    async getTikTokVideoUrl(videoElement) {
        // Method 1: Check for video source directly
        if (videoElement && videoElement.src) {
            return videoElement.src;
        }

        // Method 2: Check for source elements
        const source = videoElement?.querySelector('source');
        if (source && source.src) {
            return source.src;
        }

        // Method 3: Try to find in page data
        const scripts = document.querySelectorAll('script[id*="SIGI_STATE"]');
        for (const script of scripts) {
            try {
                const data = JSON.parse(script.textContent);
                // Navigate through TikTok's data structure to find video URL
                if (data.ItemModule) {
                    const items = Object.values(data.ItemModule);
                    for (const item of items) {
                        if (item.video && item.video.playAddr) {
                            return item.video.playAddr;
                        }
                    }
                }
            } catch (e) {
                console.error('Error parsing TikTok data:', e);
            }
        }

        return null;
    },

    // Get Instagram media URL
    async getInstagramMediaUrl(postElement) {
        // Check for video
        const video = postElement.querySelector('video');
        if (video && video.src) {
            return { url: video.src, type: 'video' };
        }

        // Check for image
        const img = postElement.querySelector('img[src*="instagram"]');
        if (img && img.src) {
            // Try to get higher resolution
            const srcset = img.srcset;
            if (srcset) {
                const sources = srcset.split(',').map(s => {
                    const parts = s.trim().split(' ');
                    return {
                        url: parts[0],
                        width: parseInt(parts[1]) || 0
                    };
                });
                sources.sort((a, b) => b.width - a.width);
                if (sources.length > 0) {
                    return { url: sources[0].url, type: 'image' };
                }
            }
            return { url: img.src, type: 'image' };
        }

        return null;
    },

    // Generate filename
    generateFilename(platform, postId, type = 'video') {
        const ext = type === 'video' ? 'mp4' : 'jpg';
        const timestamp = new Date().toISOString().slice(0, 10);
        return `${platform}_${postId}_${timestamp}.${ext}`;
    }
};

window.SMMDownloader = SMMDownloader;
