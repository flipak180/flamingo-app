<template>
    <ion-content class="ion-padding">
        <div class="h2 text-center">Категории</div>
        <ion-list>
            <ion-item lines="none" href="#">
                <ion-avatar slot="start">
                    <ion-icon aria-hidden="true" :icon="camera" />
                </ion-avatar>
                <ion-label>
                    <h2>Достопримечательности</h2>
                </ion-label>
            </ion-item>
            <ion-item lines="none" href="#">
                <ion-avatar slot="start">
                    <ion-icon aria-hidden="true" :icon="footsteps" />
                </ion-avatar>
                <ion-label>
                    <h2>Пешеходные квесты</h2>
                </ion-label>
            </ion-item>
            <ion-item lines="none" href="#">
                <ion-avatar slot="start">
                    <ion-icon aria-hidden="true" :icon="image" />
                </ion-avatar>
                <ion-label>
                    <h2>Музеи и выставки</h2>
                </ion-label>
            </ion-item>
            <ion-item lines="none" href="#">
                <ion-avatar slot="start">
                    <ion-icon aria-hidden="true" :icon="restaurant" />
                </ion-avatar>
                <ion-label>
                    <h2>Рестораны, кафе, бары</h2>
                </ion-label>
            </ion-item>
            <ion-item lines="none" href="#">
                <ion-avatar slot="start">
                    <ion-icon aria-hidden="true" :icon="business" />
                </ion-avatar>
                <ion-label>
                    <h2>Городская инфраструктура</h2>
                </ion-label>
            </ion-item>
        </ion-list>
    </ion-content>
</template>

<script>
import {
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
    IonList,
    IonAvatar,
    IonImg,
    IonLabel,
    IonSearchbar, IonIcon,
} from '@ionic/vue';
import {business, camera, close, footsteps, image, restaurant} from "ionicons/icons";

export default {
    name: "SheetModal",
    components: {
        IonButton,
        IonModal,
        IonHeader,
        IonContent,
        IonToolbar,
        IonTitle,
        IonItem,
        IonList,
        IonAvatar,
        IonImg,
        IonLabel,
        IonSearchbar,
        IonIcon,
    },
    data() {
        return {
            camera, footsteps, image, restaurant, business
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    text-align: center;
    margin-bottom: 30px;
}
ion-item {
    --detail-icon-color: var(--black);
    --background-focused: var(--blue-light);
    --background-activated: var(--blue-light);
    --background-hover: var(--blue-light);
    --ripple-color: var(--blue-light);
    --border-radius: 15px;
    --padding-bottom: 10px;
    --padding-end: 10px;
    --padding-start: 10px;
    --padding-top: 10px;

    ion-avatar {
        background: var(--blue-light);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        margin: 0 20px 0 0;

        ion-icon {
            color: var(--blue);
            font-size: 24px;
        }
    }
}
</style>
