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
            :skills="category.skills"
            @removecat="deleteCategory"
            @remove="emptyCatIsShown = false"
            />
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
import { mapActions, mapState } from 'vuex';

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
  computed: {
      ...mapState('categories', {
          categories: state => state.categories
      })
  },
  methods: {
    ...mapActions({
      deleteCategoryAction: 'categories/deleteCat',
    }),
    deleteCategory() {
      console.log('Тест удаления категории');
    },
    /*async deleteCat(id) {
    console.log("кнопка нажати удаления категории");
      try {
        await this.deleteCategoryAction(id);

        this.showTooltip({
            text: "Категория успешно удалена",
            type: "success"
        })
      } catch (error) {
          this.showTooltip({
              text: error.response.data.error,
              type: "error"
          })
      }            
  },*/
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