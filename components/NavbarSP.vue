<template>
	<section id="navbar">
		<ul>
			<li>
				<img @click="home" src="icon.svg" draggable="false" loading="lazy" />
			</li>
		</ul>

		<ul class="userContent">
			<li v-if="this.$auth.loggedIn">
				<span v-if="userDetails">{{ userDetails.username }}</span>
				<img v-if="userDetails" @click="dropDown = true" :src="userDetails.avatar" alt="Avatar" id="navAvatar" loading="lazy" />

				<ul v-if="dropDown" data-linked="navAvatar" v-click-outside id="dropdown">
					<li>Profil</li>
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
export default {
	name: "NavbarSP",
	data() {
		return { 
			userDetails: null,
			dropDown: false
		}
	},


	mounted () {
		/* Récupère les détails de l'utilisateur */
		const details = this.getUserDetails();
		this.userDetails = details;
	},


	/* Fonctions */
	methods: {
		/* Redirige sur la page de connexion */
		login() { this.$router.push("/login"); },
		
		/* Déconnecte l'utilisateur */
		logout() { this.$auth.logout(); },

		/* Retourne sur la page d'accueil */
		home() { this.$router.push("/"); },

		/* Récupère les infos utilisateur */
		getUserDetails() {
			return {
				// ... //
				username: "bob",
				avatar: "basicAvatar.svg",
				// ... //
			}
		}
	}
}
</script>
