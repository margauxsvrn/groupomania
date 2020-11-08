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
    sentForm: async function () {
      let response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: this.email, password: this.password }),
      });
      let responseData = await response.json();
      console.log(responseData);
      let mySessionStorage = sessionStorage.getItem("margaux_oc");
            if (!mySessionStorage) {
              // Je crée la structure de ma session Storage
              mySessionStorage = {
                firstname: responseData.user.firstname,
                lastname: responseData.user.lastname,
                email: responseData.user.email,
                userId: responseData.user.id,
                token: responseData.token
              };
            } else {
              mySessionStorage = JSON.parse(mySessionStorage);
            }
            sessionStorage.setItem("margaux_oc",JSON.stringify(mySessionStorage));
            this.$router.push({ path: "/home" }); // J'indique la page sur laquelle je veux faire suivre les info
      return responseData;
    },

    login: function (e) {
      e.preventDefault();

      if (this.email && this.password) {
        this.sentForm()
        .then((response) => {
          if (response.error) {
            window.alert(response.error);
          } else {
            this.$router.push({ path: "/home" });
          }
        });
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
