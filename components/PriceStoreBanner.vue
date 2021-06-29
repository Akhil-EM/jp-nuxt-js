<template lang="">
  <div class="ps-section__content">
    <div class="ps-carousel--nav owl-slider">
      <carousel v-if="render_slider_card" :items-to-show="sliderCont">
        <slide v-for="(item, index) in items" :key="index">
          <div class="ps-product">
            <div class="ps-product__thumbnail">
              <a href="#"><img :src="item.imageUrl" alt=""/></a>
            </div>
            <div class="ps-product__container">
              <div class="ps-product__content">
                <a class="ps-product__title" href="#">{{ item.elementName }}</a>
              </div>
            </div>
          </div>
        </slide>

        <template #addons>
          <navigation />
        </template>
      </carousel>
    </div>
  </div>
</template>
<script>
// import Config from  '../config';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
export default {
  name: 'PriceStorebanner',
  components: {
    Carousel,
    Slide,
    Navigation
  },
  data() {
    return {
      items: [
        {
          teId: '1',
          imageUrl: '/assets/img/kitchen-essentials-img1.jpg',
          elementName: 'Under ₹99'
        },
        {
          teId: '2',
          imageUrl: '/assets/img/kitchen-essentials-img2.jpg',
          elementName: '₹100 -₹199 Store'
        },
        {
          teId: '3',
          imageUrl: '/assets/img/kitchen-essentials-img3.jpg',
          elementName: '₹200 -₹299 Store'
        },
        {
          teId: '4',
          imageUrl: '/assets/img/kitchen-essentials-img4.jpg',
          elementName: '₹300 -₹499 Store'
        },
        {
          teId: '5',
          imageUrl: '/assets/img/kitchen-essentials-img5.jpg',
          elementName: '₹500 -₹799 Store'
        },
        {
          teId: '6',
          imageUrl: '/assets/img/kitchen-essentials-img6.jpg',
          elementName: '₹799 and Above'
        },
        {
          teId: '7',
          imageUrl: '/assets/img/kitchen-essentials-img1.jpg',
          elementName: 'Under ₹99'
        }
      ],
      window: {
        width: 0,
        height: 0
      },
      sliderCont: '5',
      render_slider_card: true
    }
  },
  watch: {
    sliderCont() {
      this.render_slider_card = false
      const $this = this
      this.$nextTick(() => {
        // Add the component back in
        $this.render_slider_card = true
      })
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
      this.calculateSlideCount(window.innerWidth)
    },
    calculateSlideCount(width) {
      console.log(width)
      if (width <= 360) {
        this.sliderCont = 2
      } else if (width > 360 && width <= 450) {
        this.sliderCont = 2
      } else if (width > 450 && width <= 570) {
        this.sliderCont = 3
      } else if (width > 570 && width <= 767) {
        this.sliderCont = 4
      } else if (width > 767 && width <= 992) {
        this.sliderCont = 4
      } else if (width > 992 && width <= 1200) {
        this.sliderCont = 6
      } else if (width > 1200 && width <= 1920) {
        this.sliderCont = 6
      } else {
        this.sliderCont = 6
      }
    }
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>
<style scoped>
.ps-product {
  width: 100%;
  margin-bottom: 4px;
  margin-right: 10px;
  border: 2px solid #d0d0d0;
}
</style>
