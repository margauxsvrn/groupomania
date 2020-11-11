<template>
    <div>
        <NavBar />
        <div>
            <div class="section_report_post">
                <h2>Post(s) signalé(s)</h2>

                <div v-for="(post, index) in posts" :key="post.id" class="card report_post_card">
                    <div class="card-body">
                        <h5 class="card-title">
                        {{ post.user.firstname }} {{ post.user.lastname }}
                        </h5>
                        <h6 class="card-subtitle mb-2 text-muted">
                        Publié le {{ post.createdAt }}
                        </h6>
                        <p class="card-text">
                        {{ post.text_content }}
                        </p>
                        <button
                        class="btn btn-outline-info"
                        v-on:click="cancelReportPost(post.id, index)"
                        >
                        Approuver le post
                        </button>

                        <button
                        type="button"
                        class="btn btn-danger"
                        @click="deletePost(post.id, index)"
                        >
                        Supprimer le post
                        </button>
                    </div>
                </div>
            </div>
<hr>
            <div class="section_report_comment">
                <h2>Commentaire(s) signalé(s)</h2>

                <div
                v-for="(comment, index) in comments"
                :key="comment.id"
                class="alert alert-info report_comment_card"
                role="alert"
                >
                    <h5>{{ comment.user.firstname }} {{ comment.user.lastname }}</h5>
                    <p>{{ comment.comment_content }}</p>

                    <button
                        @click="cancelReportComment(comment.id, index)"
                        type="button"
                        class="btn btn-warning "
                    >
                        Approuver le commentaire
                    </button>

                    <button
                        type="button"
                        class="btn btn-danger"
                        @click="deleteComment(comment.id, index)"
                    >
                        Supprimer le commentaire
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from "../components/NavBar";
import authHeader from '../services/auth-header';

export default {
  name: "AdminPage",
  components: {
    NavBar,
  },

  data: function () {
    return {
      posts: [],
      comments: [],
    };
  },

  mounted() {
    this.getAllPost();
    this.getAllComment();
  },

  methods: {
    // Requête qui récupère tous les posts publiés
    getAllPost: function () {
      fetch("http://localhost:8080/api/post/reported", { headers: authHeader() }).then((response) => {
        response.json().then((posts) => {
          this.posts = posts;
          this.posts = posts.map((post) => {
            post.createdAt = this.formateDate(post.createdAt);
            return post;
          });
        });
      });
    },

    // Méthode qui reformate la date et l'heure de l'élément "createdAt"
    formateDate: function (dateToFormat) {
      let output = dateToFormat.split(".")[0];
      output = output.split("T");
      let time = output[1];
      let postDate = output[0].split("-").reverse().join("/");
      output = postDate + " " + time;
      return output;
    },

    // Requête qui récupère tous les commentaires publiés
    getAllComment: function () {
      fetch(`http://localhost:8080/api/comment/reported`, { headers: authHeader() }).then((response) => {
        response.json().then((comments) => {
          this.comments = comments;
          console.log(comments);
        });
      });
    },

    async deletePost(postId, index) {
      let response = await fetch(`http://localhost:8080/api/post/${postId}`, {
        method: "DELETE",
        headers: authHeader(),
      });
      let responseData = await response.json();
      console.log(responseData);
      this.posts.splice(index, 1);
      return responseData;
    },

    async deleteComment(commentId, index) {
      let response = await fetch(
        `http://localhost:8080/api/comment/${commentId}`,
        {
          method: "DELETE",
          headers: authHeader(),
        }
      );
      let responseData = await response.json();
      console.log(responseData);
      this.comments.splice(index, 1);
      return responseData;
    },

    async cancelReportPost(id, index) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/post/report/${id}/0`,
          {
            method: "PUT",
            headers: authHeader(),
          }
        );
        const responseData = await response.json();
        console.log(responseData);

        this.posts.splice(index, 1);
      } catch (error) {
        console.log(error);
      }
    },

    async cancelReportComment(id, index) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/comment/report/${id}/0`,
          {
            method: "PUT",
            headers: authHeader(),
          }
        );
        const responseData = await response.json();
        console.log(responseData);

        this.comments.splice(index, 1);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="scss">

.section_report_post {
    margin-top: 10%;
    margin-bottom: 10%;

    h2{
        margin-bottom: 10%;
    }

    .report_post_card{
        margin: 5%;
        margin-right: auto;
        margin-left: auto;
        width: 400px;
    }

    .card-body{
        width: auto;
    }

    button{
        margin: 2%;
    }

}

.section_report_comment {
    margin-top: 10%;

    h2{
       margin-bottom: 10%; 
    }

    .report_comment_card{
        margin: 5%;
        margin-right: auto;
        margin-left: auto;
        width: 400px;
    }

    button{
        margin: 2%;
    }
}



</style>