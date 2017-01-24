<template>
    <div class="star" :class="starType">
      <span v-for="itemClass in itemClasses" :class="itemClass" class="item_star"></span>
    </div>
</template>
<style scoped lang="sass" type="text/sass" rel="stylesheet/sass">
  @import "../../common/sass/mixin.sass";
  @import "./star.sass";
</style>
<script type="text/ecmascript-6">
    const LENGTH = 5;
    const CLS_ON = 'on';
    const CLS_HALF = 'half';
    const CLS_OFF = 'off';

    export default{
      props: {
        size: {
          type: Number
        },
        score: {
          type: Number
        }
      },
      computed: {
        starType: function() {
          return 'star_' + this.size;
        },
        itemClasses: function() {
          let result = [];
          let score = Math.floor(this.score * 2) / 2;
          let hasDecimal = score % 1 !== 0;
          let integer = Math.floor(score);
          for (let i = 0; i < integer; i++) {
            result.push(CLS_ON);
            if (hasDecimal) {
              result.push(CLS_HALF);
            }
          }
          while (result.length < LENGTH) {
            result.push(CLS_OFF);
          }
          return result;
        }
      }
    };
</script>
