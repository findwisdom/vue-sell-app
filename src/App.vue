<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <router-link to="/goods" class="tab-item">商品</router-link>
      <router-link to="/ratings" class="tab-item">评论</router-link>
      <router-link to="/seller" class="tab-item">商家</router-link>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import {urlParse} from './common/js/until.js';
  import header from './components/header/header';
  const SUCCESS_OK = 0;
  export default {
    components: {
      'v-header': header
    },
    data: function() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            console.log(queryParam);
            return queryParam.id;
          })()
        }
      };
    },
    created: function() {
      this.$http.get('/api/seller?id' + this.seller.id).then((response) => {
          response = response.body;
          if (response.success === SUCCESS_OK) {
            this.seller = Object.assign({}, this.seller, response.data);
          }
      }, (response) => {
        console.log(response);
      });
    }
  };
</script>

<style lang="sass" rel="stylesheet/scss" type="text/scss">
  @import "./common/sass/index.sass";
  #app{
    .tab{
      display: flex;
      width: 100%;
      height: 40px;
      line-height: 40px;
      position: relative;
      @include border-1px(rgba(7,17,27,0.2));
      .tab-item{
        flex: 1;
        text-align: center;
      }
    }
  }
</style>
