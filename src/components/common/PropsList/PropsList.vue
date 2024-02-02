<template>
    <div class="props-list" :class="{ 'props-list_bordered': bordered }">
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
            <div class="props-list__name">Заданий</div>
            <div class="props-list__value">10</div>
        </div>
        <div class="props-list__item">
            <div class="props-list__name">Дистанция</div>
            <div class="props-list__value">3.2 км</div>
        </div>
        <div class="props-list__item">
            <div class="props-list__name">Длительность</div>
            <div class="props-list__value">1.5 часа</div>
        </div>
<!--        <div class="props-list__item">-->
<!--            <div class="props-list__name">Сложность</div>-->
<!--            <div class="props-list__value">Низкая</div>-->
<!--        </div>-->
    </div>
</template>

<script>
import {mapOutline} from "ionicons/icons";
import {IonButton, IonIcon} from "@ionic/vue";

export default {
    name: "PropsList",
    props: ['bordered'],
    components: {IonButton, IonIcon },
    data() {
        return {
            mapOutline
        }
    }
}
</script>

<style scoped lang="scss">
.props-list {
    padding: 10px 0;
    margin: 0 10px;
    display: flex;
    gap: 30px;
    text-align: center;
    overflow-x: scroll;

    &_bordered {
        border-top: 1px solid rgba(var(--contrast), 0.2);
        border-bottom: 1px solid rgba(var(--contrast), 0.2);
        margin: 10px 0;
    }

    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
    &::-webkit-scrollbar {
        display: none;  /* Safari and Chrome */
    }

    &__item {
        position: relative;

        &:after {
            content: '';
            position: absolute;
            right: -15px;
            top: 50%;
            transform: translate(0, -50%);
            height: 85%;
            width: 1px;
            background: rgba(var(--contrast), 0.2);
        }

        &:last-child:after {
            display: none;
        }

        &-active {

            .props-list__name,
            .props-list__value {
                color: var(--pink);
            }
        }
    }

    &__name {
        color: rgba(var(--black-rgba), 0.5);
        text-transform: uppercase;
        font-weight: bold;
        font-size: 13px;
        margin-bottom: 10px;
        letter-spacing: 0.5px;

        @media (prefers-color-scheme: dark) {
            color: rgba(255, 255, 255, 0.5);
        }
    }

    &__value {
        color: rgba(var(--black-rgba), 0.5);
        font-size: 20px;
        font-weight: bold;

        @media (prefers-color-scheme: dark) {
            color: rgba(255, 255, 255, 0.5);
        }

        ion-icon {
            font-size: 24px;
        }
    }
}
</style>
