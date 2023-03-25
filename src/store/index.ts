import { defineStore } from "pinia";

export const useMainStore = defineStore('main', {
    state: () => ({ coords: { latitude: 0, longitude: 0 } }),
    actions: {
        setCoords(latitude: number, longitude: number) {
            this.coords.latitude = latitude;
            this.coords.longitude = longitude;
        },
    },
})
