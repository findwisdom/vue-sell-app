<template>
    <div class="cartcontrol clearfix">
      <transition name="fade">
        <div class="sub_ball icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)"></div>
      </transition>
        <div class="food_count" v-show="food.count>0">{{food.count}}</div>
        <div class="add_ball icon-add_circle" @click.stop.prevent="addCart($event)"></div>
    </div>
</template>
<style lang="sass" type="text/sass" rel="stylesheet/sass">
   @import './cartcontral.sass';
</style>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default{
    props: {
      food: {
        type: Object
        }
      },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      decreaseCart(event) {
        if (!event._constructed) {
          // 去掉自带click事件的点击
          return;
        }
        this.food.count--;
      }
    }
  };
</script>
