<template>
    <ion-page class="onboarding-page">
        <ion-content :style="{ backgroundImage: `url(${require('@/assets/' + bg)})` }">
            <div class="onboarding-content">
                <div class="h1 text-center">
                    <slot name="title"></slot>
                </div>
                <div class="text">
                    <slot name="content"></slot>
                </div>
                <div class="buttons">
                    <ion-button fill="clear" color="dark" size="small" @click="skip">Пропустить</ion-button>
                    <ion-button shape="circle" color="primary" router-link="/onboarding/parks">
                        <ion-icon aria-hidden="true" slot="icon-only" :icon="chevronForward" />
                    </ion-button>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import {IonButton, IonContent, IonIcon, IonPage, useIonRouter} from "@ionic/vue";
import {chevronForward} from "ionicons/icons";
import {useMainStore} from "@/store";
import storage from "@/plugins/storage";
import {Swiper, SwiperSlide} from "swiper/vue";

export default {
    name: "OnboardingPage",
    props: ['bg'],
    components: { IonPage, IonContent, IonButton, IonIcon, Swiper, SwiperSlide },
    data() {
        return {
            chevronForward
        }
    },
    setup() {
        const ionRouter = useIonRouter();

        const skip = async () => {
            const mainStore = useMainStore();
            mainStore.onBoardingComplete = 1;
            await storage.set('onboarding', '1');
            ionRouter.navigate({ name: 'login' }, 'forward', 'replace');
        }

        return {
            skip,
        }
    },
}
</script>

<style lang="scss" scoped>
.onboarding-page {

    ion-content {
        //--background: url('~@/assets/onboarding-pink.png') no-repeat;
    }
    .onboarding-content {
        background: #FFFFFF;
        border-radius: 25px 25px 0 0;
        position: fixed;
        bottom: 0;
        left: 0;
        min-height: 330px;
        padding: 20px;
        width: 100%;
        display: flex;
        flex-direction: column;

        .text {
            text-align: center;
            max-width: 256px;
            margin: 0 auto;
            flex-grow: 1;
        }
    }

    .buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    ion-button[shape=circle] {
        --border-radius: 50%;
        width: 50px;
        height: 50px;

        ion-icon {
            font-size: 32px;
            width: 32px;
            height: 32px;
        }
    }
    ion-button[fill=clear] {
        opacity: .5;
    }
}
</style>
