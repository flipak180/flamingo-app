<template>
    <div class="article-item" :class="{'article-item_active': isActive}" @click="onClick"
         @mousedown="startTouch" @mouseup="endTouch" @mouseout="endTouch"
         @touchstart="startTouch" @touchend="endTouch" @touchmove="endTouch"  >
        <div class="article-item__header">
            <div class="article-item__type" v-if="article.type">{{ article.type }}</div>
            <div class="article-item__title">{{ article.title }}</div>
        </div>
        <div class="article-item__content">
            <div class="article-item__image" :style="{ backgroundImage: `url(https://flamingo.spb.ru/${article.image})` }"></div>
        </div>
        <div class="article-item__footer">
<!--             <ArticlePlacesList :places="article.places" />-->
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

const props = defineProps(['article'])

const router = useRouter()
const isActive = ref(false)

function startTouch() {
    isActive.value = true;
}

function endTouch() {
    isActive.value = false;
}

function onClick() {
    router.push('/tabs/articles/' + props.article.id);
}
</script>

<style scoped lang="scss">
.article-item {
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

    &__footer {
        background: #fff;

        @media (prefers-color-scheme: dark) {
            background: var(--black-light);
        }
    }

    &__image {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        height: 300px;
        position: relative;
    }

    &__type {
        color: rgba(var(--black-rgba), 0.5);
        text-transform: uppercase;
        font-weight: bold;
        font-size: 13px;
        margin-bottom: 10px;
        letter-spacing: 0.5px;

        @media (prefers-color-scheme: dark) {
            color: var(--grey);
        }
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
