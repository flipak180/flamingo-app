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
                component: () => import('@/views/PlacesPage.vue')
            },
            {
                path: 'profile',
                component: () => import('@/views/ProfilePage.vue')
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
