<template>
    <ion-page>
        <!-- <MainButton /> -->
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <!--<ion-tab-bar slot="bottom">
                <ion-tab-button tab="tab1" href="/tabs/home">
                    <ion-icon aria-hidden="true" :icon="home"/>
                    <ion-label>Главная</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="fake-tab" class="hidden">

                </ion-tab-button>

                <ion-tab-button tab="tab2" href="/tabs/profile">
                    <ion-icon aria-hidden="true" :icon="person"/>
                    <ion-label>Профиль</ion-label>
                </ion-tab-button>
            </ion-tab-bar>-->
        </ion-tabs>
    </ion-page>
</template>

<script>
import {IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/vue';
import {home, person} from 'ionicons/icons';
import MainButton from "@/components/MainButton";

export default {
    name: "Tabs",
    components: {
        IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs,
        MainButton,
    },
    data() {
        return {
            home,
            person,
        }
    },
}
</script>

<style scoped lang="scss">
ion-tab-bar {
    --background: var(--grey-light);

    @media (prefers-color-scheme: dark) {
        --background: var(--black);
    }
}
ion-tab-button {
    --color: var(--black);
    --color-focused: var(--pink-light);
    --ripple-color: var(--pink-light);
    --color-selected: var(--pink);

    @media (prefers-color-scheme: dark) {
        --color: #fff;
    }
}
ion-tab-button.hidden {
    opacity: 0;
    visibility: hidden;
}
</style>
