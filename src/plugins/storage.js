import { Preferences } from '@capacitor/preferences';

export default {
    async get(key) {
        return Preferences.get({key}).then(res => res.value);
    },
    set(key, value) {
        return Preferences.set({key, value});
    },
    remove(key) {
        return Preferences.remove({key});
    }
}
