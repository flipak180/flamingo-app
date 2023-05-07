<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <BackButton />
                </ion-buttons>
                <ion-title>Технические действия</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <MyCoordinates />

            <ion-list :inset="true">
                <ion-item button :detail="false" @click="onboarding">
                    <ion-label>Onboarding</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <ion-toggle v-model="settingsStore.hideSplash">Hide Splash</ion-toggle>
                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script>
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToggle,
    IonToolbar
} from "@ionic/vue";
import BackButton from "@/components/BackButton";
import MyCoordinates from "@/components/MyCoordinates";
import {mapStores} from "pinia";
import {useSettingsStore} from "@/store/settings";
import {useMainStore} from "@/store";
import storage from "@/plugins/storage";

export default {
    name: "SystemScreen",
    components: {
        IonPage, IonHeader, IonContent, IonTitle, IonToolbar,
        IonButtons, BackButton, IonList, IonItem, IonLabel, IonToggle,
        MyCoordinates
    },
    computed: {
        ...mapStores(useSettingsStore),
    },
    methods: {
        async onboarding() {
            const mainStore = useMainStore();
            mainStore.onBoardingComplete = null;
            await storage.remove('onboarding');
            this.$router.replace({ name: 'onboarding' });
        }
    }
}
</script>

<style scoped>
ion-content {
    --background: var(--grey-light);
}
</style>
