import HomePage from '@/pages/HomePage'; // Главная
import PeoplesPage from '@/pages/PeoplesPage'; // Персонажи
import PeopleCardPage from '@/pages/PeopleCardPage'; // Карточка персонажа
import FavoritesPage from '@/pages/FavoritesPage'; // Избранные

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		component: HomePage,
	},
	{
		path: '/peoples',
		component: PeoplesPage,
	},
	{
		path: '/peoples/:id',
		component: PeopleCardPage,
	},
	{
		path: '/favorites',
		component: FavoritesPage,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router;
