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
    mounted() {
        this.emitter.on('main-button-click', () => {
            this.isActive = !this.isActive;
        });
    },
    methods: {
        async click() {
            this.$router.replace('/tabs/categories');
            //this.emitter.emit('main-button-click');

            // if (this.isActive) {
            //     const modal = await modalController.create({
            //         component: SheetModal,
            //         breakpoints: [0, 0.6],
            //         initialBreakpoint: 0.6,
            //     });
            //
            //     // render modal inside active tab page, so tab switch is possible with opened modal
            //     // const activeTabPage = document.querySelector('ion-content').closest('.ion-page');
            //     const activeTabPage = document.querySelector('.tabs-inner');
            //     activeTabPage.appendChild(modal);
            //
            //     await modal.present();
            //
            //     await modal.onDidDismiss();
            //
            //     this.isActive = false;
            // } else {
            //     await modalController.dismiss();
            // }
        }
    }
}
</script>

<style scoped lang="scss">
.main-button {
    background: var(--pink-light);
    color: var(--pink);
    font-weight: bold;
    font-size: 36px;
    position: absolute;
    width: 80px;
    height: 80px;
    bottom: calc(10px + var(--ion-safe-area-bottom));
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 3px solid var(--grey-light);

    @media (prefers-color-scheme: dark) {
        border-color: var(--black);
    }
}
ion-icon {
    font-size: 48px;
}
</style>
