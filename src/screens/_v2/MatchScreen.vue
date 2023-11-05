<script setup>
import {IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar} from "@ionic/vue";
import {locationOutline, optionsOutline, shuffleOutline} from 'ionicons/icons';
import {Swiper, SwiperSlide} from "swiper/vue";
import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';
import {onMounted, ref} from "vue";
import {Pagination} from "swiper";

const slides = ref([]);
const modules = ref([Pagination]);
const setSwiperInstance = (swiper) => {
    slides.value.push(swiper);
    console.log(slides.value);
}

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
        //$card.css("transform", "translateX("+ pullDeltaX +"px) rotate("+ deg +"deg)");
        $card.css("transform", "translateX("+ pullDeltaX +"px)");

        var opacity = pullDeltaX / 100;
        var rejectOpacity = (opacity >= 0) ? 0 : Math.abs(opacity);
        var likeOpacity = (opacity <= 0) ? 0 : opacity;
        $cardReject.css("opacity", rejectOpacity);
        $cardLike.css("opacity", likeOpacity);
    }

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
                    $(".swipe-card").removeClass("below");
                }
            }, 300);
        }

        if (Math.abs(pullDeltaX) < decisionVal) {
            $card.addClass("reset");
        }

        setTimeout(function() {
            $card.attr("style", "").removeClass("reset")
                .find(".swipe-card__choice").attr("style", "");

            pullDeltaX = 0;
            animating = false;
        }, 300);
    }

    $(document).on("mousedown touchstart", ".swipe-card:not(.inactive)", function(e) {
        if (animating) return;

        $card = $(this);
        $cardReject = $(".swipe-card__choice.m--reject", $card);
        $cardLike = $(".swipe-card__choice.m--like", $card);
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
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="secondary">
                <ion-button>
                    <ion-icon slot="icon-only" :icon="shuffleOutline"></ion-icon>
                </ion-button>
            </ion-buttons>
            <ion-buttons slot="primary">
                <ion-button>
                    <ion-icon slot="icon-only" :icon="optionsOutline"></ion-icon>
                </ion-button>
            </ion-buttons>
            <ion-title>Flamin<span class="highlighted">GO</span></ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <div class="swipe-cards-wrap">
            <div class="swipe-cards">
                <div class="swipe-card" v-for="index in 5" :key="index">
                    <div class="swipe-card__top">
                        <swiper class="swipe-card__slider" @swiper="setSwiperInstance" :pagination="true" :modules="modules">
                            <swiper-slide class="swipe-card__slider-item" :style="{ backgroundImage: `url(${require('@/assets/swipe-card-1.jpg')})` }"></swiper-slide>
                            <swiper-slide class="swipe-card__slider-item" :style="{ backgroundImage: `url(${require('@/assets/swipe-card-2.jpg')})` }"></swiper-slide>
                        </swiper>
                        <div class="swipe-card__tags">
                            <div class="swipe-card__tag">Музей</div>
                            <div class="swipe-card__tag">Выставка</div>
                        </div>
                        <div class="swipe-card__img-controls">
                            <div class="swipe-card__prev-img" @click="slides[index - 1].slidePrev()"></div>
                            <div class="swipe-card__next-img" @click="slides[index - 1].slideNext()"></div>
                        </div>
                    </div>
                    <div class="swipe-card__info">
                        <div class="swipe-card__title">Эрарта {{ index }}</div>
                        <div class="swipe-card__distance">
                            <ion-icon :icon="locationOutline"></ion-icon>
                            15 км от вас
                        </div>
                    </div>
                    <div class="swipe-card__choice m--reject"></div>
                    <div class="swipe-card__choice m--like"></div>
                </div>
            </div>
        </div>
    </ion-content>
</template>

<style scoped lang="scss">
.ion-page,
ion-header {
    background: #171717;
}

ion-toolbar {
    --background: transparent;
}
ion-toolbar ion-button {
    --color: #FFFFFF;
}
ion-title {
    --color: #FFFFFF;
    font-size: 24px;
}
ion-title .highlighted {
    color: var(--pink);
}

ion-content {
    --background: #171717;
    --overflow: hidden;
}

.swipe-cards-wrap {
    padding: 16px;
}
.swipe-cards {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
}
.swipe-card {
    background: #232323;
    max-height: 640px;
    border-radius: 15px;

    z-index: 2;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform-origin: 50% 100%;

    &__top {
        position: relative;
    }
    &__tags {
        position: absolute;
        bottom: 15px;
        left: 10px;
        display: flex;
        gap: 10px;
    }
    &__tag {
        background: var(--pink);
        font-size: 13px;
        font-weight: 600;
        color: #fff;
        border-radius: 10px;
        padding: 4px 10px;
    }
    &__slider-item {
        border-radius: 15px;
        height: 560px;
    }
    .swiper {
        border-radius: 15px;
    }
    &__img-controls {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    &__next-img,
    &__prev-img {
        width: 100%;
        height: 100%;
        z-index: 10;
    }
    &__next-img {

    }
    &__prev-img {

    }
    &__info {
        padding: 15px;
    }
    &__title {
        font-size: 18px;
        font-weight: 600;
        color: #fff;
        margin-bottom: 12px;
    }
    &__distance {
        font-size: 13px;
        color: #A2A2A2;
        display: flex;
        align-items: center;
        gap: 5px;
    }


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
        //transform: translateX(-30rem) rotate(-30deg) !important;
        transform: translateX(-30rem) !important;
    }

    &.to-right {
        //transform: translate(30rem) rotate(30deg) !important;
        transform: translate(30rem) !important;
    }

    &.below {
        z-index: 1;
    }

    &__choice {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        border-radius: 15px;

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
            border-radius: 15px;
        }

        &.m--reject {
            background: #ff6262;
        }
        &.m--like {
            background: #B1DA96;

            &:after {
                transform: scaleY(-1);
            }
        }
    }
}
</style>