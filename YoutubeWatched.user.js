// ==UserScript==
// @name         Youtube Watched
// @description  Mark unwatched youtube videos that have a watch progress bar as watched
// @icon         https://raw.githubusercontent.com/highstrike/youtube-watched/master/icon.png
// @namespace    https://github.com/highstrike/youtube-watched
// @version      3.0
// @author       Highstrike
// @license      GPL; http://www.gnu.org/licenses/gpl.html
// @require      https://code.jquery.com/jquery-2.2.4.min.js
// @match        https://www.youtube.com/feed/subscriptions
// @match        https://www.youtube.com/feed/subscriptions?flow=2
// @match        https://www.youtube.com/feed/subscriptions?flow=1
// @grant        none
// ==/UserScript==

(function() { 'use strict';
    $('div.yt-lockup-thumbnail.contains-percent-duration-watched').each(function(){
        var self = $(this);
        if(!self.hasClass('watched')) {
            self.addClass('watched');
            self.find('a:first').append('<div class="watched-badge">WATCHED</div>');
        }
    });
})();
