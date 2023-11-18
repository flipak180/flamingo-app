<template>
    <ion-back-button color="dark" :icon="chevronBack" :text="text || '&nbsp;&nbsp;&nbsp;'" style="padding-left: 7px;" class="back-button"></ion-back-button>
</template>

<script>
import {chevronBack} from "ionicons/icons";
import {IonBackButton, useBackButton} from "@ionic/vue";

export default {
    name: "BackButton",
    props: ['text'],
    components: {IonBackButton},
    data() {
        return {
            chevronBack
        }
    },
    mounted() {
        useBackButton(101, () => {
            // .can-go-back:not(.ion-page-hidden) .back-button
            const backBtn = document.querySelector('.can-go-back:not(.ion-page-hidden) .back-button');
            // const backBtn = document.getElementById('back-button');
            if (backBtn) backBtn.click();
        });
    }
}
</script>

<style scoped lang="scss">

</style>
