<template>
  <div class="allPostModule">
    <div class="card w-75">
      <div class="card-body">
        <h5 class="card-title">Nom de l'auteur</h5>
        <h6 class="card-subtitle mb-2 text-muted">Publié le</h6>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <a href="#" class="btn btn-outline-info">Commenter</a>
      </div>
    </div>
  </div>
      
</template>



<script>
export default {
  name: "AllPosts",

    data: function(){
    return {
      firstname: "",
      text_content:"",
      createdAt: ""
    }
  },
  
  mounted() {
    const mySessionStorage = JSON.parse(sessionStorage.getItem('margaux_oc'))
    if (mySessionStorage.firstname){
      this.firstname = mySessionStorage.firstname
    }
  },

  // methods: {
    // getAllPost: function () {
    //   fetch("http://localhost:8080/api/post/published").then(function (response){
    //     response.json().then(function(posts){
    //       for (const post of posts) {

    //       }
    //     })
    //   })
        
      
      
  //   },
  // }
};
</script>

<style scoped lang="scss">
.allPostModule {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5%;
  display: flex;
  justify-content: center;
  width: auto;

  .card {
    background-color: #2c3e50;
    color: white;
    text-align: justify;

  }

  
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  
}

</style>