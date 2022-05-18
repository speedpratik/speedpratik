<template>
  <main>
    <!-- Navbar -->
    <NavbarSP />

    <h1>DEBUG LOGIN PAGE</h1>
    <ul>
      <li>CONNECTED: {{ this.$auth.loggedIn }}</li>
      <li>USER: {{ this.$auth.user }}</li>
    </ul>
    <button @click="logout">LOGOUT</button>
    <button @click="discordAuth">DISCORD</button>
  </main>
</template>

<script>
import NavbarSP from '~/components/NavbarSP'

export default {
  name: 'LoginPage',
  components: { NavbarSP },
  methods: {
    discordAuth () {
      this.$auth.loginWith('discord')
    },
    logout () {
      this.$auth.logout()
    }
  }
}
</script>

<style scoped>

</style>
