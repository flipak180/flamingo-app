import {createRouter, createWebHistory} from '@ionic/vue-router';
import Tabs from "@/components/Tabs.vue";
import {RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        //redirect: '/onboarding'
        redirect: '/tabs/home'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/screens/auth/LoginScreen.vue')
    },
    {
        path: '/onboarding',
        name: 'onboarding',
        component: () => import('@/screens/OnboardingScreen.vue')
    },
    {
        path: '/system',
        name: 'system',
        component: () => import('@/screens/SystemScreen.vue')
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
                component: () => import('@/screens/_v2/HomeScreen.vue'),
            },
            {
                name: 'article',
                path: 'home/single-article/:id',
                component: () => import('@/screens/_v2/SingleArticleScreen.vue'),
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
                component: () => import('@/screens/_v2/CategoriesScreen.vue'),
            },
            {
                path: 'places/categories/:category_id',
                name: 'category',
                component: () => import('@/screens/_v2/CategoryScreen.vue'),
            },
            {
                path: 'places/place/:place_id',
                name: 'placeDetails',
                component: () => import('@/screens/_v2/PlaceDetailsScreen.vue'),
            },


            {
                path: 'profile',
                component: () => import('@/screens/profile/ProfileScreen.vue')
            },
            // {
            //     path: 'profile/visits',
            //     component: () => import('@/screens/profile/VisitsScreen.vue')
            // },
            // {
            //     path: 'profile/planning',
            //     name: 'planning',
            //     component: () => import('@/screens/profile/PlanningScreen.vue')
            // },
            //
            // {
            //     path: 'catalog',
            //     name: 'catalog',
            //     component: () => import('@/screens/places/CatalogScreen.vue')
            // },
        ]
    },
    {
        path: '/map/:place_id?',
        name: 'map',
        component: () => import('@/screens/places/PlaceMapScreen.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
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
