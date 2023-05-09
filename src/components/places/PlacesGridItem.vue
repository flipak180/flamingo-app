<template>
    <div class="place">
        <div class="image" :style="{ background: randomColor() }" v-once></div>
        <div class="content">
            <div class="title">{{ place.title }}</div>
            <div class="buttons">
                <ion-button size="small" :disabled="!atPlace(place)" @click="visit(place)">Я тут</ion-button>
                <ion-button size="small" @click="openMap(place)">
                    <ion-icon slot="icon-only" :icon="mapOutline"></ion-icon>
                </ion-button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapOutline} from "ionicons/icons";
import {atPlace} from "@/models/Place";
import {mapState} from "pinia";
import {useProfileStore} from "@/store/profile";
import api from "@/plugins/api";
import {IonButton, IonIcon, toastController} from "@ionic/vue";

export default {
    name: "PlacesGridItem",
    components: {
        IonButton, IonIcon,
    },
    props: ['place'],
    data() {
        return {
            mapOutline,
            atPlace,
        }
    },
    computed: {
        ...mapState(useProfileStore, ['phone'])
    },
    methods: {
        async openMap(place) {
            this.$router.push({ name: 'map', params: { place_id: place.place_id } });
        },
        async visit(place) {
            await api.post('/places/visit', {
                place_id: place.place_id,
                phone: this.phone,
            }).then(async (res) => {
                const toast = await toastController.create({
                    message: 'Визит сохранен',
                    duration: 1500,
                });
                await toast.present();
            }).catch(async (res) => {
                const toast = await toastController.create({
                    message: res?.response?.data?.message || 'Произошла ошибка',
                    color: 'danger',
                    duration: 1500,
                });
                await toast.present();
            });
        },
        randomColor() {
            return '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
        }
    }
}
</script>

<style lang="scss" scoped>
    .place {
        background: var(--ion-card-background, var(--ion-item-background, var(--ion-background-color, #fff)));
        box-shadow: rgba(0, 0, 0, 0.12) 0 4px 16px;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 15px;
        display: flex;

        .image {
            display: block;
            flex: 0 0 75px;
            background: #2dd36f;
        }

        .content {
            padding: 10px;
        }

        .title {
            font-weight: 700;
            min-height: 35px;
            font-size: 14px;
            color: var(--ion-text-color, #000);
        }
    }
</style>
