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
    import  { mapActions , mapState } from "vuex"

    export default {
    components: {
        iconedButton: button,
        category
    },
    data() {
        return {
            emptyCatIsShown: false
        }
    },
    computed: {
        ...mapState("categories", {
            categories: state => state.data
        })
    },
    methods: {
        ...mapActions({
            createCategoryAction: "categories/create",
            fetchCategoryAction: "categories/fetch",
            addSkillAction: "skills/add",
            editSkillAction: "skills/edit",
            removeSkillAction: "skills/remove",
        }),
        createCategory(categoryTitle) {
            this.createCategoryAction(categoryTitle);
        },
        async createSkill(skill, categoryID) {
            const newSkill = {
                ...skill,
                category: categoryID
            }
            //console.log('skill', skill);
            await this.addSkillAction(newSkill);

            skill.title = "";
            skill.percent = "0";
        },
        async editSkill(skill) {
            //console.log(skill);
            await this.editSkillAction(skill);
            skill.editmode = false;
        },
       async removeSkill(skill) {
           await this.removeSkillAction(skill);
        },
    },
    created() {
        this.fetchCategoryAction();
        this.categories
        //this.categories = require("../../data/categories.json")
    }
    };
</script>

<style lang="postcss" scoped src="../../app.pcss"></style>