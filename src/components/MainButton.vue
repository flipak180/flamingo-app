<template>
    <div class="main-button" @click="click">
        <span v-if="!isActive">GO</span>
        <ion-icon aria-hidden="true" :icon="close" v-else />
    </div>
</template>

<script>
import {IonIcon} from "@ionic/vue";
import {close} from 'ionicons/icons';

export default {
    name: "MainButton",
    components: { IonIcon },
    data() {
        return {
            close,
            isActive: false,
        }
    },
    methods: {
        click() {
            this.emitter.emit('main-button-clicked');
            this.isActive = !this.isActive;
        }
    }
}
</script>

<style scoped>
.main-button {
    background: var(--pink-light);
    color: var(--pink);
    font-weight: bold;
    font-size: 36px;
    position: fixed;
    width: 80px;
    height: 80px;
    bottom: 12px;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 3px solid var(--grey-light);
}
ion-icon {
    font-size: 48px;
}
</style>
