import {defineStore} from "pinia";

export const useProfileStore = defineStore('profile', {
    state: () => ({ phone: null }),
})
