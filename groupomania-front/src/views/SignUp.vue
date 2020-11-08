<template>
  <div>
    <Header />
    <h3 class="signup-title">Créer un compte</h3>
    <br />
    <form class="login-form" @submit="signup">
      <div class="form-group">
        <label for="exampleInputName1">Nom</label>
        <input
          v-model="lastname"
          type="text"
          class="form-control"
          id="exampleInputName1"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputName1">Prénom</label>
        <input
          v-model="firstname"
          type="text"
          class="form-control"
          id="exampleInputName1"
        />
      </div>
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
      </div>
      <button type="submit" class="btn btn-primary">S'inscrire</button>
    </form>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  name: "Signup",
  components: {
    Header,
  },

  data: function () {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    };
  },

  methods: {
    sentForm: async function () {
      let response = await fetch("http://localhost:8080/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
        }),
      });
      let responseData = await response.json();
      console.log(responseData);
      return responseData;
    },

    signup: function (e) {
      e.preventDefault();

      if (this.email && this.password && this.firstname && this.lastname) {
        this.sentForm().then((response) => {
          if (response.error) {
            window.alert(response.error);
          } else {
            this.$router.push({ path: "/home" });
            let mySessionStorage = sessionStorage.getItem("margaux_oc");
            if (!mySessionStorage) {
              // Je crée la structure de ma session Storage
              mySessionStorage = {
                firstname: this.firstname,
                lastname: this.lastname,
                email: this.email
              };
            } else {
              mySessionStorage = JSON.parse(mySessionStorage);
            }
            sessionStorage.setItem("margaux_oc",JSON.stringify(mySessionStorage));
            this.$router.push({ path: "/home" }); // J'indique la page sur laquelle je veux faire suivre les info
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
