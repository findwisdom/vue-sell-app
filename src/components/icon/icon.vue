<template>
    <span class="feature_icon" :class="[iconType, icon_map[iconNumber]]"></span>
</template>
<style scoped lang="sass" type="text/sass" rel="stylesheet/sass">
  @import "../../common/sass/mixin.sass";
  @import "./icon.sass";
</style>
<script type="text/ecmascript-6">
    export default{
      props: {
        iconSize: {
          type: Number
        },
        iconNumber: {
          type: Number
        }
      },
      created: function() {
        this.icon_map = ['decrease', 'guarantee', 'discount', 'invoice', 'special'];
      },
      computed: {
        iconType: function() {
          return 'feature_icon_' + this.iconSize;
        }
      }
    };
</script>
