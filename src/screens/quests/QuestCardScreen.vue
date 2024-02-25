<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="secondary">
                    <BackButton />
                </ion-buttons>
                <FlamingoTitle />
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <div class="ion-margin-top ion-text-center" v-if="isLoading">
                <ion-spinner />
            </div>
            <div v-else>
                <div class="quest-card" v-if="quest">
                    <ion-alert trigger="present-alert" header="Начать заново?" :buttons="alertButtons"></ion-alert>
                    <div class="quest-card__header">
                        <div class="quest-card__image" :style="{ backgroundImage: `url(https://flamingo.spb.ru/${quest.image})` }">

                        </div>
                        <div class="quest-card__heading">
                            <div class="quest-card__title" id="present-alert">{{ quest.title }}</div>
                            <div class="quest-card__category">{{ quest.type }}</div>
                            <div class="quest-card__actions">
                                <ion-button size="small" @click="start" v-if="!userQuest">Начать</ion-button>
                                <ion-progress-bar :value="(step - 1) / 100 * quest.total_places" style="margin-top: 5px;" v-else></ion-progress-bar>
                            </div>
                        </div>
                    </div>
                    <PropsList :bordered="true" :items="props" />
                    <div>
                        <div class="content-section">
                            <div class="content-section__title">Описание</div>
                            <CollapsedText>
                                <div v-html="quest.description"></div>
                            </CollapsedText>
                        </div>
                        <div class="content-section">
                            <div class="content-section__title">Места</div>
                            <div class="places-grid">
                                <div class="place" v-for="place in quest.places" :key="place.id" @click="handlePlaceClick(place)" :class="{ closed: (step <= place.number && !isOpened(place)), 'can-open': (step === place.number && !isOpened(place)) }">
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
                            </div>
                        </div>
                    </div>

                    <hr>

                    <div class="text-center" style="margin: 50px 0;">
                        <ion-button color="light" @click="share">
                            <ion-icon slot="start" :icon="shareOutline"></ion-icon>
                            Поделиться квестом
                        </ion-button>
                    </div>
                </div>
            </div>
        </ion-content>

        <ion-modal :is-open="isQuizOpen" :initial-breakpoint="1" :breakpoints="[0, 1]" @didDismiss="onQuizClose()">
            <div class="quiz ion-padding" v-show="quiz">
                <div class="quiz__question">{{ quiz.question }}</div>
<!--                <div class="quiz__answer-row">-->
<!--                    <ion-list>-->
<!--                        <ion-item lines="none">-->
<!--                            <ion-input aria-label="Ответ"></ion-input>-->
<!--                        </ion-item>-->
<!--                    </ion-list>-->
<!--                    <ion-button>-->
<!--                        <ion-icon slot="icon-only" :icon="checkmarkOutline"></ion-icon>-->
<!--                    </ion-button>-->
<!--                </div>-->
                <div class="quiz__answers" v-if="quiz.type === 1">
                    <ion-button v-for="answer in quiz.answer" :key="answer.id" @click="onAnswer(quiz, answer)"
                                :color="answers.includes(answer.id) ? (answer.is_correct ? 'success' : 'danger') : 'light'">
                        {{ answer.text }}
                    </ion-button>
                </div>
                <div class="quiz__location-btn" v-if="quiz.type === 2">
                    <ion-button @click="onAnswer(quiz)" expand="block">Я на месте</ion-button>
                </div>
            </div>
        </ion-modal>
    </ion-page>
</template>

<script setup>
import {
    IonAlert,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonModal,
    IonPage,
    IonProgressBar,
    IonSpinner,
    IonToolbar,
    modalController
} from "@ionic/vue";
import {checkmarkOutline, key, lockClosed, shareOutline} from 'ionicons/icons';
import BackButton from "@/components/BackButton.vue";
import PropsList from "@/components/common/PropsList/PropsList.vue";
import CollapsedText from "@/components/common/CollapsedText.vue";
import {Share} from "@capacitor/share";
import Quiz from "@/components/_v2/Quiz.vue";
import api from "@/plugins/api";
import {Haptics, ImpactStyle, NotificationType} from "@capacitor/haptics";
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useUserQuestsStore} from "@/store/userQuests";
import FlamingoTitle from "@/components/FlamingoTitle.vue";

const route = useRoute()
const router = useRouter()
const userQuestsStore = useUserQuestsStore()

const quest_id = ref(+route.params.quest_id)
const quest = ref(null)
const isLoading = ref(false)
const isQuizOpen = ref(false)
const quiz = ref(null)
const answers = ref([])
const alertButtons = ref([
    {
        text: 'Нет',
        role: 'cancel',
    },
    {
        text: 'Да',
        role: 'confirm',
        handler: () => {
            reset();
        },
    },
])

const userQuest = computed(() => {
    return userQuestsStore.userQuests.find(item => item.id === quest_id.value);
})
const step = computed(() => {
    return userQuest.value?.step || 0;
})
// const activePlace = computed(() => {
//     return quest.value.places[step];
// })
const props = computed(() => {
    return [
        { name: 'Дистанция', value: quest.value.distance },
        { name: 'Длительность', value: quest.value.time },
        { name: 'Заданий', value: quest.value.total_places },
    ];
})

function fetch() {
    isLoading.value = true;
    return api.get(`/quests/details?id=${quest_id.value}`).then(res => {
        quest.value = res.data;
    }).finally(() => isLoading.value = false);
}

// function refresh(event) {
//     fetch(false).then(() => {
//         event.target.complete();
//     });
// }

async function share() {
    if (!quest.value) {
        return;
    }

    await Share.share({
        title: quest.value.title,
        text: quest.value.type,
        url: `https://flamingo.spb.ru/tabs/quests/${quest_id.value}`,
        dialogTitle: 'Поделиться с друзьями',
    });
}

async function openModal() {
    const modal = await modalController.create({
        component: Quiz,
        initialBreakpoint: 1,
        breakpoints: [0, 1],
        cssClass: 'auto-height'
    });

    modal.present();
}

function handlePlaceClick(place) {
    if (step.value === place.number) {
        // start()
    }

    if (step.value < place.number || !userQuest.value) {
        return;
    }

    if (place.quiz && !isOpened(place)) {
        quiz.value = place.quiz;
        isQuizOpen.value = true;
        return;
    }

    router.push({ name: 'questPlace', params: { quest_id: quest_id.value, place_id: place.id } });
}

async function start() {
    userQuestsStore.startQuest(quest.value);
    await Haptics.impact({ style: ImpactStyle.Light });

    // const token = '100-token';
    // api.post('/quests/start', {
    //
    // }, {
    //     headers: { Authorization: `Bearer ${token}` }
    // }).then(res => {
    //     console.log(res);
    // });
}

function onQuizClose() {
    isQuizOpen.value = false;
}

function reset() {
    userQuestsStore.resetQuest(quest);
    answers.value = [];
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

async function onAnswer(quiz, answer = null) {
    if (quiz.type === 1 && answer) {
        answers.value.push(answer.id);
        if (answer.is_correct) {
            await Haptics.notification({ type: NotificationType.Success });
            setTimeout(() => {
                userQuestsStore.openQuestPlace(quest.value);
                isQuizOpen.value = false;
            }, 500);
        } else {
            await Haptics.notification({ type: NotificationType.Error });
        }
    }

    if (quiz.type === 2) {
        await Haptics.notification({ type: NotificationType.Success });
        setTimeout(() => {
            userQuestsStore.openQuestPlace(quest.value);
            isQuizOpen.value = false;
        }, 500);
    }
}

function isOpened(place) {
    return userQuest.value?.opened_places?.includes(place.number);
}

onMounted(() => {
    fetch();
})
</script>

<style lang="scss" scoped>
.quest-card {
    &__header {
        display: flex;
        justify-content: space-between;
        gap: 15px;
    }

    &__image {
        width: 100px;
        height: 100px;
        flex: 0 0 100px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        border-radius: 15px;
    }

    &__title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 5px;
    }

    &__category {
        color: rgba(var(--black-rgba), 0.5);
        text-transform: uppercase;
        font-weight: bold;
        font-size: 13px;
        margin-bottom: 10px;
        letter-spacing: 0.5px;

        @media (prefers-color-scheme: dark) {
            color: rgba(255, 255, 255, 0.5);
        }
    }

    &__actions {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &-left {
            display: flex;
            align-items: center;
            gap: 10px;
        }
    }

    &__progress {
        background: var(--pink);
        font-size: 13px;
        font-weight: 600;
        color: #fff;
        border-radius: 10px;
        padding: 4px 10px;
    }
}

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

.quiz {
    min-height: 300px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;

    &__question {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 30px;
    }

    &__answers {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
    }

    &__answer-row {
        display: flex;
        justify-content: space-between;
        gap: 15px;
        align-items: center;

        ion-list {
            flex-grow: 1;
            --border-radius: 5px;
        }

        ion-item {
            --border-radius: 5px;
        }

        ion-button {
            min-height: 44px;
        }
    }
}

ion-modal {
    --height: auto;
}

ion-progress-bar {
    --background: var(--grey);
    --progress-background: var(--pink);

    @media (prefers-color-scheme: dark) {
        --background: var(--black-light);
    }

    height: 10px;
    border-radius: 5px;
}
</style>
