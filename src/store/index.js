import { createStore } from "vuex";
import { favoritesModule } from "./favoritesModule";

export default createStore({
	modules: {
		favorites: favoritesModule,
	},
});
