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
					<button>Compléter</button>
				</div>
				<h1>Exercice Quotidien</h1>
				<h2>Sujet #{{ quotiChallengeNumber }}</h2>
				<span>Les exercices quotidiens sont des exercices d’épreuve pratique niveau rouge rapportant un nombre de point supérieur aux exercices de base.</span>
			</article>


			<article class="right">
				<section class="modes" id="sr">
					<h1>Mode Speedrun</h1>
					<span>Complétez un exercice aléatoire de la manière la plus rapide possible!</span>
					<button>Commencer</button>
				</section>

				<section class="modes" id="comp">
					<h1>Mode Competitif</h1>
					<span>Complétez un exercice aléatoire dans le but de gagner des points!</span>
					<button>Commencer</button>
				</section>

				<section class="modes" id="train">
					<h1>Mode pratique</h1>
					<span>Révisez vos épreuves pratique sans vous mettre la pression.</span>
					<button>Commencer</button>
				</section>
			</article>
		</section>
	</main>
</template>


<script>
import NavbarSP from "~/components/NavbarSP.vue"
export default {
	name: "IndexPage",
	data() {
		/* Récupère le temps restant pour l'exercice quotidien */
		const { seconds, minutes, hours } = this.displayTimeLeft();

		/* Contenu à render dans la page */
		return {
			timeLeft: `${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`,
			quotiChallengeNumber: "0001"
		}
	},


	mounted() {
		/* Update le timer de l'exercice quotidien */
		setInterval(() => {
			const { seconds, minutes, hours } = this.displayTimeLeft();
			const newValue = `${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;

			if (this.timeLeft != newValue) this.timeLeft = newValue;
		}, 1000);

		/* Récupère les informations sur l'exercice quotidien */
		const { number } = this.getTodayExercise();
		this.quotiChallengeNumber = number;
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

		/* Récupère l'exercice quotidien */
		getTodayExercise() {

			// A ADD: Calcul pour choisir l'exo quotidien comme ça pas besoin d'encombrer tout
			return {
				// ... //
				number: "33178",
				// ... //
			};
		}
	},


	/* Components */
	components: { NavbarSP }
}
</script>
