<template>
  <transition name="slider">
    <div class="food" v-show="foodDetail" ref="food">
      <div class="detail">
        <div class="font icon-arrow_lift" @click="home"></div>
        <img :src="food.image" alt="" class="head_img">
        <div class="sell_content">
          <h1 class="name">{{food.name}}</h1>
          <div class="msg">
            <span class="sellCount">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}份</span>
          </div>
          <div class="price">
            <span class="newprice">￥{{food.price}}</span>
            <span class="oldprecie" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontral_wrap">
            <cartcontal :food="food"></cartcontal>
          </div>
          <div class="add" @click.stop.prevent="addFirst($event)" v-show="!food.count || food.count === 0">加入购物车</div>
        </div>
        <splite></splite>
        <div class="introduce">
          <h1 class="title">商品介绍</h1>
          <div class="food_detail">{{msg}}</div>
        </div>
        <splite></splite>
        <div class="ratingselect_wrap">
          <h1 class="title">商品评价</h1>
          <ratingselect @increment="incrementTotal" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
        </div>
        <div class="comment_wrap">
          <ul>
            <li class="comment_list" v-for="rating in food.ratings" v-show="nameshow(rating.rateType, rating.text)">
              <div class="user">
                <span class="user_content">{{rating.username}}</span>
                <span class="avatar"><img :src="rating.avatar" alt=""></span>
              </div>
              <div class="ratingtime">{{rating.rateTime | formatDate}}</div>
              <div class="comment"><i class="comment_logo" :class="{'icon-thumb_down':rating.rateType===1,'icon-thumb_up':rating.rateType ===0}"></i><span class="text">{{rating.text}}</span></div>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<style scoped lang="sass" type="text/sass" rel="stylesheet/sass">
  @import "../../common/sass/mixin.sass";
  @import './food.sass';
</style>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import cartcontral from '../../components/cartcontral/cartcontral';
  import splite from '../../components/splite/splite';
  import ratingselect from '../../components/ratingselect/ratingselect';
  import {formatDate} from '../../common/js/date';
//  const POSITIVE = 0;
//  const NEGATIVE = 1;
  const ALL = 2;
  export default{
    data() {
      return {
        foodDetail: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        Vue.set(this.food, 'count', 1);
      },
      home() {
        this.foodDetail = !this.foodDetail;
      },
      show() {
        this.foodDetail = true;
        if (this.foodDetail) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.food, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
      },
      incrementTotal(type, data) {
        this[type] = data;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      nameshow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    computed: {
      msg() {
        if (this.food.info) {
          return this.food.info;
        } else {
          return '暂时没有商品信息哦!';
        }
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      'cartcontal': cartcontral,
      'splite': splite,
      'ratingselect': ratingselect
    }
  };
</script>
