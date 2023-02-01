<template>
	<v-progress-linear v-if="isLoading" class="my-6" color="teal-lighten-2" indeterminate />
	<v-table v-if="!isLoading">
		<thead>
			<tr>
				<th>Name</th>
				<th>Height</th>
				<th>Mass</th>
				<th>Hair Color</th>
				<th>Favorites</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="people in peoples"
				:key="people.name"
			>
				<td>{{ people.name }}</td>
				<td>{{ people.height }}</td>
				<td>{{ people.mass }}</td>
				<td>{{ people.hair_color }}</td>
				<td class="w-25">
					<toggle-favorites :people="people" />
				</td>
			</tr>
		</tbody>
	</v-table>
	<h3
		v-if="!isLoading && !peoples.length"
		class="mt-4 text-h6 text-center"
	>
		Unfortunately there is nothing here :(
	</h3>
</template>

<script>
import ToggleFavorites from '@/components/ui/ToggleFavorites.vue' // Компонент: кнопка добавления/удаления избранного

export default {
	components: {
		ToggleFavorites,
	},

	props: {
		// Загружаются ли данные
		isLoading: {
			type: Boolean,
			default: false,
		},

		// Персонажи
		peoples: {
			type: Array,
			default: () => [],
		},
	},
};
</script>

<style scoped>
	.v-table {
		border: 1px solid #e0e0e0;
	}
</style>
