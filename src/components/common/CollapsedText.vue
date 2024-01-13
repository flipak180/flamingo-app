<template>
    <div class="collapsed-text" :class="{'collapsed-text__full': isFull}">
        <slot></slot>
        <span class="collapsed-text__more" @click="showMore" v-if="!isFull">ещё</span>
    </div>
</template>

<script>
export default {
    name: "CollapsedText",
    data() {
        return {
            isFull: false,
        }
    },
    methods: {
        showMore() {
            this.isFull = true;
        }
    }
}
</script>

<style lang="scss">
.collapsed-text {
    max-height: 79px;
    overflow: hidden;
    position: relative;

    p {
        margin-top: 0;
    }

    &__full {
        max-height: 500px;
    }

    &__more {
        position: absolute;
        right: 5px;
        bottom: 3px;
        color: var(--pink);
        padding: 0 5px;
        background: #fff;

        @media (prefers-color-scheme: dark) {
            background: var(--black);
        }
    }
}
</style>
