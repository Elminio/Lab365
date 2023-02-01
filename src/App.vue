<template>
	<v-app>
		<v-main>
			<app-header />
			<div class="wrapper">
				<router-view />
			</div>
			<app-footer />
		</v-main>
	</v-app>
</template>

<script>
import AppHeader from './components/layout/AppHeader.vue'; // Компонент: шапка
import AppFooter from './components/layout/AppFooter.vue'; // Компонент: подвал

export default {
	components: {
		AppHeader,
		AppFooter,
	},

	setup() {
		// Добавить в localStorage массив для хранения всех избранных персонажей
		const addLocalObjectFavoritePeoples = () => {
			if (!localStorage['favoritePeoples']) {
				localStorage.setItem('favoritePeoples', JSON.stringify([]));
			}
		}
		addLocalObjectFavoritePeoples();
	},
	
}
</script>

<style>
	html {
		overflow: auto !important;
	}

	.wrapper {
		min-height: calc(100vh - 232px);
	}
</style>
