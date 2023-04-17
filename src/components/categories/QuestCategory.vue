<template>
    <PlacesGrid :places="category.places" />
</template>

<script>
import PlacesGrid from "@/components/places/PlacesGrid";

export default {
    name: "QuestCategory",
    components: { PlacesGrid },
    props: ['category']
}
</script>

<style scoped>

</style>
