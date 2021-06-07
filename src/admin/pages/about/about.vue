<template>
    <div class="about-page-component">
        <div class="page-content">
            <div class="container" v-if="categories.length">
                <div class="header">
                <div class="title">Блок "Обо мне"</div>
                <iconed-button 
                type="iconed" 
                v-if="emptyCatIsShown === false"
                @click="emptyCatIsShown = true" 
                title="Добавить группу" />
                </div>
                <!--<pre> {{ categories }}</pre> -->
                <ul class="skills">
                <li class="item" v-if="emptyCatIsShown">
                    <category 
                        @remove="emptyCatIsShown = false"
                        @approve="createCategory"
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
                    @create-skill="createSkill($event, category.id)"
                    @edit-skill="editSkill"
                    @remove-skill="removeSkill"
                /> 
                </li>
                </ul> 
            </div>
            <div class="container" v-else>
                loading...
            </div>
        </div>

    </div>
    
</template>


<script>
    import button from "../../components/button"
    import category from "../../components/category"
    import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";
    import  { mapActions , mapState } from "vuex"

export default {
  mixins: [ValidatorMixin],
  validators: {
    'skill.title': function(value) {
        return Validator.value(value).required("Заполни!");
      },
    'skill.percent': value => {
      return Validator.value(value)
        .integer('Только числа!')
        .between(0, 100, "Только от 0 до 100")
        .required('Зaполни!')
    }
  },
  components: {
    iconedButton: button,
    category,
  },
  data() {
    return {
      emptyCatIsShown: false,
    };
  },
  computed: {
    ...mapState("categories",{
      categories: state => state.data
    })
  },
  methods: {
    ...mapActions({
      createCategoryAction: "categories/create",
      fetchCategoriesAction: "categories/fetch",
      addSkillAction: "skills/add",
      removeSkillAction: "skills/remove",
      editSkillAction: "skills/edit",
      showTooltip: "tooltips/show"
    }),
    async createSkill(skill, categoryId) {
      const newSkill = {
        ...skill,
        category: categoryId
      }
      await this.addSkillAction(newSkill);
      this.showTooltip({
          text: "Скилл Добавлен!",
          type: "succes"
      });

      skill.title = 'Имя скилла';
      skill.percent = 0;
    },
    async removeSkill(skill) {
     await this.removeSkillAction(skill);
     this.showTooltip({
          text: "Скилл удалён!",
          type: "succes"
      });
    },
    async editSkill(skill) {
      if (await  this.$validate() ===  false) return; //  если валидация не прошла то мы не выполняем последующий код <-
      await this.editSkillAction(skill);
      this.showTooltip({
            text: "Скилл Изменён!",
            type: "succes"
        });
      skill.editmode = false;        
    },
    async createCategory(categoryTitle) {
      try {
        await this.createCategoryAction(categoryTitle);
        this.showTooltip({
          text: "Категория успешно создана",
          type: "succes"
        });
        this.emptyCatIsShown = false;
      } catch (error) {
        this.showTooltip({
          text: "ops",
          type: "error"
        })
        //console.log(error.message); 
      }
    }
  },
  created() {
    this.fetchCategoriesAction();
  },
};
</script>

<style lang="postcss" scoped src="../../app.pcss"></style>