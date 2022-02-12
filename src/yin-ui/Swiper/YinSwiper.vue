<template>
  <div class="yin-swiper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YinSwiper',
  props: {},
  data() {
    console.log('测试', this.$slots)
    return {}
  },
  watch: {},

  mounted() {},

  methods: {},
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
