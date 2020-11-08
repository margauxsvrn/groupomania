<template>
  <div class="user-page">
      <h2><i class="fab fa-angellist"></i> Bienvenue {{ firstname }} !</h2>
      <br>
      <div class="card">
        <div class="card-header">
          Publier un post
        </div>
        <div class="card-body">
          <textarea class="input-post" type="text" placeholder="Dites-nous quelque chose..." v-model="text_content" ></textarea>
          <br>
          <br>
          <a href="#" class="btn btn-primary" type="submit" @click="submitPost">Publier <i class="far fa-paper-plane"></i></a>
        </div>
      </div>
      <br>
      <hr>
    </div>
</template>



<script>
export default {
  name: "CreatePost",

    data: function(){
    return {
      firstname: "",
      text_content:"",
      userId: ""
    }
  },
  
  // Lorsque je me connecte je récupère le sessionStorage
  
  mounted() {
    const mySessionStorage = JSON.parse(sessionStorage.getItem('margaux_oc'))
    if (mySessionStorage.firstname){
      this.firstname = mySessionStorage.firstname,
      this.userId = mySessionStorage.userId
    }
  },

  methods: {
    // Fonction qui lance la requête à l'API pour créer le post
    sentData: async function () {
      let response = await fetch("http://localhost:8080/api/post/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text_content: this.text_content,
          userId: this.userId
        }),
      });
      let responseData = await response.json();
      console.log(responseData);
      return responseData;
    },
    
    // Fonction appelé au clic sur le btn "Publier" qui appel la fonction sentData pour enregistrer le post dans la BDD
    submitPost: function (e) {
      e.preventDefault();

      if (this.text_content) {
        this.sentData().then((response) => {
          if (response.error) {
            window.alert(response.error);
          }
          else {
            this.text_content = ""
            this.$router.go()
          }
        });
      } else {
        window.alert("Le post doit contenir du texte !");
      }
    },

  }
};
</script>

<style scoped lang="scss">
.user-page {
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 5%;
  text-align: justify;

  .input-post {
    width: 80%;
    height: 100px;
    padding: 1%;
    color: #2C3E50;
    border: none;
    
  }
  textarea:focus{
      outline: none;
    }
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  h2 {
    font-size: 1.6rem;
  }
}

</style>