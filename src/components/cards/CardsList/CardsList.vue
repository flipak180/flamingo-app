<template>
    <div class="cards-list">
        <CardItem v-for="card in events" :key="card.id" :card="card" />
    </div>
</template>

<script>
import CardItem from "@/components/cards/CardItem/CardItem";
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

<style lang="scss" scoped src="./CardsList.scss"></style>
