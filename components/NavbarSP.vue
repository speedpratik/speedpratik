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

	async fetch () {
		/* Récupère les détails de l'utilisateur */
		if (this.$auth.loggedIn) {
			const details = await this.getUserDetails();
			this.userDetails = details;
		}
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
			return new Promise(async (res, rej) => {
				const strategy = this.$auth.$state.strategy;
				const infos = {
					username: null,
					avatarLink: null,
					email: null,
					oauth: strategy
				}

				switch (strategy) {
					case "discord":
						const { username, id, avatar, email } = this.$auth.user;
						infos.username = username;
						infos.avatarLink = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=128`;
						infos.email = email
						break;
				}


				try {
					const req = await this.$axios.$post("/api/users", {
						username: infos.username,
						email: infos.email,
						oauth2: infos.oauth,
						avatar: infos.avatarLink
					});
					res(req);
				} catch(e) { 
					this.$auth.loginWith(strategy); // Reconnection, erreur
				}
			});
		}
	}
}
</script>
