<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
    <a>
      <router-link class="navbar-brand" to="/home">
        <img
          class="logo-groupomania-navBar"
          alt="logo groupomania"
          src="../assets/icon-groupomania.png"
          loading="lazy"
      /></router-link>
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a>
          <router-link class="nav-link active" to="/home">Accueil</router-link>
          <span class="sr-only">(current)</span>
        </a>
        <a><router-link class="nav-link" to="/user">Mon profil</router-link></a>
         <a><router-link v-if="isAdmin == 1" class="nav-link" to="/admin">Page administrateur</router-link></a>
        <a @click="disconnect"><router-link class="nav-link" to="/" >Déconnexion</router-link></a>
      </div>
    </div>
  </nav>
</template>



<script>
export default {
  name: "NavBar",

  data: function () {
    return {
      isAdmin: ""
    }
  },

  mounted() {
    const mySessionStorage = JSON.parse(sessionStorage.getItem('margaux_oc'))
    this.isAdmin = mySessionStorage.isAdmin
    
  },

  methods: {
    disconnect: function() {
      return sessionStorage.clear();
    },

  }
};
</script>

<style scoped lang="scss">
div .logo-groupomania-navBar {
  width: 60%;
  height: auto;
  margin-left: 2%;
  margin-bottom: 5%;
  margin-top: 5%;
  display: flex;
}
div nav {
  margin-bottom: 5%;
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  div .logo-groupomania-navBar {
    width: 60%;
    margin-right: 0;
  }
}
</style>