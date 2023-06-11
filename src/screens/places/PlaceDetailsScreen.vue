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
import {IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import BackButton from "@/components/BackButton";
import {StatusBar} from "@capacitor/status-bar";
import PlaceDetails from "@/components/single-place/PlaceDetails/PlaceDetails";
import {heartOutline, shareOutline} from "ionicons/icons";

export default {
    name: "PlaceDetailsScreen",
    components: {
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, BackButton,
        PlaceDetails
    },
    data() {
        return {
            heartOutline,
            shareOutline
        }
    },
    ionViewWillEnter() {
        StatusBar.hide();
    },
    ionViewWillLeave() {
        StatusBar.show();
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
