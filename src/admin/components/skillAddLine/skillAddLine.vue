<template>
  <div 
  :class="['skill-add-line-component', {blocked: blocked}]"
  >
    <div class="title">
      <app-input v-model="skill.title" placeholder="Новый навык" />
      <div class="message">{{ validation.firstError('skill.title') }}</div>
    </div>
    <div class="percent">
      <app-input v-model="skill.percent" type="number" min="0" max="100" maxlength="3" />
      <div class="message">{{ validation.firstError('skill.percent') }}</div>
    </div>
      <div class="button" @click="submit">
        <round-btn type="round" />
      </div>
  </div>
</template>

<script>
import input from "../input";
import button from "../button";

import SimpleVueValidator from 'simple-vue-validator';
const Validator = SimpleVueValidator.Validator;


export default {
  mixins: [SimpleVueValidator.mixin],
  validators: {
    'skill.title': function(value) {
        
        return Validator.value(value).required(alert('заполни поле с названием'));
        
      },
      'skill.percent': function(value) {
         
        return Validator.value(value).required(alert('заполни поле с процентами'));
      },
  },
  data() {
    return {
      skill: {
        title: "",
        percent: ""
        }
    }
  },
  props: {
    blocked: Boolean
  },
  components: {
    roundBtn: button,
    appInput: input,
  },
  methods: {
    submit: function() {
      this.$validate()
        .then(function(success) {
            console.log(success);
          if (success) {
            return
          }
        });
      }
  }
}
</script>

<style lang="postcss" scoped src="./skillAddLine.pcss"></style>