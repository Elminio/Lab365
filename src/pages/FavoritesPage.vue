<template>
	<v-container fluid>
		<v-row class="d-flex justify-center">
			<v-col
				md="10"
				lg="7"
				class="px-2"
			>
				<h1 class="mb-4">Favorites Page</h1>
				<table-character
					:peoples="favorites"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

import TableCharacter from '@/components/ui/TableCharacter.vue'; // Компонент: таблица с данными

export default {
	components: {
		TableCharacter,
	},

	setup() {
		const store = useStore();

		let favorites = computed(() => store.state.favorites.favoritePeoples);

		return {
			favorites,
		}
	},
};
</script>
