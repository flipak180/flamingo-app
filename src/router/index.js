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
                name: 'home',
                path: 'home',
                component: () => import('@/screens/_v2/HomeScreen'),
            },
            {
                name: 'article',
                path: 'home/single-article/:id',
                component: () => import('@/screens/_v2/SingleArticleScreen'),
            },
            // {
            //     name: 'expand',
            //     path: 'expand',
            //     component: () => import('@/screens/ExpandScreen.vue'),
            // },
            // {
            //     name: 'swipe',
            //     path: 'swipe',
            //     component: () => import('@/screens/SwipeScreen.vue'),
            // },
            {
                name: 'match',
                path: 'match',
                component: () => import('@/screens/_v2/MatchScreen.vue'),
            },
            {
                name: 'quests',
                path: 'quests',
                component: () => import('@/screens/_v2/QuestsScreen.vue'),
            },
            {
                name: 'quest',
                path: 'quests/:quest_id',
                component: () => import('@/screens/_v2/QuestCardScreen.vue'),
            },
            {
                name: 'questPlace',
                path: 'quests/:quest_id/places/:place_id',
                component: () => import('@/screens/_v2/QuestPlaceScreen.vue'),
            },
            // {
            //     path: 'home/quest',
            //     component: () => import('@/screens/QuestScreen'),
            // },
            // {
            //     path: 'home/compilation',
            //     component: () => import('@/screens/CompilationScreen'),
            // },
            // {
            //     path: 'home/single-place/:place_id',
            //     component: () => import('@/screens/_v2/SinglePlaceScreen'),
            // },
            // {
            //     path: 'route',
            //     component: () => import('@/screens/RouteScreen'),
            // },

            {
                path: 'places',
                name: 'categories',
                component: () => import('@/screens/_v2/CategoriesScreen'),
            },
            {
                path: 'places/categories/:category_id',
                name: 'category',
                component: () => import('@/screens/_v2/CategoryScreen'),
            },
            {
                path: 'places/place/:place_id',
                name: 'placeDetails',
                component: () => import('@/screens/_v2/PlaceDetailsScreen'),
            },


            {
                path: 'profile',
                component: () => import('@/screens/profile/ProfileScreen')
            },
            // {
            //     path: 'profile/visits',
            //     component: () => import('@/screens/profile/VisitsScreen')
            // },
            // {
            //     path: 'profile/planning',
            //     name: 'planning',
            //     component: () => import('@/screens/profile/PlanningScreen')
            // },
            //
            // {
            //     path: 'catalog',
            //     name: 'catalog',
            //     component: () => import('@/screens/places/CatalogScreen')
            // },
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
//     console.log(mainStore.onBoardingComplete);
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
