<template>
    <main>
        <!-- Navbar -->
        <NavbarSP />

        <h1>Bengladesh</h1>
    </main>
</template>

<script>
import NavbarSP from "~/components/NavbarSP.vue"

export default {
    name: "Ide",
    head() {
        return {
            title: "Speedpratik",
        }
    },

    data() {
        /* Contenu à render dans la page */
        return {

        }
    },

    async fetch() {

    },

    async created() {
 
    },


    /* Fonctions */
    methods: {
        
    },

    /* Components */
    components: { NavbarSP }
}
</script>