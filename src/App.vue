<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div class="YinSwiperStyle">
      <YinSwiper :swiperConfig="swiperConfig" v-if="swiperList.length">
        <YinSlide v-for="(item, key) in swiperList" :key="key" :sliver="key">
          <div class="slide-item" :style="{ background: item }">
            按照375px视觉稿设计第 {{ key }}页
          </div>
        </YinSlide>
      </YinSwiper>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data() {
    return {
      currentIndex: 0,
      swiperList: [], // 数据
      swiperConfig: {
        currentIndex: 0,
        speed: 200,
        slideChange: this.slideChange,
        slideWidth: 580,
        spaceBetween: 10,
        startLeft: 20, // 如果此处是数字，宽度将会随着屏幕变换而变化，如果是'20px',宽度将会始终保持20px
        UIWidth: 640, //按照375px设计稿开发实现，并且适配任意屏幕居中
      },
    }
  },
  mounted() {
    setTimeout(() => {
      this.swiperList = ['red', 'blue', 'orange']
    }, 10)
  },

  methods: {
    slideChange() {},
  },
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
/* html {
  font-size: 28.44px;
} */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.YinSwiperStyle {
  width: 100%;
  height: 300px;
}
.slide-item {
  width: 100%;
  height: 300px;
}
</style>
