<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Flamin<span class="highlighted">GO</span></ion-title>
                <ion-buttons slot="primary">
                    <ion-button @click="onSearchBtnClick">
                        <ion-icon slot="icon-only" :icon="searchOutline"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
            <ion-toolbar v-show="isSearchVisible">
                <ion-searchbar placeholder="Место, категория, статья и др." ref="search"></ion-searchbar>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
                <ion-refresher-content />
            </ion-refresher>
            <div class="ion-margin-top ion-text-center" v-if="isLoading">
                <ion-spinner />
            </div>
            <div v-else>
                <div class="categories">
                    <CategoryItem v-for="category in categories" :key="category.id" :category="category" />
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
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonSearchbar,
    IonSpinner,
    IonTitle,
    IonToolbar
} from "@ionic/vue";
import BackButton from "@/components/BackButton";
import CardModal from "@/components/CardModal.vue";
import CardsList from "@/components/_v2/ArticlesList.vue";
import api from "@/plugins/api";
import CategoryItem from "@/components/_v2/CategoryItem.vue";
import {searchOutline} from "ionicons/icons";

export default {
    name: "HomeScreen",
    components: {
        CategoryItem,
        IonRefresher, CardsList, IonRefresherContent, IonSpinner, CardModal,
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, BackButton, IonIcon, IonButton, IonSearchbar
    },
    data() {
        return {
            categories: [],
            isLoading: false,
            isSearchVisible: false,
            searchOutline,
        }
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            this.isLoading = true;
            return api.get(`/categories/list`).then(res => {
                this.categories = res.data;
            }).finally(() => this.isLoading = false);
        },
        refresh(event) {
            this.fetch(false).then(() => {
                event.target.complete();
            });
        },
        onSearchBtnClick() {
            this.isSearchVisible = true;
            console.log(this.$refs.search);
            //this.$refs.search.setFocus();
        }
    }
}
</script>

<style lang="scss" scoped>

.categories {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
}

</style>
