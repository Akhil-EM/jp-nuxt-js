<template lang="">
  <div class="ps-site-features">
    <div class="container">
      <h3>Shop From Top Categories</h3>
      <div class="ps-section__content shopCategoriesDiv">
        <div class="top_cat_desktop">
          <VueSlickCarousel
            v-if="render_slider_card"
            :arrows="true"
            :dots="false"
            :slides-to-show="5"
            :slides-to-scroll="5"
            :focus-on-select="true"
            :infinite="true"
            :touch-threshold="5"
          >
            <div v-for="category in getTopCategories" :key="category.catId">
              <div class="ps-product">
                <div class="ps-product__thumbnail">
                  <router-link :to="`/products/${category.catUrlKey}`">
                    <img
                      :src="`${web_admin_url}${category.imageUrl}`"
                      :alt="category.catName"
                    />
                  </router-link>
                </div>
                <div class="ps-product__container">
                  <div class="ps-product__content">
                    <router-link
                      class="ps-product__title"
                      :to="`/products/${category.catUrlKey}`"
                      >{{ category.catName }}</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </VueSlickCarousel>
        </div>
        <div class="top_cat_mob">
          <template v-if="render_slider_card">
            <div class="cat_block">
              <div
                v-for="(category, index) in getTopCategories"
                :key="category.catId"
              >
                <div
                  :class="{
                    cat_block_mob: true,
                    cathide: mobShowMoreCatStatus ? index > 5 : false
                  }"
                >
                  <div class="ps-product">
                    <div class="ps-product__thumbnail">
                      <router-link :to="`/products/${category.catUrlKey}`">
                        <img
                          :src="`${web_admin_url}${category.imageUrl}`"
                          :alt="category.catName"
                        />
                      </router-link>
                    </div>
                    <div class="ps-product__container">
                      <div class="ps-product__content">
                        <router-link
                          class="ps-product__title"
                          :to="`/products/${category.catUrlKey}`"
                          >{{ category.catName }}</router-link
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="catShowMore">
                <a href="javascript:void(0)" @click="enableAllCategory">
                  {{ mobShowMoreCatStatus ? 'Show more' : 'View Less' }}</a
                >
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Config from '@/config'
// import 'vue3-carousel/dist/carousel.css'
// import { Carousel, Slide, Navigation } from 'vue3-carousel'
// import carousel from 'vue-owl-carousel'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import { mapGetters } from 'vuex'
export default {
  name: 'TopCategorySlider',
  components: {
    VueSlickCarousel
    // Slide,
    // Navigation
  },
  props: ['topCategories'],
  computed: {
    ...mapGetters(['getTopCategories'])
  },
  data() {
    return {
      web_admin_url: '',
      window: {
        width: 0,
        height: 0
      },
      sliderCont: '5',
      render_slider_card: true,
      mobShowMoreCatStatus: true
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
    // window.addEventListener('resize', this.handleResize)
    // this.handleResize()
  },
  methods: {
    // handleResize() {
    //   this.window.width = window.innerWidth
    //   this.window.height = window.innerHeight
    //   this.calculateSlideCount(window.innerWidth)
    // },
    enableAllCategory() {
      this.mobShowMoreCatStatus = !this.mobShowMoreCatStatus
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
        this.sliderCont = 2
      } else if (width > 767 && width <= 992) {
        this.sliderCont = 3
      } else if (width > 992 && width <= 1200) {
        this.sliderCont = 4
      } else if (width > 1200 && width <= 1920) {
        this.sliderCont = 5
      } else {
        // this.sliderCont=5;
      }
    }
  },
  unmounted() {
    // window.removeEventListener('resize', this.handleResize)
  }
}
</script>
<style scoped>
.catShowMore {
  text-align: center;
  padding: 10px;
  width: 100%;
  clear: both;
  color: #023f88;
  font-weight: bold;
  cursor: pointer;
}
.cathide {
  display: none;
}
.ps-product {
  border: none !important;
}
.ps-product .ps-product__title {
  font-family: intro;
  text-transform: capitalize;
}
.top_cat_mob {
  display: none;
}
.cat_block {
  float: left !important;
  width: 100% !important;
  background: #fff !important;
  /* padding: 20px; */
}
.cat_block_mob {
  float: left !important;
  width: 33.33% !important;
  border: 1px dashed #e8e8e8a1;
}

.top_cat_desktop {
  padding-top: 20px;
}

.ps-product .ps-product__thumbnail img {
  width: 200px;
  margin: 0 auto;
}

.shopCategoriesDiv .ps-product__thumbnail {
  max-height: auto !important;
  width: auto !important;
}

.shopCategoriesDiv .ps-product__title {
  line-height: 28px;
  font-size: 15px;
}
@media only screen and (max-width: 600px) {
  .top_cat_mob {
    display: block !important;
  }
  .top_cat_desktop {
    display: none !important;
  }

  .ps-site-features {
    /* background:#d25e62; */
    background: #fff;
    float: left;
    width: 100%;
    margin-top: 0px !important;
    z-index: 99999;
    position: relative;
    margin-bottom: 20px;
  }
  /* .ps-site-features h3{
               
            } */

  .shopCategoriesDiv .ps-product__thumbnail {
    width: auto !important;
    max-width: auto !important;
  }
  .ps-product {
    min-height: 177px !important;
  }

  .shopCategoriesDiv .ps-product__title {
    line-height: 15px !important;
    font-size: 15px !important;
    max-height: 31px;
  }
}

@media only screen and (max-width: 467px) {
  #homepage-3 .ps-site-features {
    padding-top: 20px !important;
  }
  .shopCategoriesDiv .ps-product__thumbnail {
    min-height: 94px !important;
  }

  .ps-product {
    border: none !important;
    min-height: 149px;
  }
  .shopCategoriesDiv .ps-product__title[data-v-122ed634] {
    line-height: 15px !important;
    font-size: 15px !important;
    max-height: 31px;
  }
}
</style>
