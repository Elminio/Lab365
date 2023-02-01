export const favoritesModule = {
	state: () => ({
		favoritePeoples: JSON.parse(window.localStorage.favoritePeoples),
	}),
	mutations: {
		setFavoritePeoples(state, favorites) {
			state.favoritePeoples = favorites;
		},
	},
	actions: {
		getFavoritePeoples({commit}) {
			commit('setFavoritePeoples', JSON.parse(window.localStorage.favoritePeoples));
		},
	},
	namespaced: true,
};
