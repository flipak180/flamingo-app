<script setup>
import {onMounted} from "vue";

onMounted(() => {
    var animating = false;
    var cardsCounter = 0;
    var numOfCards = 6;
    var decisionVal = 80;
    var pullDeltaX = 0;
    var deg = 0;
    var $card, $cardReject, $cardLike;

    function pullChange() {
        animating = true;
        deg = pullDeltaX / 10;
        $card.css("transform", "translateX("+ pullDeltaX +"px) rotate("+ deg +"deg)");

        var opacity = pullDeltaX / 100;
        var rejectOpacity = (opacity >= 0) ? 0 : Math.abs(opacity);
        var likeOpacity = (opacity <= 0) ? 0 : opacity;
        $cardReject.css("opacity", rejectOpacity);
        $cardLike.css("opacity", likeOpacity);
    };

    function release() {

        if (pullDeltaX >= decisionVal) {
            $card.addClass("to-right");
        } else if (pullDeltaX <= -decisionVal) {
            $card.addClass("to-left");
        }

        if (Math.abs(pullDeltaX) >= decisionVal) {
            $card.addClass("inactive");

            setTimeout(function() {
                $card.addClass("below").removeClass("inactive to-left to-right");
                cardsCounter++;
                if (cardsCounter === numOfCards) {
                    cardsCounter = 0;
                    $(".demo__card").removeClass("below");
                }
            }, 300);
        }

        if (Math.abs(pullDeltaX) < decisionVal) {
            $card.addClass("reset");
        }

        setTimeout(function() {
            $card.attr("style", "").removeClass("reset")
                .find(".demo__card__choice").attr("style", "");

            pullDeltaX = 0;
            animating = false;
        }, 300);
    };

    $(document).on("mousedown touchstart", ".demo__card:not(.inactive)", function(e) {
        if (animating) return;

        $card = $(this);
        $cardReject = $(".demo__card__choice.m--reject", $card);
        $cardLike = $(".demo__card__choice.m--like", $card);
        var startX =  e.pageX || e.originalEvent.touches[0].pageX;

        $(document).on("mousemove touchmove", function(e) {
            var x = e.pageX || e.originalEvent.touches[0].pageX;
            pullDeltaX = (x - startX);
            if (!pullDeltaX) return;
            pullChange();
        });

        $(document).on("mouseup touchend", function() {
            $(document).off("mousemove touchmove mouseup touchend");
            if (!pullDeltaX) return; // prevents from rapid click events
            release();
        });
    });
})
</script>

<template>
    <div class="demo">
        <header class="demo__header"></header>
        <div class="demo__content">
            <div class="demo__card-cont">
                <div class="demo__card">
                    <div class="demo__card__top brown">
                        <div class="demo__card__img"></div>
                        <p class="demo__card__name">Hungry cat 6</p>
                    </div>
                    <div class="demo__card__btm">
                        <p class="demo__card__we">Whatever</p>
                    </div>
                    <div class="demo__card__choice m--reject"></div>
                    <div class="demo__card__choice m--like"></div>
                    <div class="demo__card__drag"></div>
                </div>
                <div class="demo__card">
                    <div class="demo__card__top lime">
                        <div class="demo__card__img"></div>
                        <p class="demo__card__name">Hungry cat 5</p>
                    </div>
                    <div class="demo__card__btm">
                        <p class="demo__card__we">Whatever</p>
                    </div>
                    <div class="demo__card__choice m--reject"></div>
                    <div class="demo__card__choice m--like"></div>
                    <div class="demo__card__drag"></div>
                </div>
                <div class="demo__card">
                    <div class="demo__card__top cyan">
                        <div class="demo__card__img"></div>
                        <p class="demo__card__name">Hungry cat 4</p>
                    </div>
                    <div class="demo__card__btm">
                        <p class="demo__card__we">Whatever</p>
                    </div>
                    <div class="demo__card__choice m--reject"></div>
                    <div class="demo__card__choice m--like"></div>
                    <div class="demo__card__drag"></div>
                </div>
                <div class="demo__card">
                    <div class="demo__card__top indigo">
                        <div class="demo__card__img"></div>
                        <p class="demo__card__name">Hungry cat 3</p>
                    </div>
                    <div class="demo__card__btm">
                        <p class="demo__card__we">Whatever</p>
                    </div>
                    <div class="demo__card__choice m--reject"></div>
                    <div class="demo__card__choice m--like"></div>
                    <div class="demo__card__drag"></div>
                </div>
                <div class="demo__card">
                    <div class="demo__card__top blue">
                        <div class="demo__card__img"></div>
                        <p class="demo__card__name">Hungry cat 2</p>
                    </div>
                    <div class="demo__card__btm">
                        <p class="demo__card__we">Whatever</p>
                    </div>
                    <div class="demo__card__choice m--reject"></div>
                    <div class="demo__card__choice m--like"></div>
                    <div class="demo__card__drag"></div>
                </div>
                <div class="demo__card">
                    <div class="demo__card__top purple">
                        <div class="demo__card__img"></div>
                        <p class="demo__card__name">Hungry cat</p>
                    </div>
                    <div class="demo__card__btm">
                        <p class="demo__card__we">Whatever</p>
                    </div>
                    <div class="demo__card__choice m--reject"></div>
                    <div class="demo__card__choice m--like"></div>
                    <div class="demo__card__drag"></div>
                </div>
            </div>
            <p class="demo__tip">Swipe left or right</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
$w: 30.6rem;
$h: 54rem;
$headerH: 6rem;
$cardW: 24rem;
$cardH: 32rem;
$cardTopH: 20.5rem;
$cardBtmH: $cardH - $cardTopH;
$imgSize: 10rem;

$purple: #7132B9;
$blue: #248CB6;
$indigo: #303F9F;
$cyan: #26C6DA;
$lime: #AFB42B;
$brown: #795548;

$orange: #FF945A;
$green: #B1DA96;

.demo {
    position: absolute;
    left: 50%;
    top: 50%;
    width: $w;
    height: $h;
    margin-left: $w/-2;
    margin-top: $h/-2;
    background: #F6F6F5;
    box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.2);

    &__header {
        height: $headerH;
        background: #002942;
    }

    &__content {
        overflow: hidden;
        position: relative;
        height: $h - $headerH;
        padding-top: 4.5rem;
        user-select: none;
    }

    &__card-cont {
        position: relative;
        width: $cardW;
        height: $cardH;
        margin: 0 auto 5rem;
    }

    &__card {
        z-index: 2;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transform-origin: 50% 100%;

        &.reset {
            transition: transform 0.3s;
            transform: translateX(0) !important;

            .demo__card__choice {
                transition: opacity 0.3s;
                opacity: 0 !important;;
            }
        }

        &.inactive {
            transition: transform 0.3s;
        }

        &.to-left {
            transform: translateX(-30rem) rotate(-30deg) !important;
        }

        &.to-right {
            transform: translate(30rem) rotate(30deg) !important;
        }

        &.below {
            z-index: 1;
        }

        &__top {
            height: $cardTopH;
            padding-top: 4rem;

            &.purple {
                background: $purple;
            }
            &.blue {
                background: $blue;
            }
            &.indigo {
                background: $indigo;
            }
            &.cyan {
                background: $cyan;
            }
            &.lime {
                background: $lime;
            }
            &.brown {
                background: $brown;
            }
        }

        &__img {
            overflow: hidden;
            width: $imgSize;
            height: $imgSize;
            margin: 0 auto 1.5rem;
            border-radius: 50%;
            border: 0.5rem solid #ffffff;
            background-size: cover;
        }

        &__name {
            text-align: center;
            font-size: 2rem;
            font-weight: bold;
            color: #fff;
        }

        &__btm {
            height: $cardBtmH;
            background: #FFFFFF;
        }

        &__we {
            text-align: center;
            font-size: 2.2rem;
            line-height: $cardBtmH;
        }

        &__choice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0;

            &:before {
                content: "";
                position: absolute;
                left: 50%;
                top: 50%;
                width: 2rem;
                height: 2rem;
                margin-left: -1rem;
                color: #fff;
                border-radius: 50%;
                box-shadow: -2rem -3rem #fff, 2rem -3rem #fff;
            }

            &:after {
                content: "";
                position: absolute;
                left: 50%;
                top: 50%;
                width: 4rem;
                height: 1.5rem;
                margin-left: -2rem;
                border: 0.6rem solid #fff;
                border-bottom: none;
                border-top-left-radius: 1.5rem;
                border-top-right-radius: 1.5rem;
            }

            &.m--reject {
                background: $orange;
            }
            &.m--like {
                background: $green;

                &:after {
                    transform: scaleY(-1);
                }
            }
        }

        &__drag {
            z-index: 5;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            cursor: grab;
        }
    }

    &__tip {
        text-align: center;
        font-size: 2.2rem;
    }
}
</style>
