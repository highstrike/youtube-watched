// ==UserScript==
// @name         Youtube Watched
// @description  Mark unwatched youtube videos that have a watch progress bar as watched
// @icon         https://raw.githubusercontent.com/highstrike/youtube-watched/master/icon.png
// @namespace    https://github.com/highstrike/youtube-watched
// @version      4.2
// @author       Highstrike
// @license      GPL-3.0+; http://www.gnu.org/licenses/gpl.html
// @require      https://code.jquery.com/jquery-2.2.4.min.js
// @match        *://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() { 'use strict';
    window.setInterval(function() {
        $('div#overlays.style-scope.ytd-thumbnail').each(function(){
            var self = $(this);
            if(self.find('ytd-thumbnail-overlay-resume-playback-renderer').length > 0 && self.find('ytd-thumbnail-overlay-playback-status-renderer').length < 1) {
                var y = $('<yt-formatted-string>').addClass('style-scope ytd-thumbnail-overlay-playback-status-renderer').html('WATCHED'),
                    z = $('<ytd-thumbnail-overlay-playback-status-renderer>').addClass('style-scope ytd-thumbnail').append(y);
                self.prepend(z);
            }
            if(self.find('ytd-thumbnail-overlay-playback-status-renderer').length > 0 && self.find('div#watched-white-walker').length < 1)
                self.prepend('<div id="watched-white-walker" style="position: absolute; bottom: 0; left: 0; top: 0; right: 0; display: flex; background: rgba(197, 225, 229, .5);"></div>');
        });
    }, 1000);
})();
