<script setup>
import {IonButton} from "@ionic/vue";
import {ref} from "vue";

const tags = ref([
    'Крытый',
    'Открытый',
    'Бесплатный',
    'С прокатом',
]);
</script>

<template>
    <div class="tags-list ion-padding">
        <h3 class="text-center">Фильтры</h3>
        <div class="tags-list__cont">
            <ion-button v-for="(tag, i) in tags" :key="i" :color="'light'" expand="block">
                {{ tag }}
            </ion-button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.tags-list {
    width: 100%;
    min-height: 300px;

    h3 {
        margin-bottom: 30px;
    }

    &__cont {
        display: grid;
        align-items: center;
        justify-content: center;
        gap: 15px;
        grid-template-columns: 1fr;
        //grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }

    ion-button {
        min-height: 44px;
    }
}
</style>
