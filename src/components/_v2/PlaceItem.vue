<template>
    <div class="place-item" :class="{'place-item_active': isActive}" @click="onClick"
         @mousedown="startTouch" @mouseup="endTouch" @mouseout="endTouch"
         @touchstart="startTouch" @touchend="endTouch" @touchmove="endTouch"  >
        <div class="place-item__header">
            <div class="place-item__title">{{ place.title }}</div>
        </div>
        <div class="place-item__content">
            <div class="place-item__image" :style="{ background: image }"></div>
        </div>
    </div>
</template>

<script>
import {IonButton, IonIcon} from "@ionic/vue";
import randomColor from "randomcolor"

export default {
    name: "ArticleItem",
    props: ['place'],
    data() {
        return {
            isActive: false,
        }
    },
    components: {
        IonIcon, IonButton
    },
    computed: {
        image() {
            return this.place.image ? `url(https://flamingo.spb.ru/${this.place.image})` : randomColor({
                hue: 'green',
                luminosity: 'light',
            });
        }
    },
    methods: {
        startTouch() {
            this.isActive = true;
        },
        endTouch() {
            this.isActive = false;
        },
        onClick() {
            this.$router.push({ name: 'placeDetails', params: { place_id: this.place.id } });
        }
    }
}
</script>

<style scoped lang="scss">
.place-item {
    $this: &;

    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.12) 0 4px 16px;
    overflow: hidden;
    transition: transform 0.4s;

    @media (prefers-color-scheme: dark) {
        box-shadow: none;
    }

    &_active {
        transform: scale(0.97);
    }

    &__header {
        background: #fff;
        padding: 15px;
        width: 100%;

        @media (prefers-color-scheme: dark) {
            background: var(--black-light);
        }
    }

    &__content {

    }

    &__image {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        height: 300px;
        position: relative;
    }

    &__title {
        color: var(--black);
        font-size: 20px;
        font-weight: 700;

        @media (prefers-color-scheme: dark) {
            color: #fff;
        }
    }

    &__info {
        padding: 15px;
        width: 100%;

        &_position_bottom {
            position: absolute;
            bottom: 0;
        }

        &_color_light {
            #{$this}__type {

            }

            #{$this}__title {
                color: #fff;
            }
        }

        &_color_dark {
            #{$this}__type {

            }

            #{$this}__title {
                color: #000;
            }
        }

        &_type_bg {
            // background: rgba(0, 0, 0, 0.5);
            background: #fff;
            color: #000;

            @media (prefers-color-scheme: dark) {
                background: #000;
                color: #fff;
            }
        }
    }
}
</style>
