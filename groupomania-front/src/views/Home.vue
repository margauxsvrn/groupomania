<template>
  <div>
    <NavBar />
    <CreatePost />
    <br>
    <AllPosts />
    
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import CreatePost from "../components/CreatePost";
import AllPosts from "../components/AllPosts";


export default {
  name: "Home",
  components: {
    NavBar,
    CreatePost,
    AllPosts
  },

};

</script>

<style scoped lang="scss">

</style>