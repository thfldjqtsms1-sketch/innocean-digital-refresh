// Social Media Manager - Popup Script (Improved)

document.addEventListener('DOMContentLoaded', async () => {
    console.log('[SMM Popup] Loading...');

    // Load saved settings
    const settings = await chrome.storage.sync.get([
        'sortBy',
        'sortOrder',
        'showOverlay',
        'overlayInfo',
        'noWatermark'
    ]);

    // Apply saved settings to UI
    const sortBySelect = document.getElementById('sortBy');
    const sortOrderSelect = document.getElementById('sortOrder');
    const showOverlayToggle = document.getElementById('showOverlay');
    const noWatermarkToggle = document.getElementById('noWatermark');
    const overlayOptions = document.getElementById('overlayOptions');

    if (settings.sortBy) sortBySelect.value = settings.sortBy;
    if (settings.sortOrder) sortOrderSelect.value = settings.sortOrder;
    if (settings.showOverlay !== undefined) showOverlayToggle.checked = settings.showOverlay;
    if (settings.noWatermark !== undefined) noWatermarkToggle.checked = settings.noWatermark;

    // Set overlay info checkboxes
    if (settings.overlayInfo) {
        overlayOptions.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = settings.overlayInfo.includes(checkbox.value);
        });
    }

    // Detect current platform
    detectPlatform();

    // Apply Sort button
    document.getElementById('applySort').addEventListener('click', async () => {
        const sortBy = sortBySelect.value;
        const sortOrder = sortOrderSelect.value;

        console.log('[SMM Popup] Applying sort:', sortBy, sortOrder);

        // Save settings
        await chrome.storage.sync.set({ sortBy, sortOrder });

        // Send to content script
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab && tab.id) {
            try {
                const response = await chrome.tabs.sendMessage(tab.id, {
                    action: 'updateSort',
                    sortBy,
                    sortOrder
                });
                console.log('[SMM Popup] Sort response:', response);

                // Visual feedback
                const btn = document.getElementById('applySort');
                if (response && response.success) {
                    btn.innerHTML = `<span>✅</span> 적용됨! (${response.postCount || 0}개)`;
                } else {
                    btn.innerHTML = '<span>⚠️</span> 재시도...';
                }
                setTimeout(() => {
                    btn.innerHTML = '<span>✨</span> 정렬 적용';
                }, 2000);
            } catch (e) {
                console.error('[SMM Popup] Error:', e);
                const btn = document.getElementById('applySort');
                btn.innerHTML = '<span>❌</span> 페이지 새로고침 필요';
                setTimeout(() => {
                    btn.innerHTML = '<span>✨</span> 정렬 적용';
                }, 2000);
            }
        }
    });

    // Overlay toggle
    showOverlayToggle.addEventListener('change', async () => {
        const enabled = showOverlayToggle.checked;
        await chrome.storage.sync.set({ showOverlay: enabled });

        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab && tab.id) {
            try {
                await chrome.tabs.sendMessage(tab.id, {
                    action: 'updateOverlay',
                    enabled
                });
            } catch (e) {
                console.error('[SMM Popup] Overlay toggle error:', e);
            }
        }
    });

    // Overlay info checkboxes
    overlayOptions.addEventListener('change', async (e) => {
        if (e.target.type !== 'checkbox') return;

        const checked = [];
        overlayOptions.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
            checked.push(cb.value);
        });

        await chrome.storage.sync.set({ overlayInfo: checked });

        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab && tab.id) {
            try {
                await chrome.tabs.sendMessage(tab.id, {
                    action: 'updateOverlayInfo',
                    infoTypes: checked
                });
            } catch (e) {
                console.error('[SMM Popup] Overlay info error:', e);
            }
        }
    });

    // No watermark toggle
    noWatermarkToggle.addEventListener('change', async () => {
        await chrome.storage.sync.set({ noWatermark: noWatermarkToggle.checked });
    });

    // Refresh page button
    const refreshBtn = document.getElementById('refreshPage');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', async () => {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab && tab.id) {
                await chrome.tabs.reload(tab.id);
                window.close();
            }
        });
    }
});

// Detect the current platform
async function detectPlatform() {
    const badge = document.getElementById('platformBadge');
    const statusEl = document.getElementById('statusText');

    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!tab || !tab.url) {
            badge.innerHTML = '<span class="platform-icon">❓</span><span class="platform-name">알 수 없음</span>';
            return;
        }

        const url = tab.url.toLowerCase();
        let platform = 'unknown';

        if (url.includes('tiktok.com')) {
            badge.className = 'platform-badge tiktok';
            badge.innerHTML = '<span class="platform-icon">🎵</span><span class="platform-name">TikTok</span>';
            platform = 'tiktok';
        } else if (url.includes('instagram.com')) {
            badge.className = 'platform-badge instagram';
            badge.innerHTML = '<span class="platform-icon">📷</span><span class="platform-name">Instagram</span>';
            platform = 'instagram';
        } else {
            badge.innerHTML = '<span class="platform-icon">🌐</span><span class="platform-name">다른 사이트</span>';
            if (statusEl) statusEl.textContent = '지원되지 않는 사이트입니다';
            return;
        }

        // Check content script status
        if (tab.id) {
            try {
                const response = await chrome.tabs.sendMessage(tab.id, { action: 'getStatus' });
                console.log('[SMM Popup] Status:', response);

                if (statusEl) {
                    if (response && response.initialized) {
                        statusEl.textContent = `준비됨 (${response.postCount}개 게시물)`;
                        statusEl.style.color = '#4ade80';
                    } else {
                        statusEl.textContent = '초기화 중... 잠시 후 다시 시도';
                        statusEl.style.color = '#fbbf24';
                    }
                }
            } catch (e) {
                console.log('[SMM Popup] Content script not ready:', e);
                if (statusEl) {
                    statusEl.textContent = '페이지 새로고침 필요';
                    statusEl.style.color = '#f87171';
                }
            }
        }
    } catch (e) {
        console.error('[SMM Popup] Error detecting platform:', e);
        badge.innerHTML = '<span class="platform-icon">❓</span><span class="platform-name">감지 실패</span>';
    }
}
