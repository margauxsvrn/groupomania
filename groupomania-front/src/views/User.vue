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
            {{ lastname }} {{ firstname }}
          </div>
          <br>
          <div>
            <i class="fas fa-at"></i>
            <br>
            {{ email }}
          </div>
          <br>
          <br>
          <button type="button" class="btn btn-primary"><i class="fas fa-user-edit"></i> Modifier</button>
        </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";

export default {
  name: "User",
  components: {
    NavBar,
  },

  data: function(){
    return {
      firstname: "",
      lastname: "",
      email: ""
    }
  },
  
  mounted() {
    const mySessionStorage = JSON.parse(sessionStorage.getItem('margaux_oc'))
    if (mySessionStorage.firstname, mySessionStorage.lastname, mySessionStorage.email){
      this.firstname = mySessionStorage.firstname,
      this.lastname = mySessionStorage.lastname,
      this.email = mySessionStorage.email
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