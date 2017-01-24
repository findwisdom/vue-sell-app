<template>
    <div class="shopcart">
      <div class="content" @click="tragglelist">
        <div class="content_left">
          <div class="logo_wrap">
            <div class="logo" :class="{'highlight':totalPrice>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalPrice>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price border-1px-right" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content_right" :class="payClass" @click.stop.prevent="pay">{{payDesc}}</div>
      </div>
      <transition name="fold">
        <div class="shopcart_list" v-show="listshow">
        <div class="list_header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list_content" ref="listContent">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price*food.count}}</span>
              </div>
              <div class="cartcontral_wrap">
                <cartcontal :food="food"></cartcontal>
              </div>
            </li>
          </ul>
        </div>
      </div>
      </transition>
      <transition name="fade">
        <div class="listshow_bg" v-show="listshow" @click="listhidden"></div>
      </transition>
    </div>
</template>
<style scoped lang="sass" type="text/sass" rel="stylesheet/sass">
  @import "../../common/sass/mixin.sass";
  @import "./shopcart.sass";
</style>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontral from '../../components/cartcontral/cartcontral';
  export default{
    data() {
      return {
        fold: true
      };
    },
    components: {
      'cartcontal': cartcontral
    },
    props: {
      selectFoods: {
        type: Array
      },
      minPrice: {
        type: Number
      },
      deliveryPrice: {
        type: Number
      }
    },
    methods: {
      listhidden() {
        this.fold = !this.fold;
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return;
        } else {
          window.alert(`谢谢回顾，需要支付￥${this.totalPrice}元`);
        }
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      tragglelist() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      }
    },
    computed: {
      listshow() {
        if (!this.totalPrice) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      },
      totalPrice() {
        let totalPrice = 0;
        this.selectFoods.forEach((food) => {
          totalPrice += food.price * food.count;
        });
        return totalPrice;
      },
      totalCount() {
        let totalCount = 0;
        this.selectFoods.forEach((food) => {
          totalCount += food.count;
        });
        return totalCount;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}起送`;
        } else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice > this.minPrice) {
          return 'enough';
        } else {
          return 'not_enough';
        }
      }
    }
  };
</script>
