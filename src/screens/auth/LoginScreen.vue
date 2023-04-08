<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Авторизация</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row class="flex-column">
                    <ion-col style="max-height: 30%;">
                        <div class="ion-padding ion-text-center">
                            <img src="/assets/logo.png" width="250" alt="">
                        </div>
                    </ion-col>
                    <ion-col>
                        <form @submit.prevent="phoneSubmit">
                            <ion-item class="ion-margin-bottom">
                                <ion-label position="stacked">Телефон</ion-label>
                                <ion-input v-model="phone" type="tel" inputmode="tel"></ion-input>
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
import axios from "axios";
import {useProfileStore} from "@/store/profile";

export default {
    name: "LoginScreen",
    components: {IonHeader, IonToolbar, IonTitle, IonPage, IonContent, IonButton, IonGrid, IonCol, IonRow, IonItem, IonLabel, IonInput},
    data() {
        return {
            phone: '',
        }
    },
    ionViewDidEnter() {
        this.phone = '';
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
            axios.post('https://flamingo.spb.ru/api/users/login', {
                phone: this.phone,
            }).then((res) => {
                const store = useProfileStore()
                store.phone = res.data.phone;
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
.input-cont {
    padding: 2px;
}
.input-cont input {
    color: #000;
    background: #fff;
    border: none;
    font-size: 21px;
    padding: 10px 15px;
    border-radius: 10px;
    display: block;
    width: 100%;
}
.flex-column {
    flex-direction: column;
    height: calc(100vh - 44px);
}
.button-links {
    display: flex;
    justify-content: space-between;
}
.button-links a {
    color: var(--ion-color-primary);
    text-decoration: none;
}
</style>
