<template>
  <div class="ps-home-promotions">
    <div class="container">
      <div class="row">
        <template v-for="(b, index) in banners" :key="index">
          <div
            v-if="index < 2"
            class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-4"
          >
            <div class="addvbannerimg1">
              <router-link :to="`/${b.Link}`" class="ps-collection mb-30">
                <img :src="`${web_admin_url}${b.imageUrl}`" />
              </router-link>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import Config from '../config'
export default {
  name: 'HomePromoBanner',
  props: ['banners'],

  data() {
    return {
      web_admin_url: '',
      promoBanner: []
    }
  },
  watch: {
    banners(banner) {
      this.promoBanner = banner
    }
  },
  mounted() {
    this.web_admin_url = Config.WEB_ADMIN_URL
  },
  created() {}
}
</script>
<style scoped>
.addvbannerimg1 {
  overflow: hidden;
}
.addvbannerimg1 img {
  width: 100%;
  -moz-transition: 0.5s;
  -webkit-transition: 0.5s;
  -ms-transition: 0.5s;
  -o-transition: 0.5s;
  transition: 0.5s;
}
.addvbannerimg1:hover img {
  -moz-transform: scale(1.05);
  -webkit-transform: scale(1.05);
  transform: scale(1.05);
}
</style>
