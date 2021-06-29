<template>
  <div class="ps-section__left">
    <div class="ps-carousel--nav-inside bottom_banner">
      <carousel :items-to-show="1">
        <slide v-for="banner in banners" :key="banner.teId">
          <router-link :to="`/${banner.Link}`">
            <img :src="`${web_admin_url}${banner.imageUrl}`" alt="" />
          </router-link>
        </slide>

        <template #addons>
          <navigation />
        </template>
      </carousel>
    </div>
  </div>
</template>
<script>
import Config from '../config'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
export default {
  name: 'BottomBanner',
  components: {
    Carousel,
    Slide,
    Navigation
  },
  props: ['banners'],
  data() {
    return {
      web_admin_url: ''
    }
  },
  mounted() {
    this.web_admin_url = Config.WEB_ADMIN_URL
  }
}
</script>
<style scoped>
#homepage-ad .carousel__track {
  display: block !important;
}
#homepage-ad .carousel__slide {
  display: block !important;
}
#homepage-ad .carousel__slide img {
  width: 100% !important;
}
</style>
<style>
.bottom_banner .carousel__prev {
  top: 50%;
  left: 30px !important;
  transform: translate(-50%, -50%);
}
.bottom_banner .carousel__next {
  top: 50%;
  right: 30px !important;
  transform: translate(-50%, -50%);
}
</style>
