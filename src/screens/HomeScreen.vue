<template>
    <ion-page>
        <ion-content class="ion-padding">
            <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
                <ion-refresher-content />
            </ion-refresher>
            <div class="ion-margin-top ion-text-center" v-if="isLoading">
                <ion-spinner />
            </div>

            <div>
                <h2>Актуальное</h2>
                <div class="cards-list">
                    <div class="card-item"
                         @click="$router.push('/tabs/categories/2')" style="background-image: url('https://7oom.ru/powerpoint/fony-dlya-prezentacii-po-istorii-03.jpg')">
                        <div class="card-item__info">
                            <div class="card-item__type">Подборка</div>
                            <div class="card-item__title">Никто не забыт, ничто не забыто!</div>
                        </div>
                    </div>
                    <div class="card-item"
                         @click="$router.push('/tabs/categories/2')" style="background-image: url('https://avatars.mds.yandex.net/i?id=1fb54feba749cd90e6b320e2cce0eba6dad6183e-8427413-images-thumbs&n=13')">
                        <div class="card-item__info">
                            <div class="card-item__type">Маршрут</div>
                            <div class="card-item__title">Король и Шут. Между Купчино и Ржевкой</div>
                        </div>
                    </div>
                </div>

                <h2>Подборки</h2>
                <CategoriesGrid :categories="categories" />
            </div>
        </ion-content>
        <CardModal />
    </ion-page>
</template>

<script>
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader, IonIcon,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonSpinner,
    IonTitle,
    IonToolbar
} from "@ionic/vue";
import MyCoordinates from "@/components/MyCoordinates";
import BackButton from "@/components/BackButton";
import CategoriesGrid from "@/components/categories/CategoriesGrid";
import api from "@/plugins/api";
import {TYPE_CATALOG, TYPE_QUEST, TYPE_ROUTE} from "@/models/Category";
import CatalogCategory from "@/components/categories/CatalogCategory";
import RouteCategory from "@/components/categories/RouteCategory";
import QuestCategory from "@/components/categories/QuestCategory";
import {settingsOutline} from "ionicons/icons";
import CardModal from "@/components/CardModal";

export default {
    name: "HomeScreen",
    components: {
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, BackButton, IonIcon, IonButton,
        IonSpinner, IonRefresher, IonRefresherContent,
        MyCoordinates, CategoriesGrid, CardModal,
        CatalogCategory, RouteCategory, QuestCategory,
    },
    data() {
        return {
            categories: [],
            isLoading: true,

            TYPE_CATALOG,
            TYPE_ROUTE,
            TYPE_QUEST,

            settingsOutline,
        }
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            return api.get(`/categories/list`).then(res => {
                this.categories = res.data;
            }).finally(() => this.isLoading = false);
        },
        refresh(event) {
            this.fetch(false).then(() => {
                event.target.complete();
            });
        },
    }
}
</script>

<style lang="scss" scoped>
h2 {
    margin: 30px 0 20px;

    &:first-child {
        margin-top: 0;
    }
}

.cards-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
}

.card-item {
    border-radius: 10px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.12) 0 4px 16px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    height: 300px;
    overflow: hidden;
    transition: transform 0.1s;

    &:hover {
        transform: scale(0.95);
    }

    &__info {
        padding: 15px;
        background: rgba(0, 0, 0, 0.5);
    }

    &__type {
        color: var(--grey);
        text-transform: uppercase;
        font-weight: bold;
        font-size: 13px;
        margin-bottom: 10px;
    }

    &__title {
        color: #fff;
        font-size: 20px;
        font-weight: 700;
        //padding: 10px;
    }
}
</style>
