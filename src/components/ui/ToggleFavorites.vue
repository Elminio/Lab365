<template>
	<v-btn
		class="text-subtitle-1"
		size="small"
		:prepend-icon="buttonIcon"
		@click="toggleButton"
	>
		{{ buttonText }}
	</v-btn>
</template>

<script>
import { ref, onMounted, toRefs } from 'vue';

import { toggleFavorites } from '@/hooks/toggleFavorites.js'; // Хук: Переключение кнопки избранное (добавить/удалить)

export default {
	props: {
		people: {
			type: Object,
			default: () => {},
		},
	},

	setup(props) {
		const { people } = toRefs(props);
		const buttonIcons = {
			add: 'mdi-star-outline',
			remove: 'mdi-star',
		}
		const buttonTexts = {
			add: 'Add to favorite',
			remove: 'Remove favorite',
		}
		const buttonIcon = ref('');
		const buttonText = ref('');

		// Получаем данные о избранности
		const { isFavorite, toggleButtonFavorite } = toggleFavorites(people.value);

		// Отрисовка кнопки (иконка и текст): зависит от того избранный или нет
		const redrawingButton = () => {
			buttonIcon.value = isFavorite.value ? buttonIcons.remove : buttonIcons.add;
			buttonText.value = isFavorite.value ? buttonTexts.remove : buttonTexts.add;
		};

		// Переключение кнопки
		const toggleButton = () => {
			toggleButtonFavorite();
			redrawingButton();
		};

		onMounted(redrawingButton);

		return {
			buttonIcon,
			buttonText,
			toggleButton,
		}
	},
};
</script>
