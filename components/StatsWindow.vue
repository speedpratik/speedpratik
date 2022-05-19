<template>
    <section id="stats">
        <article>
            <span>Compte créé le:</span>
            <h2>{{ ("0" + date.getDate()).slice(-2) + "/" + ("0" + parseInt(date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() }}</h2>
        </article>
        <article>
            <span>Exercice(s) complété(s):</span>
            <h2>{{ userDetails.completed_exercises }}</h2>
        </article>
        <article>
            <span>Temps total accumulé:</span>
            <h2>{{ userDetails.accumulated_time }}</h2>
        </article>
    </section>
</template>

<script>
export default {
	name: "StatsWindow",
	data() {
		return { 
			userDetails: null,
            date: null
		}
	},

	async fetch () {
		/* Récupère les détails de l'utilisateur */
		if (this.$auth.loggedIn) {
			const details = await this.getUserDetails();

            this.date = new Date(details.account_creation);
			this.userDetails = details;
		}
	},


	/* Fonctions */
	methods: {
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
				} catch(e) { rej(e); }
			});
		}
	}
}
</script>