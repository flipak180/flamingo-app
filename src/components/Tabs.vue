<template>
    <ion-page>
        <MainButton />
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar slot="bottom">
                <ion-tab-button tab="tab-home" href="/tabs/home">
                    <ion-icon aria-hidden="true" :icon="homeOutline"/>
                    <ion-label>Главная</ion-label>
                </ion-tab-button>

                <!-- <ion-tab-button tab="tab-places" href="/tabs/catalog">
                    <ion-icon aria-hidden="true" :icon="trailSignOutline"/>
                    <ion-label>Места</ion-label>
                </ion-tab-button> -->

<!--                <ion-tab-button tab="tab-places" href="/tabs/quests">-->
<!--                    <ion-icon aria-hidden="true" :icon="compassOutline"/>-->
<!--                    <ion-label>Квесты</ion-label>-->
<!--                </ion-tab-button>-->

                <ion-tab-button tab="tab-fake" class="hidden">

                </ion-tab-button>

                <ion-tab-button tab="tab-profile" href="/tabs/profile">
                    <ion-icon aria-hidden="true" :icon="personOutline"/>
                    <ion-label>Профиль</ion-label>
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>

<script>
import {IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/vue';
import {compassOutline, homeOutline, personOutline, trailSignOutline} from 'ionicons/icons';
import MainButton from "@/components/MainButton";

export default {
    name: "Tabs",
    components: {
        IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs,
        MainButton,
    },
    data() {
        return {
            homeOutline,
            personOutline,
            trailSignOutline,
            compassOutline,
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
