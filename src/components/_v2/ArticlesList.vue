<template>
    <div class="articles-list">
        <ArticleItem v-for="article in articles" :key="article.id" :article="article" />
    </div>
</template>

<script>
import ArticleItem from "@/components/_v2/ArticleItem.vue";

export default {
    name: "ArticlesList",
    props: ['articles'],
    components: { ArticleItem },
    data() {
        return {

        }
    },
}
</script>

<style lang="scss">
    .articles-list {
        display: grid;
        grid-template-columns: 1fr;
        gap: 15px;
        margin-bottom: 30px;

        .place-item:last-child {
            padding-bottom: 0;
        }
    }
</style>
