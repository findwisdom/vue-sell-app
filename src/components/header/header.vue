<template>
    <div class="header">
      <div class="header_background">
        <img :src="seller.avatar" alt="header_background" style="width: 100%; height:100%;">
      </div>
      <div class="content_wrapper">
        <div class="avatar"><img style="width: 64px; height:64px;" :src="seller.avatar" alt="avatar"></div>
        <div class="content_font">
          <div class="seller_title"><span class="title_brand"></span><span class="title_name">{{seller.name}}</span></div>
          <div class="seller_description"><span class="delivery_name">{{seller.description}}</span> / <span class="delivery_time">{{seller.deliveryTime}}</span> </div>
          <div class="support" v-if="seller.supports">
            <span class="support_icon" :class='classMap[seller.supports[0].type]'></span>
            <span class="support_text">{{seller.supports[0].description}}</span>
          </div>
        </div>
        <div class="support_count" v-if="seller.supports" @click="dataShow">
          <span>{{seller.supports.length}}个</span>                                                                                                                                                                    <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
      <div class="bulletin-wrapper">
        <div class="bulletin" @click="dataShow">
          <span class="bulletin-wrapper_icon"></span>
          <span class="bulletin_content">{{seller.bulletin}}</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
      <transition name="fade">
        <div class="sell_detail" v-show="sellDetail">
          <div class="detail_wrap">
            <div class="detail_main clearfix">
              <h1 class="detail_name">{{seller.name}}</h1>
              <star :size="48" :score="seller.score"></star>
              <div class="detail_content">
                <div class="title_head">
                  <span class="title_line border-1px"></span>
                  <span class="head_text">优惠信息</span>
                  <span class="title_line border-1px"></span>
                </div>
                <div class="privilege_support">
                  <div class="privilege_item" v-for="support_item in seller.supports">
                    <span class="support_icon" :class='classMap[support_item.type]'></span>
                    <span class="support_text">{{support_item.description}}</span>
                  </div>
                </div>
                <div class="title_head">
                  <span class="title_line border-1px"></span>
                  <span class="head_text">商家公告</span>
                  <span class="title_line border-1px"></span>
                </div>
                <div class="bulletin_text">{{seller.bulletin}}</div>
              </div>
            </div>
          </div>
          <div class="detail_close" @click="dataHide" >
            <i class="icon-close"></i>
          </div>
        </div>
      </transition>
    </div>
</template>

<style scoped lang="sass" type="text/sass" rel="stylesheet/sass">
  @import "../../common/sass/mixin.sass";
  @import "./header.sass";
</style>
<script type="text/ecmascript-6">
    import star from '../../components/star/star';
    export default {
      props: {
        seller: {
          type: Object
        }
      },
      data: function() {
        return {
          sellDetail: false
        };
      },
      methods: {
        dataShow: function() {
          this.sellDetail = true;
        },
        dataHide: function() {
          this.sellDetail = false;
        }
      },
      created: function() {
        this.classMap = ['decrease', 'guarantee', 'discount', 'invoice', 'special'];
      },
      components: {
        'star': star
      }
    };
</script>
