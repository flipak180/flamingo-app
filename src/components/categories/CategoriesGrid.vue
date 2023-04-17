<template>
    <ion-grid>
        <ion-row>
            <ion-col v-for="category in categories" :key="category.category_id" size="1">
                <CategoriesGridItem :category="category" />
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script>
import {IonCol, IonGrid, IonRow} from "@ionic/vue";
import CategoriesGridItem from "@/components/categories/CategoriesGridItem";

export default {
    name: "CategoriesGrid",
    components: {
        IonGrid, IonRow, IonCol, CategoriesGridItem,
    },
    props: ['categories'],
}
</script>

<style scoped>
    ion-grid {
        --ion-grid-columns: 2;
    }
</style>
