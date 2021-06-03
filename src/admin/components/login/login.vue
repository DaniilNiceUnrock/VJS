<template>
    <div class="login-container">   
        <form @submit.prevent="login"  >
            <input type="text" placeholder="login" v-model="user.name" >
            <input type="password" placeholder="password"  v-model="user.password">
            <input type="submit" title="Войти">
        </form>
    </div>
</template>

<script>
import  axios from 'axios';
const baseUrl =  "https://webdev-api.loftschool.com";
axios.defaults.baseURL = baseUrl;

export default {
    components: {
       btn:()=> import('../button'),
       card:()=> import('../card'),
       avatar:()=> import('../avatar'),
       icon:()=> import('../icon'),
    },
    data() {
        return {
            user: {
                name: "DaniilPonomarev",
                password: "090974Papa",
            }
            
        };
    },
    methods: {
        
        login() {
            axios.post('/login', {
                name: this.user.name,
                password: this.user.password
            }).then(resolve => {
                const token = resolve.data.token;
                axios.defaults.headers['Authorization'] = `Bearer ${token}`;
                localStorage.setItem('token', token);
                this.$router.push('about') 
            }).catch(error=> {
                alert(error.response.data.error);
            })
        }
    }
}


</script>

<style lang="pcss" scoped>

</style>