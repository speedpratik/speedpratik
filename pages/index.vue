<template>
	<main>
		<!-- Navbar -->
		<NavbarSP />

		<!-- Main section -->
		<section id="content">
			<article class="left">
				<div class="daily">
					<span>Prochain exercice dans</span>
					<h2>{{ timeLeft }}</h2>
					<button @click="startExercise(true, 2)">Compléter</button>
				</div>
				<h1>Exercice Quotidien</h1>
				<h2>Sujet #{{ quotiExercise ? ("0000" + quotiExercise.number).slice(-4) : "0001" }}</h2>
				<span><b>Les exercices quotidiens sont choisis aléatoirements pour l'instant!</b></span>
				<span>Les exercices quotidiens sont des exercices d’épreuve pratique niveau rouge rapportant un nombre de point supérieur aux exercices de base.</span>
			</article>

			<article class="right">
				<section class="modes" id="sr">
					<h1>Mode Speedrun</h1>
					<span>Complétez un exercice aléatoire de la manière la plus rapide possible!</span>
					<button @click="startExercise(false, 1)">Commencer</button>
				</section>

				<section class="modes" id="comp">
					<h1>Mode Competitif</h1>
					<span>Complétez un exercice aléatoire dans le but de gagner des points!</span>
					<button @click="startExercise(false, 0)">Commencer</button>
				</section>

				<section class="modes" id="train">
					<h1>Mode pratique</h1>
					<span>Révisez vos épreuves pratique sans vous mettre la pression.</span>
					<button @click="startExercise(false, 3, [0, 1, 2])">Commencer</button>
				</section>

				<StatsWindow />
			</article>
		</section>
	</main>
</template>


<script>
import NavbarSP from "~/components/NavbarSP.vue"
import StatsWindow from "~/components/StatsWindow.vue"
import api from "~/plugins/api";

export default {
	name: "IndexPage",
	data() {
		/* Récupère le temps restant pour l'exercice quotidien */
		const { seconds, minutes, hours } = this.displayTimeLeft();

		/* Contenu à render dans la page */
		return {
			timeLeft: `${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`,
			quotiExercise: null,
		}
	},

	async fetch() {
		/* Récupère les informations sur l'exercice quotidien */
		const quoti = await api.getRandomSubject([2], this.$axios);
		this.quotiExercise = quoti;
	},

	async mounted() {
		/* Update le timer de l'exercice quotidien */
		setInterval(() => {
			const { seconds, minutes, hours } = this.displayTimeLeft();
			const newValue = `${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;

			if (this.timeLeft != newValue) this.timeLeft = newValue;
		}, 1000);

		/* Regarde si ils sont mobiles ou tablettes */
		if (this.$device.isMobileOrTablet && window.innerWidth <= 800) {
			this.$router.push("/profile");
		}

		/* Toast pour dire qu'on est sur une demo */
		this.$toast.show("Cette version est une version test et il se peut que vous rencontriez des bugs! Le site sera mit à jour.", { 
			duration : 5000
		});
	},


	/* Fonctions */
	methods: {
		/* Récupère le temps restant avant la fin de la journée */
		displayTimeLeft() {
			const now = new Date();
			const nextDay = `${now.getMonth() + 1}/${now.getDate() + 1}/${now.getFullYear()}`;

			const difference = Date.parse(nextDay) - Date.parse(now);
			const seconds = Math.floor((difference / 1000) % 60);
			const minutes = Math.floor((difference / 1000 / 60) % 60);
			const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

			return { seconds, minutes, hours };
		},

		/* Redirige vers la page d'IDE */
		async startExercise(daily = false, type, range = [0, 1]) {
			let id;
			if (daily) id = this.quotiExercise.id;
			else {
				const exo = await api.getRandomSubject(range, this.$axios);
				id = exo.id;
			}


			localStorage.setItem("idSubject", id);
			localStorage.setItem("modeSubject", type);
			this.$router.push("/ide");
		}
	},


	/* Components */
	components: { NavbarSP, StatsWindow }
}
</script>
