<template>
  <div>
    <NavBar />
    <div class="user-page">
      <div>Photo</div>
      <div>Nom :</div>
      <div>Prénom :</div>
      <div>Email :</div>
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
};
</script>

<style scoped lang="scss">
.user-page {
  margin-left: 5%;
  text-align: justify;
}
</style>