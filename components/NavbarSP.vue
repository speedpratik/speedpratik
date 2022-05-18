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
				<img v-if="userDetails" :src="userDetails.avatar" alt="Avatar" loading="lazy" />
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
			userDetails: null
		}
	},

	mounted () {
		const details = this.getUserDetails();
		this.userDetails = details;
	},

	methods: {
		login() { 
			this.$router.push("/login");
		},
		home() { 
			this.$router.push("/");
		},

		getUserDetails() {
			return {
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
		}
	}
}
</script>
