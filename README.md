# YouTube Watched

Userscript that marks unwatched youtube videos that have a watch progress bar as watched (70%+ threshold).

![Screenshot showing a YouTube thumbnail with a blue overlay and WATCHED badge](screenshot.png)

The script is published on OpenUserJS at: https://openuserjs.org/scripts/highstrike/YouTube_Watched.

## Installation

- Install the [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/) extension for your browser.
- **Option 1 (OpenUserJS):** Visit https://openuserjs.org/scripts/highstrike/YouTube_Watched and hit the Install button.
- **Option 2 (GitHub):** Click [here to install directly from the raw source](https://github.com/highstrike/youtube-watched/raw/refs/heads/master/YouTubeWatched.user.js).

## Changelog

### v4.0.0 (2026-02-16)
**Added**
* **Smart Threshold Detection:** The script now reads the actual progress bar width. Videos will only be marked as `WATCHED` if you have watched 70% or more of the video, preventing briefly previewed videos from being marked.

**Changed**
* **Major UI Overhaul Compatibility:** Completely rewrote the core DOM selectors to support YouTube's massive new `yt-*view-model` grid layout update.
* **Legacy Support:** Maintained backward compatibility for users in regions where the older YouTube layout is still active.
* **Cleaner DOM:** Stopped injecting fake playback-status renderer elements into YouTube's DOM, relying purely on visual overlays instead.

**Performance**
* **Zero-Lag Scrolling:** Replaced the old 1-second interval loop with a debounced `MutationObserver`. The script now idles gracefully and only runs when YouTube actively injects new thumbnails, drastically reducing CPU usage.

**Fixed**
* **Click-Through Bug:** Added `pointer-events: none` to the visual overlay so it no longer accidentally blocks you from clicking the video underneath it.
* **Styling:** Added `border-radius: 10px` to seamlessly match YouTube's newer rounded-corner design.

---

### v3.0.0 (2024-08-06)
**Changed**
* **Vanilla JavaScript Rewrite:** Completely rewrote the script in pure Vanilla JavaScript.
* **Timestamp Selector Update:** Updated the time text selector to target YouTube's new `badge-shape` DOM structure so the "WATCHED" text applies correctly.

**Removed**
* **jQuery Dependency:** Dropped the external jQuery requirement, making the script lighter, faster, and more secure.

---

### v2.0.0 (2024-03-09)
**Added**
* **Publishing Metadata:** Added `@homepageURL`, `@updateURL`, and `@downloadURL` tags to support automatic updates and easier installation via OpenUserJS.
* **Copyright Info:** Added official copyright and OpenUserJS profile links.

**Changed**
* **Namespace:** Cleaned up the `@namespace` tag to point directly to the GitHub profile.

---

### v1.0.0 (2022-04-25)
* **Initial Release:** Automatically detects the red YouTube progress bar and applies a light blue overlay with "WATCHED" text over the video duration badge.
