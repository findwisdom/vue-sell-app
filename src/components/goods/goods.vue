<template>
    <div class="goods">
      <div class="menu_wrap" ref='menuWrapper'>
        <div class="foods_menu">
          <ul>
            <li class="food_menu" v-for="(item, index) in goods" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
              <span class="menu_text border-1px">
                <span v-show="item.type>0"><icon class="left" :iconNumber="item.type" :iconSize="2"></icon></span>
                {{item.name}}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="foods_wrap" ref='foodsWrapper'>
        <ul>
          <li class="food_list food_list_hook" v-for="item in goods">
            <h1 class="foodlist_title">{{item.name}}</h1>
            <ul>
              <li class="food border-1px" v-for="food in item.foods" @click="selectFood(food,$event)">
                <div class="cartcontral_wrapper">
                  <cartcontral :food="food"></cartcontral>
                </div>
                <div class="food_img">
                  <img style="width: 56px; height:56px;" :src="food.icon" alt="food">
                </div><div class="food_content">
                  <h2 class="food_name">{{food.name}}</h2>
                  <p class="food_desc">{{food.description}}</p>
                  <p class="food_extra">
                    <span class="food_count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </p>
                  <div class="food_price">
                    <span>￥{{food.price}}</span>
                    <span v-show="food.oldPrice" class="old_price">￥{{food.oldPrice}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart :selectFoods="selectFoods" :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice" :goods="goods"></shopcart>
      <food :food="selectfood" ref="food"></food>
    </div>
</template>
<style scoped lang="sass" type="text/sass" rel="stylesheet/sass">
  @import "../../common/sass/mixin.sass";
  @import "./goods.sass";
</style>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import icon from '../../components/icon/icon';
  import shopcart from '../../components/shopcart/shopcart';
  import food from '../../components/food/food';
  import cartcontral from '../../components/cartcontral/cartcontral';
  const SUCCESS_OK = 0;
  export default{
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectfood: {}
      };
    },
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      'food': food,
      'icon': icon,
      'shopcart': shopcart,
      'cartcontral': cartcontral
    },
    created: function() {
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.success === SUCCESS_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._caculateHeight();
          });
        }
      }, (response) => {

      });
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) {
          // 去掉自带click事件的点击
          return;
        }
        let foodlist = this.$refs.foodsWrapper.getElementsByClassName('food_list_hook');
        let ref = foodlist[index];
        this.foodsScroll.scrollToElement(ref, 300);
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectfood = food;
        this.$refs.food.show();
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3,
          click: true
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _caculateHeight() {
        let foodlist = this.$refs.foodsWrapper.getElementsByClassName('food_list_hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodlist.length; i++) {
          let item = foodlist[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    }
  };
</script>
