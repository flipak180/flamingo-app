<template>
    <ion-page>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar slot="bottom">
                <ion-tab-button tab="tab1" href="/tabs/places">
                    <ion-icon aria-hidden="true" :icon="navigateCircleOutline"/>
                    <ion-label>Места</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="tab2" href="/tabs/profile">
                    <ion-icon aria-hidden="true" :icon="personCircleOutline"/>
                    <ion-label>Профиль</ion-label>
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>

<script>
import {IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/vue';
import {navigateCircleOutline, personCircleOutline} from 'ionicons/icons';

export default {
    name: "Tabs",
    components: {
        IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs,
    },
    data() {
        return {
            navigateCircleOutline,
            personCircleOutline,
        }
    },
}
</script>
