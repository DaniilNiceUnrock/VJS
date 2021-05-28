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
            <iconed-button type="iconed" v-if="emptyCatIsShow === false" @click="emptyCatIsShow = true" title="Добавить в группу" />
          </div>
          <ul class="skills">
            <li class="item" v-if="emptyCatIsShow">
              <category @remove="emptyCatIsShow = false" empty />
            </li>
            <li class="item" v-for="category in categories" :key="category.id">
              <category :title="category.category" :skills="category.skills"/>
            </li>

          </ul>
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
  data() {
    return {
      categories: [],
      emptyCatIsShow: false
    }
  },
  created() {
    this.categories = require("./data/categories.json");
  }
};
</script>


<style lang="postcss">
 
@import "normalize.css";
@import "../styles/mixins.pcss";
@import "../styles/layout/base.pcss";
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");

</style>



<style lang="postcss" src="./app.pcss"></style>
