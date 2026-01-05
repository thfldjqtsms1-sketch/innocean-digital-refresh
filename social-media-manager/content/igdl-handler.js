// igdl.tv Auto Download Handler
// Automatically processes Instagram image downloads when URL param is provided

(function () {
    'use strict';

    console.log('[SMM] igdl.tv Handler loading...');

    const IgdlHandler = {
        initialized: false,

        init() {
            console.log('[SMM] igdl.tv Handler initializing...');

            // Check if URL contains Instagram link parameter
            const urlParams = new URLSearchParams(window.location.search);
            const instagramUrl = urlParams.get('url');

            if (instagramUrl) {
                console.log('[SMM] Found Instagram URL:', instagramUrl);
                this.showStatus('🔄 자동 다운로드 준비 중...');

                // Wait for page to load, then process
                setTimeout(() => {
                    this.processDownload(instagramUrl);
                }, 2000);
            }

            this.initialized = true;
        },

        // Show status indicator
        showStatus(message) {
            let status = document.getElementById('smm-igdl-status');
            if (!status) {
                status = document.createElement('div');
                status.id = 'smm-igdl-status';
                status.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045);
                    color: white;
                    padding: 16px 24px;
                    border-radius: 12px;
                    font-size: 14px;
                    z-index: 99999;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                `;
                document.body.appendChild(status);
            }
            status.textContent = message;
        },

        // Process the download
        async processDownload(instagramUrl) {
            try {
                // Step 1: Find the input field
                this.showStatus('📝 링크 입력 중...');

                // Try multiple selectors to find the input
                let inputArea = document.querySelector('input[name="url"]');
                if (!inputArea) inputArea = document.querySelector('input[type="text"]');
                if (!inputArea) inputArea = document.querySelector('input[placeholder*="instagram"]');
                if (!inputArea) inputArea = document.querySelector('input.form-control');

                if (!inputArea) {
                    console.log('[SMM] Input field not found, retrying...');
                    console.log('[SMM] Available inputs:', document.querySelectorAll('input'));
                    setTimeout(() => this.processDownload(instagramUrl), 1000);
                    return;
                }

                console.log('[SMM] Found input:', inputArea);

                // Clear and fill the input
                inputArea.value = '';
                inputArea.focus();

                // Set value and trigger events
                inputArea.value = instagramUrl;

                // Trigger multiple events for React/Vue compatibility
                const inputEvent = new Event('input', { bubbles: true, cancelable: true });
                const changeEvent = new Event('change', { bubbles: true, cancelable: true });
                inputArea.dispatchEvent(inputEvent);
                inputArea.dispatchEvent(changeEvent);

                // Also try native setter for React
                const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
                nativeInputValueSetter.call(inputArea, instagramUrl);
                inputArea.dispatchEvent(new Event('input', { bubbles: true }));

                console.log('[SMM] Input filled with:', instagramUrl);

                // Step 2: Click the submit button
                await this.delay(800);
                this.showStatus('🔍 검색 중...');

                let submitBtn = document.querySelector('button[type="submit"]');
                if (!submitBtn) submitBtn = document.querySelector('form button');
                if (!submitBtn) submitBtn = document.querySelector('button.btn-primary');
                if (!submitBtn) submitBtn = document.querySelector('.btn-download');

                if (submitBtn) {
                    console.log('[SMM] Found submit button:', submitBtn);
                    submitBtn.click();
                    console.log('[SMM] Submit button clicked');
                } else {
                    console.log('[SMM] Submit button not found, trying Enter key');
                    // Try pressing Enter
                    const enterEvent = new KeyboardEvent('keydown', {
                        key: 'Enter',
                        code: 'Enter',
                        keyCode: 13,
                        which: 13,
                        bubbles: true
                    });
                    inputArea.dispatchEvent(enterEvent);
                }

                // Step 3: Wait for result and click download
                this.showStatus('⏳ 이미지 처리 중...');
                await this.waitForDownloadButton();

            } catch (error) {
                console.error('[SMM] Error:', error);
                this.showStatus('❌ 오류 발생. 수동으로 진행해주세요.');
            }
        },

        // Wait for download button to appear and click it
        async waitForDownloadButton() {
            let attempts = 0;
            const maxAttempts = 30; // 30 seconds max

            const checkForButton = async () => {
                attempts++;

                // Look for download button/link with multiple selectors
                let downloadBtn = document.querySelector('a[download]');
                if (!downloadBtn) downloadBtn = document.querySelector('a[href*=".jpg"]');
                if (!downloadBtn) downloadBtn = document.querySelector('a[href*=".png"]');
                if (!downloadBtn) downloadBtn = document.querySelector('a[href*="cdninstagram"]');
                if (!downloadBtn) downloadBtn = document.querySelector('a[href*="scontent"]');
                if (!downloadBtn) downloadBtn = document.querySelector('.download-btn a');
                if (!downloadBtn) downloadBtn = document.querySelector('a.btn-download');
                if (!downloadBtn) downloadBtn = document.querySelector('a[class*="download"]');

                // Also look for image results that can be right-click saved
                if (!downloadBtn) {
                    const resultImg = document.querySelector('.result img, .download-box img, .media-result img');
                    if (resultImg && resultImg.src) {
                        downloadBtn = document.createElement('a');
                        downloadBtn.href = resultImg.src;
                    }
                }

                if (downloadBtn && downloadBtn.href && downloadBtn.href !== '#' && !downloadBtn.href.includes('javascript:')) {
                    this.showStatus('⬇️ 다운로드 시작!');
                    console.log('[SMM] Download button found:', downloadBtn.href);

                    // Click the download button
                    downloadBtn.click();

                    // Quick close - 1 second delay
                    await this.delay(1000);
                    window.close();

                    return;
                }

                // Check for error messages
                const errorEl = document.querySelector('.alert-danger, .alert-warning, .error-message, [class*="error"]');
                if (errorEl && errorEl.textContent.trim() && !errorEl.textContent.includes('자동')) {
                    this.showStatus('❌ 오류: ' + errorEl.textContent.trim().substring(0, 50));
                    return;
                }

                if (attempts < maxAttempts) {
                    this.showStatus(`⏳ 이미지 처리 중... (${attempts}초)`);
                    setTimeout(checkForButton, 1000);
                } else {
                    this.showStatus('⚠️ 시간 초과. 수동으로 다운로드 버튼을 클릭해주세요.');
                }
            };

            checkForButton();
        },

        // Delay helper
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => IgdlHandler.init());
    } else {
        IgdlHandler.init();
    }

    window.IgdlHandler = IgdlHandler;
})();
