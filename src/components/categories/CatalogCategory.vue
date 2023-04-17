<template>
    <CategoriesGrid :categories="category.children || []" />
    <PlacesGrid :places="category.places" />
</template>

<script>
import CategoriesGrid from "@/components/categories/CategoriesGrid";
import PlacesGrid from "@/components/places/PlacesGrid";

export default {
    name: "CatalogCategory",
    components: { CategoriesGrid, PlacesGrid },
    props: ['category']
}
</script>

<style scoped>

</style>
