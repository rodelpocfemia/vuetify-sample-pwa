<template>
    <div class="container" id="app">
            <div class="form-group">
                <label>input::text</label>
                <input id="fullname" type="text" value=";) Hey! check :heart_eyes:  this.  :dog:  :cat:  :hamster: " class="form-control wdt-emoji-bundle-enabled wdt-emoji-open-on-colon">
            </div>
            <div class="wdt-emoji-popup">
                <a href="#" class="wdt-emoji-popup-mobile-closer"> × </a>
                <div class="wdt-emoji-menu-content">
                    <div id="wdt-emoji-menu-header">
                    <a class="wdt-emoji-tab active" data-group-name="Recent"></a>
                    <a class="wdt-emoji-tab" data-group-name="People"></a>
                    <a class="wdt-emoji-tab" data-group-name="Nature"></a>
                    <a class="wdt-emoji-tab" data-group-name="Foods"></a>
                    <a class="wdt-emoji-tab" data-group-name="Activity"></a>
                    <a class="wdt-emoji-tab" data-group-name="Places"></a>
                    <a class="wdt-emoji-tab" data-group-name="Objects"></a>
                    <a class="wdt-emoji-tab" data-group-name="Symbols"></a>
                    <a class="wdt-emoji-tab" data-group-name="Flags"></a>
                    <a class="wdt-emoji-tab" data-group-name="Custom"></a>
                    </div>
                    <div class="wdt-emoji-scroll-wrapper">
                    <div id="wdt-emoji-menu-items">
                        <input id="wdt-emoji-search" type="text" placeholder="Search">
                        <h3 id="wdt-emoji-search-result-title">Search Results</h3>
                        <div class="wdt-emoji-sections"></div>
                        <div id="wdt-emoji-no-result">No emoji found</div>
                    </div>
                    </div>
                    <div id="wdt-emoji-footer">
                    <div id="wdt-emoji-preview">
                        <span id="wdt-emoji-preview-img"></span>
                        <div id="wdt-emoji-preview-text">
                        <span id="wdt-emoji-preview-name"></span><br>
                        <span id="wdt-emoji-preview-aliases"></span>
                        </div>
                    </div>
                    <div id="wdt-emoji-preview-bundle">
                        <span>WDT Emoji Bundle</span>
                    </div>
                    </div>
                </div>
                </div>
    </div>
</template>
<script type="text/javascript" src="wdt-emoji-bundle/emoji.js"></script>
<script type="text/javascript" src="wdt-emoji-bundle/emoji.min.js"></script>
<script type="text/javascript" src="wdt-emoji-bundle/wdt-emoji-bundle.js"></script>

<script>
 
    export default {
        data() {
            return {}
        },
        mounted() {
           (function () {

                wdtEmojiBundle.defaults.emojiSheets = {
                    'apple'    : '../sheets/sheet_apple_64_indexed_128.png',
                    'google'   : '../sheets/sheet_google_64_indexed_128.png',
                    'twitter'  : '../sheets/sheet_twitter_64_indexed_128.png',
                    'emojione' : '../sheets/sheet_emojione_64_indexed_128.png',
                    'facebook' : '../sheets/sheet_facebook_64_indexed_128.png',
                    'messenger': '../sheets/sheet_messenger_64_indexed_128.png'
                };

                wdtEmojiBundle.init('.wdt-emoji-bundle-enabled');

                wdtEmojiBundle.on('afterSelect', function (a, b) {
                    console.log('afterSelect', a, b);
                });

                var typeChangers = document.querySelectorAll('.change-emoji-type');
                for (var i = 0; i < typeChangers.length; i++) {
                    typeChangers[i].addEventListener('click', function () {
                        wdtEmojiBundle.changeType(this.dataset.emojiType);
                        return false;
                    });
                }
                var ev = document.createEvent('Event');
                ev.initEvent('input', true, true);

                // ------------------------------------------------------
                document.getElementById('fullname').addEventListener('input', function () {
                    document.getElementById('fullname-output').innerHTML = wdtEmojiBundle.render(this.value);
                });
                document.getElementById('fullname').dispatchEvent(ev);
                // ------------------------------------------------------

                // ------------------------------------------------------
                document.getElementById('comment').addEventListener('input', function () {
                    document.getElementById('comment-output').innerHTML = wdtEmojiBundle.render(this.value);
                });
                document.getElementById('comment').dispatchEvent(ev);
                // ------------------------------------------------------

                document.getElementById('contenteditable').addEventListener('input', function () {
                    document.getElementById('contenteditable-output').innerHTML = wdtEmojiBundle.render(this.innerHTML);
                });
                document.getElementById('contenteditable').dispatchEvent(ev);

                document.getElementById('head-title').innerHTML  = wdtEmojiBundle.render(document.getElementById('head-title').innerHTML);
                document.querySelector('.todo-list').innerHTML   = wdtEmojiBundle.render(document.querySelector('.todo-list').innerHTML);
                document.querySelector('.bottom-text').innerHTML = wdtEmojiBundle.render(document.querySelector('.bottom-text').innerHTML);

            })();
        }
    }
</script>