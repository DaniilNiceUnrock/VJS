<template>
  <div class="login-page-component">
    <div class="content">
      <form class="form" @submit.prevent="handleSubmit">
        <div class="form-title">Авторизация</div>
        <div class="row">
          <app-input
            title="Логин"
            v-model="user.name"
            icon="user"
            :errorMessage="validation.firstError('user.name')"
          />
        </div>
        <div class="row">
          <app-input
            title="Пароль"
            v-model="user.password"
            icon="key"
            type="password"
            :errorMessage="validation.firstError('user.password')"
          />
        </div>
        <div class="btn">
          <app-button :disabled="isSubmitDisabled" title="Отправить" />
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import appInput from "../../components/input";
import appButton from "../../components/button";
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";
import axios from "../../requests";
import { mapActions } from "vuex"



export default {
  mixins: [ValidatorMixin],
  validators: {
    "user.name": (value) => {
      return Validator.value(value).required("Введите имя пользователя");
    },
    "user.password": (value) => {
      return Validator.value(value).required("Введите пароль");
    },
  },
  data: () => ({
    user: {
      name: "DaniilPonomarev0311",
      password: "123456",
    },
    isSubmitDisabled: false
  }),
  components: { appButton, appInput },
  methods: {
    ...mapActions({
      showTooltip: "tooltips/show"
    }),
    async handleSubmit() {
      if (await  this.$validate() ===  false) return; //  если валидация не прошла то мы не выполняем последующий код <-
          this.isSubmitDisabled = true;
            try {
              const response = await axios.post("/login", this.user);

              const token = response.data.token;
              localStorage.setItem("token", token);
              axios.defaults.headers['Authorization'] = `bearer ${token}`;
              this.$router.replace('/'); 
              this.showTooltip({
                text: "Авторизация прошла успешно, добро пожаловать в админ панель !",
                type: "succes"
              })
            } catch(error) {
              this.showTooltip({
                text: error.response.data.error,
                type: "error"
              })
              //alert(error.response.data.error)
            } finally {
              this.isSubmitDisabled = false;
            }
    },
},
};
</script>

<style lang="postcss" scoped src="./login.pcss"></style>