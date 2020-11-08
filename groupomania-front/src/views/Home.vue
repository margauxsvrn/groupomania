<template>
  <div>
    <NavBar />
    <div class="user-page">
      <h2>Bienvenue {{ firstname }} !</h2>
      <div>Publication</div>
      <div>Description</div>
      <div>Image</div>
      <div>Nom et Prénom</div>
      <div>Commentaire</div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";

export default {
  name: "Home",
  components: {
    NavBar,
  },

  data: function(){
    return {
      firstname: ""
    }
  },
  
  mounted() {
    const mySessionStorage = JSON.parse(sessionStorage.getItem('margaux_oc'))
    if (mySessionStorage.firstname){
      this.firstname = mySessionStorage.firstname
    }
  }
};
</script>

<style scoped lang="scss">
.user-page {
  margin-left: 5%;
  text-align: justify;
}
</style>