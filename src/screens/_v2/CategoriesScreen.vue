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
                <ion-searchbar placeholder="Место, категория, статья и др." ref="search" v-model="searchString"
                               :debounce="1000" @ionClear="this.searchString = ''" @ionInput="onSearch"></ion-searchbar>
            </ion-toolbar>
        </ion-header>
        <ion-content v-if="searchString">
            <ion-list>
                <ion-item v-for="result in searchResults" @click="onSearchResultClick(result)">
                    <ion-icon aria-hidden="true" :icon="getSearchResultIcon(result.type)" slot="start"></ion-icon>
                    <ion-label>{{ result.title }}</ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
        <ion-content class="ion-padding" v-else>
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
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonSearchbar,
    IonSpinner,
    IonTitle,
    IonToolbar
} from "@ionic/vue";
import BackButton from "@/components/BackButton.vue";
import CardModal from "@/components/CardModal.vue";
import CardsList from "@/components/_v2/ArticlesList.vue";
import api from "@/plugins/api";
import CategoryItem from "@/components/_v2/CategoryItem.vue";
import {flameOutline, footstepsOutline, listOutline, searchOutline} from "ionicons/icons";

export default {
    name: "HomeScreen",
    components: {
        CategoryItem,
        IonRefresher, CardsList, IonRefresherContent, IonSpinner, CardModal,
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, BackButton, IonIcon, IonButton, IonSearchbar,
        IonList, IonItem, IonLabel
    },
    data() {
        return {
            categories: [],
            isLoading: false,
            isSearchVisible: false,

            searchOutline,
            footstepsOutline,
            listOutline,
            flameOutline,

            searchString: '',
            searchResults: [],
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
            this.isSearchVisible = !this.isSearchVisible;
            //this.$refs.search.setFocus();
        },
        onSearch() {
            if (!this.searchString) {
                return;
            }

            this.isLoading = true;
            return api.get(`/search?term=${this.searchString}`).then(res => {
                this.searchResults = res.data;
            }).finally(() => this.isLoading = false);
        },
        getSearchResultIcon(type) {
            switch (type) {
                case 'place':
                    return this.searchOutline;
                case 'category':
                    return this.listOutline;
                case 'quest':
                    return this.footstepsOutline;
                case 'article':
                    return this.flameOutline;
                default:
                    return this.searchOutline;
            }
        },
        onSearchResultClick(result) {
            switch (result.type) {
                case 'place':
                    return this.$router.push({ name: 'placeDetails', params: { place_id: result.id } });
                case 'category':
                    return this.$router.push({ name: 'category', params: { category_id: result.id } });
                case 'quest':
                    return this.$router.push({ name: 'quest', params: { quest_id: result.id } });
                case 'article':
                    return this.$router.push({ name: 'article', params: { id: result.id } });
            }
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
