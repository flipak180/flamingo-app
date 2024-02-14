<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="secondary">
<!--                    <ion-button>-->
<!--                        <ion-icon slot="icon-only" :icon="shuffleOutline"></ion-icon>-->
<!--                    </ion-button>-->
                </ion-buttons>
                <ion-buttons slot="primary">
<!--                    <ion-button>-->
<!--                        <ion-icon slot="icon-only" :icon="optionsOutline"></ion-icon>-->
<!--                    </ion-button>-->
                </ion-buttons>
                <ion-title>Flamin<span class="highlighted">GO</span></ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
<!--            <ion-refresher slot="fixed" @ionRefresh="refresh($event)">-->
<!--                <ion-refresher-content />-->
<!--            </ion-refresher>-->

            <div class="ion-margin-top ion-text-center" v-if="isLoading">
                <ion-spinner />
            </div>

            <CardsList :articles="articles" />
            <ion-infinite-scroll @ionInfinite="loadMore" :disabled="scrolledToEnd">
                <ion-infinite-scroll-content></ion-infinite-scroll-content>
            </ion-infinite-scroll>
            <p class="the-end" v-if="scrolledToEnd">На этом пока всё</p>
        </ion-content>
        <CardModal />
    </ion-page>
</template>

<script>
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonSpinner,
    IonTitle,
    IonToolbar
} from "@ionic/vue";
import {optionsOutline, shuffleOutline} from 'ionicons/icons';
import MyCoordinates from "@/components/MyCoordinates";
import BackButton from "@/components/BackButton";
import CategoriesGrid from "@/components/categories/CategoriesGrid";
import api from "@/plugins/api";
import {TYPE_CATALOG, TYPE_QUEST, TYPE_ROUTE} from "@/models/Category";
import CatalogCategory from "@/components/categories/CatalogCategory";
import RouteCategory from "@/components/categories/RouteCategory";
import QuestCategory from "@/components/categories/QuestCategory";
import CardModal from "@/components/CardModal";
import CardsList from "@/components/_v2/ArticlesList.vue";
import PlacesFilter from "@/components/_v2/PlacesFilter";

export default {
    name: "HomeScreen",
    components: {
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, BackButton, IonIcon, IonButton,
        IonSpinner, IonRefresher, IonRefresherContent,
        MyCoordinates, CategoriesGrid, CardModal, PlacesFilter,
        CatalogCategory, RouteCategory, QuestCategory, CardsList,
        IonInfiniteScroll, IonInfiniteScrollContent
    },
    data() {
        return {
            articles: [],
            pageSize: 10,
            currentPage: 0,
            scrolledToEnd: false,
            isLoading: false,

            shuffleOutline,
            optionsOutline,

            TYPE_CATALOG,
            TYPE_ROUTE,
            TYPE_QUEST,
        }
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            this.isLoading = true;
            return api.get(`/articles/list?limit=${this.pageSize}&offset=${this.currentPage * this.pageSize}`).then(res => {
                if (this.currentPage) {
                    this.articles.push(...res.data)
                } else {
                    this.articles = res.data;
                }
                if (res.data.length < this.pageSize) {
                    this.scrolledToEnd = true;
                }
            }).finally(() => this.isLoading = false);
        },
        refresh(event) {
            this.resetPager();
            this.fetch().then(() => {
                event.target.complete();
            });
        },
        resetPager() {
            this.currentPage = 0;
            this.scrolledToEnd = false;
        },
        loadMore(ev) {
            this.currentPage++;
            this.fetch().then(() => ev.target.complete());
        }
    }
}
</script>

<style lang="scss" scoped>
//ion-content {
//    --padding-top: calc(var(--ion-padding, 16px) + var(--ion-safe-area-top));
//}
ion-toolbar {
    --min-height: 0;
}
h2 {
    margin: 30px 0 20px;

    &:first-child {
        margin-top: 0;
    }
}
</style>
