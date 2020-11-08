<template>
  <div class="allPostModule">
    <div v-for="post in posts" :key="post.id" class="card w-75">
      <div class="card-body">
        <h5 class="card-title">{{ post.user.firstname }} {{ post.user.lastname }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Publié le {{ post.createdAt }}</h6>
        <p class="card-text">{{ post.text_content }}</p>
        <a class="btn btn-outline-info">Commenter</a>
        <button type="button" class="btn btn-danger" @click="deletePost">Supprimer</button>
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
        text_content: "",
        createdAt: "",
        posts: []
      }
    },
  
  
  mounted() {
    const mySessionStorage = JSON.parse(sessionStorage.getItem('margaux_oc'))
    if (mySessionStorage.firstname){
      this.firstname = mySessionStorage.firstname
    }
    this.getAllPost()
  },


  methods: {
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

    // Je crée une méthode qui reformate la date et l'heure de l'élément "createdAt"
    formateDate: function (dateToFormat) {
      let output = dateToFormat.split(".")[0]
      output = output.split("T")
      let time = output[1]
      let postDate = output[0].split("-").reverse().join("/")
      output = postDate + " " + time 
      return output; 
    },

    deletePost: function () {
      
    }

  }
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

  }

  
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  
}

</style>