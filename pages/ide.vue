<template>
    <main>
        <section v-if="id != null">
            <article id="ide">
                <section id="consigne">
                    <span class="announcement" v-if="!this.$auth.loggedIn">Tu n'es pas connecté! Tes performances ne seront pas enregistrées.</span>

                    <ul v-for="exercice of exercise.exercises">
                        <li class="enonce">
                            <h1>{{ exercice.topic }}</h1>
                            <span v-html="$md.render(exercice.question)"></span>

                            <span>Exemples:</span>
                            <ul class="asserts" v-for="assert of exercice.asserts">
                                <li>{{ assert[0] }} == {{ assert[1] }}</li>
                            </ul>
                        </li>
                    </ul>
                </section>

                <section id="interface">

                    <ul v-for="exercice of exercise.exercises">
                        <textarea class="ide" cols="30" rows="10">{{ exercice.program != null ? exercice.program : "" }}</textarea>
                    </ul>
                </section>
            </article>
        </section>
    </main>
</template>

<script>
import NavbarSP from "~/components/NavbarSP.vue"
export default {
    name: "Ide",
    head() { return { title: `Speedpratik | Exercice` }},
    data() {
        /* Contenu à render dans la page */
        return {
            id: null,
            exercise: null
        }
    },

    async fetch() {
        const exercise = this.getExerciseFromId();
        this.exercise = exercise;
    },

    async mounted () {
        const ID = localStorage.getItem("idSubject");
        localStorage.removeItem("idSubject");
        this.id = ID;

        /* Charge pyodide */
        const pyodideScr = document.createElement("script");
        pyodideScr.setAttribute("src", "https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js");
        document.head.appendChild(pyodideScr);

        const pyodide = await this.initPyodide();


        /* Empêche les utilisateurs d'avoir accès à la page sans ID */
		if (ID == null) this.$router.push("/");
    },


    /* Fonctions */
    methods: {
        /* Initialise pyodide pour exec du python */
        initPyodide(){
            return new Promise(async (res, rej) => {
                let pyodide = await loadPyodide();
                return res(pyodide);
            });
        },


        /* Récupère un exercice depuis l'id de celui-ci */
        getExerciseFromId(id) {
            return {
                "id": 1,
                "session": 2022,
                "link": "https://eduscol.education.fr/document/33178/download",
                "difficulty": 1,
                "flags": 0,
                "exercises": [
                    {
                        "id": 1,
                        "type": 0,
                        "topic": "Algorithmes de Recherche",
                        "question": "Écrire une fonction `recherche` qui prend en paramètres `caractere`, un caractère, et `mot`, une chaîne de caractères, et qui renvoie le nombre d’occurrences de `caractere` dans `mot`, c’est-à-dire le nombre de fois où `caractere` apparaît dans `mot`.",
                        "asserts": [
                            ["recherche('e', \"sciences\")", 2],
                            ["recherche('i', \"mississippi\")", 4],
                            ["recherche('a', \"mississippi\")", 0]
                        ],
                        "program": null
                    },
                    {
                        "id": 2,
                        "type": 1,
                        "topic": "Algorithmes Glouton",
                        "question": "On s’intéresse à un algorithme récursif qui permet de rendre la monnaie à partir d’une liste donnée de valeurs de pièces et de billets - le système monétaire est donné sous forme d’une liste `pieces=[100, 50, 20, 10, 5, 2, 1]` - (on supposera qu’il n’y a pas de limitation quant à leur nombre), on cherche à donner la liste de pièces à rendre pour une somme donnée en argument.\nCompléter le code Python ci-dessous de la fonction rendu_glouton qui implémente cet algorithme et renvoie la liste des pièces à rendre",
                        "asserts": [
                            ["rendu_glouton(68, [], 0)", "[50, 10, 5, 2, 1]"],
                            ["rendu_glouton(291, [], 0)", "[100, 100, 50, 20, 20, 1]"]
                        ],
                        "program": "Pieces = [100,50,20,10,5,2,1]\ndef rendu_glouton(arendre, solution=[], i=0):\tif arendre == 0:\n\t\treturn ...\n\tp = Pieces[i],\n\tif p <= ... :\n\t\tsolution.append(...)\n\t\treturn rendu_glouton(arendre - p, solution, i)\n\telse :\n\t\treturn rendu_glouton(arendre, solution, ...)"
                    }
                ]
            }
        }
    },

    /* Components */
    components: { NavbarSP }
}
</script>