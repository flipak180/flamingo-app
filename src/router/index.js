import {createRouter, createWebHistory} from '@ionic/vue-router';
import Tabs from "@/components/Tabs";

const routes = [
    {
        path: '/',
        //redirect: '/onboarding'
        redirect: '/tabs/home'
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
                redirect: '/tabs/home'
            },
            {
                path: 'home',
                name: 'home',
                component: () => import('@/screens/_v2/HomeScreen'),
            },
            {
                path: 'expand',
                name: 'expand',
                component: () => import('@/screens/ExpandScreen.vue'),
            },
            {
                path: 'swipe',
                name: 'swipe',
                component: () => import('@/screens/SwipeScreen.vue'),
            },
            {
                path: 'match',
                name: 'match',
                component: () => import('@/screens/_v2/MatchScreen.vue'),
            },
            {
                path: 'quests',
                name: 'quests',
                component: () => import('@/screens/_v2/QuestsScreen.vue'),
            },
            // {
            //     path: 'home/quest',
            //     component: () => import('@/screens/QuestScreen'),
            // },
            // {
            //     path: 'home/compilation',
            //     component: () => import('@/screens/CompilationScreen'),
            // },
            {
                path: 'home/single-place/:place_id',
                component: () => import('@/screens/_v2/SinglePlaceScreen'),
            },
            // {
            //     path: 'route',
            //     component: () => import('@/screens/RouteScreen'),
            // },
            {
                path: 'home/places/:place_id',
                name: 'placeDetails',
                component: () => import('@/screens/places/PlaceDetailsScreen'),
            },

            {
                path: 'categories',
                name: 'categories',
                component: () => import('@/screens/CategoriesScreen'),
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
            {
                path: 'profile/visits',
                component: () => import('@/screens/profile/VisitsScreen')
            },
            {
                path: 'profile/planning',
                name: 'planning',
                component: () => import('@/screens/profile/PlanningScreen')
            },

            {
                path: 'catalog',
                name: 'catalog',
                component: () => import('@/screens/places/CatalogScreen')
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

// router.beforeEach(async (to, from, next) => {
//     const profileStore = useProfileStore();
//     const mainStore = useMainStore();
//
//     if (!mainStore.onBoardingComplete && !to.path.startsWith('/onboarding')) {
//         next({ name: 'onboarding' });
//         return;
//     }
//
//     if (mainStore.onBoardingComplete && to.name === 'onboarding') {
//         next({ name: 'login' });
//         return;
//     }
//
//     if (!profileStore.phone && to.name !== 'login' && !to.path.startsWith('/onboarding')) {
//         next({ name: 'login' });
//         return;
//     }
//
//     if (profileStore.phone && to.name === 'login') {
//         next({ name: 'home' });
//         return;
//     }
//
//     next();
// });

export default router
