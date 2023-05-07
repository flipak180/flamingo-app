<template>
    <ion-page class="onboarding">
        <ion-content>
            <swiper class="onboarding__slider" @swiper="onSwiper" :allowTouchMove="false" @slidesLengthChange="onSlidesChange">
                <swiper-slide class="onboarding__slide" :style="{ backgroundImage: `url(${require('@/assets/onboarding-pink.png')})` }">
                    <div class="onboarding__content">
                        <div class="h1 text-center">Знакомьтесь, Flamin<span class="color-pink">GO</span></div>
                        <div class="onboarding__text">
                            <p>Здесь я придумаю какой-то текст, который в двух словах расскажет об этом направлении</p>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="onboarding__slide" :style="{ backgroundImage: `url(${require('@/assets/onboarding1.png')})` }">
                    <div class="onboarding__content">
                        <div class="h1 text-center">Парки</div>
                        <div class="onboarding__text">
                            <p>Здесь я придумаю какой-то текст, который в двух словах расскажет об этом направлении</p>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="onboarding__slide" :style="{ backgroundImage: `url(${require('@/assets/onboarding2.png')})` }">
                    <div class="onboarding__content">
                        <div class="h1 text-center">Достопримечательности</div>
                        <div class="onboarding__text">
                            <p>Здесь я придумаю какой-то текст, который в двух словах расскажет об этом направлении</p>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="onboarding__slide" :style="{ backgroundImage: `url(${require('@/assets/onboarding3.png')})` }">
                    <div class="onboarding__content">
                        <div class="h1 text-center">Рестораны, кафе, бары</div>
                        <div class="onboarding__text">
                            <p>Здесь я придумаю какой-то текст, который в двух словах расскажет об этом направлении</p>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="onboarding__slide" :style="{ backgroundImage: `url(${require('@/assets/onboarding-blue.png')})` }">
                    <div class="onboarding__content">
                        <div class="h1 text-center">Выходи гулять!</div>
                        <div class="onboarding__text">
                            <p>Здесь я придумаю какой-то текст, который в двух словах расскажет об этом направлении</p>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
            <div class="onboarding__controls" v-if="swiper">
                <div>
                    <ion-button fill="clear" color="dark" size="small" @click="skip" v-if="activeSlide === 1">Пропустить</ion-button>
                    <ion-button fill="clear" color="dark" size="small" @click="prev" v-else>Назад</ion-button>
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

<script>
import {IonButton, IonContent, IonIcon, IonPage, useIonRouter} from "@ionic/vue";
import {Swiper, SwiperSlide} from "swiper/vue";
import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';
import {chevronForward} from "ionicons/icons";
import {useMainStore} from "@/store";
import storage from "@/plugins/storage";

export default {
    name: "OnboardingScreen",
    components: { IonPage, IonContent, IonButton, IonIcon, Swiper, SwiperSlide },
    data() {
        return {
            chevronForward,
            swiper: null,
            activeSlide: 1,
            totalSlides: 0,
        }
    },
    setup() {
        const ionRouter = useIonRouter();

        const skip = async () => {
            const mainStore = useMainStore();
            mainStore.onBoardingComplete = 1;
            await storage.set('onboarding', '1');
            ionRouter.navigate({ name: 'login' }, 'forward', 'replace');
        }

        return {
            skip,
        }
    },
    methods: {
        onSwiper(swiper) {
            this.swiper = swiper;
        },
        onSlidesChange(swiper) {
            this.totalSlides = swiper.slides.length;
        },
        next() {
            if (this.activeSlide === this.totalSlides) {
                this.skip();
            }

            this.swiper.slideNext();
            this.activeSlide = this.swiper.activeIndex + 1;
        },
        prev() {
            this.swiper.slidePrev();
            this.activeSlide = this.swiper.activeIndex + 1;
        }
    }
}
</script>

<style lang="scss" scoped>
.onboarding {

    &__slider {
        height: 100%;
    }

    &__slide {
        background-repeat: no-repeat;
    }

    &__content {
        background: #FFFFFF;
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
