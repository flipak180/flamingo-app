<template>
    <ion-modal ref="modal" trigger="open-filters-modal" :initial-breakpoint="0.5" :breakpoints="[0, 0.25, 0.5, 0.75]">
        <ion-content class="ion-padding">
            <div class="h2">Фильтры</div>
        </ion-content>
    </ion-modal>
</template>

<script>
import {IonContent, IonModal} from "@ionic/vue";

export default {
    name: "FiltersModal",
    components: { IonModal, IonContent }
}
</script>

<style scoped>

</style>
