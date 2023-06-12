<template>
    <ion-page>
        <ion-header @click="onHeaderClick">
            <ion-toolbar>
                <LogoutButton />
                <ion-title>Профиль</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <Profile />
        </ion-content>
    </ion-page>
</template>

<script>
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import Profile from "@/components/profile/Profile";
import LogoutButton from "@/components/LogoutButton";

export default {
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        Profile,
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
