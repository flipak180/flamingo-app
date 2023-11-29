<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <BackButton text="Назад" />
                </ion-buttons>
                <ion-buttons slot="end">
                    <ion-button>
                        <ion-icon slot="icon-only" :icon="heartOutline"></ion-icon>
                    </ion-button>
                    <ion-button>
                        <ion-icon slot="icon-only" :icon="shareOutline"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :scroll-events="true" @ionScroll="handleScroll($event)" :fullscreen="true">
            <PlaceDetails />
        </ion-content>
    </ion-page>
</template>

<script>
import {IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import BackButton from "@/components/BackButton";
import {StatusBar} from "@capacitor/status-bar";
import PlaceDetails from "@/components/single-place/PlaceDetails/PlaceDetails";
import {heartOutline, shareOutline} from "ionicons/icons";
import {Capacitor} from "@capacitor/core";

export default {
    name: "PlaceDetailsScreen",
    components: {
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, BackButton, IonIcon, IonButton,
        PlaceDetails
    },
    data() {
        return {
            heartOutline,
            shareOutline
        }
    },
    ionViewWillEnter() {
        if (Capacitor.isNativePlatform()) {
            StatusBar.hide();
        }
    },
    ionViewWillLeave() {
        if (Capacitor.isNativePlatform()) {
            StatusBar.show();
        }
    },
    methods: {
        handleScroll(e) {
            this.emitter.emit('scroll', e.detail);
        },
    }
}
</script>

<style scoped>

</style>
