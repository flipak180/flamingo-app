<template>
    <ion-backdrop :visible="isVisible" />
    <div class="card-modal" :class="{ visible: isVisible }">
        <div class="h2 text-center">Категории</div>
        <ion-list>
            <ion-item lines="none" button @click="onCategoryClick">
                <ion-avatar slot="start">
                    <ion-icon aria-hidden="true" :icon="camera" />
                </ion-avatar>
                <ion-label>
                    <h2>Достопримечательности</h2>
                </ion-label>
            </ion-item>
            <ion-item lines="none" button @click="onCategoryClick">
                <ion-avatar slot="start">
                    <ion-icon aria-hidden="true" :icon="footsteps" />
                </ion-avatar>
                <ion-label>
                    <h2>Пешеходные квесты</h2>
                </ion-label>
            </ion-item>
            <ion-item lines="none" button @click="onCategoryClick">
                <ion-avatar slot="start">
                    <ion-icon aria-hidden="true" :icon="image" />
                </ion-avatar>
                <ion-label>
                    <h2>Музеи и выставки</h2>
                </ion-label>
            </ion-item>
            <ion-item lines="none" button @click="onCategoryClick">
                <ion-avatar slot="start">
                    <ion-icon aria-hidden="true" :icon="restaurant" />
                </ion-avatar>
                <ion-label>
                    <h2>Рестораны, кафе, бары</h2>
                </ion-label>
            </ion-item>
            <ion-item lines="none" button @click="onCategoryClick">
                <ion-avatar slot="start">
                    <ion-icon aria-hidden="true" :icon="business" />
                </ion-avatar>
                <ion-label>
                    <h2>Городская инфраструктура</h2>
                </ion-label>
            </ion-item>
        </ion-list>
    </div>
</template>

<script>
import {IonAvatar, IonBackdrop, IonButton, IonIcon, IonItem, IonLabel, IonList, IonModal} from "@ionic/vue";
import {business, camera, footsteps, image, restaurant} from "ionicons/icons";

export default {
    name: "CardModal",
    components: {
        IonBackdrop,
        IonButton,
        IonModal,
        IonItem,
        IonList,
        IonAvatar,
        IonIcon,
        IonLabel,
    },
    data() {
        return {
            camera, footsteps, image, restaurant, business,
            isVisible: false,
        }
    },
    mounted() {
        this.emitter.on('main-button-click', () => {
           this.isVisible = !this.isVisible;
        });
    },
    methods: {
        onCategoryClick() {
            this.emitter.emit('main-button-click');
            this.$router.push('/tabs/categories/2');
        }
    }
}
</script>

<style lang="scss" scoped>
ion-backdrop {
    opacity: 0.3;
    visibility: visible;
    background: var(--black);
    backdrop-filter: blur(2px);
    transition: all .3s;

    &.backdrop-hide {
        opacity: 0;
        visibility: hidden;
    }
}

.card-modal {
    background: #FFFFFF;
    border-radius: 25px 25px 0 0;
    padding: 15px 15px 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    transform: translate(0, 100%);
    transition: transform .3s;
    z-index: 5;

    @media (prefers-color-scheme: dark) {
        background: var(--black);
    }

    &.visible {
        transform: translate(0, 0);
    }

    .title {
        text-align: center;
        margin-bottom: 30px;
    }

    ion-list {

        @media (prefers-color-scheme: dark) {
            background: var(--black);
        }
    }

    ion-item {
        --detail-icon-color: var(--black);
        --background-focused: var(--blue-light);
        --background-activated: var(--blue-light);
        --background-hover: var(--blue-light);
        --ripple-color: var(--blue-light);
        --border-radius: 15px;
        --padding-bottom: 10px;
        --padding-end: 5px;
        --padding-start: 5px;
        --padding-top: 10px;

        @media (prefers-color-scheme: dark) {
            --background: var(--black);
            --detail-icon-color: #fff;
        }

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
}
</style>
