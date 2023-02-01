<template>
	<v-container class="py-md-4 py-1">
		<v-app-bar
			color="gray"
			dark
		>
			<v-row class="d-flex justify-center">
				<v-col
					md="10"
					lg="7"
					class="d-flex justify-space-between mx-2"
				>
					<logo-type />
					<nav-bar />
				</v-col>
			</v-row>
		</v-app-bar>
	</v-container>
</template>

<script>
import LogoType from '@/components/ui/LogoType.vue'; // Компонент: логотип
import NavBar from '@/components/ui/NavBar.vue'; // Компонент: меню

export default {
	components: {
		LogoType,
		NavBar,
	},
}
</script>
