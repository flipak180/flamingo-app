<template>
    <div class="props-list">
<!--        <div class="props-list__item props-list__item-active">-->
<!--            <div class="props-list__name">Награда</div>-->
<!--            <div class="props-list__value">500</div>-->
<!--        </div>-->
        <div class="props-list__item" @click="$router.push({ name: 'map' });">
            <div class="props-list__name">Локация</div>
            <div class="props-list__value">
                <ion-icon :icon="mapOutline"></ion-icon>
            </div>
        </div>
        <div class="props-list__item">
            <div class="props-list__name">Дистанция</div>
            <div class="props-list__value">6.5 км</div>
        </div>
        <div class="props-list__item">
            <div class="props-list__name">Длительность</div>
            <div class="props-list__value">4 часа</div>
        </div>
        <div class="props-list__item">
            <div class="props-list__name">Заданий</div>
            <div class="props-list__value">11</div>
        </div>
<!--        <div class="props-list__item">-->
<!--            <div class="props-list__name">Сложность</div>-->
<!--            <div class="props-list__value">Низкая</div>-->
<!--        </div>-->
    </div>
</template>

<script>
import {mapOutline} from "ionicons/icons";
import {IonIcon} from "@ionic/vue";

export default {
    name: "PropsList",
    components: { IonIcon },
    data() {
        return {
            mapOutline
        }
    }
}
</script>

<style scoped lang="scss" src="./PropsList.scss">

</style>
