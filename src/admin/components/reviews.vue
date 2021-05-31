<template>
    <div class="reviews-container">   
        <div class="reviews-container">   
            <pre>{{reviews}}</pre>-->
            <div class="content">
                Отзывы
                <div class="reviews__list">
                    <div class="reviews__add">
                        <btn type="square" title="Добавть работу"></btn>
                    </div>
                    <div class="reviews__item" v-for="review in reviews" :key="review.id">
                        <card />
                        <template name="title">
                            <div class="review__head">
                                <avatar size="2.7" :src="review.photo" class="review__avatar"/>
                                    <div class="review__head_info">
                                        <div class="review__name">{{review.name}}</div>
                                        <div class="review__occ">{{review.occ}}</div>
                                    </div>
                            </div>
                        </template>   
                    </div>
                    
                </div>
            </div>
            
        </div>
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    components: {
       btn:()=> import('../components/button'),
       card:()=> import('../components/card'),
       avatar:()=> import('../components/avatar')

    },
    data() {
        return {
            reviews: [],
        };
    },
    created (){ 
        let data = require('../../data/reviews.json');
        this.reviews  = this.changeImagePath(data);
    },
    methods: {
        changeImagePath(reviews) {
            return reviews.map(item=> {
                item.photo = require(`../../images/content/${item.pic}`).default;
                return item;
            });
        },
    },
}
</script>

<style lang="pcss" scoped>
    .reviews__list{
        display: flex;
        flex-wrap: wrap;
    }
    .reviews__add {
        width: calc((100% - 56px) / 3);
        margin-right: 28px;
        margin-bottom: 30px;
    }
    .reviews__item {
        width: calc((100% - 56px) / 3);
        margin-right: 28px;
        margin-bottom: 30px;
        background: #fff;
        &:nth-child(3n) {
            margin-right: 0;
        }
    }
</style>