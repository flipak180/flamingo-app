<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Профиль</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-button expand="block" color="primary" @click="logout">Выход</ion-button>
        </ion-content>
    </ion-page>
</template>

<script>
import {IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import {useProfileStore} from "@/store/profile";

export default {
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        IonButton,
    },
    methods: {
        logout() {
            const store = useProfileStore();
            store.phone = null;
            this.$router.replace({ name: 'login' });
        }
    }
}
</script>

<style scoped>

</style>
