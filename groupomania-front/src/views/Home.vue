<template>
  <div>
    <NavBar />
    <div class="user-page">
      <div>Publication</div>
      <div>Description</div>
      <div>Image</div>
      <div>Nom et Prénom</div>
      <div>Commentaire</div>
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
};
</script>

<style scoped lang="scss">
.user-page {
  margin-left: 5%;
  text-align: justify;
}
</style>