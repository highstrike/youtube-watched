// ==UserScript==
// @name         YouTube Watched
// @namespace    https://github.com/highstrike
// @homepageURL  https://github.com/highstrike/youtube-watched
// @description  Marks unwatched youtube videos that have a watch progress bar as watched (70%+ threshold).
// @icon         https://raw.githubusercontent.com/highstrike/youtube-watched/master/icon.png
// @author       highstrike
// @match        *://www.youtube.com/*
// @grant        none
// @version      4.0.0
// @copyright    2026, highstrike (https://openuserjs.org/users/highstrike)
// @license      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @updateURL    https://openuserjs.org/meta/highstrike/YouTube_Watched.meta.js
// @downloadURL  https://openuserjs.org/install/highstrike/YouTube_Watched.user.js
// ==/UserScript==

(function() {
    'use strict';

    function processThumbnails() {
        document.querySelectorAll('yt-thumbnail-view-model, ytd-thumbnail').forEach((thumbnail) => {
            if (thumbnail.querySelector('#watched-white-walker')) { // skip processing entirely if we've already marked this thumbnail
                return;
            }

            const hasProgressBar = thumbnail.querySelector('yt-thumbnail-overlay-progress-bar-view-model, ytd-thumbnail-overlay-resume-playback-renderer');
            if (hasProgressBar) {
                const segment = thumbnail.querySelector('.ytThumbnailOverlayProgressBarHostWatchedProgressBarSegment, #progress');
                if (segment && segment.style.width) {
                    const widthPercentage = parseFloat(segment.style.width);
                    if (widthPercentage >= 70) { // 70% threshold check
                        const overlay = document.createElement('div');
                        overlay.id = 'watched-white-walker';
                        Object.assign(overlay.style, {
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            top: 0,
                            right: 0,
                            display: 'flex',
                            background: 'rgba(197, 225, 229, 0.5)',
                            zIndex: 10,
                            pointerEvents: 'none',
                            borderRadius: 'inherit',
                            margin: '0'
                        });

                        thumbnail.appendChild(overlay);

                        const timeText = thumbnail.querySelector('.yt-badge-shape__text, .badge-shape-wiz__text, ytd-thumbnail-overlay-time-status-renderer #text');
                        if (timeText && timeText.textContent.trim() !== 'WATCHED') { // overwrite the timestamp text with "WATCHED"
                            timeText.textContent = 'WATCHED';
                        }
                    }
                }
            }
        });
    }

    processThumbnails();

    let debounceTimer;
    const observer = new MutationObserver(() => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            processThumbnails();
        }, 200);
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
