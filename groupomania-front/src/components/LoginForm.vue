<template>
  <div>
    <form class="login-form" @submit="login">
      <div class="form-group">
        <label for="exampleInputEmail1">Adresse email</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Mot de passe</label>
        <input
          v-model="password"
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
      <button type="submit" class="btn btn-primary">Valider</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginForm",

  data: function () {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    
    login: async function (e) {
      e.preventDefault();

      if (this.email && this.password) {
        let response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: this.email, password: this.password }),
      });
      let responseData = await response.json();

      if (responseData.accessToken) {
          sessionStorage.setItem('margaux_oc', JSON.stringify(responseData));

          this.$router.push({ path: "/home" }); // J'indique la page sur laquelle je veux faire suivre les info
      } else {
        window.alert("Une erreur est survenue.")
      }
      
      } else {
        window.alert("Tous les champs sont obligatoires !");
      }
    },
  },
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
