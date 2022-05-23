<template>
    <main>
        <!-- Navbar -->
        <NavbarSP />

        <section v-if="runner == null && id != null" id="loading">
            <h1>Chargement de python, ca arrive!</h1>
            <span>Le chargement peut prendre plus ou moins longtemps en fonction de votre connexion.</span>
        </section>

        <section v-if="id != null">
            <modal name="submit-modal">
                <div class="modal-content" v-if="tempsMit != null">
                    <h1>Bon boulot!</h1>

                    <section>
                        <article>
                            <span>Temps écoulé:</span>
                            <span class="countdown">{{ tempsMit.string }}</span>
                        </article>
                        <article>
                            <span>Erreur(s) python</span>
                            <span class="countdown">{{ errorsCount }}</span>
                        </article>

                        <article v-if="this.$auth.loggedIn">
                            <span>XP récolté</span>
                            <span class="countdown">{{ xp_award }}</span>
                        </article>
                    </section>

                    <button @click="$router.push('/')">Retour</button>
                </div>
            </modal>
            <canvas id="confettis"></canvas>

            <article id="ide">
                <section id="consigne">
                    <span
                        class="announcement"
                        v-if="!this.$auth.loggedIn"
                    >Tu n'es pas connecté! Tes performances ne seront pas enregistrées.</span>

                    <ul v-for="exercice of exercise">
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
                    <article class="codingArea" v-for="exercice of exercise">
                        <div
                            :id="`editor_${exercice.id}`"
                            class="editor"
                        >{{ exercice.program != null ? exercice.program : "" }}</div>

                        <ul :id="`output_${exercice.id}`" class="output">
                            <li>>>></li>
                        </ul>
                    </article>

                    <section id="footer">
                        <article>
                            <h1>Actions</h1>
                            <button
                                v-if="runner != null"
                                @click="execPython(0)"
                            >Éxecuter première fenêtre de code</button>
                            <button
                                v-if="runner != null"
                                @click="execPython(1)"
                            >Éxecuter deuxième fenêtre de code</button>

                            <div v-if="runner != null">
                                <button v-if="canValidate" @click="validation">Soumettre</button>
                                <button v-else disabled>Soumettre</button>
                            </div>
                        </article>
                    </section>
                </section>
            </article>
        </section>
    </main>
</template>


<script>
import NavbarSP from "~/components/NavbarSP.vue"
import CodeFlask from "codeflask"
import Confettis from "canvas-confetti"


export default {
    name: "Ide",
    head() {
        return {
            title: "Speedpratik | Exercice",
            script: [
                {
                    src: "https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js", callback: async () => {
                        this.runner = await loadPyodide();

                        // On démarre le timer
                        this.startedExercise = Date.now();

                        // On en profite pour set up l'editeur
                        for (const exercice of this.exercise) {
                            const editor = new CodeFlask(`#editor_${exercice.id}`, { language: "js", lineNumbers: true });
                            const code = editor.getCode();

                            editor.updateCode(this.decodeHtml(code));

                            document.getElementById(`editor_${exercice.id}`).classList.add("active");
                            this.editors.push(editor);
                        }
                    }
                }
            ]
        }
    },

    data() {
        /* Contenu à render dans la page */
        return {
            id: null,
            exercise: null,
            runner: null,
            editors: [],
            validate: [true, true],
            canValidate: false,

            // Statistiques
            startedExercise: null,
            errorsCount: 0,
            tempsMit: null,
            xp_award: null
        }
    },

    async fetch() {
        /* Récupère l'exo */
        if (this.id != null) {
            const exercise = await this.getSubjectExerciseFromId(this.id);
            this.exercise = exercise;

            // Exo introuvable dans la bdd
            if (this.exercise.length == 0) this.$router.push("/");
        }
    },
    fetchOnServer: true,

    async created() {
        if (process.client) {
            const ID = window.localStorage.getItem("idSubject");
            window.localStorage.removeItem("idSubject");
            this.id = ID;

            /* Empêche les utilisateurs d'avoir accès à la page sans ID */
            if (ID == null) this.$router.push("/");

            /* Ajoute log a la fenêtre */
            window.pythonLog = this.log;

            /* Initialise la variable CanValidate */
            this.canValidate = this.validate[0] && this.validate[1];
        }
    },


    /* Fonctions */
    methods: {
        /* Decode les caractères encodés */
        decodeHtml(code) {
            const txt = document.createElement("textarea");
            txt.innerHTML = code;
            return txt.value;
        },

        /* Log dans les outputs le python */
        log(type, message, output, clear = true) {
            if (clear) document.getElementById(`output_${output}`).innerHTML = "";

            const log_ = document.createElement("li");
            log_.innerHTML = `>>> ${message}`;
            log_.classList.add(type);

            document.getElementById(`output_${output}`).prepend(log_);
        },

        /* Execute le python */
        async execPython(editorIndex) {
            const _code = this.editors[editorIndex].getCode();

            // Créer un code personnalisé pour interargir avec le dom aussi
            let codeToExec = `import js\ndef print(content):\tjs.pythonLog("none", repr(content), ${editorIndex + 1}, False)\n${_code}\n`

            // Ajoute les asserts
            const asserts = this.exercise.filter(ex => ex.id == editorIndex + 1)[0].asserts;
            asserts.map(assert => { codeToExec += `assert ${assert[0]} == ${assert[1]}, "Ton programme ne passe pas les asserts!"\n`; })
            codeToExec += `print("Succès!")`;

            try {
                await this.runner.runPythonAsync(codeToExec);
            } catch (e) {
                this.log("error", e, editorIndex + 1);
                this.validate[editorIndex] = false;

                this.errorsCount += 1;

                return this.canValidate = this.validate[0] && this.validate[1];
            }

            // Valide le code
            this.validate[editorIndex] = true;
            return this.canValidate = this.validate[0] && this.validate[1];
        },

        /* Récupère l'exo d'un sujet depuis l'id de celui-ci */
        getSubjectExerciseFromId(id) {
            return new Promise(async (res, rej) => {
                try {
                    const req = await this.$axios.$get(`/api/subjects/id/${id}/exercises`);
                    res(req);
                } catch (e) {
                    rej(e);
                }
            });
        },

        /* Temps entre deux dates */
        differenceDate() {
            const diff = new Date() - this.startedExercise;
            const date = new Date(diff);

            return {
                string: date.toISOString().substr(11, 8),
                time: date.getHours() / 60
            } 
        },

        /* Valide l'exercice */
        async validation() {
            const canvas = document.getElementById("confettis");
            canvas.style.display = "block";

            // Assigne les variables
            this.$modal.show("submit-modal");
            this.tempsMit = this.differenceDate();
            this.canValidate = false;

            // Submit l'exercice (Seulement si il est co)
            if (this.$auth.loggedIn) {
                const { xp_award } = await this.submissionAPI();
                this.xp_award = Math.floor(xp_award);
            }

            // Confettis pendant 2s
            const duration = 2000;
            const end = Date.now() + duration;

            const confettis = Confettis.create(canvas, {
                resize: true,
                useWorker: true
            });

            // Confettis
            (function frame() {
                confettis({
                    particleCount: 7,
                    angle: 0,
                    spread: 255,
                    origin: { x: 0, y: 0.5 }
                });

                confettis({
                    particleCount: 7,
                    angle: 180,
                    spread: 255,
                    origin: { x: 1, y: 0.5 }
                });

                if (Date.now() < end) requestAnimationFrame(frame);
            }());
        },

        /* Récupère les infos utilisateur */
		getUserDetails() {
			return new Promise(async (res, rej) => {
				const strategy = this.$auth.$state.strategy;
				const infos = {
					username: null,
					avatarLink: null,
					email: null,
					oauth: strategy
				}

				switch (strategy) {
					case "discord":
						const { username, id, avatar, email } = this.$auth.user;
						infos.username = username;
						infos.avatarLink = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=128`;
						infos.email = email
						break;
				}


				try {
					const req = await this.$axios.$post("/api/users", {
						username: infos.username,
						email: infos.email,
						oauth2: infos.oauth,
						avatar: infos.avatarLink
					});
					res(req);
				} catch(e) { 
					this.$auth.loginWith(strategy); // Reconnection, erreur
				}
			});
		},

        /* API submission */
        submissionAPI(){
            return new Promise(async (res, rej) => {
                try {
                    const userDetails = await this.getUserDetails();

                    const req = await this.$axios.$post("/api/submissions", {
                        user: userDetails.id,
                        subject: parseInt(this.id),
                        start_date: this.startedExercise,
                        programs: [
                            this.editors[0].getCode(),
                            this.editors[1].getCode()
                        ]
                    });
                    res(req);
                } catch (e) {
                    rej(e);
                }
            });
        }
    },

    /* Components */
    components: { NavbarSP }
}
</script>