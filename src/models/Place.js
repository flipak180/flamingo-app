import {useMainStore} from "@/store";
import robustPointInPolygon from "robust-point-in-polygon";
import api from "@/plugins/api";
import {toastController} from "@ionic/vue";

const store = useMainStore()

export const atPlace = (place) => {
    if (place.hasOwnProperty('atPlace')) {
        return place.atPlace;
    }
    // console.log(place.location[0]);
    // console.log(robustPointInPolygon(place.location[0], [store.coords.latitude, store.coords.longitude]));

    return robustPointInPolygon(place.location[0], [store.coords.latitude, store.coords.longitude]) < 1;

    const distance = calcCrow({latitude: place.latitude, longitude: place.longitude}, store.coords);
    return distance <= place.radius;
}

export const visit = async (place) => {
    if (!place.atPlace) {
        const toast = await toastController.create({
            message: 'Вы не тут :)',
            color: 'warning',
            duration: 1500,
        });
        await toast.present();
        return;
    }

    if (place.lastVisit) {
        const toast = await toastController.create({
            message: 'Вы уже тут были :)',
            color: 'warning',
            duration: 1500,
        });
        await toast.present();
        return;
    }

    const toast = await toastController.create({
        message: 'Визит сохранен',
        color: 'success',
        duration: 1500,
    });
    await toast.present();
    return;

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
}

function calcCrow(coords1, coords2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(coords2.latitude - coords1.latitude); // deg2rad below
    const dLon = deg2rad(coords2.longitude - coords1.longitude);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(coords1.latitude)) * Math.cos(deg2rad(coords2.latitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d * 1000;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}
