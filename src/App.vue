<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div class="YinSwiperStyle">
      <YinSwiper :swiperConfig="swiperConfig" v-if="swiperList.length">
        <YinSlide v-for="(item, key) in swiperList" :key="key">
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
      clientWidth: 0, //记录当前显示宽度
      baseWidth: 375, //按照375px设计稿开发实现
      swiperList: [],
      page: 1,
      swiperConfig: {
        currentIndex: 0,
        speed: 200,
        slideChange: this.slideChange,
        slideWidth: 384,
        spaceBetween: 14,
        startLeft: '20px', // 如果此处是数字，宽度将会随着屏幕变换而变化，如果是'20px',宽度将会始终保持20px
        UIWidth: 640, //按照375px设计稿开发实现，并且适配任意屏幕居中
      },
    }
  },
  mounted() {
    this.setHtmlFontSize(360)

    setTimeout(() => {
      this.swiperList = ['red', 'blue', 'orange']
    }, 10)
    window.addEventListener('resize', () => {
      const clientWidth = document.body.clientWidth
      if (clientWidth >= 650) {
        this.swiperConfig = {
          currentIndex: 0,
          speed: 200,
          slideChange: this.slideChange,
          slideWidth: 384,
          spaceBetween: 14,
          startLeft: '20px', // 如果此处是数字，宽度将会随着屏幕变换而变化，如果是'20px',宽度将会始终保持20px
          UIWidth: 640, //按照375px设计稿开发实现，并且适配任意屏幕居中
        }
        this.setHtmlFontSize(640)
      } else {
        this.swiperConfig = {
          currentIndex: 0,
          speed: 200,
          slideChange: this.slideChange,
          slideWidth: 307,
          spaceBetween: 10,
          startLeft: '20px', // 如果此处是数字，宽度将会随着屏幕变换而变化，如果是'20px',宽度将会始终保持20px
          UIWidth: 360, //按照375px设计稿开发实现，并且适配任意屏幕居中
        }
        this.setHtmlFontSize(360)
      }
    })
    // window.addEventListener('orientationchange', () => {
    //   if (window.orientation === 90) {
    //     this.swiperConfig = {
    //       currentIndex: 0,
    //       speed: 200,
    //       slideChange: this.slideChange,
    //       slideWidth: 384,
    //       spaceBetween: 14,
    //       startLeft: '20px', // 如果此处是数字，宽度将会随着屏幕变换而变化，如果是'20px',宽度将会始终保持20px
    //       UIWidth: 640, //按照375px设计稿开发实现，并且适配任意屏幕居中
    //     }
    //   } else {
    //     this.swiperConfig = {
    //       currentIndex: 0,
    //       speed: 200,
    //       slideChange: this.slideChange,
    //       slideWidth: 307,
    //       spaceBetween: 10,
    //       startLeft: '20px', // 如果此处是数字，宽度将会随着屏幕变换而变化，如果是'20px',宽度将会始终保持20px
    //       UIWidth: 360, //按照375px设计稿开发实现，并且适配任意屏幕居中
    //     }
    //   }
    //   this.setHtmlFontSize(this.swiperConfig.UIWidth)
    // })
    // window.addEventListener('resize', () => {
    //   this.setHtmlFontSize();
    // });
  },

  methods: {
    changeSwiperData() {
      const list = [
        '#30f',
        '#0f3',
        '#f40',
        '#293364',
        '#496',
        '#94f',
        '#f293d4',
        '#0033d4',
      ]

      if (this.page === 6) {
        this.page = 0
      }
      this.page++

      this.swiperList = list.slice(0, this.page)
      this.swiperConfig = {
        ...this.swiperConfig,
      }
    },
    getClientWidth() {},
    setHtmlFontSize(UIWidth) {
      const clientWidth = document.body.clientWidth
      const target = (UIWidth * 3) / 100
      const fontSize = clientWidth / target
      document
        .querySelector('html')
        .setAttribute('style', `font-size:${fontSize}px`)
    },

    changeSwiper() {
      const idx = Math.ceil(Math.random() * 3)
      console.log('idx', idx)
      this.swiperConfig.currentIndex = idx
    },
    slideChange(current, next) {
      console.log('current', current)
      console.log('next21', next)
      this.currentIndex = next
    },
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
  height: 100%;

  color: #fff;
}
.paginationStyle {
  width: 100%;
  height: 10px;
  line-height: 10px;
}
.dot {
  width: 10px;
  height: 2px;
  background: rgba(0, 0, 0, 0.2);
  margin: 0 3px;
  display: inline-block;
}
.selectStyle {
  background: rgba(0, 122, 255, 1);
}
.test {
  width: 10.8rem;
  height: 1rem;
  background: cadetblue;
}
</style>
1[5]--2--> 5[3] 1[5]--3--> 6[2] 1[5]--6--> 7[-1] 1[5]--7--> 8[-2] 2[4]--3-->
10[1] 2[4]--6--> 11[-1] 2[4]--7--> 12[-3] 3[1]--6--> 15[-5] 3[1]--7--> 16[-6]
6[2] --2--> 21[0] 6[2] --3--> 22[-1] 6[2] --6--> 23[-4] 6[2] --7--> 24[-5] 10[1]
--2--> 29[-1] 10[1] --3--> 30[-2] 10[1] --6--> 31[-5] 10[1] --7--> 32[-6]
