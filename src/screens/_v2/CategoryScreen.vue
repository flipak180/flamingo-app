<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <BackButton />
                </ion-buttons>
                <ion-title>{{ category?.title || '' }}</ion-title>
                <ion-buttons slot="primary">
                    <ion-button @click="onFilterBtnClick">
                        <ion-icon slot="icon-only" :icon="filterOutline"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" :fullscreen="true">
            <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
                <ion-refresher-content />
            </ion-refresher>
            <div class="ion-margin-top ion-text-center" v-if="isLoading">
                <ion-spinner />
            </div>
            <div v-else>
                <PlacesList :places="places" />
                <p class="the-end">На этом пока всё</p>
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
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonSpinner,
    IonTitle,
    IonToolbar,
    modalController
} from "@ionic/vue";
import BackButton from "@/components/BackButton.vue";
import CardModal from "@/components/CardModal.vue";
import CardsList from "@/components/_v2/ArticlesList.vue";
import api from "@/plugins/api";
import CategoryItem from "@/components/_v2/CategoryItem.vue";
import PlacesList from "@/components/_v2/PlacesList.vue";
import TagsFilterModal from "@/components/_v2/TagsFilterModal.vue";
import {filterOutline} from "ionicons/icons";

export default {
    name: "HomeScreen",
    components: {
        PlacesList,
        CategoryItem,
        IonRefresher, CardsList, IonRefresherContent, IonSpinner, CardModal,
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, BackButton, IonIcon, IonButton,
    },
    data() {
        return {
            category_id: this.$route.params.category_id,
            category: null,
            places: [],
            isLoading: false,

            filterOutline
        }
    },
    mounted() {
        this.fetchPlaces();
        this.fetchCategory();
    },
    methods: {
        fetchCategory() {
            return api.get(`/categories/details?id=${this.category_id}`).then(res => {
                this.category = res.data;
            });
        },
        fetchPlaces() {
            this.isLoading = true;
            return api.get(`/places/list?category_id=${this.category_id}`).then(res => {
                this.places = res.data;
            }).finally(() => this.isLoading = false);
        },
        refresh(event) {
            this.fetchPlaces(false).then(() => {
                event.target.complete();
            });
        },
        async onFilterBtnClick() {
            const modal = await modalController.create({
                component: TagsFilterModal,
                initialBreakpoint: 1,
                breakpoints: [0, 1],
                cssClass: 'auto-height',
                handle: false
            });

            modal.present();

            const { data, role } = await modal.onWillDismiss();

            if (role === 'confirm') {
                message.value = `Hello, ${data}!`;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
ion-modal {
    --height: auto;
}
</style>
