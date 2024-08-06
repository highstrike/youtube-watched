// ==UserScript==
// @name         YouTube Watched
// @namespace    https://github.com/highstrike
// @homepageURL  https://github.com/highstrike/youtube-watched
// @description  Marks unwatched youtube videos that have a watch progress bar as watched.
// @icon         https://raw.githubusercontent.com/highstrike/youtube-watched/master/icon.png
// @author       highstrike
// @match        *://www.youtube.com/*
// @grant        none
// @version      3.0.0
// @copyright    2022, highstrike (https://openuserjs.org/users/highstrike)
// @license      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @updateURL    https://openuserjs.org/meta/highstrike/YouTube_Watched.meta.js
// @downloadURL  https://openuserjs.org/install/highstrike/YouTube_Watched.user.js
// ==/UserScript==

setInterval(() => {
    document.querySelectorAll('div#overlays.style-scope.ytd-thumbnail').forEach((e) => {
        // detect progress
        if (e.querySelector('ytd-thumbnail-overlay-resume-playback-renderer') && !e.querySelector('ytd-thumbnail-overlay-playback-status-renderer')) {
            const playback = document.createElement('ytd-thumbnail-overlay-playback-status-renderer');
            playback.classList.add('style-scope', 'ytd-thumbnail');
            e.prepend(playback);
        }

        // add watched overlay
        if (e.querySelector('ytd-thumbnail-overlay-playback-status-renderer') && !e.querySelector('div#watched-white-walker')) {
            const overlay = document.createElement('div');
            overlay.id = 'watched-white-walker';
            Object.assign(overlay.style, {
                position: 'absolute',
                bottom: 0,
                left: 0,
                top: 0,
                right: 0,
                display: 'flex',
                background: 'rgba(197, 225, 229, .5)'
            });
            e.prepend(overlay);

            // overwrite time
            const time = e.querySelector('ytd-thumbnail-overlay-time-status-renderer > div > badge-shape > div');
            if (time) {
                time.textContent = 'WATCHED';
            }
        }
    });
}, 1000);
