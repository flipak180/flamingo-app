<script setup>
import {IonIcon, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/vue";
import {albumsOutline, copyOutline, footstepsOutline} from 'ionicons/icons';
</script>

<template>
    <ion-page>
        <!-- <MainButton /> -->
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar slot="bottom">
                <ion-tab-button tab="tab-home" href="/tabs/articles">
                    <ion-icon aria-hidden="true" :icon="albumsOutline"/>
                </ion-tab-button>
                <ion-tab-button tab="tab-quests" href="/tabs/quests">
                    <ion-icon aria-hidden="true" :icon="footstepsOutline"/>
                </ion-tab-button>
                <ion-tab-button tab="tab-match" href="/tabs/match">
                    <ion-icon aria-hidden="true" :icon="copyOutline"/>
                </ion-tab-button>
<!--                <ion-tab-button tab="tab-match" href="/tabs/profile">-->
<!--                    <ion-icon aria-hidden="true" :icon="personOutline"/>-->
<!--                </ion-tab-button>-->
            </ion-tab-bar>
            <!-- <ion-tab-bar slot="bottom">
                <ion-tab-button tab="tab-home" href="/tabs/articles">
                    <ion-icon aria-hidden="true" :icon="homeOutline"/>
                    <ion-label>Главная</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="tab-places" href="/tabs/catalog">
                    <ion-icon aria-hidden="true" :icon="trailSignOutline"/>
                    <ion-label>Места</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="tab-places" href="/tabs/quests">
                    <ion-icon aria-hidden="true" :icon="compassOutline"/>
                    <ion-label>Квесты</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="tab-fake" class="hidden">

                </ion-tab-button>

                <ion-tab-button tab="tab-profile" href="/tabs/profile">
                    <ion-icon aria-hidden="true" :icon="personOutline"/>
                    <ion-label>Профиль</ion-label>
                </ion-tab-button>
            </ion-tab-bar>-->
        </ion-tabs>
    </ion-page>
</template>

<style scoped lang="scss">
ion-tab-bar {
    --background: var(--grey-light);

    @media (prefers-color-scheme: dark) {
        --background: var(--black-light);
    }
}
ion-tab-button {
    --color: var(--black);
    --color-focused: var(--pink-light);
    --ripple-color: var(--pink-light);
    --color-selected: var(--pink);

    @media (prefers-color-scheme: dark) {
        --color: #A2A2A2;
        --color-focused: #A2A2A2;
        --ripple-color: #A2A2A2;
        --color-selected: #FFFFFF;
    }
}

//ion-tab-button.hidden {
//    opacity: 0;
//    visibility: hidden;
//}
</style>
