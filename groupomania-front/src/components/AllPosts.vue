<template>
  <div class="allPostModule">
    <!-- J'indique deux paramètre afin de récupérer l'index de chaques éléments du tableau Posts que l'on parcourt -->
    <div v-for="(post, index) in posts" :key="post.id" class="card w-75">
      <div class="card-body">
        <!-- Bouton signaler le post -->
        <button
          v-if="!post.hasBeenReport"
          @click="reportPost(post.id, index)"
          type="button"
          class="btn btn-warning btn-sm signaled_button"
        >
          Signaler
        </button>
        <div v-else class="alert alert-warning btn_report" role="alert">
          Post signalé !
        </div>

        <h5 class="card-title">
          {{ post.user.firstname }} {{ post.user.lastname }}
        </h5>
        <h6 class="card-subtitle mb-2 text-muted">
          Publié le {{ post.createdAt }}
        </h6>
        <p class="card-text">
          {{ post.text_content }}
        </p>
        <a
          class="btn btn-outline-info"
          v-on:click="openCommentSection(post.id, index)">
          Voir les commentaires
        </a>

        <!-- Je mets une condition "if" si le userId correspond à l'auteur (UserId) du Post.
        Fonction DeletePost qui contient deux paramètres, l'Id du post et l'Index qui correspond à sa position dans le tableau -->
        <button
          v-if="post.userId == userId"
          type="button"
          class="btn btn-danger"
          @click="deletePost(post.id, index)">
          Supprimer
        </button>

        <!-- BLOC COMMENTAIRE -->

        <!-- Partie fait apparaître tous les commentaires rataché au post, apparaît si on clic sur 'voir les commentaires' -->
        <div
          v-for="(comment, index_c) in post.comments"
          :key="comment.id"
          class="alert alert-info comment_message"
          role="alert">
          <!-- Bouton pour supprimer un commentaire -->
          <button
            v-if="comment.userId == userId"
            @click="dismissComment(comment.id, index)"
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close">
            <span aria-hidden="true">
               &times;
            </span>
          </button>

          <h5>
            {{ comment.user.firstname }} {{ comment.user.lastname }}
          </h5>
          <p>
            {{ comment.comment_content }}
          </p>

          <!-- Bouton signaler le commentaire -->
          <button
            v-if="!comment.hasBeenReport"
            @click="reportComment(comment.id, index, index_c)"
            type="button"
            class="btn btn-warning btn-sm">
            Signaler
          </button>
          <div v-else class="alert alert-warning btn_report" role="alert">
            Commentaire signalé !
          </div>
        </div>

        <!-- Partie ajouter un commentaire apparaît si on clique sur 'voir les Commentaires' -->
        <div v-if="post.displayComment">
          <p>
            <textarea
              v-model="comment_content"
              name=""
              cols="28"
              rows="3"
              placeholder="Ajouter un commentaire...">
            </textarea>
          </p>
          <button
            @click="sendComment(post.id)"
            class="btn btn-info comment_button_send">
            Envoyer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "AllPosts",

  data: function () {
    return {
      firstname: "",
      lastname: "",
      userId: "",
      posts: [],
      comment_content: "",
    };
  },

  mounted() {
    const mySessionStorage = JSON.parse(sessionStorage.getItem("margaux_oc"));
    this.firstname = mySessionStorage.firstname;
    this.userId = mySessionStorage.userId;

    console.log(mySessionStorage);
    this.getAllPost();
  },

  methods: {
    // Requête qui récupère tous les posts publiés
    getAllPost: function () {
      fetch("http://localhost:8080/api/post/published").then((response) => {
        response.json().then((posts) => {
          this.posts = posts.map((post) => {
            post.createdAt = this.formateDate(post.createdAt);
            post.displayComment = false;
            post.comments = [];
            post.hasBeenReport = false;
            return post;
          });
          console.log(this.posts);
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

    // Fonction qui supprime un post
    deletePost: async function (postId, index) {
      let response = await fetch(`http://localhost:8080/api/post/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let responseData = await response.json();
      console.log(responseData);
      this.posts.splice(index, 1);
      return responseData;
    },

    // Fonction qui ouvre le module pour laisser un commentaire
    openCommentSection: function (postId, index) {
      this.posts[index].displayComment = true;
      this.getAllComment(postId).then((comments) => {
        this.posts[index].comments = comments;
      });
    },

    // Fonction qui ajoute un commentaire
    sendComment: async function (postId) {
      if (this.comment_content) {
        let response = await fetch("http://localhost:8080/api/comment/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment_content: this.comment_content,
            userId: this.userId,
            postId: postId,
          }),
        });
        console.log(postId, this.userId);
        let responseData = await response.json();
        console.log(responseData);
        this.comment_content = "";
        this.$router.go();
        return responseData;
      }
    },

    // Requête qui récupère tous les commentaires publiés
    getAllComment: async function (postId) {
      const response = await fetch(
        `http://localhost:8080/api/comment/published/${postId}`
      );
      const comments = await response.json();

      return comments.map((comment) => {
        comment.hasBeenReport = false;
        return comment;
      });
    },

    // Fonction qui supprime un commentaire
    dismissComment: async function (commentId, index) {
      let response = await fetch(
        `http://localhost:8080/api/comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let responseData = await response.json();
      console.log(responseData);
      this.comments.splice(index, 1);
      return responseData;
    },

    // Fonction qui signale un post
    reportPost: async function (id, index) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/post/report/${id}/1`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await response.json();
        console.log(responseData);

        this.posts[index].hasBeenReport = true;
      } catch (error) {
        console.log(error);
      }
    },

    // Fonction qui signale un commentaire
    reportComment: async function (id, postIndex, index) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/comment/report/${id}/1`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await response.json();
        console.log(responseData);

        this.posts[postIndex].comments[index].hasBeenReport = true;
      } catch (error) {
        console.log(error);
      }
    },
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

    h5.card-title {
      margin-top: 30px;
    }

    textarea {
      margin-top: 10%;
      padding: 2%;
      border-radius: 5px;
      width: 100%;
    }

    textarea:focus {
      outline: none;
    }
  }

  .comment_button_send {
    margin: 0;
  }

  .comment_message {
    margin-top: 3%;

    h5 {
      font-size: 1rem;
      font-weight: bold;
    }
  }

  .signaled_button {
    margin: 0;
    position: absolute;
    right: 7px;
    top: 7px;
  }

  .btn_report {
    font-size: 0.8em;
    width: 185px;
  }
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */


}
</style>