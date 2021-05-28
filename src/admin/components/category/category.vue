<template>
  <card slim>
    <edit-line slot="title" v-model="categotyTitle" :editModeByDefault="empty" @remove="$emit('remove', $event)" />
    <template slot="content">
      <ul class="skills" v-if="empty === false">
        <li class="item" v-for="skill in skills" :key="skill.id">
          <skill :skill="skill" />
        </li>
      </ul>
      <div class="bottom-line">
        <skillAddLine :blocked="empty" />
      </div>
    </template>
  </card>
</template>

<script>
import card from "../card";
import editLine from "../editLine";
import skill from "../skill";
import skillAddLine from "../skillAddLine";



export default {
  components: {
    card, 
    editLine,
    skill,
    skillAddLine
  },
  props: {
    empty: Boolean,
    title: {
      type: String,
      default: ""
    },
    skills: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      categotyTitle: this.title,
    }
  }
}
</script>

<style lang="postcss" scoped src="./category.pcss"></style>