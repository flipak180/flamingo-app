import {createRouter, createWebHistory} from '@ionic/vue-router';
import Tabs from "@/components/Tabs";
import {useProfileStore} from "@/store/profile";

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/screens/auth/LoginScreen.vue')
    },
    {
        path: '/tabs/',
        component: Tabs,
        children: [
            {
                path: '',
                name: 'home',
                redirect: '/tabs/places'
            },
            {
                path: 'places',
                component: () => import('@/screens/places/PlacesScreen.vue'),
            },
            {
                path: 'profile',
                component: () => import('@/screens/profile/ProfileScreen.vue')
            },
        ]
    },
    {
        path: '/map/:place_id?',
        name: 'map',
        component: () => import('@/screens/places/PlaceMapScreen.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(async (to, from, next) => {
    const store = useProfileStore();

    if (!store.phone && !['login', 'lkLogin'].includes(to.name)) {
        next({ name: 'login' });
        return;
    }

    if (store.phone && to.name === 'login') {
        next({ name: 'home' });
        return;
    }

    next();
});

export default router
