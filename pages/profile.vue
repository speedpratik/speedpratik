<template>
    <main v-if="userDetails">
        <!-- Navbar -->
        <NavbarSP />

        <span class="mobile">Pour pouvoir compléter des exercices, merci de vous rendre sur un ordinateur</span>
        <section id="profileContent">
            <h1>{{ userDetails.username }}</h1>
            <img :src="userDetails.avatar" alt="Avatar" id="navAvatar" loading="lazy" />
            <span>Flags: {{ userDetails.flags }}</span>
            <span>Sujets complétés: {{ userDetails.completed_subjects }}</span>

            <span>XP & Level: {{ userDetails.xp }} / {{ userDetails.level }}</span>
            <span>Création du compte: {{ new Date(userDetails.account_creation) }}</span>
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
            innerWidth: null
        }
    },

    async fetch() {
        this.userDetails = await api.getUserDetails(this.$auth, this.$axios);
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