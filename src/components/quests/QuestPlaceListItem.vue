<script setup lang="ts">
import {IonButton, IonIcon} from "@ionic/vue";
import {checkmarkOutline, key, lockClosed} from "ionicons/icons";
import {useRouter} from "vue-router";
import {Haptics, ImpactStyle} from "@capacitor/haptics";
import {useUserQuestsStore} from "@/store/userQuests";
import {computed} from "vue";

const props = defineProps(['place', 'userQuest'])

const router = useRouter()
const userQuestsStore = useUserQuestsStore()

const step = computed(() => {
    return props.userQuest?.step || 0;
})

function handlePlaceClick(place) {
    if (step.value === place.number) {
        // start()
    }

    if (step.value < place.number || !props.userQuest) {
        return;
    }

    if (place.quiz && !isOpened(place)) {
        quiz.value = place.quiz;
        isQuizOpen.value = true;
        return;
    }

    router.push({ name: 'questPlace', params: { quest_id: props.userQuest.id, place_id: place.id } });
}

async function imHere(place) {
    // if (!atPlace(place)) {
    //     const toast = await toastController.create({
    //         message: 'Вы не тут :)',
    //         color: 'warning',
    //         duration: 1500,
    //     });
    //     await toast.present();
    //     return;
    // }

    userQuestsStore.nextQuestPlace(quest.value);
    await Haptics.impact({ style: ImpactStyle.Light });
}

function isOpened(place) {
    return props.userQuest?.opened_places?.includes(place.number);
}
</script>

<template>
    <div class="place" @click="handlePlaceClick(place)" :class="{ closed: (step <= place.number && !isOpened(place)), 'can-open': (step === place.number && !isOpened(place)) }">
        <div class="image" :style="{ background: place.image }">
            <ion-icon aria-hidden="true" :icon="step === place.number ? key : lockClosed" v-if="(step <= place.number && !isOpened(place))" :class="{ pulse: step === place.number }" />
            <span v-else>{{ place.number }}</span>
        </div>
        <div class="content">
            <div class="title">{{ place.title }}</div>
            <div class="buttons">
                <ion-button size="small" @click.stop="imHere(place)" v-if="step <= place.number">Я тут</ion-button>
                <ion-button size="small" color="success" v-else>
                    <ion-icon slot="icon-only" :icon="checkmarkOutline"></ion-icon>
                </ion-button>
                <!--<ion-button size="small">
                    <ion-icon slot="icon-only" :icon="mapOutline"></ion-icon>
                </ion-button>-->
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.place {
    background: var(--ion-card-background, var(--ion-item-background, var(--ion-background-color, #fff)));
    box-shadow: rgba(0, 0, 0, 0.12) 0 4px 16px;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 15px;
    display: flex;
    position: relative;

    &.closed {
        opacity: .5;

        .content:before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: rgba(255, 255, 255, .3);
            backdrop-filter: blur(5px);
            z-index: 10;

            @media (prefers-color-scheme: dark) {
                background: rgba(var(--black-rgba), 0.3);
            }
        }
    }

    &.can-open {
        opacity: 1;
    }

    .image {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-weight: bold;
        font-size: 22px;
        flex: 0 0 75px;
    }

    .content {
        padding: 10px;
        position: relative;
        flex-grow: 1;
    }

    .title {
        font-weight: 700;
        min-height: 35px;
        font-size: 14px;
        color: var(--ion-text-color, #000);
    }
}
</style>
