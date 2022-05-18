<template>
	<section id="navbar">
		<ul>
			<li>
				<img @click="home" src="icon.svg" loading="lazy" />
			</li>
		</ul>

		<ul class="userContent">
			<li v-if="this.$auth.loggedIn">
				<span>{{ userDetails.username }}</span>
				<img :src="userDetails.avatar" alt="Avatar" />
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
	data: () => {
		const userDetails = {
			id: 36234,
			username: "bob",
			email: "bob@example.com",
			avatar: "basicAvatar.svg",
			flags: 0,
			account_creation: 1652817097,
			completed_subjects: 21,
			completed_exercises: 45,
			accumulated_time: 18842,
			achievements: {},
			trophies: {},
			xp: 8327,
			level: 15
		}

		return { userDetails }
	},

	methods: {
		login() { 
			this.$nuxt.$loading.start();
			setTimeout(() => { 
				this.$router.push("/login");
				this.$nuxt.$loading.finish();
			}, 200); 
		},
		home() { this.$router.push("/"); }
	}
}
</script>
