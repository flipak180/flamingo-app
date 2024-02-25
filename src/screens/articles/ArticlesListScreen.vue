<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
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
    IonContent,
    IonHeader,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonPage,
    IonSpinner,
    IonTitle,
    IonToolbar
} from "@ionic/vue";
import api from "@/plugins/api";
import ArticlesList from "@/components/_v2/ArticlesList.vue";
import {onMounted, ref} from "vue";

const articles = ref([]);
const pageSize = ref(10);
const currentPage = ref(0);
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
</style>
