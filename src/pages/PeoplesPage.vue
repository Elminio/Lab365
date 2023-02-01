<template>
	<v-container fluid>
		<v-row class="d-flex justify-center">
			<v-col
				md="10"
				lg="7"
				class="px-2"
			>
				<div class="d-sm-flex d-block justify-space-between align-center">
					<h1 class="mb-4">Peoples Page</h1>
					<search-dropdown-list class="mb-4" />
				</div>
				<table-character
					:is-loading="isPeoplesLoading"
					:peoples="peoples"
				/>
				<div
					v-if="!isPeoplesLoading"
					class="d-flex justify-space-between py-4"
				>
					<v-btn
						class="text-subtitle-1"
						size="small"
						color="#eeeeeee"
						prepend-icon="mdi-chevron-left"
						:disabled="!urlPrevPage"
						@click="fetchingPeoples(urlPrevPage)"
					>
						Previous page
					</v-btn>
					<v-btn
						class="text-subtitle-1"
						size="small"
						color="#eeeeee"
						append-icon="mdi-chevron-right"
						:disabled="!urlNextPage"
						@click="fetchingPeoples(urlNextPage)"
					>
						Next page
					</v-btn>
				</div>
				<div class="progress-linear d-flex align-center">
					<v-progress-linear v-if="isPaginationLoading" class="my-4" color="teal-lighten-2" indeterminate />
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

import SearchDropdownList from '@/components/ui/SearchDropdownList.vue'; // Компонент: поиск с выпадающим списком
import TableCharacter from '@/components/ui/TableCharacter.vue'; // Компонент: таблица с данными

export default {
	components: {
		SearchDropdownList,
		TableCharacter,
	},

	setup() {
		const url = 'https://swapi.dev/api/people/';
		const isPeoplesLoading = ref(true);
		const isPaginationLoading = ref(false);
		const peoples = ref([]);
		const urlNextPage = ref('');
		const urlPrevPage = ref('');

		// Запрос на получение персонажей
		const fetchingPeoples = async (pagination = '') => {
			try {
				isPaginationLoading.value = !!pagination;
				let response = await axios.get(pagination ? pagination : url);
				peoples.value = response.data.results;
				urlNextPage.value =  response.data.next;
				urlPrevPage.value =  response.data.previous;
			} catch (error) {
				alert('Ошибка при получении данных!');
			} finally {
				isPeoplesLoading.value = false;

				// Даем возможность анимации визуально завершить (не влияет на подгрузку)
				setTimeout(() => {
					isPaginationLoading.value = false;
				}, 500);
			}
		};
		fetchingPeoples();

		return {
			isPeoplesLoading,
			isPaginationLoading,
			peoples,
			urlNextPage,
			urlPrevPage,
			fetchingPeoples,
		}
	},
};
</script>

<style scoped>
	.progress-linear {
		height: 36px;
	}
</style>
