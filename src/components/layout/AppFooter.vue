<template>
	<v-container
		fluid
		class="footer mt-2 px-0 pb-0"
	>
		<v-footer class="d-flex flex-column px-0 pb-0">
			<div class="bg-teal-lighten-2 d-flex w-100 align-center px-4">
				<v-row class="d-flex justify-center">
					<v-col
						md="10"
						lg="7"
						class="d-flex justify-space-between py-6 px-1"
					>
						<logo-type />
						<nav-bar />
					</v-col>
				</v-row>
			</div>
			<div class="px-4 py-2 bg-grey-darken-4 text-center w-100">
				Developed by <strong>Elmin Zeynalov</strong>
			</div>
		</v-footer>
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
