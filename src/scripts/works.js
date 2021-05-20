import Vue from "vue";

const thumbs = {
    props: ["works", "currentWork"],
    template : "#preview-thumbs",
};

const btns = {
    template : "#preview-btns",
};

const display = {
    props : ["currentWork", "works"],
    template : "#preview-display",
    components : {thumbs, btns},
    computed: {
        reversedWorks() {
            const works = [...this.works];
            return works.reverse();
        }
    }
};

const tags = {
    template : "#preview-tags",
};

const info = {
    props : ["currentWork"],
    template : "#preview-info",
    components : {tags},
};


new Vue({
    el: "#preview-component",
    template : "#preview-container",
    components : {display, info},
    data() {
        return{
            works: [],
            currentIndex: 0,
        };
    },
    computed: {
        currentWork() {
            return this.works[this.currentIndex];
        }
    },
    //watch: {
    //    currentIndex(value) {
    //        this.makeInfiniteLoopForNdx(value);
    //    },
    //},
    methods: {
        makeInfiniteLoopForNdx(index) {
            const worksNumber = this.works.lenght - 1;
            if (index < 0) this.currentIndex = worksNumber;
            if (index > worksNumber) this.currentIndex = 0;
        },
        requireImagesToArra(data){
            return data.map(item=> {
                const requiredImage = require(`../images/content/${item.photo}`).default;
                item.photo = requiredImage;
                return item
            });
        },
        slide(direction){
            const lastslide = this.works.length - 1;
            const firstslide = 0;
            
            switch(direction){
                case "next" : 
                    this.currentIndex++
                    break;
                case "prev" : 
                    this.currentIndex--
                    break;
            }
            if (this.currentIndex  > lastslide) {
                this.currentIndex = firstslide             
            }  
            if (this.currentIndex  < firstslide) {
                this.currentIndex = lastslide             
            }  
        },
    },
    created(){
        const data = require("../data/works.json");
        this.works = this.requireImagesToArra(data);
        //this.currentWork = this.works[this.currentIndex];
    },
});