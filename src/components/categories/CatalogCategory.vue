<template>
    <CategoriesGrid :categories="category.children || []" />
    <PlacesGrid :places="category.places" />
</template>

<script>
import CategoriesGrid from "@/components/categories/CategoriesGrid.vue";
import PlacesGrid from "@/components/places/PlacesGrid.vue";

export default {
    name: "CatalogCategory",
    components: { CategoriesGrid, PlacesGrid },
    props: ['category']
}
</script>

<style scoped>

</style>
