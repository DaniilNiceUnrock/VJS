<template>
  <div class="works-page-component page-component">
    <div class="page-content">
      <div class="container">
        <div class="header">
          <div class="title">
            Блок "{{this.$route.meta.title}}"
          </div>
        </div>
        
        <ul class="cards">
          <li class="li-form" v-if="emptyCardIsShown"> 
            <div class="form">
              <app-form 
                :currentWork="currentWork"
                @close="closeHandler"
              />
            </div>
          </li>
          <li class="item empty-work">
            <square-btn 
              type="square"
              v-if="emptyCardIsShown == false"
              @click="emptyCardIsShown = true"
              title="Добавить работу" 
            />
          </li>
          <li class="item" v-for="work in works" :key="work.id" >
            <work-card
              :work="work"
              @edit="edit"
              @remove="remove"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import appForm from "../../components/form";
import workCard from "../../components/workCard";
import SquareBtn from '../../components/button/types/squareBtn';
import { mapState, mapActions } from "vuex";


export default {
  components: { 
    appForm, 
    workCard,
    SquareBtn
  },
  computed: {
    ...mapState("works", {
      works: (state) => state.data,
    }),
  },
  data() {
    return {
      emptyCardIsShown: false,
      currentWork: null
    }
  },
  methods: {
    ...mapActions({
      fetchWorks: "works/fetch",
      removeWork: "works/remove",
      editWork: "works/edit",
      showTooltip: "tooltips/show"
    }),
    closeHandler(){
      this.emptyCardIsShown = false;
    },
    async remove(currentWork) {
      try {
        await this.removeWork(currentWork.id);
        this.showTooltip({
            text: "Работа успешно удалена",
            type: "success"
        })
      } catch (error) {
        this.showTooltip({
            text: error.response.data.error,
            type: "error"
        })
      }
    },
    edit(currentWork) {
      this.currentWork = { ...currentWork };
      this.emptyCardIsShown = true;
    },
    closeHandler(){
      this.emptyCardIsShown = false;
    }
  },
  watch: {
    emptyCardIsShown(){
      if(!this.emptyCardIsShown){
        this.currentWork = null
      }
    }
  },
  mounted() {
    this.fetchWorks();
  }
};
</script>

<style scoped lang="postcss" src="./works.pcss"></style>
