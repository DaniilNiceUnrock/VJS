<template>
        <div class="container">
          <div class="header">
            <div class="title">Блок "Обо мне"</div>
            <iconed-button 
            type="iconed" 
            v-if="emptyCatIsShown === false"
            @click="emptyCatIsShown = true" 
            title="Добавить группу" />
          </div>
          <ul class="skills">
            <li class="item" v-if="emptyCatIsShown">
              <category 
              @remove="emptyCatIsShown = false"
              empty
              />
            </li>
            <li 
              class="item" 
              v-for="category in categories"
              :key="category.id">
            <category 
            :title="category.category"
            :skills="category.skills"/>
            </li>
          </ul> 
        </div>
 
</template>


<script>
import headline from "../components/headline"
import user from "../components/user"
import navigation from "../components/navigation"
import button from "../components/button"
import category from "../components/category"

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
      emptyCatIsShown: false
    }
  },
   created() {
     this.categories = require("../data/categories.json")
   }
};
</script>

<style lang="postcss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
@import "normalize.css";

</style>

<style lang="postcss" scoped src="../app.pcss"></style>