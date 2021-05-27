<template lang="pug">
  <div class="app-container">
      <headline title ="Панель администратора">
      <user />
      </headline>
      <navigation />
      <div class="page-content">
        <div class="container">
          <div class="header">
            <div class="title"> Блок "Обо мне"</div>
            <iconed-button type="iconed"  title="Добавить в группу" />
          </div>
          <ul class="skills">
            <li class="item">
              <category />
            </li>
            <li class="item">
              <category />
            </li>
            <li class="item">
              <category />
            </li>
          </ul>
          <skill />
          <category  />
        </div>
      </div>
      
  </div>
</template>



<script>

import headline from "./components/headline";
import user from "./components/user";
import navigation from "./components/navigation";
import button from "./components/button";
import category from "./components/category";




export default {
  components: {
    headline,
    user,
    navigation,
    iconedButton: button,
    category
  },
};
</script>


<style lang="postcss">
 
@import "normalize.css";
@import "../styles/mixins.pcss";
@import "../styles/layout/base.pcss";
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");

</style>



<style lang="postcss" src="./app.pcss"></style>
