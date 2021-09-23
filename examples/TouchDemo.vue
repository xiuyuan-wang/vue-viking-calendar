/**
* @Description:    滑动事件监听demo
* @Author:         WXY
* @CreateDate:     2021/8/11 15:30
*/
<template>
    <div class="body">
        <vue-viking-calendar
                @touchstart="touchStart"
                @touchmove="touchMove"
                @slidechange="slideChange"
                @touchend="touchEnd">
        </vue-viking-calendar>
        <!--github入口-->
        <github></github>
    </div>
</template>

<script>
import Github from './Github.vue'

export default {
  name: 'TouchDemo',
  components: { Github },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    touchStart(event) { // 监听手指开始滑动事件
      console.log(event, 'start')
    },
    touchMove(event) { // 监听手指开始滑动事件
      console.log(event, 'move')
    },
    touchEnd(event) { // 监听手指开始滑动事件
      console.log(event, 'end')
    },
    slideChange(direction) { // 滑动方向改变
      console.log(direction, 'direction')
    }
  }
}
</script>

<style lang="stylus">
    @import "./style/reset.styl"

</style>
