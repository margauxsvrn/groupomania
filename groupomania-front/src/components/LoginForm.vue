<template>
  <div>
    <form class="login-form">
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
        <small id="emailHelp">
          <router-link class="form-text text-muted" to="/signup">
            Créer un compte
          </router-link></small
        >
      </div>
      <button type="submit">
        <router-link class="btn btn-primary" to="/home">Valider</router-link>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
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
  width: 80%;
  margin-right: auto;
  margin-left: auto;

  input {
    width: 300px;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
