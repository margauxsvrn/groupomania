<template>
  <div>
    <NavBar />
    <div class="user-page">
      <h2><i class="fab fa-angellist"></i> Bienvenue {{ firstname }} !</h2>
      <br>
      <div class="card">
      <div class="card-header">
        Publier un post
      </div>
      <div class="card-body">
      <textarea class="input-post" type="text" placeholder="Dites-nous quelque chose..." v-model="postContent" ></textarea>
      <br>
      <br>
      <a href="#" class="btn btn-primary" type="submit" @click="submitPost">Publier <i class="far fa-paper-plane"></i></a>
    </div>
</div>
      
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";

export default {
  name: "Home",
  components: {
    NavBar,
  },

  data: function(){
    return {
      firstname: "",
      postContent:""
    }
  },
  
  mounted() {
    const mySessionStorage = JSON.parse(sessionStorage.getItem('margaux_oc'))
    if (mySessionStorage.firstname){
      this.firstname = mySessionStorage.firstname
    }
  },

  methods: {
    
    submitPost: function() {
      let postContent = postContent

    }

  }

};
</script>

<style scoped lang="scss">
.user-page {
  margin-left: 5%;
  margin-right: 5%;
  text-align: justify;

  .input-post {
    width: 80%;
    height: 150px;
    padding: 1%;
    color: #858586;
    border: none;
    
  }
  textarea:focus{
      outline: none;
    }
}
</style>