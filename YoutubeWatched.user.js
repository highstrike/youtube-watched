// ==UserScript==
// @name         Youtube Watched
// @description  Mark unwatched youtube videos that have a watch progress bar as watched
// @namespace    https://github.com/highstrike/youtube-watched
// @icon         https://raw.githubusercontent.com/highstrike/youtube-watched/master/icon.png
// @version      1.0
// @author       Highstrike
// @license      GPL; http://www.gnu.org/licenses/gpl.html
// @require      https://code.jquery.com/jquery-2.2.4.min.js
// @match        https://www.youtube.com/feed/subscriptions?flow=2
// @grant        none
// ==/UserScript==

(function() { 'use strict';
    $('div#browse-items-primary > ol > li').each(function(){
        var self = $(this),
            x = self.find('span.resume-playback-background'),
            y = x.closest('div.yt-lockup-thumbnail'),
            z = y.find('a:first');

        y.addClass('watched');
        if(!z.find('div.watched-badge').length > 0)
            z.append('<div class="watched-badge">WATCHED</div>');
    });
})();
