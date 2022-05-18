<template>
	<main class="login">
		<!-- Navbar -->
		<NavbarSP />

		<article id="loginContainer">
			<h1>Connectez-vous a l'aide de ces services</h1>
			<span>Pas besoin de vous inscrire, vos données seront directement récupérées sur le site que vous utiliserez pour vous connecter!</span>
			<ul>
				<!-- <li>CONNECTED: {{ this.$auth.loggedIn }}</li>
				<li>USER: {{ this.$auth.user }}</li> -->
				<li><button class="disc" @click="discordAuth"><i class="fa-brands fa-discord"></i> Discord</button></li>
				<li><button class="inst" disabled><i class="fa-brands fa-instagram"></i> Instagram</button></li>
				<li><button class="goog" disabled><i class="fa-brands fa-google"></i> Google</button></li>
				<li><button class="gith" disabled><i class="fa-brands fa-github"></i> Github</button></li>
			</ul>

			<svg class="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
				<path fill="000" fill-opacity="1" d="M0,160L30,170.7C60,181,120,203,180,176C240,149,300,75,360,74.7C420,75,480,149,540,202.7C600,256,660,288,720,272C780,256,840,192,900,186.7C960,181,1020,235,1080,218.7C1140,203,1200,117,1260,106.7C1320,96,1380,160,1410,192L1440,224L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
			</svg>
		</article>
	</main>
</template>

<script>
import NavbarSP from "~/components/NavbarSP";

export default {
	name: "LoginPage",
	components: { NavbarSP },

	methods: {
		discordAuth() { this.$auth.loginWith("discord"); },

		logout() { this.$auth.logout(); }
	}
}
</script>
