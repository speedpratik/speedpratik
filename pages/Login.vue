<template>
	<main class="login" v-if="!this.$auth.loggedIn">
		<!-- Navbar -->
		<NavbarSP />

		<article id="loginContainer">
			<h1>Connectez-vous a l'aide de ces services</h1>
			<span>Pas besoin de vous inscrire, vos données seront directement récupérées sur le site que vous utiliserez pour vous connecter!</span>
			<ul>
				<li><button class="disc" disabled><i class="fa-brands fa-discord"></i> Discord</button></li>
				<li><button class="inst" disabled><i class="fa-brands fa-instagram"></i> Instagram</button></li>
				<li><button class="goog" disabled><i class="fa-brands fa-google"></i> Google</button></li>
				<li><button class="gith" disabled><i class="fa-brands fa-github"></i> Github</button></li>
			</ul>
		</article>
	</main>
</template>

<script>
import NavbarSP from "~/components/NavbarSP";

export default {
	name: "LoginPage",
	components: { NavbarSP },

	created () {
		/* Empêche les utilisateurs connectés d'interargir avec la page */
		if (this.$auth.loggedIn) this.$router.push("/");

		/* Toast pour dire qu'on est sur une demo */
		this.$toast.show("Il n'est pas encore possible de se connecter sur cette version.", { 
			duration : 5000
		});
	},

	methods: {
		discordAuth() { this.$auth.loginWith("discord"); }
	}
}
</script>
