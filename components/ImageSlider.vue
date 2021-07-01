<template>
  <carousel v-if="render_slider_card" :items-to-show="sliderCont">
    <slide v-for="product in products" :key="product.productId">
      <div class="ps-product img_slider">
        <div class="ps-product__thumbnail">
          <router-link :to="`/Product-detail/${product.urlKey}`">
            <img
              :src="`${web_admin_url}${product.imageUrl}`"
              alt=""
              @click="refreshPageEvent(product.urlKey)"
            />
          </router-link>
        </div>
        <div class="ps-product__content">
          <router-link
            :to="`/Product-detail/${product.urlKey}`"
            class="ps-product__title"
          >
            {{ product.prName }}
          </router-link>

          <div class="priceinfo">
            <p>
              <template
                v-if="
                  Number.isInteger(product.specialPrice) &&
                    product.specialPrice != 0 &&
                    product.unitPrice > product.specialPrice
                "
              >
                {{ currency }} {{ product.specialPrice.toFixed(2) }}
                <span
                  ><del
                    >{{ currency }} {{ product.unitPrice.toFixed(2) }}</del
                  ></span
                >
              </template>
              <template v-else>
                {{ currency }} {{ product.unitPrice.toFixed(2) }}
              </template>
            </p>
          </div>
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
export default {
  name: 'ImageSlider',
  components: {
    Carousel,
    Slide,
    Navigation
  },
  props: ['products', 'webAdminUrl', 'currency'],
  data() {
    return {
      sliderCont: '7',
      window: {
        width: 0,
        height: 0
      },
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
        this.sliderCont = 1
      } else if (width > 360 && width <= 450) {
        this.sliderCont = 1
      } else if (width > 450 && width <= 570) {
        this.sliderCont = 2
      } else if (width > 570 && width <= 767) {
        this.sliderCont = 2
      } else if (width > 767 && width <= 992) {
        this.sliderCont = 3
      } else if (width > 992 && width <= 1200) {
        this.sliderCont = 5
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
.img_slider .ps-product__thumbnail {
  min-height: 115px !important;
}
.img_slider .ps-product__title {
  height: auto;
  margin-bottom: 0px;
  position: relative;
  padding-left: 33px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  max-height: 188px;
  line-height: 27px;
}
.priceinfo p {
  font-weight: bold;
  font-size: 18px;
  color: #f10707;
  position: relative;
  margin-bottom: 7px;
}
.priceinfo p span {
  color: #a2a0a0;
  font-size: 15px;
  font-weight: normal;
}
</style>
