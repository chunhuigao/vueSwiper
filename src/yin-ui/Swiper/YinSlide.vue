<template>
  <div
    class="yin-slide"
    :style="{
      width: slideWidth,
      margin: slideMargin,
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
      clientWidth: 0,
    }
  },

  computed: {},
  mounted() {
    console.log('yin-slide,this', this)

    this.setSlideWidth()
    window.addEventListener('resize', () => {
      this.setSlideWidth()
    })
  },
  methods: {
    setSlideWidth() {
      this.slideWidth = this.computeSlideWidth() + 'px'
      const marginRight = this.computeSpaceBetween()
      this.slideMargin = `0  ${marginRight}px 0 0`
    },

    computeRatio() {
      const clientWidth = document.body.clientWidth
      const { UIWidth } = this.$parent.swiperConfig
      // 750 / 640
      return clientWidth / UIWidth
    },

    //计算卡片宽度
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
