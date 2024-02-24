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
import MyCoordinates from "@/components/MyCoordinates.vue";
import BackButton from "@/components/BackButton.vue";
import CategoriesGrid from "@/components/categories/CategoriesGrid.vue";
import CatalogCategory from "@/components/categories/CatalogCategory.vue";
import RouteCategory from "@/components/categories/RouteCategory.vue";
import QuestCategory from "@/components/categories/QuestCategory.vue";
import CardModal from "@/components/CardModal.vue";
import PlacesFilter from "@/components/_v2/PlacesFilter.vue";
import {randomColor} from "@/utils/helper";
import api from "@/plugins/api";
import {mapState} from "pinia";
import {useUserQuestsStore} from "@/store/userQuests";
import QuestListItem from "@/components/quests/QuestListItem.vue";

export default {
    name: "HomeScreen",
    components: {
        QuestListItem,
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, BackButton, IonIcon, IonButton,
        IonSpinner, IonRefresher, IonRefresherContent,
        MyCoordinates, CategoriesGrid, CardModal, PlacesFilter,
        CatalogCategory, RouteCategory, QuestCategory
    },
    data() {
        return {
            quests: [],
            isLoading: false,
            filtersVisible: true,
            lastScrollTop: null,

            shuffleOutline,
            optionsOutline,
        }
    },
    computed: {
        ...mapState(useUserQuestsStore, ['userQuests'])
    },
    mounted() {
        this.fetch();
    },
    methods: {
        randomColor,
        fetch() {
            this.isLoading = true;
            return api.get(`/quests/list`).then(res => {
                this.quests = res.data;
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
            <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
                <ion-refresher-content />
            </ion-refresher>
            <div class="ion-margin-top ion-text-center" v-if="isLoading">
                <ion-spinner />
            </div>
            <div class="cards-list">
                <QuestListItem v-for="quest in quests" :key="quest.id" :quest="quest" />
            </div>
            <p class="the-end">На этом пока всё</p>
        </ion-content>
        <CardModal />
    </ion-page>
</template>

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

.cards-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
    margin-bottom: 50px;
}
</style>
