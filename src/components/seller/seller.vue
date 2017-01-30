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
            <div class="collect_icon" @click="tragglefavorite($event)"><i class="icon-favorite" :class="{'red_bg':favorite===true}"></i></div>
            <div class="collect_click">{{favoritetext}}</div>
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
      <div class="fact">
        <div class="seller_fact">商家实景</div>
        <div class="fact_wrap" ref="fact_wrap">
          <ul fact_list ref="fact_list">
            <li class="fact_item" v-for="fact in seller.pics"><img :src="fact" alt=""/></li>
          </ul>
        </div>
      </div>
      <splite></splite>
      <div class="seller_msg">
        <div class="msg_head">商家信息</div>
        <div class="msg_wrap">
          <ul>
            <li class="msg_item" v-for="msg in seller.infos"><div class="msg_font">{{msg}}</div></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="sass" type="text/sass" rel="stylesheet/sass">
  @import "../../common/sass/mixin.sass";
  @import "./seller.sass";
</style>
<script type="text/ecmascript-6">
  import {saveLocalstorage, loadLocalstorage} from '../../common/js/store.js';
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
    computed: {
      favoritetext() {
        return this.favorite ? '已收藏' : '未收藏';
      }
    },
    data() {
      return {
        favorite: (() => {
          return loadLocalstorage(this.seller.id, 'favorite', false);
        })()
      };
    },
    methods: {
      tragglefavorite(event) {
        if (!event._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        saveLocalstorage(this.seller.id, 'favorite', this.favorite);
      },
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
      },
      _initpics() {
        if (this.seller.pics) {
          let picwidth = 120;
          let margin = 6;
          let width = (picwidth + margin) * this.seller.pics.length - margin;
          this.$refs.fact_list.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picscroll) {
              this.picscroll = new BScroll(this.$refs.fact_wrap, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picscroll.refresh();
            }
          });
        }
      }
    },
    watch: {
      seller() {
        this._initscroll();
        this._initpics();
      }
    },
    mounted() {
      this._initscroll();
      this._initpics();
    },
    components: {
      'star': star,
      'icon': icon,
      'splite': splite
    }
  };
</script>
