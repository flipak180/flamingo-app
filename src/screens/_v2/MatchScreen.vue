<script setup>
import {IonPage, IonContent, IonHeader, IonTabBar, IonTabButton, IonIcon, IonTabs, IonRouterOutlet, IonButton, IonButtons, IonTitle, IonToolbar} from "@ionic/vue";
import {albumsOutline, person, shuffleOutline, optionsOutline} from 'ionicons/icons';
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
                    <div class="swipe-card__slider">
                        <div class="swipe-card__slider-item" :style="{ backgroundImage: `url(${require('@/assets/swipe-card-1.jpg')})` }"></div>
                    </div>
                    <div class="swipe-card__info">
                        <div class="swipe-card__title">Эрарта</div>
                        <div class="swipe-card__distance">15 км от вас</div>
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
    height: 650px;
    padding: 16px;
}
.swipe-card {
    background: #232323;
    height: 100%;
    border-radius: 15px;

    &__slider-item {
        border-radius: 15px;
        height: 560px;
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
