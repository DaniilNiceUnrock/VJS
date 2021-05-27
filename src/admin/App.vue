<template lang="pug">
  <div class="app-container">
      <headline title ="Панель администратора">
      <user />
      </headline>
  </div>
</template>



<script>

import headline from "./components/headline";
import user from "./components/user";


export default {
  components: {
    headline,
    user,
  },
};
</script>


<style lang="postcss">

@import "normalize.css";
@import "../styles/mixins.pcss";
@import "../styles/layout/base.pcss";
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");

</style>



<style lang="postcss" scoped src="./app.pcss"></style>
