<script setup>
import {onMounted} from "vue";

var 	_originalY,
    _transitionDurations = {};

$(document).ready(function() {

    // expand item
    $('body').on('click', '.item:not(.active)', function() {
        $('.app-wrap').addClass('noscroll');

        _originalY = parseInt($(this).css('top'));

        var _timeFactor = (_originalY - $('.app-wrap').scrollTop()) / 667 + 1; // is a responsive enviroment window's height should not be fixed
        _transitionDurations['0.1'] = 0.1 * _timeFactor;
        _transitionDurations['0.225'] = 0.225 * _timeFactor;
        _transitionDurations['0.3'] = 0.3 * _timeFactor;

        var _classes = 'active';

        var _css = {
            'top': $('.app-wrap').scrollTop(),
            'transition': 'top ' + _transitionDurations['0.225'] + 's, width ' + _transitionDurations['0.3'] + 's, height ' + _transitionDurations['0.3'] + 's'
        };

        if ($('.app-wrap').scrollTop() < _originalY) {
            _classes += ' bounce';
            _css['animation-duration'] = _transitionDurations['0.3'] + 's';
        }

        $(this).addClass(_classes);
        $(this).css(_css);
        $(this).find('.item-content').css('transition-delay', _transitionDurations['0.3'] + 's');
    })

    // collapse item
    $('body').on('click', '.item .close', function() {
        $(this).siblings('.item-content').removeAttr('style');

        var _css = {
            'top': 					_originalY,
            'transition': 			'top ' + _transitionDurations['0.225'] + 's, width ' + _transitionDurations['0.1'] + 's, height ' + _transitionDurations['0.1'] + 's',
            'animation-duration': 	_transitionDurations['0.225'] + 's',
        };
        $('.item.active').removeClass('active').addClass('collapsing').css(_css);

        $('.app-wrap').removeClass('noscroll');

        setTimeout(function() {
            $('.item.collapsing').removeClass('collapsing bounce').css({
                'transition': '',
                'animation-duration': '',
            });
        }, _transitionDurations['0.3']*1000);
    })

    // touchstart mousedown animation
    $('body').on('touchstart mousedown', '.item:not(.active)', function(){
        $(this).addClass('start');
    });

    $('body').on('touchend mouseup', '.item:not(.active)', function(){
        $(this).removeClass('start');
    });

})

$(window).on('load', () => {
    console.log(321);
    init();
})

onMounted(() => {
    console.log(123);
    init();
})

const init = () => {
    // set items' initial position and container's height (should be called also on resize in a responsive enviroment)
    setTimeout(() => {
        var _top = 32;
        $('.item').each(function(i, el) {
            $(el).css('top', _top);
            console.log($(el).outerHeight());
            _top += $(el).outerHeight() + 16;
        })
        $('.app-container').css('height', _top + 16);
    }, 1000)
}
</script>

<template>
    <div class="app-wrap">
        <div class="app-container">

            <div class="item">
                <div class="close">
                    ×
                </div>
                <div class="item-title">
                    <h4>Wafting zephyrs</h4>
                    <h3>The quick fox</h3>
                </div>
                <div class="item-image">
                    <img src="https://imgur.com/gwi3Vcj.jpg">
                </div>
                <div class="item-content">
                    <p><strong>The quick, brown fox jumps over a lazy dog.</strong></p>
                    <p> DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz. Quick, Baz, get my woven flax jodhpurs! "Now fax quiz Jack!" my brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk. A very bad quack might jinx zippy fowls. Few quips galvanized the mock jury box. Quick brown dogs jump over the lazy fox. The jay, pig, fox, zebra, and my wolves quack! Blowzy red vixens fight for a quick jump. Joaquin Phoenix was gazed by MTV for luck. A wizard’s job is to vex chumps quickly in fog. Watch "Jeopardy!", Alex Trebek's fun TV quiz game. Woven silk pyjamas exchanged for blue quartz. Brawny gods just</p>
                </div>
            </div>

            <div class="item">
                <div class="close">
                    ×
                </div>
                <div class="item-title absolute">
                    <h4>Have a pick</h4>
                    <h3>Twenty cars</h3>
                </div>
                <div class="item-image">
                    <img src="https://imgur.com/WG1rYGh.jpg">
                </div>
                <div class="item-content">
                    <h2>Woven silk pyjamas exchanged for blue quartz.</h2>
                    <p> DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz. Quick, Baz, get my woven flax jodhpurs! "Now fax quiz Jack!" my brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk. A very bad quack might jinx zippy fowls. Few quips galvanized the mock jury box. Quick brown dogs jump over the lazy fox. The jay, pig, fox, zebra, and my wolves quack! Blowzy red vixens fight for a quick jump. Joaquin Phoenix was gazed by MTV for luck. A wizard’s job is to vex chumps quickly in fog. Watch "Jeopardy!", Alex Trebek's fun TV quiz game. Woven silk pyjamas exchanged for blue quartz. Brawny gods just</p>
                </div>
            </div>

            <div class="item">
                <div class="close">
                    ×
                </div>
                <div class="item-image">
                    <img src="https://imgur.com/uGNrCJ5.jpg">
                </div>
                <div class="item-title">
                    <h4>A wizard’s job</h4>
                    <h3>The brave ghost</h3>
                </div>
                <div class="item-content">
                    <p><strong>The quick, brown fox jumps over a lazy dog.</strong></p>
                    <p> DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz. Quick, Baz, get my woven flax jodhpurs! "Now fax quiz Jack!" my brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk. A very bad quack might jinx zippy fowls. Few quips galvanized the mock jury box. Quick brown dogs jump over the lazy fox. The jay, pig, fox, zebra, and my wolves quack! Blowzy red vixens fight for a quick jump. Joaquin Phoenix was gazed by MTV for luck. A wizard’s job is to vex chumps quickly in fog. Watch "Jeopardy!", Alex Trebek's fun TV quiz game. Woven silk pyjamas exchanged for blue quartz. Brawny gods just</p>
                </div>
            </div>

            <div class="item">
                <div class="close">
                    ×
                </div>
                <div class="item-title absolute">
                    <h4>How to waltz</h4>
                    <h3>Quiz game</h3>
                </div>
                <div class="item-image">
                    <img src="https://imgur.com/H89rbI3.jpg">
                </div>
                <div class="item-content">
                    <h2>Woven silk pyjamas exchanged for blue quartz.</h2>
                    <p> DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz. Quick, Baz, get my woven flax jodhpurs! "Now fax quiz Jack!" my brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk. A very bad quack might jinx zippy fowls. Few quips galvanized the mock jury box. Quick brown dogs jump over the lazy fox. The jay, pig, fox, zebra, and my wolves quack! Blowzy red vixens fight for a quick jump. Joaquin Phoenix was gazed by MTV for luck. A wizard’s job is to vex chumps quickly in fog. Watch "Jeopardy!", Alex Trebek's fun TV quiz game. Woven silk pyjamas exchanged for blue quartz. Brawny gods just</p>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
@keyframes item-start {
    0%   { transform: translate3d(-50%,0,0) scale(1); }
    100%  { transform: translate3d(-50%,0,0) scale(0.96); }
}

@keyframes item-bounce {
    0% { margin-top: 0 }
    75% { margin-top: -24px }
    100% { margin-top: 0 }
}

@keyframes item-collapse {
    0% { margin-top: 0 }
    75% { margin-top: 24px }
    100% { margin-top: 0 }
}

.app-wrap,
.item.active {
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.app-wrap::-webkit-scrollbar,
.item.active::-webkit-scrollbar {
    display: none;
}

.app-wrap {
    height: 100vh;
    overflow: scroll;
    background-color: #fff;
}

.app-wrap.noscroll {
    overflow: hidden;
}

.app-container {
    position: relative;
    padding: 32px;
    box-sizing: border-box;
}

.item {
    position: absolute;
    left: 50%;
    width: calc(100% - 64px);
    border-radius: 10px;
    overflow: hidden;
    transition: all 1s;
    background-color: #fff;
    transform: translate3d(-50%,0,0);
    transition: top .225s, width .1s, height .1s;
    box-shadow: 0 8px 40px -4px rgba(0,0,0,0.14);
}

.close {
    position: absolute;
    top: 64px;
    right: 24px;
    width: 24px;
    height: 24px;
    line-height: 24px;
    border-radius: 50%;
    font-size: 1.6em;
    text-align: center;
    color: #fff;
    background-color: rgba(0,0,0,0.7);
    z-index: 1;
    opacity: 0;
    visibility: hidden;
    z-index: 3;
    cursor: pointer;
}

.item-title {
    max-width: 311px; /* prevent line-breaks from changing (.item collapsed size) */
    padding: 24px 72px 24px 24px;
    box-sizing: border-box;
}

.item-title.absolute {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    color: #fff;
    z-index: 2;
}

.item-image {
    position: relative;
    /*height: 100%;*/
    height: 240px;
    overflow: hidden;
}

.item-image img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 375px; /* 100vh */
    height: auto;
    transform: translate3d(-50%,-50%,0);
}

.item-content {
    height: 0;
    opacity: 0;
    overflow: hidden;
    padding: 0;
    font-size: 0.94em;
    line-height: 1.5;
}

.item.start {
    animation: item-start .2s forwards;
}

.item.active {
    overflow: scroll;
    z-index: 1;
    width: 100%;
    height: 100vh;
    transition: top .225s, width .3s, height .3s;
}

.item.active.bounce {
    animation: item-bounce .3s forwards;
}

.item.collapsing.bounce {
    animation: item-collapse .3s forwards;
}

.item.active .close {
    opacity: 1;
    visibility: visible;
}

.item.active .item-content {
    height: auto;
    overflow: auto;
    opacity: 1;
    transition: opacity .1s;
    padding: 32px 24px;
}

.item.active .item-title + .item-content {
    padding-top: 8px;
}

/* typography */
h1,h2,h3,h4,h5,h6 {
    margin: 0 auto .8em;
}
.item h4 {
    font-size: 0.8em;
    font-weight: 700;
    text-transform: uppercase;
    color: #808080;
    margin-bottom: 0.2em;
}
.item-title.absolute h4 {
    color: #fff;
    opacity: 0.72;
}
.item h3 {
    font-size: 1.6em;
    font-weight: 700;
    margin-bottom: 0;
}
.item-content p {
    margin-top: 0;
    color: #808080;
}
.item-content p:last-child {
    margin-bottom: 0;
}
.item-content strong {
    color: #000;
}
</style>
