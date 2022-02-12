import YinSwiper from './Swiper/YinSwiper'
import YinSlide from './Swiper/YinSlide'

let YinUI = {}
YinUI.install = function(Vue) {
  Vue.component(YinSwiper.name, YinSwiper)
  Vue.component(YinSlide.name, YinSlide)
}
export default YinUI
