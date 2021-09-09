/**
* @Description:    vue-hash-calendar 移动端日期、时间选择插件，日期选择面板以日历形式展示。支持上下滑动切换日期、时间
* @Author:         TSY
* @CreateDate:     2019/05/23 00:08
* @Email:          t@tsy6.com
*/
<template>
  <div class="body">
    <button @click="showCalendarDialog">显示</button>
    <div class="gzt" style="padding:20px">
    <vue-hash-calendar ref="picker"
      class="calendar"
                       model="inline"
                       :is-show-arrow="false"
                       :is-show-not-current-month-day="true"
                       :scroll-change-date="true"
                       :visible.sync="isShowCalendar"
                       :default-datetime="defaultDatetime"
                       :is-show-week-view="isShowWeekView"
                       :is-show-action="true"
                       :minute-step="1"
                       :disabled-scroll="false"
                       mark-type="dotcircle"
                       :disabled-date="disabledDate"
                       :customFunction="customFunction"
                       week-start="sunday"
                       picker-type="date"
                       :show-today-button="true"
                       :disabled-week-view="false"
                       :change-year-fast="true"
                       format="YY/MM/DD hh:mm"
                       lang="cn"
                       checkedDayClassName="checkedDay"
                       @calendarTypeChange="calendarTypeChange"
                       @confirm="dateConfirm"
                       @slidechange="slidechange"
                       @click="dateClick"
                       @change="dateChange">
                          <div slot="day" class="everyday" slot-scope="scope">
                            <div class="day" style="font-size: 12px;letter-spacing: 0;margin: 5px 0 0 10px;height:11px">{{scope.date.day}}</div>
                            <div class="lunar" style="letter-spacing: 0;font-size: 12px;margin: 6px 0 0 9px;height:17px">{{scope.date.festival || (scope.date.lunar == '初一'? scope.date.lunarMonth : scope.date.lunar)}}</div>
                            <!-- {{scope.date.festival || scope.date.lunarFestival}} -->
                          </div>
    </vue-hash-calendar>
    <div class="sx">
<!--
        <div class="slide-banner">
    <div class="banner-wrapper">
      <div class="slide-banner-wrapper" ref="slide">
        <div class="slide-banner-content">
          <div v-for="num in nums" class="slide-page" :class="'page' + num" :key="num">page {{num}}</div>
        </div>
      </div>
      <div class="dots-wrapper">
        <span
          class="dot"
          v-for="num in nums"
          :key="num"
          :class="{'active': currentPageIndex === (num - 1)}"></span>
      </div>
    </div>
  </div> -->
    </div>
    </div>

    <!--github入口-->
    <!-- <github></github> -->
  </div>
</template>

<script>
import Github from './Github.vue'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

BScroll.use(Slide)

export default {
  name: 'demo',
  components: { Github },
  data() {
    return {
      isShowCalendar: true, // 是否显示弹窗
      isShowTips: false, // 是否显示下载提示
      isShowWeekView: false,
      defaultDatetime: new Date(),
      nums: 4,
      currentPageIndex: 0,
      markDate: [
        '2021/8/14/', '2021/8/15',
        { color: 'red', type: 'dot', date: ['0', '2021/08/2', '2020/03/25', '2020/04/01', '2020/05/25', '2020/06/25', '2020/07/25', '2020/08/25', '2020/09/25', '2020/10/25', '2020/11/25', '2020/12/25'] },
        { color: 'blue', type: 'circle', date: ['2020/01/20', '2020/02/20', '2020/03/20', '2020/04/20', '2020/05/20', '2020/06/20', '2020/07/20', '2020/08/20', '2020/09/20', '2020/10/20', '2020/11/20', '2020/12/20'] },
        { color: 'pink', date: ['2020/01/12', '2020/02/12', '2020/03/12', '2020/04/12', '2020/05/12', '2020/06/12', '2020/07/12', '2020/08/12', '2020/09/12', '2020/10/12', '2020/11/12', '2020/12/12'] },
        { color: '#000000', date: ['2020/01/29', '2020/02/29', '2020/03/29', '2020/04/29', '2020/05/29', '2020/06/29', '2020/07/29', '2020/08/29', '2020/09/29', '2020/10/29', '2020/11/29', '2020/12/29'] }
      ] // 对象数组形式的标记日期，可以自定义标记颜色
    }
  },
  mounted() {
    // this.defaultDatetime = new Date('2019-06-01 19:04');

  },
  methods: {
    customFunction() {
      return {
        countObj: [2, 3, 4],
        jiejia: {data: '20210102'}
      }
    },
    showCalendarDialog() { // 显示日历
      this.isShowCalendar = true
    },
    dateChange(date) { // 日期改变触发
      console.log(date, 'change')
    },
    dateConfirm(date) { // 点击确认按钮触发
      console.log(date, 'confirm')
    },
    slidechange(direction) { // 滑动方向
      console.log(direction, 'direction')
    },
    dateClick(date) { // 点击日期时按钮触发
      console.log(date, 'click')
    },
    calendarTypeChange(type) { // 日历展示类型切换时触发
      console.log(type, 'calendarType')
    },
    disabledDate(date) { // 禁用的日期
      // let timestamp = date.getTime()
      // let oneDay = 24 * 60 * 60 * 1000

      // if (timestamp < new Date().getTime() - oneDay) {
      //   return true
      // }
      return false
    },
    disabledTime(date) { // 禁用的时间
      let hours = date.getHours()
      let minute = date.getMinutes()
      let hoursNow = new Date().getHours()
      let minuteNow = new Date().getMinutes()

      if (hours < hoursNow || (hours === hoursNow && minute < minuteNow)) {
        return true
      }
      return false
    }
  }
}
</script>
<style lang="stylus">
.body{
  width:100%;
  height 1000px;
  background: #f4f4f4;
}
.gzt{
  display:flex;
  height:355px
  .calendar{
    flex 1

    .everyday{
      width :48px;
      height: 48px;
      // background: #C04949;
      border-radius: 4px;
      .day{
        color: #323233;
      }
      .lunar{
        color: #969799;
      }
    }
    .checkedDay{
      background: #34C282;
      .everyday{
          .day{
            color: #fff;
          }
          .lunar{
            color: #fff;
          }
      }

    }
  }
  .sx{
    flex :1
  }

}
.hhhh {
  background: red;
}
</style>

<style lang="stylus" rel="stylesheet/stylus">

.slide-banner
  .banner-wrapper
    position relative
  .slide-banner-wrapper
    min-height 1px
    overflow hidden
  .slide-banner-content
    height 200px
    white-space nowrap
    font-size 0
    .slide-page
      display inline-block
      height 200px
      width 100%
      line-height 200px
      text-align center
      font-size 26px
      &.page1
        background-color #95B8D1
      &.page2
        background-color #DDA789
      &.page3
        background-color #C3D899
      &.page4
        background-color #F2D4A7
  .dots-wrapper
    position absolute
    bottom 4px
    left 50%
    transform translateX(-50%)
    .dot
      display inline-block
      margin 0 4px
      width 8px
      height 8px
      border-radius 50%
      background #eee
      &.active
        width 20px
        border-radius 5px
  .btn-wrap
    margin-top 20px
    display flex
    justify-content center
    button
      margin 0 10px
      padding 10px
      color #fff
      border-radius 4px
      background-color #666

</style>
