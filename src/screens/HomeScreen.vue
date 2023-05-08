<template>
    <ion-page>
        <ion-header @click="onHeaderClick">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <BackButton />
                </ion-buttons>
                <ion-title>Главная</ion-title>
                <ion-buttons slot="primary" v-show="isAdminMode">
                    <ion-button @click="$router.push({ name: 'system' })">
                        <ion-icon slot="icon-only" :icon="settingsOutline"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
                <ion-refresher-content />
            </ion-refresher>
            <div class="ion-margin-top ion-text-center" v-if="isLoading">
                <ion-spinner />
            </div>

            <div class="ion-padding-horizontal">
                <h2>Актуальное</h2>
                <div class="collections">
                    <div class="collection-item">
                        <div class="collection-item__image" style="background-image: url('https://7oom.ru/powerpoint/fony-dlya-prezentacii-po-istorii-03.jpg')">

                        </div>
                        <div class="collection-item__title">Никто не забыт, ничто не забыто!</div>
                    </div>
                    <div class="collection-item">
                        <div class="collection-item__image" style="background-image: url('https://avatars.mds.yandex.net/i?id=1fb54feba749cd90e6b320e2cce0eba6dad6183e-8427413-images-thumbs&n=13')">

                        </div>
                        <div class="collection-item__title">Король и Шут. Между Купчино и Ржевкой</div>
                    </div>
                </div>

                <h2>Подборки</h2>
            </div>



            <CategoriesGrid :categories="categories" />
            <CardModal />
        </ion-content>
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

            isAdminMode: false,
            totalClicks: 0,

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
        onHeaderClick() {
            this.totalClicks++;
            if (this.totalClicks >= 3) {
                this.isAdminMode = true;
            }
        },
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
}

.collections {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
}

.collection-item {
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 5px 10px 2px rgba(var(--black-rgba), 0.2);

    &__image {
        height: 150px;
        background-repeat: no-repeat;
        background-size: cover;
        //border-top-left-radius: 5px;
        //border-top-right-radius: 5px;

        box-shadow: 0 5px 5px -5px rgba(34, 60, 80, 0.6);
        border-radius: 10px;
    }

    &__title {
        font-size: 14px;
        font-weight: 700;
        padding: 10px;
    }
}
</style>
