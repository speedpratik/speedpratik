<template>
    <section id="stats" v-if="date && userDetails">
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
import api from "~/plugins/api";

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
			const details = await api.getUserDetails(this.$auth, this.$axios);

            this.date = new Date(details.account_creation);
			this.userDetails = details;
		}
	},


	/* Fonctions */
	methods: {

	}
}
</script>