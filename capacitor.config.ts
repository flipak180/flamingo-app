import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.app.flamingo',
    appName: 'FlaminGO',
    webDir: 'dist',
    server: {
        androidScheme: 'https'
    }
};

export default config;
