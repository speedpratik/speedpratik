<template>
	<section id="navbar">
		<ul>
			<li>
				<img @click="home" src="icon.svg" draggable="false" loading="lazy" />
			</li>
		</ul>

		<ul class="userContent">
			<li v-if="this.$auth.loggedIn && userDetails">
				<span>{{ userDetails.username }}</span>
				<img @click="dropDown = true" :src="userDetails.avatar" alt="Avatar" id="navAvatar" loading="lazy" />

				<ul v-if="dropDown" data-linked="navAvatar" v-click-outside id="dropdown">
					<li @click="profile">Profil</li>
					<li class="hoverRed" @click="logout">Déconnexion</li>
				</ul>
			</li>
			<li v-else>
				<button @click="login">Connexion</button>
			</li>
		</ul>
	</section>
</template>

<script>
import api from "~/plugins/api";

export default {
	name: "NavbarSP",
	data() {
		return { 
			userDetails: null,
			dropDown: false
		}
	},

	async fetch () {
		/* Récupère les détails de l'utilisateur */
		if (this.$auth.loggedIn) {
			this.userDetails = await api.getUserDetails(this.$auth, this.$api);
		}
	},


	/* Fonctions */
	methods: {
		/* Redirige sur la page de connexion */
		login() { this.$router.push("/login"); },

		/* Redirige sur la page de profil */
		profile() { this.$router.push("/profile"); },
		
		/* Déconnecte l'utilisateur */
		logout() { this.$auth.logout(); },

		/* Retourne sur la page d'accueil */
		home() { this.$router.push("/"); },
	}
}
</script>
