<template>
    <div class="cards-list">
        <CardItem v-for="card in events" :key="card.id" :card="card" />
    </div>
</template>

<script>
import CardItem from "@/components/_v2/CardItem";
import Cards from "@/utils/data/Cards";

export default {
    name: "CardsList",
    props: ['events'],
    components: { CardItem },
    data() {
        return {
            Cards
        }
    },
}
</script>

<style lang="scss" scoped>
    .cards-list {
        display: grid;
        grid-template-columns: 1fr;
        gap: 15px;
        margin-bottom: 50px;
    }
</style>
