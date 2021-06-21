import Vue from "vue";
import axios from "axios";
axios.defaults.baseURL  = "https://webdev-api.loftschool.com";
import animate from "animate.css";


const thumbs = {
    props: ["works", "currentWork"],
    template : "#preview-thumbs",
   
};

const btns = {
    template : "#preview-btns",
};

const display = {
    props : ["currentWork", "works" , "currentSlideData", "currentIndex", "slideNumber"],
    template : "#preview-display",
    components : {thumbs, btns},
    computed: {
        reversedWorks() {
            const works = [...this.works];
            return works.slice(0, 3).reverse();
        }
    },
    methods: {
        beforeEnter(el) {
            el.classList.add("animate__fadeInUp");
            console.log("beforeel");
        },
        afterEnter(el) {
            el.classList.remove("animate__fadeInUp");
            console.log("afterEnter");
        },
        leave(el) {
            el.classList.add("animate__fadeInDown");
            console.log("leave");
        },
        afterLeave(el) {
            el.classList.remove("animate__fadeInDown");
            console.log("afterLeave");
        },
    }
    
};

const tags = {
    props: ["tags"],
    template : "#preview-tags",
};

const info = {
    props : ["currentWork"],
    template : "#preview-info",
    components : {tags},
    computed : {
        tagsArray() {
            return this.currentWork.techs.split(",");
        },
        
    },
};



new Vue({
    el: "#preview-component",
    template : "#preview-container",
    components : {display, info},
    data() {
        return{
            works: [],
            currentIndex: 0,
            slideNumber: 0
        };
    },
    computed: {
        currentWork() {
            return this.works[this.currentIndex];
        },
        currentSlideData() {
            return  this.works[this.currentIndex];

        }
    },
    // watch: {
    //    currentIndex(value) {
    //     this.makeInfiniteLoopForNdx(value);
    // },
    //},
    methods: {
        makeInfiniteLoopForNdx(index) {
           const worksNumber = this.works.lenght - 1;
           if (index < 0) this.currentIndex = worksNumber;
           if (index > worksNumber) this.currentIndex = 0;
        },
        requireImagesToArra(data){
            return data.map(item=> {
                //const requiredImage = require(`../images/content/${item.photo}`).default;
                const requiredImage = `${axios.defaults.baseURL}/${item.photo}`;
                item.photo = requiredImage;
                return item;
            });
        },
        slide(direction){
            const lastslide = this.works.length - 1;
            const lastsItem = this.works[this.works.length - 1];
            const firstslide = 0;
            
            switch(direction){
                case "next" : 
                    //this.currentIndex++;
                    this.slideNumber++;
                    this.works.push(this.works[0]);
                    this.works.shift();
                    
                    console.log(this.slideNumber);
                    break;
                case "prev" : 
                   // this.currentIndex--;
                   this.slideNumber--;
                    this.works.unshift(lastsItem);
                    this.works.pop();    
                    console.log(this.slideNumber);
                    break;
            }
             if (this.slideNumber  > lastslide) {
                this.slideNumber = firstslide             
             }  
             if (this.slideNumber  < firstslide) {
                this.slideNumber = lastslide             
             }  
        },
    },
    async created(){
        //const data = require("../data/works.json");
        const {data} = await axios.get('/works/461');
        this.works = this.requireImagesToArra(data);
        this.works = data;
       // this.currentWork = this.works[this.currentIndex];
        //console.log(this.currentWork);
    },
    
});