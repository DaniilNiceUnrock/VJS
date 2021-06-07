<template>
  <div 
  :class="['skill-add-line-component', {blocked: blocked}]"
  >
    <div class="title">
      <app-input 
        :errorMessage="validation.firstError('skill.title')"
        @focusup="onKeyUpName()"
        v-model="skill.title" 
        placeholder="Новый навык1" 
      />

    </div>
    <div class="percent">
      <app-input 
        :errorMessage="validation.firstError('skill.percent')"
        v-model="skill.percent" 
        type="number" 
        min="0" 
        max="100" 
        maxlength="3" 
      />

    </div>
      <div class="button">
        <round-btn type="round"  @click="handleClick"/>
      </div>
  </div>
</template>

<script>
import input from "../input";
import button from "../button";
import {Validator, mixin as ValidatorMixin} from 'simple-vue-validator';
import { mapActions } from "vuex"

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
  data() {
    return {
      skill: {
        title: "",
        percent: 0,
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
    ...mapActions({
      showTooltip: "tooltips/show"
    }),
    onKeyUpName() {
      console.log = (this.skill.title);
    },
    async handleClick() {
      if (await this.$validate() === false) return;
      this.$emit('approve', this.skill);
      this.showTooltip({
        text: "Новый скилл добавлен !",
        type: "succes"
      })
    }
  }

}
</script>

<style lang="postcss" scoped src="./skillAddLine.pcss"></style>