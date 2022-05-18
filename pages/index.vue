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
			<article class="right"></article>
		</section>
	</main>
</template>

<script>
import NavbarSP from "~/components/NavbarSP.vue"
export default {
	name: "IndexPage",
	data() {
		// Temps restant exo quotidien
		const { seconds, minutes, hours } = this.displayTimeLeft();

		return {
			timeLeft: `${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`,
			quotiChallengeNumber: "0001"
		}
	},

	loading: {
		color: "#B17AF8",
		height: "20px"
	},

	mounted() {
		// Update le timer
		setInterval(() => {
			const { seconds, minutes, hours } = this.displayTimeLeft();
			const newValue = `${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;

			if (this.timeLeft != newValue) this.timeLeft = newValue;
		}, 1000);

		// Montre le numéro de l'exo quoti
		const { number } = this.getTodayExercise();
		this.quotiChallengeNumber = number;
	},

	methods: {
		// Récupère le temps restant avant jour suivant
		displayTimeLeft() {
			const now = new Date();
			const nextDay = `${now.getMonth() + 1}/${now.getDate() + 1}/${now.getFullYear()}`;

			const difference = Date.parse(nextDay) - Date.parse(now);
			const seconds = Math.floor((difference / 1000) % 60);
			const minutes = Math.floor((difference / 1000 / 60) % 60);
			const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

			return { seconds, minutes, hours };
		},

		// // Récupère l'exo quoti
		getTodayExercise() {
			return {
				id: 1,
				session: 2022,
				link: "https://eduscol.education.fr/document/33178/download",
				difficulty: 1,
				number: "33178",
				flags: 0,
				exercises: [
					{
						id: 1,
						type: 0,
						topic: "Algorithmes de Recherche",
						question: "Écrire une fonction `recherche` qui prend en paramètres `caractere`, un caractère, et `mot`, une chaîne de caractères, et qui renvoie le nombre d’occurrences de `caractere` dans `mot`, c’est-à-dire le nombre de fois où `caractere` apparaît dans `mot`.",
						asserts: [
							["recherche('e', \"sciences\")", 2],
							["recherche('i', \"mississippi\")", 4],
							["recherche('a', \"mississippi\")", 0]
						],
						program: null
					},
					{
						id: 2,
						type: 1,
						topic: "Algorithmes Glouton",
						question: "On s’intéresse à un algorithme récursif qui permet de rendre la monnaie à partir d’une liste donnée de valeurs de pièces et de billets - le système monétaire est donné sous forme d’une liste `pieces=[100, 50, 20, 10, 5, 2, 1]` - (on supposera qu’il n’y a pas de limitation quant à leur nombre), on cherche à donner la liste de pièces à rendre pour une somme donnée en argument.\nCompléter le code Python ci-dessous de la fonction rendu_glouton qui implémente cet algorithme et renvoie la liste des pièces à rendre",
						asserts: [
						["rendu_glouton(68, [], 0)", "[50, 10, 5, 2, 1]"],
							["rendu_glouton(291, [], 0)", "[100, 100, 50, 20, 20, 1]"]
						],
						program: "Pieces = [100,50,20,10,5,2,1]\ndef rendu_glouton(arendre, solution=[], i=0):\tif arendre == 0:\n\t\treturn ...\n\tp = Pieces[i],\n\tif p <= ... :\n\t\tsolution.append(...)\n\t\treturn rendu_glouton(arendre - p, solution, i)\n\telse :\n\t\treturn rendu_glouton(arendre, solution, ...)"
					}
				]
			};
		}
	},

	components: { NavbarSP }
}
</script>
