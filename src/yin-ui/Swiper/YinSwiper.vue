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
        width: `${swiperWidth}`,
        padding: `${swiperPadding}`,
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
    swiperConfig: {
      currentIndex: {
        type: Number,
        default: 0,
      },
      speed: {
        type: Number,
        default: 0,
      },
      slideChange: {
        type: Function,
        default: () => {},
      },
      spaceBetween: {
        type: Number,
        default: 0,
      },
      startLeft: {
        type: Number,
        default: 0,
      },
      unit: {
        type: String,
        default: 'px',
      },
    },
  },
  data() {
    console.log('测试', this.$slots)
    return {
      length: 0, //子元素长度，共有多少张图
      swiperWidth: '0px', //当前swiper总宽度
      clientWidth: 0, //当前swiper显示宽度
      transformLeft: 0, //当前swiper向左移动位置
      startClientX: 0, //触屏开始时鼠标位置
      currentLeft: 0, //当前swiper向左移动位置，备份
      limitDistance: 0, //移动多少距离跳转下一页
      currentIndex: 0, //当前slide
      nextIndex: 0, //下一个slide下标
      widthList: [], //轮播图下标与向左移动的关系
      speed: 1000, //跳转下一节点需要的时间
      moveDistance: 0.2, //移动当前现实宽度的百分比跳转下一页
      slideWidth: 0, //当前卡片宽度
      swiperPadding: '0px',
    }
  },
  watch: {
    swiperConfig(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.init()
      }
    },
    'swiperConfig.currentIndex'(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.nextIndex = newVal
        this.moveSilde()
      }
    },
  },

  mounted() {
    this.init()
    window.addEventListener('resize', () => {
      this.onResize()
      this.moveSilde()
    })
  },

  methods: {
    onResize() {
      this.computeSwiperWidth()
      this.initSlide()
    },
    init() {
      const { currentIndex, speed, moveDistance } = this.swiperConfig
      this.currentIndex = currentIndex
      this.nextIndex = currentIndex
      this.speed = speed || 1000
      this.moveDistance = moveDistance || 0.2
      this.computeSwiperWidth()
      this.initSlide()
      this.length = (this.$slots.default || []).length
    },

    //计算swiper总宽度
    computeSwiperWidth() {
      const currentWidth = this.$refs.YinSwiper.clientWidth
      const length = (this.$slots.default || []).length
      const leftAndRight = this.computeBetweenLeftAndRight()
      this.swiperPadding = `0 ${leftAndRight}px`
      if (length === 1) {
        this.swiperWidth = currentWidth + 'px'
      } else {
        const slideWidth = this.computeSlideWidth()
        const marginRight = this.computeSpaceBetween()
        const currentSlide = slideWidth + marginRight
        this.swiperWidth = `${currentSlide * length - marginRight}px`
      }
    },

    // 计算卡片间距
    computeSpaceBetween() {
      const { spaceBetween } = this.swiperConfig
      let width = 0
      if (typeof spaceBetween === 'string') {
        width = Number.parseInt(spaceBetween)
      } else {
        const ratio = this.computeRatio()
        width = spaceBetween * ratio
      }
      return width
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
  overflow: hidden;
  text-align: left;
  position: relative;
}
.slick-list {
  transform: translateZ(0);
  transition: transform 1s;
  height: 100%;
  display: inline-block;
}
</style>
