<template>
  <div
    class="yin-swiper"
    ref="YinSwiper"
    @touchmove="touchmove"
    @touchstart="touchstart"
    @touchend="touchend"
  >
    <div
      class="slick-list"
      :style="{
        width: swiperWidth,
        padding: swiperPadding,
        transform: `translateX(${transformLeft}px)`,
        transition: `all ${speed / 1000}s`,
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YinSwiper',
  props: {
    swiperConfig: {},
  },
  data() {
    console.log('测试', this)
    return {
      swiperWidth: 0,
      length: 0,
      swiperPadding: 0,
      startClientX: 0,
      currentLeft: 0,
      transformLeft: 0,
      speed: 0,
      widthList: [],
      nextIndex: 0,
      currentIndex: 0,
      limitDistance: 100,
    }
  },
  watch: {},

  mounted() {
    this.init()
  },

  methods: {
    init() {
      const { currentIndex, speed } = this.swiperConfig
      this.length = this.$slots.default.length
      this.currentIndex = currentIndex
      this.nextIndex = currentIndex
      this.speed = speed

      this.computeSwiperWidth()
      this.initSlide()
    },
    computeSwiperWidth() {
      const slideWidth = this.computeSlideWidth()
      const leftAndRightBetween = this.computeBetweenLeftAndRight()
      const spaceBetween = this.computeSpaceBetween()
      this.swiperPadding = `0 0 0 ${leftAndRightBetween}px`
      this.swiperWidth = (slideWidth + spaceBetween) * this.length + 'px'
    },

    // 计算单个卡片的宽度
    computeSlideWidth() {
      const { slideWidth } = this.swiperConfig
      let width = 0
      if (typeof slideWidth === 'string') {
        width = Number.parseInt(slideWidth)
      } else {
        const ratio = this.computeRatio()
        width = slideWidth * ratio
      }
      return width
    },

    // 计算视觉稿与手机端物理像素比例
    computeRatio() {
      const clientWidth = document.body.clientWidth
      const { UIWidth } = this.swiperConfig
      return clientWidth / UIWidth
    },
    // 计算左右两侧空白
    computeBetweenLeftAndRight() {
      let between = 0
      const { startLeft } = this.swiperConfig
      if (typeof startLeft === 'string') {
        between = Number.parseInt(startLeft)
      } else {
        const ratio = this.computeRatio()
        between = startLeft * ratio
      }
      return between
    },

    // 计算卡片间距
    computeSpaceBetween() {
      const { spaceBetween } = this.$parent.swiperConfig
      let width = 0
      if (typeof spaceBetween === 'string') {
        width = Number.parseInt(spaceBetween)
      } else {
        const ratio = this.computeRatio()
        width = spaceBetween * ratio
      }
      return width
    },
    touchstart(e) {
      this.startClientX = e.changedTouches[0].clientX
      this.currentLeft = this.transformLeft
      this.speed = 0
    },

    touchmove(e) {
      let left = 1
      let right = 1
      if (this.length > 1) {
        const moveX = e.changedTouches[0].clientX - this.startClientX

        let currentMoveX = moveX
        console.log('touchend', currentMoveX)
        left = this.currentIndex === 0 ? 0.2 : 1
        right = this.currentIndex === this.length - 1 ? 0.2 : 1
        if (currentMoveX > 0) {
          this.transformLeft = this.currentLeft + currentMoveX * left
        } else {
          this.transformLeft = this.currentLeft + currentMoveX * right
        }
      }
    },
    touchend(e) {
      const { speed } = this.swiperConfig
      this.speed = speed || 300
      const currentMoveX = e.changedTouches[0].clientX - this.startClientX
      if (Math.abs(currentMoveX) > this.limitDistance) {
        if (currentMoveX > 0) {
          this.nextIndex--
        } else {
          this.nextIndex++
        }
        if (this.nextIndex === this.length) {
          this.nextIndex = this.length - 1
        }
        if (this.nextIndex <= 0) {
          this.nextIndex = 0
        }
      }

      this.moveSilde()
    },

    moveSilde() {
      const { slideChange } = this.swiperConfig
      if (this.nextIndex < this.length && this.nextIndex >= 0) {
        this.transformLeft = -this.widthList[this.nextIndex]

        if (this.currentIndex !== this.nextIndex) {
          slideChange && slideChange(this.currentIndex, this.nextIndex)
        }
        this.currentIndex = this.nextIndex
      }
    },
    initSlide() {
      const length = this.$slots.default.length
      const currentWidth = this.$refs.YinSwiper.clientWidth
      let moveList = Array(length).fill(0)
      if (length > 1) {
        const sideWidth = this.computeSlideWidth()
        const marginRight = this.computeSpaceBetween()
        const paddingLeft = this.computeBetweenLeftAndRight()
        const slideOffsetWidth = sideWidth + 2 * marginRight
        const surplus = (currentWidth - slideOffsetWidth) / 2
        if (length === 2) {
          moveList[1] =
            2 * sideWidth + 2 * paddingLeft + marginRight - currentWidth
        } else {
          for (let i = 0; i < length; i++) {
            if (i === 0) continue
            if (i === 1) {
              moveList[i] = sideWidth - (surplus - paddingLeft)
            } else if (i === length - 1) {
              moveList[i] = moveList[i - 1] + sideWidth + paddingLeft - surplus
            } else {
              moveList[i] = moveList[i - 1] + sideWidth + marginRight
            }
          }
        }
      }

      this.widthList = moveList
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  padding: 0;
  margin: 0;
}
.yin-swiper {
  width: 100%;
  height: 100%;
  text-align: left;
  overflow: hidden;
  position: relative;
}
.slick-list {
  transform: translateZ(0);
  transition: transform 1s;
  height: 100%;
  display: inline-block;
}
.slick-list:first-child() {
  margin: 0px !important;
}
</style>
