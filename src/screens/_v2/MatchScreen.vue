<script setup>
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonTitle,
    IonToolbar
} from "@ionic/vue";
import {albumsOutline, locationOutline, optionsOutline, person, shuffleOutline} from 'ionicons/icons';
import {Swiper, SwiperSlide} from "swiper/vue";
</script>

<template>
    <ion-page>
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
            <div class="swipe-cards">
                <div class="swipe-card">
                    <div class="swipe-card__top">
                        <swiper class="swipe-card__slider">
                            <swiper-slide class="swipe-card__slider-item" :style="{ backgroundImage: `url(${require('@/assets/swipe-card-1.jpg')})` }"></swiper-slide>
                            <swiper-slide class="swipe-card__slider-item" :style="{ backgroundImage: `url(${require('@/assets/swipe-card-2.jpg')})` }"></swiper-slide>
                        </swiper>
                        <div class="swipe-card__tags">
                            <div class="swipe-card__tag">Музей</div>
                            <div class="swipe-card__tag">Выставка</div>
                        </div>
                    </div>
                    <div class="swipe-card__info">
                        <div class="swipe-card__title">Эрарта</div>
                        <div class="swipe-card__distance">
                            <ion-icon :icon="locationOutline"></ion-icon>
                            15 км от вас
                        </div>
                    </div>
                </div>
            </div>
        </ion-content>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar slot="bottom">
                <ion-tab-button tab="tab-home" href="/tabs/match">
                    <ion-icon aria-hidden="true" :icon="albumsOutline"/>
                </ion-tab-button>

                <ion-tab-button tab="tab-profile" href="/tabs/profile">
                    <ion-icon aria-hidden="true" :icon="person"/>
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>

<style scoped lang="scss">
.ion-page {
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
}

.swipe-cards {
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.swipe-card {
    background: #232323;
    height: 100%;
    max-height: 650px;
    border-radius: 15px;

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
}

ion-tab-bar {
    --background: #232323;
}
ion-tab-button {
    --color: #A2A2A2;
    --color-focused: #A2A2A2;
    --ripple-color: #A2A2A2;
    --color-selected: #FFFFFF;
}
</style>
