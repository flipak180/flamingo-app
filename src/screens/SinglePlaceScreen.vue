<template>
    <ion-page>
        <!--<ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <BackButton text="Назад" />
                </ion-buttons>
            </ion-toolbar>
        </ion-header>-->
        <ion-content :scroll-events="true" @ionScroll="handleScroll($event)">
            <SinglePlace />
        </ion-content>
    </ion-page>
</template>

<script>
import {IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import BackButton from "@/components/BackButton";
import {StatusBar} from "@capacitor/status-bar";
import SinglePlace from "@/components/single-place/SinglePlace/SinglePlace";

export default {
    name: "CompilationScreen",
    components: {
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, BackButton,
        SinglePlace
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
