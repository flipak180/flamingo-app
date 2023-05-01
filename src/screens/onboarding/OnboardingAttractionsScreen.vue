<template>
    <ion-page class="onboarding-page">
        <ion-content>
            <div class="onboarding-content">
                <div class="h1 text-center">Достопримечательности</div>
                <div class="text">
                    <p>Здесь я придумаю какой-то текст, который в двух словах расскажет об этом направлении</p>
                </div>
                <div class="buttons">
                    <ion-button fill="clear" color="dark" size="small" router-link="/onboarding/parks" router-direction="back">Назад</ion-button>
                    <ion-button shape="circle" color="primary" router-link="/onboarding/cafe">
                        <ion-icon aria-hidden="true" slot="icon-only" :icon="chevronForward" />
                    </ion-button>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import {IonButton, IonContent, IonIcon, IonPage} from "@ionic/vue";
import {chevronForward} from "ionicons/icons";

export default {
    name: "OnboardingAttractionsScreen",
    components: { IonPage, IonContent, IonButton, IonIcon },
    data() {
        return {
            chevronForward
        }
    }
}
</script>

<style lang="scss" scoped>
.onboarding-page {

    ion-content {
        --background: url('~@/assets/onboarding2.png') no-repeat;
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
