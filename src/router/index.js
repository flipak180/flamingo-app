import {createRouter, createWebHistory} from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes = [
    {
        path: '/',
        redirect: '/tabs/places'
    },
    {
        path: '/tabs/',
        component: TabsPage,
        children: [
            {
                path: '',
                redirect: '/tabs/places'
            },
            {
                path: 'places',
                component: () => import('@/views/PlacesPage.vue'),
            },
            {
                path: 'profile',
                component: () => import('@/views/ProfilePage.vue')
            },
        ]
    },
    {
        path: '/map/:place_id?',
        name: 'map',
        component: () => import('@/views/PlaceMapPage.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
