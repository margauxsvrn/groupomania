<template>
  <div>
    <NavBar />
    <div>
        <div>
            <h2>Post signalés</h2>

            <div v-for="(post, index) in posts" :key="post.id" class="card w-75">
                <div class="card-body">
                    <h5 class="card-title">
                        <!-- {{ post.user.firstname }} {{ post.user.lastname }} -->
                    </h5>
                    <h6 class="card-subtitle mb-2 text-muted">
                        Publié le {{ post.createdAt }}
                    </h6>
                    <p class="card-text">
                        {{ post.text_content }}
                    </p>
                    <a class="btn btn-outline-info" v-on:click="cancelReportPost(post.id, index)">
                        Approuver le post
                    </a>

                    <button type="button" class="btn btn-danger" @click="deletePost(post.id, index)">
                        Supprimer le post
                    </button>
                </div>
            </div>
        </div>


        <div>
            <h2>Commentaire signalés</h2>
          
            <div v-for="(comment, index) in comments" :key="comment.id"  class="alert alert-info comment_message" role="alert">

                <!-- <h5>{{ comment.user.firstname }} {{ comment.user.lastname }}</h5> -->
                <p>{{ comment.comment_content }}</p>
                
                
                <button @click="cancelReportComment(comment.id, index)" type="button" class="btn btn-warning btn-sm">
                    Approuver le commentaire
                </button>

                <button type="button" class="btn btn-danger" @click="deleteComment(comment.id, index)">
                    Supprimer le commentaire
                </button>
            </div>
        </div>

    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";

export default {
  name: "AdminPage",
  components: {
    NavBar,
  },

   data: function () {
    return {
      posts : [],
      comments : []
    };
  },

  mounted() {
    this.getAllPost();
    this.getAllComment();

  },
  
  methods: {

    // Requête qui récupère tous les posts publiés
    getAllPost: function () {
      fetch("http://localhost:8080/api/post/reported").then((response) => {
        response.json().then(posts => {
             this.posts = posts
             console.log(posts)
        });
        
      });
    },

    // Requête qui récupère tous les commentaires publiés
    getAllComment: function () {
      fetch(`http://localhost:8080/api/comment/reported`).then((response) => {
        response.json().then(comments => { 
            this.comments = comments
            console.log(comments)
        });
      });
    },

    deletePost () {

    },

    deleteComment () {

    },

    cancelReportPost () {

    },

    cancelReportComment () {

    }
  }

};
</script>

<style scoped lang="scss">
</style>