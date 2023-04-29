<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Авторизация</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <form @submit.prevent="phoneSubmit">
                            <ion-item class="ion-margin-bottom">
                                <ion-label position="stacked">Телефон</ion-label>
                                <ion-input v-model="phone" type="tel" inputmode="tel" placeholder="+7" aria-label="Телефон"></ion-input>
                                <input v-mask="'+7 (###) ###-##-##'" v-model="phone" style="display: none">
                            </ion-item>
                            <ion-button expand="block" type="submit" color="primary">Подтвердить</ion-button>
                        </form>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script>
import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
    toastController
} from "@ionic/vue";
import {useProfileStore} from "@/store/profile";
import storage from "@/plugins/storage";
import api from "@/plugins/api";

export default {
    name: "LoginScreen",
    components: {IonHeader, IonToolbar, IonTitle, IonPage, IonContent, IonButton, IonGrid, IonCol, IonRow, IonItem, IonLabel, IonInput},
    data() {
        return {
            phone: ' ',
        }
    },
    ionViewDidEnter() {
        this.phone = ' ';
    },
    methods: {
        async phoneSubmit() {
            if (this.phone.length !== 18) {
                const toast = await toastController
                    .create({
                        message: 'Неверно указан номер телефона.',
                        color: 'warning',
                        duration: 2000
                    })
                return toast.present();
            }

            this.auth();
        },
        auth() {
            api.post('/users/login', {
                phone: this.phone,
            }).then((res) => {
                const store = useProfileStore()
                store.phone = res.data.phone;
                storage.set('phone', res.data.phone);
                this.$router.replace({ name: 'home' });
            }).catch(err => {
                toastController.create({
                    message: 'Номер не зарегистрирован.',
                    color: 'danger',
                    duration: 2000
                }).then(toast => toast.present());
            })
        },
    }
}
</script>

<style scoped>
ion-grid {
    height: 100%;
}
ion-row {
    align-items: center;
    height: 100%;
}
</style>
