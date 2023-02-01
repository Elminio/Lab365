<template>
	<v-container fluid>
		<v-row class="d-flex justify-center">
			<v-col
				md="10"
				lg="7"
				class="px-2"
			>
				<div class="d-flex justify-space-between align-center">
					<h1 class="mb-4">People Card Page - {{ $route.params.id }}</h1>
				</div>
				<table-character
					:is-loading="isPeopleLoading"
					:peoples="peopleCard"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router'

import TableCharacter from '@/components/ui/TableCharacter.vue'; // Компонент: таблица с данными

export default {
	components: {
		TableCharacter,
	},

	setup() {
		const route = useRoute()
		const url = 'https://swapi.dev/api/people/';
		const isPeopleLoading = ref(true);
		const peopleCard = ref([]);
		const urlNextPage = ref('');

		// Запрос на получение персонажей
		const fetchingPeoples = async (getNextPage = '') => {
			try {
				let response = await axios.get(getNextPage ? getNextPage : url);
				urlNextPage.value =  response.data.next;
				findPeople(response.data.results);
			} catch (error) {
				alert('Ошибка при получении данных!');
			}
		};
		fetchingPeoples();

		const peopleIndexNum = ref(-1);

		// Поиск и отображение персонажа по полученным данным
		const findPeople = (peoples) => {
			// Поиск по id страницы, сравниваем с url каждого персонажа
			peopleIndexNum.value = peoples.findIndex((item) => {
				let searchFlag = 'people/';
				let itemId = item.url.slice(item.url.indexOf(searchFlag) + searchFlag.length, item.url.length - 1);
				return itemId === route.params.id;
			});

			// Если нашли, то отображаем...
			if (peopleIndexNum.value !== -1) {
				isPeopleLoading.value = false;
				peopleCard.value = [peoples[peopleIndexNum.value]];
			} else if (urlNextPage.value) {
				// ...иначе продолжаем поиск по другим страницам api
				fetchingPeoples(urlNextPage.value);
			} else {
				// ...если его нет, то завершаем поиск и выводим уведомление
				isPeopleLoading.value = false;
			}
		};

		return {
			isPeopleLoading,
			peopleCard,
		}
	},
};
</script>
