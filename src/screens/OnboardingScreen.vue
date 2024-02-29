<template>
    <ion-page class="onboarding">
        <ion-content>
            <Swiper class="onboarding__slider" @swiper="setSwiperInstance" :allowTouchMove="false" @slidesLengthChange="onSlidesChange">
                <swiper-slide class="onboarding__slide" :style="{ backgroundImage: `url(${onboardingPink})` }">
                    <div class="onboarding__content">
                        <div class="h1 text-center">Знакомьтесь, Flamin<span class="color-pink">GO</span></div>
                        <div class="onboarding__text">
                            <p>Здесь ты найдёшь множество интересных мест, маршрутов и событий.</p>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="onboarding__slide" :style="{ backgroundImage: `url(${onboarding1})` }">
                    <div class="onboarding__content">
                        <div class="h1 text-center">Актуальные события</div>
                        <div class="onboarding__text">
                            <p>И просто блог об интересных местах, который обязательно стоит посетить!</p>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="onboarding__slide" :style="{ backgroundImage: `url(${onboarding2})` }">
                    <div class="onboarding__content">
                        <div class="h1 text-center">Пешеходные квесты</div>
                        <div class="onboarding__text">
                            <p>Здесь я придумаю какой-то текст, который в двух словах расскажет об этом направлении</p>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="onboarding__slide" :style="{ backgroundImage: `url(${onboarding3})` }">
                    <div class="onboarding__content">
                        <div class="h1 text-center">Каталог мест</div>
                        <div class="onboarding__text">
                            <p>Здесь я придумаю какой-то текст, который в двух словах расскажет об этом направлении</p>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="onboarding__slide" :style="{ backgroundImage: `url(${onboardingBlue})` }">
                    <div class="onboarding__content">
                        <div class="h1 text-center">Выходи гулять!</div>
                        <div class="onboarding__text">
                            <p>Здесь я придумаю какой-то текст, который в двух словах расскажет об этом направлении</p>
                        </div>
                    </div>
                </swiper-slide>
            </Swiper>
            <div class="onboarding__controls" v-if="swiper">
                <div>
                    <ion-button fill="clear" color="light" size="small" @click="skip" v-if="activeSlide === 1">Пропустить</ion-button>
                    <ion-button fill="clear" color="light" size="small" @click="prev" v-else>Назад</ion-button>
                </div>
                <div>
                    <div v-if="activeSlide < totalSlides" class="onboarding__next-wrap">
                        <span>{{ activeSlide }}/{{ totalSlides }}</span>
                        <ion-button shape="circle" color="primary" @click="next" >
                            <ion-icon aria-hidden="true" slot="icon-only" :icon="chevronForward" />
                        </ion-button>
                    </div>
                    <ion-button color="primary" @click="next" v-else>
                        Начать
                        <ion-icon aria-hidden="true" slot="end" :icon="chevronForward" />
                    </ion-button>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import {IonButton, IonContent, IonIcon, IonPage, useIonRouter} from "@ionic/vue";
import {Swiper, SwiperSlide} from "swiper/vue";
import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';
import {chevronForward} from "ionicons/icons";
import {useMainStore} from "@/store";
import storage from "@/plugins/storage";
import {ref} from "vue";
import onboardingPink from "@/assets/onboarding-pink.png";
import onboardingBlue from "@/assets/onboarding-blue.png";
import onboarding1 from "@/assets/onboarding1.png";
import onboarding2 from "@/assets/onboarding1.png";
import onboarding3 from "@/assets/onboarding1.png";
import {Swiper as _Swiper} from 'swiper/types';

const ionRouter = useIonRouter();

const swiper = ref<_Swiper>()
const activeSlide = ref(1)
const totalSlides = ref(0)

function setSwiperInstance(instance: _Swiper) {
    swiper.value = instance;
}

function onSlidesChange(instance: _Swiper) {
    totalSlides.value = instance ? instance.slides.length : 0;
}

function next() {
    if (activeSlide.value === totalSlides.value) {
        skip();
    }

    swiper.value!.slideNext();
    activeSlide.value = swiper.value!.activeIndex + 1;
}

function prev() {
    swiper.value!.slidePrev();
    activeSlide.value = swiper.value!.activeIndex + 1;
}

async function skip() {
    const mainStore = useMainStore();
    mainStore.onBoardingComplete = true;
    await storage.set('onboarding', '1');
    ionRouter.navigate({ name: 'login' }, 'forward', 'replace');
}
</script>

<style lang="scss" scoped>
.onboarding {

    ion-content {
        --overflow: hidden;
    }

    &__slider {
        height: 100vh;
    }

    &__slide {
        background-repeat: no-repeat;
    }

    &__content {
        background: #FFFFFF;
        color: var(--black);
        border-radius: 25px 25px 0 0;
        position: fixed;
        bottom: 0;
        left: 0;
        min-height: 330px;
        padding: 20px;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    &__text {
        text-align: center;
        max-width: 256px;
        margin: 0 auto;
        flex-grow: 1;
    }

    &__controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        bottom: 30px;
        width: 100%;
        z-index: 10;
        padding: 0 20px;

        ion-button[shape=circle] {
            --border-radius: 50%;
            width: 50px;
            height: 50px;

            ion-icon {
                font-size: 32px;
                width: 32px;
                height: 32px;
            }
        }
        ion-button[fill=clear] {
            opacity: .5;
        }
    }

    &__next-wrap {
        display: flex;
        align-items: center;
        gap: 10px;
    }
}
</style>
