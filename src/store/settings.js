import {defineStore} from "pinia";

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        hideSplash: false,
    }),
    persist: {
        enabled: true,
    },
})
