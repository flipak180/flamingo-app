<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="secondary">
                    <BackButton />
                </ion-buttons>
                <ion-title>Flamin<span class="highlighted">GO</span></ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <div class="ion-margin-top ion-text-center" v-if="isLoading">
                <ion-spinner />
            </div>
            <div v-else>
                <div class="quest-card" v-if="quest">
                    <div class="quest-card__header">
                        <div class="quest-card__image" :style="{ backgroundImage: `url(https://flamingo.spb.ru/${quest.image})` }" @click="reset">

                        </div>
                        <div class="quest-card__heading">
                            <div class="quest-card__title">{{ quest.title }}</div>
                            <div class="quest-card__category">{{ quest.type }}</div>
                            <div class="quest-card__actions">
                                <ion-button size="small" @click="start" v-if="!userQuest">Начать</ion-button>
                                <div class="quest-card__progress" v-else>{{ step }} из {{ quest.total_places }}</div>
                                <!-- <ion-icon :icon="shareOutline"></ion-icon> -->
                                <ion-button size="small" color="light" @click="share">
                                    <ion-icon slot="icon-only" :icon="shareOutline" />
                                </ion-button>
                            </div>
                        </div>
                    </div>
                    <PropsList :bordered="true" />
                    <div class="content-section">
                        <div class="content-section__title">Описание</div>
                        <CollapsedText>
                            <div v-html="quest.description"></div>
                        </CollapsedText>
                    </div>
                    <div class="content-section">
                        <div class="content-section__title">Места</div>
                        <div class="places-grid">
                            <div class="place" v-for="(place, i) in quest.places" :key="place.id" @click="handlePlaceClick(place, i + 1)" :class="{ closed: step < (i + 1) }">
                                <div class="image" :style="{ background: place.image }">
                                    <ion-icon aria-hidden="true" :icon="lockClosed" v-if="step < (i + 1)" />
                                    <span v-else>{{ i + 1 }}</span>
                                </div>
                                <div class="content">
                                    <div class="title">{{ place.title }}</div>
                                    <div class="buttons">
                                        <ion-button size="small" @click.stop="next">Я тут</ion-button>
                                        <ion-button size="small">
                                            <ion-icon slot="icon-only" :icon="mapOutline"></ion-icon>
                                        </ion-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonModal,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonSpinner,
    IonTitle,
    IonToolbar,
    modalController
} from "@ionic/vue";
import {lockClosed, mapOutline, optionsOutline, shareOutline} from 'ionicons/icons';
import MyCoordinates from "@/components/MyCoordinates";
import BackButton from "@/components/BackButton";
import CategoriesGrid from "@/components/categories/CategoriesGrid";
import CatalogCategory from "@/components/categories/CatalogCategory";
import RouteCategory from "@/components/categories/RouteCategory";
import QuestCategory from "@/components/categories/QuestCategory";
import CardModal from "@/components/CardModal";
import PlacesFilter from "@/components/_v2/PlacesFilter";
import PropsList from "@/components/common/PropsList/PropsList.vue";
import CollapsedText from "@/components/common/CollapsedText.vue";
import PlacesGrid from "@/components/places/PlacesGrid.vue";
import {Share} from "@capacitor/share";
import PlacesGridItem from "@/components/places/PlacesGridItem.vue";
import Quiz from "@/components/_v2/Quiz.vue";
import api from "@/plugins/api";
import {mapActions, mapState} from "pinia";
import {useUserQuestsStore} from "@/store/userQuests";
import {Haptics, ImpactStyle} from "@capacitor/haptics";

export default {
    name: "HomeScreen",
    components: {
        PlacesGridItem,
        PlacesGrid, CollapsedText,
        PropsList,
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, BackButton, IonIcon, IonButton, IonModal,
        IonSpinner, IonRefresher, IonRefresherContent,
        MyCoordinates, CategoriesGrid, CardModal, PlacesFilter,
        CatalogCategory, RouteCategory, QuestCategory
    },
    data() {
        return {
            quest_id: +this.$route.params.quest_id,
            quest: null,
            isLoading: false,

            optionsOutline,
            shareOutline,
            mapOutline,
            lockClosed,

            isOpen: false,
        }
    },
    computed: {
        ...mapState(useUserQuestsStore, ['userQuests']),
        userQuest() {
            return this.userQuests.find(item => item.id === this.quest_id);
        },
        step() {
            return this.userQuest?.step || 0;
        }
    },
    mounted() {
        this.fetch();
    },
    methods: {
        ...mapActions(useUserQuestsStore, ['startQuest', 'resetQuest', 'nextQuestPlace']),
        fetch() {
            this.isLoading = true;
            return api.get(`/quests/details?id=${this.quest_id}`).then(res => {
                this.quest = res.data;
            }).finally(() => this.isLoading = false);
        },
        refresh(event) {
            this.fetch(false).then(() => {
                event.target.complete();
            });
        },
        async share() {
            await Share.share({
                title: 'Преступление и наказание',
                text: 'Захватывающее путешествие по местам, где разворачивались главные события романа',
                url: 'https://flamingo.spb.ru/tabs/quests/1',
                dialogTitle: 'Поделиться с друзьями',
            });
        },
        async openModal() {
            const modal = await modalController.create({
                component: Quiz,
                initialBreakpoint: 1,
                breakpoints: [0, 1],
                cssClass: 'auto-height'
            });

            modal.present();
        },
        handlePlaceClick(place, index) {
            if (this.step < index) {
                return;
            }

            this.$router.push({ name: 'questPlace', params: { quest_id: this.quest_id, place_id: place.id } });
        },
        async start() {
            this.startQuest(this.quest);

            await Haptics.impact({ style: ImpactStyle.Light });

            // const token = '100-token';
            // api.post('/quests/start', {
            //
            // }, {
            //     headers: { Authorization: `Bearer ${token}` }
            // }).then(res => {
            //     console.log(res);
            // });
        },
        isPlaceOpened(place) {

        },
        reset() {
            this.resetQuest(this.quest);
        },
        async next() {
            this.nextQuestPlace(this.quest);
            await Haptics.impact({ style: ImpactStyle.Light });
        }
    }
}
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
