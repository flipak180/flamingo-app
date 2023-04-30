<template>
    <div class="card-modal" :class="{'visible': isVisible}"></div>
    <div class="overlay" :class="{'visible': isVisible}"></div>
</template>

<script>
export default {
    name: "CardModal",
    data() {
        return {
            isVisible: false,
        }
    },
    mounted() {
        this.emitter.on('main-button-clicked', () => {
            this.isVisible = !this.isVisible;
        });
    }
}
</script>

<style lang="scss" scoped>
.overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 10;
    background-color: rgba(var(--black-rgba), 0.3);
    backdrop-filter: blur(2px);
    opacity: 0;
    visibility: hidden;
    transition: opacity .2s;

    &.visible {
        opacity: 1;
        visibility: visible;
    }
}

.card-modal {
    background: #fff;
    border-radius: 25px 25px 0 0;
    height: 600px;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    transition: transform .5s;
    transform: translate(0, 100%);
    z-index: 20;

    &.visible {
        transform: translate(0, 0);
    }
}
</style>
