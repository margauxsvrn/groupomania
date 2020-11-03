<template>
  <div>
    <Header />
    <h3 class="signup-title">Créer un compte</h3>
    <br>
    <form class="login-form">
      <div class="form-group">
        <label for="exampleInputName1">Nom</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputName1"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputName1">Prénom</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputName1"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Adresse email</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Mot de passe</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
        />
        <small id="emailHelp" class="form-text text-muted">
            Doit contenir entre 4 à 8 caractères avec minimum un chiffre
        </small>
      </div>
      <button type="submit"><router-link class="btn btn-primary" to="/home">S'inscrire</router-link></button>
    </form>
  </div>
</template>

<script>

import Header from "../components/Header.vue";

export default {
  name: "Signup",
  components: {
    Header
  } 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

button {
  border: none;
  background-color: white;
}

.login-form {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 1%;

  input {
    width: 300px;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
