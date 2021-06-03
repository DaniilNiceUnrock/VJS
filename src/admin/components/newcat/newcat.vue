<template>

    <div class="addcat-container">  
        <form @submit.prevent="addcat" >
            <input type="text" placeholder="Имя категории" v-model="title" >
            <input type="submit" title="Добавить категорию">
            <ol>
                <li v-for="cat in categories" :key="cat.id"> {{cat.category}}
                    <h3> {{cat.category}} </h3>
                        <ol>
                            <li v-for="skill in cat.skills" :key="skill.id"> {{skill.title}}</li>
                        </ol>        
                <form @submit.prevent="addskill" >   
                    <input type="text" placeholder="Имя скила" v-model="skill.title" >
                    <input type="text" title="Проценты" v-model="skill.percent">   
                    <input type="submit" title="add">
                </form>   
                </li>

                    
            </ol>
        </form>
    </div>
</template>

<script>



import  axios from 'axios';

const baseUrl =  "https://webdev-api.loftschool.com";
const token = localStorage.getItem ('token') || "";

axios.defaults.baseURL = baseUrl;

axios.defaults.headers['Authorization'] = `bearer ${token}`;


export default {
    components: {
    },
    data() {
        return {
            title: "",

            categories: [],

            skill: {
                title: "",
                percent: "",
                categoryId: 1
            },
        };
    },
    created() {
        this.fetchCategories();
    },
    methods: {
        addcat() {
            alert(token);
            axios
                .post('/categories', {
                    title: this.title
                }).then(response => {
                this.categories.unshift(response.data);
                }).catch(error=> {
                    alert(error.response.data.error);
                });
        },
        fetchCategories()  {

            axios.get('/categories/457').then(response => {
                this.categories = response.data
            })
        },
        addskill() {
             axios.post('/skill?token=' + token, {
                title: this.skill,
                percent: this.percent,
                category: this.categoryId
            }).then(response => {
               this.categories.unshift(response.data);
            }).catch(error=> {
                alert(error.response.data.error);
            });
        }
    }
};


</script>

<style lang="pcss" scoped>

</style>