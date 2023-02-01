<template>
	<div
		class="search"
		v-click-outside="toggleDropdownList"
	>
		<v-text-field
			v-model="searchValue"
			density="compact"
			variant="solo"
			label="Search by name"
			append-inner-icon="mdi-magnify"
			single-line
			hide-details
			@input="lazySearch"
			@focus="toggleDropdownList(true)"
		/>
		<v-progress-circular
			v-if="isLoading"
			class="search__loading"
			indeterminate
			color="#4DB6AC"
			size="24"
			width="3"
		/>
		<v-card
			v-if="visibleDropdownList && isFoundPeoples"
			class="search__dropdown"
			max-width="300"
		>
			<v-list>
				<v-list-item
					v-for="(people, i) in foundPeoples"
					:key="i"
					:value="people"
				>
					<a
						class="search__dropdown-link"
						:href="buildLink(people.url)"
						v-text="people.name"
					/>
				</v-list-item>
			</v-list>
			<v-btn
				v-if="urlNextPage"
				class="ml-5 mb-5 text-subtitle-1"
				size="small"
				color="#efefef"
				append-icon="mdi-chevron-down"
				@click="isLoading = true, fetchingPeoplesByName(urlNextPage)"
			>
				More Results
			</v-btn>
			
		</v-card>
	</div>
</template>

<script>
import { ref, computed } from 'vue';
import axios from 'axios';

import { simpleDebounce } from '@/hooks/simpleDebounce.js'; // Хук: debounce

export default {
	setup() {
		const url = 'https://swapi.dev/api/people/';
		const isLoading = ref(false);
		const urlNextPage = ref('');
		const foundPeoples = ref([]);
		const searchValue = ref('');
		const visibleDropdownList = ref(false);
		const timer = ref();

		// Есть ли совпадения: для on/off выпадающего списка когда нет совпадений
		const isFoundPeoples = computed(() => foundPeoples.value.length);

		// Переключение видимости выпадающего списка
		const toggleDropdownList = (visible) => {
			visibleDropdownList.value = visible === true ? true : false;
		};

		// Запрос на получение персонажей
		const fetchingPeoplesByName = async (more = '') => {
			try {
				let response = await axios.get(more ? more : url + '?search=' + searchValue.value);
				if (more) {
					foundPeoples.value.push(...response.data.results);
				} else {
					foundPeoples.value = response.data.results;
				}
				urlNextPage.value =  response.data.next;
			} catch (error) {
				alert('Ошибка при получении данных!');
			} finally {
				isLoading.value = false;
			}
		};

		// Формируем url для ссылок
		// TODO: для получения url лучше иметь отдельное поле (url или id) из api
		const buildLink = (link) => {
			let searchFlag = 'people';
			let url = '/peoples';
			url += link.slice(link.indexOf(searchFlag) + searchFlag.length);
			return url;
		};

		// Логика поиска персонажей по имени
		const searchPeoplesByName = () => {
			// Не искать при пустой строке
			if (searchValue.value !== '') {
				fetchingPeoplesByName();
			} else {
				// Иначе, очистить ранее найденные совпадения
				foundPeoples.value = [];
			}
		};

		// Ленивый поиск с debounce
		const lazySearch = () => {
			isLoading.value = !!searchValue.value;
			simpleDebounce(() => searchPeoplesByName(), timer);
		};

		return {
			isLoading,
			urlNextPage,
			foundPeoples,
			searchValue,
			visibleDropdownList,
			isFoundPeoples,
			toggleDropdownList,
			fetchingPeoplesByName,
			buildLink,
			lazySearch,
		}
	},
};
</script>

<style scoped>
	.search {
		position: relative;
		width: 300px;
	}

	.search__loading {
		position: absolute;
		top: 9px;
		right: 10px;
		z-index: 1;
		background: #ffffff;
	}

	.search__dropdown {
		position: absolute;
		top: 41px;
		width: 100%;
		z-index: 1;
		overflow-y: auto;
		max-height: 300px;
	}

	.search__dropdown-link {
		display: block;
		margin: -16px;
		padding: 16px;
		color: #666666;
		text-decoration: none;
	}
</style>
