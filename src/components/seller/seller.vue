<template>
  <div class="seller">
    <div class="seller_wrap">
      <div class="seller_head">
        <div class="head_top">
          <div class="name">{{seller.name}}</div>
          <div class="star_wrap">
            <star :size="36" :score="seller.score" class="seller_score"></star>
            <span class="rating_count">( {{seller.ratingCount}}）</span>
            <span class="sell_count">月售{{seller.sellCount}}单</span>
          </div>
          <div class="collect">
            <div class="collect_icon"><i class="icon-favorite"></i></div>
            <div class="collect_click">已收藏</div>
          </div>
        </div>
        <div class="head_bottom">
          <div class="sell_flex">
            <div class="service_name">起送价</div>
            <span class="count">{{seller.minPrice}}</span>
            <span class="count_msg">元</span>
          </div>
          <div class="sell_flex">
            <div class="service_name">商家配送</div>
            <span class="count">{{seller.deliveryPrice}}</span>
            <span class="count_msg">元</span>
          </div>
          <div class="sell_flex">
            <div class="service_name">平均配送时间</div>
            <span class="count">{{seller.deliveryTime}}</span>
            <span class="count_msg">分钟</span>
          </div>
        </div>
      </div>
      <splite></splite>
      <div class="bulletin">
        <div class="bulletin_name">公告与活动</div>
        <div class="bulletin_font">{{seller.bulletin}}</div>
      </div>
      <div class="supports">
        <ul>
          <li class="support_list" v-for="item in seller.supports"><icon class="left" :iconNumber="item.type" :iconSize="4"></icon><span class="description">{{item.description}}</span></li>
        </ul>
      </div>
      <splite></splite>
    </div>
  </div>
</template>
<style scoped lang="sass" type="text/sass" rel="stylesheet/sass">
  @import "../../common/sass/mixin.sass";
  @import "./seller.sass";
</style>
<script type="text/ecmascript-6">
  import icon from '../../components/icon/icon';
  import star from '../../components/star/star';
  import splite from '../../components/splite/splite';
  import BScroll from 'better-scroll';
  export default{
    props: {
      seller: {
        Object
      }
    },
    methods: {
      _initscroll() {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$el, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
    },
    watch: {
      seller() {
        this._initscroll();
      }
    },
    mounted() {
      this._initscroll();
    },
    components: {
      'star': star,
      'icon': icon,
      'splite': splite
    }
  };
</script>
