<template>
    <div class="ratings">
      <div class="ratings_wrap">
        <div class="overview">
          <div class="overview_left">
            <div class="score_total">{{seller.score}}</div>
            <div class="score_name">综合评分</div>
            <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="overview_right">
            <div class="score">
              <span class="score_title">服务态度</span>
              <star :score="seller.serviceScore" :size="36" class="rating_star"></star><span class="score_content">{{seller.serviceScore}}</span>
            </div>
            <div class="score">
              <span class="score_title">食物评分</span>
              <star :score="seller.foodScore" :size="36" class="rating_star"></star><span class="score_content">{{seller.foodScore}}</span>
            </div>
            <div class="score">
              <span class="score_title">送达时间</span>
              <span class="delivery_time">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <splite></splite>
        <div class="ratingselect_wrap">
          <ratingselect @increment="incrementTotal" :ratings="ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc"></ratingselect>
        </div>
        <div class="user_comment">
          <ul>
            <li class="rating_list" v-for="item in ratings" v-show="nameshow(item.rateType, item.text)">
              <div class="user">
                <div class="user_img"><img :src="item.avatar" alt=""></div>
                <div class="user_name_right">
                  <div class="name">{{item.username}}</div>
                  <div class="star_wrap"><star :score="item.score" :size="24" class="star_user"></star><div class="delivery_time" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</div></div>
                  <div class="text">{{item.text}}</div>
                  <div class="recommend"><i class="comment_logo" :class="{'icon-thumb_down':item.rateType===1,'icon-thumb_up':item.rateType ===0}"></i>
                    <span class="recommend_list" v-for="list in item.recommend" v-show="item.recommend">{{list}}</span>
                  </div>
                </div>
                <div class="rate_time">{{item.rateTime | formatDate}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<style scoped lang="sass" type="text/sass " rel="stylesheet">
  @import "../../common/sass/mixin.sass";
  @import "./ratings.sass";
</style>
<script type="text/ecmascript-6">
  import splite from '../../components/splite/splite';
  import star from '../../components/star/star';
  import ratingselect from '../../components/ratingselect/ratingselect';
  import BScroll from 'better-scroll';
  import {formatDate} from '../../common/js/date';
  const SUCCESS_OK = 0;
  const ALL = 2;
  export default{
    data() {
      return {
        ratings: [],
        onlyContent: true,
        selectType: ALL,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      };
    },
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.success === SUCCESS_OK) {
          this.ratings = response.data;
          console.log(this.ratings);
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
      }, (response) => {
        console.log(response);
      });
    },
    props: {
      seller: {
        Object
      }
    },
    methods: {
      nameshow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      incrementTotal(type, data) {
        this[type] = data;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    components: {
      'star': star,
      'ratingselect': ratingselect,
      'splite': splite
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  };
</script>
