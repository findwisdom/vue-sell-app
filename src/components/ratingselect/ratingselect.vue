<template>
  <div class="ratingselect">
    <div class="rating_type">
      <span class="block all" @click="select(2, $event)" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span class="block positive" @click="select(0, $event)" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span class="block negative" @click="select(1, $event)" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch">
      <i class="iconfont icon-check_circle" @click="tragglelist($event)" :class="{'on': onlyContent===true}"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<style scoped lang="sass" type="text/sass" rel="stylesheet/sass">
  @import "./ratingselect.sass";
  @import "../../common/sass/mixin.sass";
</style>
<script type="text/ecmascript-6">
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default{
  data() {
    return {
      mysselectType: this.selectType,
      myonlyContent: this.onlyContent
    };
  },
  props: {
    onlyContent: {
      type: Boolean
    },
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '吐槽'
        };
      }
    }
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      });
    }
  },
  methods: {
    select(type, event) {
      if (!event._constructed) {
        return;
      }
      this.mysselectType = type;
      this.$emit('increment', 'selectType', type);
    },
    tragglelist(event) {
      if (!event._constructed) {
        return;
      }
      this.myonlyContent = !this.myonlyContent;
      this.$emit('increment', 'onlyContent', this.myonlyContent);
    }
  },
  watch: {
    selectType(val) {
      this.mysselectType = val;
    },
    onlyContent(val) {
      this.onlyContent = val;
    }
  }
};
</script>
