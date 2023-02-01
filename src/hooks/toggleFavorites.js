import { ref } from 'vue';
import store from '@/store';

export function toggleFavorites(people) {
	const objPeople = Object.assign({}, people);
	const isFavorite = ref(false);

	// Определяем при загрузке избранная или нет
	const initFavorite = () => {
		let favorites = JSON.parse(window.localStorage.favoritePeoples);
		isFavorite.value = favorites.findIndex(item => item.url === objPeople.url) !== -1;
	};
	initFavorite();

	// Проверяем есть ли в избранных
	const checkFavorite = (allFavorites) => allFavorites.findIndex(item => item.url === objPeople.url) !== -1;

	// Добавление в избранные
	const addFavorite = (allFavorites) => {
		allFavorites.push(objPeople);
		localStorage.setItem('favoritePeoples', JSON.stringify(allFavorites));
		isFavorite.value = true;
	};

	// Удаление из избранных
	const removeFavorite = (allFavorites) => {
		let favoriteIndex = allFavorites.findIndex(item => item.url === objPeople.url);
		allFavorites.splice(favoriteIndex, 1);
		localStorage.setItem('favoritePeoples', JSON.stringify(allFavorites));
		isFavorite.value = false;
	};

	// Переключение кнопки "избранный"
	const toggleButtonFavorite = () => {
		let favorites = JSON.parse(window.localStorage.favoritePeoples);
		if (!checkFavorite(favorites)) {
			addFavorite(favorites);
		} else {
			removeFavorite(favorites);
		}

		// Актуализировать избранные в Vuex из localStorage
		store.dispatch('favorites/getFavoritePeoples');
	};

	return {
		isFavorite,
		toggleButtonFavorite,
	}
}
