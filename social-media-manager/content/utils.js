// Utility functions shared across content scripts

const SMM = window.SMM || {};

// Format numbers (e.g., 1.2M, 50K)
SMM.formatNumber = function (num) {
    if (num === null || num === undefined) return '0';
    if (typeof num === 'string') {
        num = SMM.parseNumber(num);
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
};

// Parse formatted numbers back to integers
SMM.parseNumber = function (str) {
    if (typeof str === 'number') return str;
    if (!str) return 0;

    str = str.toString().trim().replace(/,/g, '');

    const multipliers = {
        'k': 1000,
        'K': 1000,
        'm': 1000000,
        'M': 1000000,
        'b': 1000000000,
        'B': 1000000000,
        '만': 10000,
        '천': 1000,
        '억': 100000000
    };

    for (const [suffix, multiplier] of Object.entries(multipliers)) {
        if (str.includes(suffix)) {
            const num = parseFloat(str.replace(suffix, ''));
            return Math.round(num * multiplier);
        }
    }

    return parseInt(str, 10) || 0;
};

// Parse relative date strings
SMM.parseRelativeDate = function (str) {
    if (!str) return new Date();

    const now = new Date();
    str = str.toLowerCase().trim();

    // Korean patterns
    const patterns = [
        { regex: /(\d+)초\s*전/, unit: 'seconds' },
        { regex: /(\d+)분\s*전/, unit: 'minutes' },
        { regex: /(\d+)시간\s*전/, unit: 'hours' },
        { regex: /(\d+)일\s*전/, unit: 'days' },
        { regex: /(\d+)주\s*전/, unit: 'weeks' },
        { regex: /(\d+)개월\s*전/, unit: 'months' },
        { regex: /(\d+)년\s*전/, unit: 'years' },
        // English patterns
        { regex: /(\d+)\s*s(ec(ond)?s?)?\s*ago/, unit: 'seconds' },
        { regex: /(\d+)\s*m(in(ute)?s?)?\s*ago/, unit: 'minutes' },
        { regex: /(\d+)\s*h(our)?s?\s*ago/, unit: 'hours' },
        { regex: /(\d+)\s*d(ay)?s?\s*ago/, unit: 'days' },
        { regex: /(\d+)\s*w(eek)?s?\s*ago/, unit: 'weeks' },
        { regex: /(\d+)\s*mo(nth)?s?\s*ago/, unit: 'months' },
        { regex: /(\d+)\s*y(ear)?s?\s*ago/, unit: 'years' }
    ];

    for (const { regex, unit } of patterns) {
        const match = str.match(regex);
        if (match) {
            const value = parseInt(match[1], 10);
            const date = new Date(now);

            switch (unit) {
                case 'seconds': date.setSeconds(date.getSeconds() - value); break;
                case 'minutes': date.setMinutes(date.getMinutes() - value); break;
                case 'hours': date.setHours(date.getHours() - value); break;
                case 'days': date.setDate(date.getDate() - value); break;
                case 'weeks': date.setDate(date.getDate() - value * 7); break;
                case 'months': date.setMonth(date.getMonth() - value); break;
                case 'years': date.setFullYear(date.getFullYear() - value); break;
            }

            return date;
        }
    }

    // Try to parse as date string
    const parsed = new Date(str);
    return isNaN(parsed.getTime()) ? now : parsed;
};

// Debounce function
SMM.debounce = function (func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Wait for element to appear
SMM.waitForElement = function (selector, timeout = 10000) {
    return new Promise((resolve, reject) => {
        const element = document.querySelector(selector);
        if (element) {
            resolve(element);
            return;
        }

        const observer = new MutationObserver((mutations, obs) => {
            const element = document.querySelector(selector);
            if (element) {
                obs.disconnect();
                resolve(element);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Element ${selector} not found`));
        }, timeout);
    });
};

// Send message to background script
SMM.sendMessage = function (action, data = {}) {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ action, ...data }, resolve);
    });
};

// Get current settings
SMM.getSettings = async function () {
    return await SMM.sendMessage('getSettings');
};

// Save settings
SMM.saveSettings = async function (settings) {
    return await SMM.sendMessage('saveSettings', { settings });
};

window.SMM = SMM;
