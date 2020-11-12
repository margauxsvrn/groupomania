<template>
  <div>
    <NavBar />
    <div class="user-page">
      <h2>Mon profil</h2>
      <br>
        <div class="user-detail">
          <div>
            <i class="far fa-user"></i>
            <br>
            <label v-if="!update" > {{ user.lastname }} </label>
            <input v-else v-model="user.lastname" type="text" placeholder="Nom"> 
            <label v-if="!update" > {{ user.firstname }} </label>
            <input v-else v-model="user.firstname" type="text" placeholder="Prénom">
          </div>
          <br>
          <div>
            <i class="fas fa-at"></i>
            <br>
            <label > {{ user.email }} </label>
          </div>
          <br>
          <br>

          <button v-if="!update" @click="displayUpdateFields" type="button" class="btn btn-info"><i class="fas fa-user-edit"></i> Modifier</button>
          <button v-else @click="submitModifications" type="button" class="btn btn-info"><i class="fas fa-check-circle"></i> Valider les modifications </button>

          <button @click="deleteUser()" id="btn_delete_profil" type="button" class="btn btn-outline-danger">Supprimer</button>
        </div>
    </div>
    
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import authHeader from '../services/auth-header';

export default {
  name: "User",
  components: {
    NavBar,
  },

  data: function(){
    return {
      userId: "",
      user: {
        firstname: "",
        lastname: "",
        email: ""
      },
      update: false
    }
  },
  
  mounted() {
    this.userId = JSON.parse(sessionStorage.getItem("margaux_oc")).userId
    this.getUser();
    
  },

  methods: {

    // Fonction qui récupère le user
    getUser: async function() {
      fetch(`http://localhost:8080/api/user/${this.userId}`, { headers: authHeader() }).then((response) => {
        response.json().then((user) => {
          this.user = user
          console.log(user)
        })
      })
    },

    
    

    // Fonction qui supprime un user
    deleteUser: async function () {
       await fetch(`http://localhost:8080/api/user/${this.userId}`, {
        method: 'DELETE',
        headers: authHeader(),
      })
      
      sessionStorage.clear();
      window.alert("Votre compte a bien été supprimé")
      this.$router.push({ path: "/" });

    },

    displayUpdateFields : function () {
      this.update = true
    },

    // Fonction qui modifie un user
    submitModifications : async function () {
      const headers = authHeader();
      headers["Content-Type"] = "application/json" ;

      if ( this.user.firstname.trim().length < 1 || this.user.lastname.trim().length < 1 ){
          window.alert("Les champs ne doivent pas être vide !")
          return
      }
      const response = await fetch(`http://localhost:8080/api/user/${this.userId}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({
          firstname : this.user.firstname,
          lastname : this.user.lastname
        }),
      })
      const responseData = await response.json()
      if (responseData.error){
        window.alert("Un problème est survenu !")
        return ;
      }
      this.update = false

    }

    

  }
};
</script>

<style scoped lang="scss">
.user-page {
  text-align: center;
  
  .user-detail {
    
    padding: 5%;
    width: 80%;
    margin-right: auto;
    margin-left: auto;
    background: white;
    border-radius: 5px;
    box-shadow:
    0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
    
    div {
      margin-right: auto;
      margin-left: auto;
      width: 50%;
    }
  }

  #btn_delete_profil {
    margin-left: 4% ;
  }

  label {
    margin: 3px;
  }

  input {
   text-align: center;
  }

}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .user-detail {
   width: 90%; 

    div {
      width: auto;
    }
  }
  
}
</style>