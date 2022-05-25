<template>
    <main v-if="userDetails">
        <!-- Navbar -->
        <NavbarSP />

        <span class="mobile">Pour pouvoir compléter des exercices, merci de vous rendre sur un ordinateur</span>
        <section id="profileContent">
            <aside>
                <img :src="userDetails.avatar" alt="Avatar" id="navAvatar" loading="lazy" />
                <h1>{{ userDetails.username }}</h1>
                <span>XP: {{ Math.floor(userDetails.xp) }} | Niveau: {{ userDetails.level }}</span>
                <section id="badges"></section>

                <article>
                    <span>Date de création du compte</span>
                    <span class="countdown">{{ ("0" + date.getDate()).slice(-2) + "/" + ("0" + parseInt(date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() }}</span>
                </article>
            </aside>
            
            
            <span>Flags: {{ userDetails.flags }}</span>
            <span>Sujets complétés: {{ userDetails.completed_subjects }}</span>

            <span>XP & Level: {{ userDetails.xp }} / {{ userDetails.level }}</span>
            <span>Création du compte: {{  }}</span>
            <span>Temps accumulé: {{ userDetails.accumulated_time }}</span>
        </section>
    </main>
</template>

<script>
import NavbarSP from "~/components/NavbarSP.vue"
import api from "~/plugins/api";

export default {
    name: "Profile",
    head() {
        return {
            title: "Speedpratik | Profil",
        }
    },

    data() {
        /* Contenu à render dans la page */
        return {
            userDetails: null,
            innerWidth: null,
            date: null
        }
    },

    async fetch() {
        this.userDetails = await api.getUserDetails(this.$auth, this.$axios);
        this.date = new Date(this.userDetails.account_creation)
    },

    async created() {
        /* Empêche les utilisateurs connectés d'interargir avec la page */
		if (!this.$auth.loggedIn) this.$router.push("/");
    },


    /* Fonctions */
    methods: {
        
    },

    /* Components */
    components: { NavbarSP }
}
</script>