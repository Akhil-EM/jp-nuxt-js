<template>
  <div>
    <div class="ps-home-banner main-top-banner desktop">
      <div v-if="image.imageUrl != 'null'">
        <a class="home_slide_prev" @click="prev"
          ><i class="fa fa-chevron-left"></i
        ></a>
        <router-link :to="`/${image.Link}`">
          <img
            :src="`${web_admin_url}${image.imageUrl}`"
            :alt="image.imageUrl"
          />
        </router-link>

        <a class="home_slide_next" @click="next"
          ><i class="fa fa-chevron-right"></i
        ></a>
      </div>
    </div>
    <div class="ps-home-banner main-top-banner mobile">
      <div v-if="mob_image.imageUrl != 'null'">
        <a class="home_slide_prev" @click="prev"
          ><i class="fa fa-chevron-left"></i
        ></a>
        <router-link :to="`/${mob_image.Link}`">
          <img
            :src="`${web_admin_url}${mob_image.imageUrl}`"
            :alt="mob_image.imageUrl"
          />
        </router-link>

        <a class="home_slide_next" @click="next"
          ><i class="fa fa-chevron-right"></i
        ></a>
      </div>
      <!-- <carousel :itemsToShow="1"  >
                <slide  v-for="banner in mobBanners" :key="banner.teId">
                    <img :src="`${web_admin_url}${banner.imageUrl}`" alt="">                           
                </slide>

                <template #addons>
                <navigation />
                
                </template>
            </carousel> -->
    </div>
  </div>
</template>
<script>
import Config from '../config'
import 'vue3-carousel/dist/carousel.css'

// import { Carousel, Slide, Navigation } from 'vue3-carousel';

export default {
  name: 'HomeBanner',
  components: {
    //    Carousel,
    //     Slide,
    //     Navigation,
  },
  props: ['banners', 'mobBanners'],
  data() {
    return {
      web_admin_url: '',
      loaded: false,
      sliderRender: true,
      localSliderCnt: '',
      index: 0,
      image: this.banners[0],
      mob_index: 0,
      mob_image: this.mobBanners[0],
      bannerIntervel: ''
    }
  },
  mounted() {
    this.web_admin_url = Config.WEB_ADMIN_URL
  },
  created() {},
  unmounted() {
    clearInterval(this.bannerIntervel)
  },
  beforeMount() {
    this.autoChangeSlide()
  },
  methods: {
    next() {
      this.index = (this.index + 1) % this.banners.length
      this.image = this.banners[this.index]
      this.mob_index = (this.mob_index + 1) % this.mobBanners.length
      this.mob_image = this.mobBanners[this.mob_index]
    },
    prev() {
      this.index = this.index - 1 < 0 ? this.banners.length - 1 : this.index - 1
      this.image = this.banners[this.index]
      this.mob_index =
        this.mob_index - 1 < 0 ? this.mobBanners.length - 1 : this.mob_index - 1
      this.mob_image = this.mobBanners[this.mob_index]
    },
    autoChangeSlide() {
      this.bannerIntervel = setInterval(() => {
        this.next()
      }, 3000)
    }
  }
}
</script>
<style scoped>
.main-top-banner img {
  width: 100% !important;
}
.carousel__prev {
  left: 22px !important;
  background-color: #ddd9e64a;
}
.carousel__next {
  right: 22px !important;
  background-color: #ddd9e64a;
}
.mobile {
  display: none;
  position: relative;
}
.desktop {
  padding-top: 20px;
  position: relative;
}

.home_slide_prev {
  top: 40%;
  position: absolute;
  color: #ddd !important;
  left: 5px;
  font-size: 40px;
  cursor: pointer;
  z-index: 99;
}

.home_slide_next {
  top: 40%;
  position: absolute;
  color: #ddd !important;
  right: 5px;
  font-size: 40px;
  cursor: pointer;
}

@media (min-width: 769px) and (max-width: 1200px) {
  .desktop {
    padding-top: 50px !important;
  }
}

@media only screen and (max-width: 767px) {
  .mobile {
    display: block;
    position: relative;
  }

  .desktop {
    display: none;
  }

  #homepage-3 {
    padding-top: 78px !important;
  }
}
</style>
