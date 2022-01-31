import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from "@/views/HomePage";
import FavoritesPage from "@/views/FavoritesPage";
import WatchPage from "@/views/WatchPage";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/favorites/:userId',
        name: "Favorite",
        component: FavoritesPage
    },
    {
        path: '/watch',
        name: 'Watch',
        component: WatchPage
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
