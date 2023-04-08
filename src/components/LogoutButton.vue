<template>
    <ion-buttons slot="primary">
        <ion-button @click="logout">
            <ion-icon slot="icon-only" :icon="logOutOutline"></ion-icon>
        </ion-button>
    </ion-buttons>
</template>

<script>
import {IonButton, IonButtons, IonIcon} from "@ionic/vue";
import {useProfileStore} from "@/store/profile";
import storage from "@/plugins/storage";
import {logOutOutline} from "ionicons/icons";

export default {
    name: "LogoutButton",
    components: { IonButtons, IonButton, IonIcon },
    data() {
        return {
            logOutOutline
        }
    },
    methods: {
        async logout() {
            const store = useProfileStore();
            store.phone = null;
            await storage.remove('phone');
            this.$router.replace({ name: 'login' });
        }
    }
}
</script>

<style scoped>

</style>
