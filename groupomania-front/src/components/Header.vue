<template>
  <router-link to="/">
    <img
      class="logo-groupomania"
      alt="logo groupomania"
      src="../assets/icon-groupomania.png"
    />
  </router-link>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped lang="scss">
div .logo-groupomania {
  width: 30%;
  height: auto;
  margin-bottom: 5%;
  margin-top: 2%;
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  div .logo-groupomania {
    width: 60%;
    margin-right: 0;
  }
}
</style>