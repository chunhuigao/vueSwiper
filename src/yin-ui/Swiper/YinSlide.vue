<template>
  <div
    class="yin-slide"
    :style="{
      width: `${slideWidth}`,
      margin: `${slideMargin}`,
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'YinSlide',
  props: {},
  data() {
    return {
      slideWidth: '0px',
      slideMargin: '0px',
    }
  },
  watch: {
    '$parent.swiperConfig'() {
      this.getSlideWidth()
    },
  },

  computed: {},
  mounted() {
    window.addEventListener('resize', () => {
      this.getSlideWidth()
    })
    this.getSlideWidth()
  },
  methods: {
    getSlideWidth() {
      const currentWidth = this.$parent.$refs.YinSwiper.clientWidth
      const length = this.$parent.$slots.default.length

      const margin = this.countStartLeft()
      // 只有1个卡片的时候
      if (length === 1) {
        this.slideWidth = `${currentWidth - 2 * margin}px`
        this.slideMargin = `0px`
      } else {
        //缩放比例
        const marginRight = this.computeSpaceBetween()
        const slideWidth = this.computeSlideWidth()
        this.slideWidth = slideWidth + 'px'
        this.slideMargin = `0  ${marginRight}px 0 0`
        if (this.$vnode.key === length - 1) {
          this.slideMargin = `0px`
        }
      }
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
    // 计算单个卡片的宽度
    computeSlideWidth() {
      const { slideWidth } = this.$parent.swiperConfig
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
      const { UIWidth } = this.$parent.swiperConfig
      return clientWidth / UIWidth
    },

    countStartLeft() {
      const { startLeft } = this.$parent.swiperConfig

      //缩放比例
      const ratio = this.computeRatio()
      let width = 0
      if (typeof startLeft === 'string' && startLeft.indexOf('px')) {
        width = Number.parseInt(startLeft)
      } else {
        width = startLeft * ratio
      }
      return width
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.yin-slide {
  float: left;
  height: 100%;
  flex-grow: 1;
}
</style>
