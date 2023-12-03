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
        <ion-content class="ion-padding"
                     :scroll-events="true"
                     @ionScroll="onScroll($event)">
            <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
                <ion-refresher-content />
            </ion-refresher>
            <div class="ion-margin-top ion-text-center" v-if="isLoading">
                <ion-spinner />
            </div>

            <div>
                <!--<h2>Актуальное</h2>-->
                <CardsList :events="events" />

<!--                <h2>Подборки</h2>-->
<!--                <CategoriesGrid :categories="categories" />-->
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
    IonHeader,
    IonIcon,
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
import CardsList from "@/components/_v2/CardsList";
import PlacesFilter from "@/components/_v2/PlacesFilter";
import * as turf from '@turf/turf'
import {calcCrow} from "@/models/Place";

export default {
    name: "HomeScreen",
    components: {
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, BackButton, IonIcon, IonButton,
        IonSpinner, IonRefresher, IonRefresherContent,
        MyCoordinates, CategoriesGrid, CardModal, PlacesFilter,
        CatalogCategory, RouteCategory, QuestCategory, CardsList
    },
    data() {
        return {
            events: [],
            isLoading: false,
            filtersVisible: true,
            lastScrollTop: null,

            shuffleOutline,
            optionsOutline,

            TYPE_CATALOG,
            TYPE_ROUTE,
            TYPE_QUEST,
        }
    },
    mounted() {
        this.fetch();

        const point = [59.837910, 30.509150];
        const polygon = [
            [
                59.98334173,
                30.209710504
            ],
            [
                59.978994563,
                30.207466715
            ],
            [
                59.982435586,
                30.189184779
            ],
            [
                59.985360174,
                30.187253588
            ],
            [
                59.986340128,
                30.192159906
            ],
            [
                59.985501511,
                30.19323279
            ],
            [
                59.98334173,
                30.209710504
            ]
        ];

        //console.log(distanceToPolygon(point, polygon));

        const point2 = [59.837910, 30.509150];
        const point22 = {latitude: 59.837910, longitude: 30.509150};
        const point3 = [59.843698, 30.485178];
        const point33 = {latitude: 59.843698, longitude: 30.485178};

        var distance = turf.distance(point2, point3);
        console.log(distance);
        console.log(calcCrow(point22, point33));
    },
    methods: {
        fetch() {
            return api.get(`/events/list`).then(res => {
                this.events = res.data;
            }).finally(() => this.isLoading = false);
        },
        refresh(event) {
            this.fetch(false).then(() => {
                event.target.complete();
            });
        },
        onScroll(e) {
            if (!this.lastScrollTop) {
                this.lastScrollTop = e.detail.scrollTop;
            }
            if (e.detail.scrollTop > 250 && this.lastScrollTop < e.detail.scrollTop) {
                this.filtersVisible = false;
            } else {
                this.filtersVisible = true;
            }
            this.lastScrollTop = e.detail.scrollTop;
        },
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
