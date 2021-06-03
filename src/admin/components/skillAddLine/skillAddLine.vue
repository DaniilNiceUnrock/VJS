<template>
  <div 
  :class="['skill-add-line-component', {blocked: blocked}]"
  >
    <div class="title">
      <app-input v-model="skill.title" placeholder="Новый навык" />
      <div class="message">{{ validation.firstError('skill.title') }} </div>
    </div>
    <div class="percent">
      <app-input v-model="skill.percent" type="number" min="0" max="100" maxlength="3" />
      <div class="message">{{ validation.firstError('skill.percent') }}</div>
    </div>
      <div class="button" @click="addSkill">
        <round-btn type="round"/>
      </div>
  </div>
</template>

<script>
import input from "../input";
import button from "../button";

import SimpleVueValidator from 'simple-vue-validator';
const Validator = SimpleVueValidator.Validator;

import axios from 'axios';


export default {
  mixins: [SimpleVueValidator.mixin],
  validators: {
    'skill.title': function(value) {
        return Validator.value(value).required('Заполни поле !');
      },
      'skill.percent': function(value) {
        return Validator.value(value).required('Заполни поле !');
      },
  },
  props: {
    blocked: Boolean,
    categoryNewId: {
      type  : Number ,
      default: 0,
    }       
  },
  data() {
    return {
      skill: {
        title: "",
        percent: "",
        category: this.categoryNewId
      },

    }
  },

  components: {
    roundBtn: button,
    appInput: input,
  },
  methods: {
    addSkill: function() {
     
      //добавление нового скила
            axios.post('/skill' , this.skill).then(response => {
               alert('Должно было выгрузиться')
            }).catch(error=> {
                alert(error.response.data.error);
            }); 
             alert(this.categoryNewId);
      this.$validate()
        .then(function(success) {

             

          if (success) {
            return
          }
        });
      }
  }
}
</script>

<style lang="postcss" scoped src="./skillAddLine.pcss"></style>