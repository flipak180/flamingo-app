<script>
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonSpinner,
    IonTitle,
    IonToolbar
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
import {randomColor} from "@/utils/helper";
import CollapsedText from "@/components/common/CollapsedText.vue";
import PlacesGrid from "@/components/places/PlacesGrid.vue";
import {Share} from "@capacitor/share";
import PlacesGridItem from "@/components/places/PlacesGridItem.vue";

export default {
    name: "HomeScreen",
    components: {
        PlacesGridItem,
        PlacesGrid, CollapsedText,
        PropsList,
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, BackButton, IonIcon, IonButton,
        IonSpinner, IonRefresher, IonRefresherContent,
        MyCoordinates, CategoriesGrid, CardModal, PlacesFilter,
        CatalogCategory, RouteCategory, QuestCategory
    },
    data() {
        return {
            optionsOutline,
            shareOutline,
            mapOutline,
            lockClosed,
            places: [
                {
                    id: 1,
                    title: 'Дом старухи-процентщицы',
                    completed: true,
                },
                {
                    id: 2,
                    title: 'Трактир "Хрустальный дворец"',
                },
                {
                    id: 3,
                    title: 'Юсуповский сад',
                },
                {
                    id: 4,
                    title: 'Вознесенский мост',
                },
                {
                    id: 5,
                    title: 'Дом Бакалеева',
                },
                {
                    id: 6,
                    title: 'Дом Родиона Раскольникова',
                },
                {
                    id: 7,
                    title: 'Дом Бакалеева',
                },
                {
                    id: 8,
                    title: 'Столярный переулок, 14',
                },
                {
                    id: 9,
                    title: 'Кокушкин мост',
                },
                {
                    id: 10,
                    title: 'Здание бывшей Казанской полицейской части',
                },
                {
                    id: 11,
                    title: 'Конный переулок - переулок Гривцова',
                },
                {
                    id: 12,
                    title: 'Сенная площадь',
                },
            ],
        }
    },
    mounted() {
        this.fetch();
    },
    methods: {
        randomColor,
        fetch() {

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
        }
    }
}
</script>

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
            <div class="quest-card__header">
                <div class="quest-card__image" :style="{ backgroundImage: `url(${require('@/assets/dostoevsky.jpg')})` }">

                </div>
                <div class="quest-card__heading">
                    <div class="quest-card__title">Преступление и наказание</div>
                    <div class="quest-card__category">Литературный маршрут</div>
                    <div class="quest-card__actions">
                        <ion-button size="small">Начать</ion-button>
                        <!-- <ion-icon :icon="shareOutline"></ion-icon> -->
                        <ion-button size="small" color="light" @click="share">
                            <ion-icon slot="icon-only" :icon="shareOutline" />
                        </ion-button>
                    </div>
                </div>
            </div>
            <PropsList :bordered="true" />
            <div class="content-section">
                <div class="content-section__title">Сюжет</div>
                <CollapsedText>
                    <p>Сегодня многим читателям, как российским, так и зарубежным, хочется прогуляться по тем самым местам, где проживали персонажи Достоевского, где разворачивались главные события романа.</p>
                    <p>Если интересно, то ничего не сможет помешать и вам отправиться в очень захватывающее путешествие по местам романа "Преступление и наказание".</p>
                    <p>Начинается экскурсия с Дома старухи-процентщицы, а дальше маршрут следует согласно указанной синей линии на карте.</p>
                </CollapsedText>
            </div>
            <div class="content-section">
                <div class="content-section__title">Места</div>
                <div class="places-grid">
                    <div class="place" v-once v-for="(place, i) in places" :key="place.id" @click="$router.push({ name: 'questPlace', params: { quest_id: 1, place_id: place.id } });">
                        <div class="image" :style="{ background: randomColor() }">
                            <span v-if="place.completed">{{ i + 1 }}</span>
                            <ion-icon aria-hidden="true" :icon="lockClosed" v-else />
                        </div>
                        <div class="content" :class="{ closed: !place.completed }">
                            <div class="title">{{ place.title }}</div>
                            <div class="buttons">
                                <ion-button size="small">Я тут</ion-button>
                                <ion-button size="small">
                                    <ion-icon slot="icon-only" :icon="mapOutline"></ion-icon>
                                </ion-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

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

    .image {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-weight: bold;
        font-size: 22px;
        flex: 0 0 75px;
        background: #2dd36f;
    }

    .content {
        padding: 10px;
        position: relative;
        flex-grow: 1;

        &.closed:before {
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

    .title {
        font-weight: 700;
        min-height: 35px;
        font-size: 14px;
        color: var(--ion-text-color, #000);
    }
}
</style>
