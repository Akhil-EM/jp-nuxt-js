<template>
  <carousel v-if="render_slider_card" :items-to-show="sliderCont">
    <slide v-for="brand in brands" :key="brand.attrValueId">
      <div class="ps-product img_slider">
        <div class="ps-product__thumbnail">
          <router-link :to="`/products/?brand=${brand.attrValueId}`">
            <img
              :src="`${web_admin_url}${brand.imageUrl}`"
              :alt="brand.attrValue"
            />
          </router-link>
        </div>
      </div>
    </slide>

    <template #addons>
      <navigation />
    </template>
  </carousel>
</template>
<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import Config from '../config'
export default {
  name: 'BrandSlider',
  components: {
    Carousel,
    Slide,
    Navigation
  },
  props: ['brands', 'currency'],
  data() {
    return {
      sliderCont: '7',
      window: {
        width: 0,
        height: 0
      },
      render_slider_card: true,
      web_admin_url: ''
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
  mounted() {
    this.web_admin_url = Config.WEB_ADMIN_URL
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  methods: {
    refreshPageEvent(product_urlKey) {
      this.$emit('refreshPagedata', product_urlKey)
    },
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
        this.sliderCont = 2
      } else if (width > 570 && width <= 767) {
        this.sliderCont = 4
      } else if (width > 767 && width <= 992) {
        this.sliderCont = 5
      } else if (width > 992 && width <= 1200) {
        this.sliderCont = 5
      } else if (width > 1200 && width <= 1920) {
        this.sliderCont = 5
      } else {
        this.sliderCont = 5
      }
    }
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>
<style scoped>
.img_slider .ps-product__thumbnail {
  min-height: 90px !important;
}

.ps-product.img_slider {
  width: 226px;
  padding: 11px;
}

@media only screen and (max-width: 600px) {
  .ps-product.img_slider {
    margin-right: 20px;
  }
}
</style>
