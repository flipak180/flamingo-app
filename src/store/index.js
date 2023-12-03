import {defineStore} from "pinia";
import {Geolocation} from "@capacitor/geolocation";

export const useMainStore = () => {
    const innerStore = defineStore({
        id: 'main',
        state: () => ({
            coords: { latitude: 59.938784, longitude: 30.314997 },
            init: false,
            onBoardingComplete: null,
        }),
        actions: {
            async getCoords() {
                // const coordinates = await Geolocation.getCurrentPosition({
                //     enableHighAccuracy: false,
                //     maximumAge: 5000,
                // });

                await Geolocation.watchPosition({
                    enableHighAccuracy: false,
                    maximumAge: 5000,
                }, (coordinates) => {
                    this.coords.latitude = coordinates.coords.latitude;
                    this.coords.longitude = coordinates.coords.longitude;
                })

                // this.coords.latitude = coordinates.coords.latitude;
                // this.coords.longitude = coordinates.coords.longitude;
            },
        },
    });
    const s = innerStore();
    if (!s.init) {
        s.init = true;
        s.getCoords();
    }
    return s;
};
