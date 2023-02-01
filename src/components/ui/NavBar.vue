<template>
	<div class="d-flex align-center">
		<v-spacer />
		<router-link to="/"><v-btn variant="text">Home</v-btn></router-link>
		<router-link to="/peoples"><v-btn variant="text">Peoples</v-btn></router-link>
		<router-link to="/favorites"><v-btn variant="text">Favorites</v-btn></router-link>
	</div>
</template>

<style scoped>
	a {
		display: flex;
		margin-left: 16px;
		text-decoration: none;
	}

	.v-btn {
		color: #212121;
	}

	.v-btn:hover {
		color: #4DB6AC;
	}

	.footer .v-btn {
		color: #ffffff;
	}

	.footer .v-btn:hover {
		color: #134742;
	}

	@media screen and (max-width: 959px) {
		a {
			margin-left: 4px;
		}

		.v-btn{
			padding-left: 4px;
			padding-right: 4px;
		}
	}
</style>
