<template>
	<main class="login" v-if="!this.$auth.loggedIn">
		<!-- Navbar -->
		<NavbarSP />

		<article id="loginContainer">
			<h1>Connectez-vous a l'aide de ces services</h1>
			<span>Pas besoin de vous inscrire, vos données seront directement récupérées sur le site que vous utiliserez pour vous connecter!</span>
			<ul>
				<li><button class="disc" @click="discordAuth"><i class="fa-brands fa-discord"></i> Discord</button></li>
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
		if (process.client) {
			/* Empêche les utilisateurs connectés d'interargir avec la page */
			if (this.$auth.loggedIn) this.$router.push("/");
		}
	},

	methods: {
		discordAuth() { if (process.client) this.$auth.loginWith("discord"); }
	}
}
</script>
