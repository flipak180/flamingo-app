<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <FlamingoTitle @click="onTitleClick" />
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
<!--            <ion-refresher slot="fixed" @ionRefresh="refresh($event)">-->
<!--                <ion-refresher-content />-->
<!--            </ion-refresher>-->

            <div class="ion-margin-top ion-text-center" v-if="isLoading">
                <ion-spinner />
            </div>

            <div class="filter-wrap">
                <ion-button color="light" expand="block" @click="onTitleClick">
                    <ion-icon slot="start" :icon="filterOutline"></ion-icon>
                    Фильтровать
                </ion-button>
                <ion-button color="light" expand="block" @click="onTitleClick">
                    <ion-icon slot="start" :icon="swapVerticalOutline"></ion-icon>
                    Сортировать
                </ion-button>
            </div>

            <ArticlesList :articles="articles" />
            <ion-infinite-scroll @ionInfinite="loadMore" :disabled="scrolledToEnd">
                <ion-infinite-scroll-content></ion-infinite-scroll-content>
            </ion-infinite-scroll>
            <p class="the-end" v-if="scrolledToEnd">На этом пока всё</p>
        </ion-content>
    </ion-page>
</template>

<script setup>
import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonPage,
    IonSpinner,
    IonToolbar
} from "@ionic/vue";
import api from "@/plugins/api";
import ArticlesList from "@/components/_v2/ArticlesList.vue";
import {onMounted, ref} from "vue";
import FlamingoTitle from "@/components/FlamingoTitle.vue";
import {useRouter} from "vue-router";
import {filterOutline, swapVerticalOutline} from "ionicons/icons";

const router = useRouter()

const articles = ref([]);
const pageSize = ref(10);
const currentPage = ref(0);
const titleClicked = ref(0);
const scrolledToEnd = ref(false);
const isLoading = ref(false);

function fetch() {
    isLoading.value = true;
    return api.get(`/articles/list?limit=${pageSize.value}&offset=${currentPage.value * pageSize.value}`).then(res => {
        if (currentPage.value) {
            articles.value.push(...res.data)
        } else {
            articles.value = res.data;
        }
        if (res.data.length < pageSize.value) {
            scrolledToEnd.value = true;
        }
    }).finally(() => isLoading.value = false);
}

function onTitleClick() {
    titleClicked.value++;
    if (titleClicked.value === 5) {
        router.push({ name: 'system' });
    }

    setTimeout(() => {
        titleClicked.value = 0;
    }, 2000)
}

// function refresh(event) {
//     resetPager();
//     fetch().then(() => {
//         event.target.complete();
//     });
// }
//
// function resetPager() {
//     currentPage.value = 0;
//     scrolledToEnd.value = false;
// }

function loadMore(ev) {
    currentPage.value++;
    fetch().then(() => ev.target.complete());
}

onMounted(() => {
    fetch();
})
</script>

<style lang="scss" scoped>
//ion-content {
//    --padding-top: calc(var(--ion-padding, 16px) + var(--ion-safe-area-top));
//}

.filter-wrap {
    display: flex;
    gap: 15px;
    margin-bottom: 15px;
}
</style>
