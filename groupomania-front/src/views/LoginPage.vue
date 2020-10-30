<template>
  <div class="loginpage">
    <Header/>
    <LoginForm/>
  </div>
</template>

<script>
// J'importe les composants dont j'ai besoin dans la page
// @ is an alias to /src
import LoginForm from "@/components/LoginForm.vue";
import Header from "../components/Header.vue";

// J'exporte les composants dont j'ai besoin dans la page
export default {
  name: "LoginPage",
  components: {
    LoginForm,
    Header
  }
};
</script>
