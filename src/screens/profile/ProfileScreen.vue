<template>
    <ion-page>
        <ion-header @click="onHeaderClick">
            <ion-toolbar>
                <LogoutButton />
                <ion-title>Профиль</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <Visits />
        </ion-content>
    </ion-page>
</template>

<script>
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import Visits from "@/components/Visits";
import LogoutButton from "@/components/LogoutButton";
import {TYPE_CATALOG, TYPE_QUEST, TYPE_ROUTE} from "@/models/Category";
import {settingsOutline} from "ionicons/icons";
import api from "@/plugins/api";

export default {
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        Visits,
        LogoutButton,
    },
    data() {
        return {
            totalClicks: 0,
        }
    },
    methods: {
        onHeaderClick() {
            this.totalClicks++;
            if (this.totalClicks >= 3) {
                this.totalClicks = 0;
                this.$router.push({ name: 'system' });
            }
        },
    }
}
</script>

<style scoped>

</style>
