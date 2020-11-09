<template>
  <div class="allPostModule">
    <!-- J'indique deux paramètre afin de récupérer l'index de chaques éléments du tableau Posts que l'on parcourt -->
    <div v-for="(post, index) in posts" :key="post.id" class="card w-75">

      <div class="card-body">
        <h5 class="card-title">{{ post.user.firstname }} {{ post.user.lastname }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Publié le {{ post.createdAt }}</h6>
        <p class="card-text">{{ post.text_content }}</p>
        <a class="btn btn-outline-info" v-on:click="openCommentSection(post.id)">Commenter</a>

        <!-- Je mets une condition "if" si le userId correspond à l'auteur (UserId) du Post.
        Fonction DeletePost qui contient deux paramètres, l'Id du post et l'Index qui correspond à sa position dans le tableau -->
        <button v-if="post.userId == userId" type="button" class="btn btn-danger" @click="deletePost(post.id, index)">Supprimer</button>

        <!-- Partie commentaire -->
        <div v-if="commentSection">
          <br>
          <div class="alert alert-info" role="alert">
            <strong>Auteur</strong>
            <br>
            Commentaire
          </div>

          <textarea v-model="comment_content" name="" id="" cols="28" rows="3" placeholder="Votre commentaire..."></textarea>

          <button @click="sendComment" id="comment_button_send"  class="btn btn-info ">Envoyer</button>
        </div>

      </div>
    </div>
  </div>
      
</template>



<script>
export default {
  name: "AllPosts",

    data: function() {
      return {
        firstname: "" ,
        lastname: "" ,
        userId: "",
        posts: [],
        commentSection: false,
        comment_content:""
      }
    },
  
  
  mounted() {
    const mySessionStorage = JSON.parse(sessionStorage.getItem('margaux_oc'))
    if (mySessionStorage.firstname && mySessionStorage.userId){
      this.firstname = mySessionStorage.firstname
      this.userId = mySessionStorage.userId
    }
    console.log(mySessionStorage)
    this.getAllPost()
  },


  methods: {

    // Requête qui récupère tous les posts publiés
    getAllPost: function () {
      fetch("http://localhost:8080/api/post/published").then((response) => {
        response.json().then((posts) => {
          this.posts = posts.map((post) => {
            post.createdAt = this.formateDate(post.createdAt)
            return post
          })
          console.log(this.posts)
        })
      })
    },

    // Méthode qui reformate la date et l'heure de l'élément "createdAt"
    formateDate: function (dateToFormat) {
      let output = dateToFormat.split(".")[0]
      output = output.split("T")
      let time = output[1]
      let postDate = output[0].split("-").reverse().join("/")
      output = postDate + " " + time 
      return output; 
    },

    // Fonction qui supprime un post
    deletePost: async function (postId, index) {
      let response = await fetch(`http://localhost:8080/api/post/${postId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
      })
      let responseData = await response.json();
      console.log(responseData);
      this.posts.splice(index, 1)
      return responseData;
    },

    openCommentSection: function() {
      this.commentSection = true;
    },

    // Fonction qui ouvre le module pour laisser un commentaire
    // commentSection: async function () {

    // },

    // Fonction qui ajoute un commentaire
    sendComment: async function (postId, userId) {
      if (this.comment_content){
        let response = await fetch("http://localhost:8080/api/comment/", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment_content : this.comment_content,
            userId: this.userId,
            postId: this.posts.id
          })
        })
        console.log(postId, userId)
        let responseData = await response.json();
        console.log(responseData);
        return responseData;
      }
    }
    
  },

};
</script>

<style scoped lang="scss">
.allPostModule {
  margin-left: auto;
  margin-right: auto;
  margin: 2%;
  margin-bottom: 5%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  

  .card {
    margin: 2%;
    background-color: #2c3e50ec;
    color: white;
    text-align: left;

    button {
      margin-left: 10px;
    }

    textarea {
      margin-top: 10%;
      padding: 2%;
      border-radius: 5px;
    }

    textarea:focus{
      outline: none;
    }

  }

  #comment_button_send {
    margin-top: -20px;
    margin-bottom: 10px;

  }

  
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  
}

</style>