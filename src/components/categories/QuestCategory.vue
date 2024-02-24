<template>
    <PlacesGrid :places="category.places" />
</template>

<script>
import PlacesGrid from "@/components/places/PlacesGrid.vue";

export default {
    name: "QuestCategory",
    components: { PlacesGrid },
    props: ['category']
}
</script>

<style scoped>

</style>
