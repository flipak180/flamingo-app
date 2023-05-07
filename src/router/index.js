import {createRouter, createWebHistory} from '@ionic/vue-router';
import Tabs from "@/components/Tabs";
import {useProfileStore} from "@/store/profile";
import {useMainStore} from "@/store";

const routes = [
    {
        path: '/',
        redirect: '/onboarding'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/screens/auth/LoginScreen')
    },
    {
        path: '/onboarding',
        name: 'onboarding',
        component: () => import('@/screens/OnboardingScreen')
    },
    {
        path: '/system',
        name: 'system',
        component: () => import('@/screens/SystemScreen')
    },
    {
        path: '/tabs/',
        component: Tabs,
        children: [
            {
                path: '',
                name: 'home',
                redirect: '/tabs/home'
            },
            {
                path: 'home',
                name: 'home',
                component: () => import('@/screens/HomeScreen'),
            },
            {
                path: 'categories/:category_id',
                name: 'category',
                component: () => import('@/screens/places/CategoryScreen'),
            },
            {
                path: 'profile',
                component: () => import('@/screens/profile/ProfileScreen')
            },
        ]
    },
    {
        path: '/map/:place_id?',
        name: 'map',
        component: () => import('@/screens/places/PlaceMapScreen'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(async (to, from, next) => {
    const profileStore = useProfileStore();
    const mainStore = useMainStore();

    if (!mainStore.onBoardingComplete && !to.path.startsWith('/onboarding')) {
        next({ name: 'onboarding' });
        return;
    }

    if (mainStore.onBoardingComplete && to.name === 'onboarding') {
        next({ name: 'login' });
        return;
    }

    if (!profileStore.phone && to.name !== 'login' && !to.path.startsWith('/onboarding')) {
        next({ name: 'login' });
        return;
    }

    if (profileStore.phone && to.name === 'login') {
        next({ name: 'home' });
        return;
    }

    next();
});

export default router
