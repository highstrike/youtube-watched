/* globals jQuery */

// ==UserScript==
// @name         YouTube Watched
// @description  Marks unwatched youtube videos that have a watch progress bar as watched.
// @icon         https://raw.githubusercontent.com/highstrike/youtube-watched/master/icon.png
// @namespace    https://github.com/highstrike/youtube-watched
// @version      1.3
// @author       highstrike
// @license      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @require      https://code.jquery.com/jquery-2.2.4.min.js
// @match        *://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function($) { 'use strict';
    window.setInterval(function() {
        $('div#overlays.style-scope.ytd-thumbnail').each(function() {
            let self = $(this);

            // detect progress
            if(self.find('ytd-thumbnail-overlay-resume-playback-renderer').length > 0 && self.find('ytd-thumbnail-overlay-playback-status-renderer').length < 1) {
                self.prepend($('<ytd-thumbnail-overlay-playback-status-renderer>').addClass('style-scope ytd-thumbnail'));
            }

            // add watched overlay
            if(self.find('ytd-thumbnail-overlay-playback-status-renderer').length > 0 && self.find('div#watched-white-walker').length < 1) {
                self.prepend($('<div id="watched-white-walker">').css({
                    "position": "absolute",
                    "bottom": 0,
                    "left": 0,
                    "top": 0,
                    "right": 0,
                    "display": "flex",
                    "background": "rgba(197, 225, 229, .5)"
                }));

                self.find('ytd-thumbnail-overlay-time-status-renderer > span#text').text('WATCHED');
            }
        });
    }, 1000);
})(jQuery);
