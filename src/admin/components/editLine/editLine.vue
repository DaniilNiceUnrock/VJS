<template>
  <div class="edit-line-component" :class="{'blocked' : blocked}">
    <div class="title" v-if="editmode === false">
      <div class="text">{{value}}</div>
      <div class="icon">
        <icon symbol="pencil" grayscale @click="editmode = true"></icon>
      </div>
    </div>
    <div v-else class="title">
      <div class="input">
        <app-input
          placeholder="Название новой группы"
          :value="value"
          :class="{'warning' : warning}"
          :errorText="errorText"
          @input="$emit('input', $event)"
          @keydown.native.enter="onApprove"
          autofocus="autofocus"
          no-side-paddings="no-side-paddings"
          v-model="title"
        ></app-input>
         <div class="message">{{ validation.firstError('title') }}</div>
      </div>
      <div class="buttons">
        <div class="button-icon">
          <icon symbol="tick" @click="onApprove"></icon>
        </div>
        <div class="button-icon">
          <icon symbol="cross" @click="$emit('remove')"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleVueValidator from 'simple-vue-validator';
const Validator = SimpleVueValidator.Validator;
import  axios from 'axios';



export default {
  mixins: [SimpleVueValidator.mixin],
  validators: {
    'title': function(value) { 
      return Validator.value(value).required("Заполните поле !");
    },
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    errorText: {
      type: String,
      default: ""
    },
    editModeByDefault : Boolean,
    blocked: Boolean,
    warning: Boolean

  },
  data() {
    return {
      editmode: this.editModeByDefault,
      title: this.value // в режим редактирования даём текущий результат
    };
  },
  methods: {
    
    onApprove() {
      if(localStorage.getItem('token')) {
        if (this.title.trim() === this.value.trim() && this.title != "") {
            console.log(this.title);
            //добавляем новую категорию
            axios
                .post('/categories', {
                    title: this.title
                }).then(response => {
                this.categories.unshift(response.data);
                $emit('remove');
                }).catch(error=> {
                  
                    //alert(error.response.data.error);
            });
            
            this.editmode = false; // делаем зновое
          } else {
            this.warning = true;
            this.$emit("approve", this.value); // не даём применить значение
          }
      }
      else {
        alert('Вы не авторизованы');
        this.$router.push(`/`);
      }
    }
        
  },
  
  components: {
    icon: () => import("components/icon"),
    appInput: () => import("components/input")
  }
};
</script>

<style lang="postcss" scoped src="./editLine.pcss"></style>