// ==UserScript==
// @name         YouTube Watched
// @namespace    https://github.com/highstrike
// @homepageURL  https://github.com/highstrike/youtube-watched
// @description  Marks unwatched youtube videos that have a watch progress bar as watched (70%+ threshold).
// @icon         https://raw.githubusercontent.com/highstrike/youtube-watched/master/icon.png
// @author       highstrike
// @match        *://www.youtube.com/*
// @grant        none
// @version      4.1.0
// @copyright    2026, highstrike (https://openuserjs.org/users/highstrike)
// @license      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @updateURL    https://openuserjs.org/meta/highstrike/YouTube_Watched.meta.js
// @downloadURL  https://openuserjs.org/install/highstrike/YouTube_Watched.user.js
// ==/UserScript==

/*
 * ==========================================
 * CHANGELOG
 * ==========================================
 * v4.0.0 (2026-02-16)
 * - Added: Smart Threshold Detection (requires 70%+ watched to trigger).
 * - Changed: Full compatibility with YouTube's new 'view-model' grid UI.
 * - Changed: Maintained legacy UI support & stopped injecting fake DOM elements.
 * - Performance: Replaced interval loop with a debounced MutationObserver.
 * - Fixed: Overlay blocking video clicks (pointer-events) and matched rounded corners.
 *
 * v3.0.0 (2024-08-06)
 * - Changed: Completely rewrote in Vanilla JS (removed jQuery dependency).
 * - Changed: Updated timestamp selectors for YouTube's 'badge-shape' update.
 *
 * v2.0.0 (2024-03-09)
 * - Added: OpenUserJS publishing metadata, update URLs, and copyright info.
 * - Changed: Cleaned up namespace to point to GitHub profile.
 *
 * v1.0.0 (2022-04-25)
 * - Initial Release: Detects red progress bar and applies "WATCHED" overlay.
 * ==========================================
 */
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
                            borderRadius: '10px',
                            margin: '0'
                        });

                        thumbnail.appendChild(overlay);

                        const timeText = thumbnail.querySelector('.yt-badge-shape__text, .badge-shape-wiz__text, ytd-thumbnail-overlay-time-status-renderer #text');
                        if (timeText && timeText.textContent.trim() !== 'WATCHED') { // overwrite the timestamp text
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

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
