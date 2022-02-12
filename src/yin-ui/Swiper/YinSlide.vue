<template>
  <div>
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

  computed: {},
  mounted() {},
  methods: {},
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
