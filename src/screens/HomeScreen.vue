<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar></ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="ion-padding">
            <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
                <ion-refresher-content />
            </ion-refresher>
            <div class="ion-margin-top ion-text-center" v-if="isLoading">
                <ion-spinner />
            </div>

            <div>
                <h2>Актуальное</h2>
                <div class="cards-list">
                    <div class="card-item" @click="$router.push('/tabs/categories/2')">
                        <div class="card-item__image" :style="{ backgroundImage: `url(${require('@/assets/images/1.jpg')})` }">
                            <div class="card-item__info card-item__info_color_light card-item__info_type_bg">
                                <div class="card-item__type">Подборка</div>
                                <div class="card-item__title">Никто не забыт, ничто не забыто!</div>
                            </div>
                        </div>
                        <div class="places-list">
                            <div class="place-item">
                                <div class="place-item__image" :style="{ background: randomColor() }" v-once></div>
                                <div class="place-item__title">Парк Победы</div>
                                <div class="place-item__actions">
                                    <ion-button size="small">Я тут</ion-button>
                                </div>
                            </div>
                            <div class="place-item">
                                <div class="place-item__image" :style="{ background: randomColor() }" v-once></div>
                                <div class="place-item__title">Музей блокады Ленинграда</div>
                                <div class="place-item__actions">
                                    <ion-button size="small">Я тут</ion-button>
                                </div>
                            </div>
                            <div class="place-item">
                                <div class="place-item__image" :style="{ background: randomColor() }" v-once></div>
                                <div class="place-item__title">Пискаревское мемориальное кладбище</div>
                                <div class="place-item__actions">
                                    <ion-button size="small" color="success">
                                        <ion-icon slot="icon-only" :icon="checkmarkOutline" />
                                    </ion-button>
<!--                                    <ion-icon :icon="checkmarkOutline" />-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-item" @click="$router.push('/tabs/categories/2')">
                        <div class="card-item__image" :style="{ backgroundImage: `url(${require('@/assets/images/2.jpg')})` }">
                            <div class="card-item__info card-item__info_color_light card-item__info_position_bottom">
                                <div class="card-item__type">Маршрут</div>
                                <div class="card-item__title">Король и Шут. Между Купчино и Ржевкой</div>
                            </div>
                        </div>
                    </div>
                    <div class="card-item" @click="$router.push('/tabs/categories/2')" >
                        <div class="card-item__image" :style="{ backgroundImage: `url(${require('@/assets/images/3.jpg')})` }">
                            <div class="card-item__info card-item__info_color_light card-item__info_type_bg">
                                <div class="card-item__type">Достопримечательность</div>
                                <div class="card-item__title">Люблю тебя, Петра творенье</div>
                            </div>
                        </div>
                        <div class="places-list">
                            <div class="place-item">
                                <div class="place-item__image" :style="{ background: randomColor() }" v-once></div>
                                <div class="place-item__title">Медный всадник</div>
                                <div class="place-item__actions">
                                    <ion-button size="small">Я тут</ion-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

<!--                <h2>Подборки</h2>-->
<!--                <CategoriesGrid :categories="categories" />-->
            </div>
        </ion-content>
        <CardModal />
    </ion-page>
</template>

<script>
import '@/theme/cards.scss';
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
import {settingsOutline, checkmarkOutline} from "ionicons/icons";
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
            checkmarkOutline,
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
        randomColor() {
            return '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
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
