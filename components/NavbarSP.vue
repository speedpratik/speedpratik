<template>
  <section id='navbar'>
    <ul>
      <li><img src="icon.svg"></li>
    </ul>

    <ul class="userContent">
      <li>
        <span>IwenLeGoat</span>
        <img src="basicAvatar.svg" alt="Avatar">
      </li>
      <li><button @click="login">Connexion</button></li>
    </ul>
  </section>
</template>
<script>
export default {
  name: 'NavbarSP',
  methods: {
    login () {
      this.$router.push('/login')
    }
  }
}
</script>
