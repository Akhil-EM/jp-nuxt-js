<template>
  <div class="ps-section__content">
    <div class="row">
      <template v-for="(item, index) in banners" :key="index">
        <div class="col-md-6 mr_btm-15">
          <div class="addvbannerimg1">
            <router-link :to="`/${item.Link}`">
              <img :src="`${web_admin_url}${item.imageUrl}`" />
            </router-link>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import Config from '../config'
export default {
  name: 'DailyShopingBanner',
  props: ['banners'],
  data() {
    return {
      web_admin_url: '',
      items: [
        {
          teId: '1',
          imageUrl: '/assets/img/daily-shopping-img1.jpg',
          daily_shopping_type: 'lg'
        },
        {
          teId: '2',
          imageUrl: '/assets/img/daily-shopping-img2.jpg',
          daily_shopping_type: 'sm'
        },
        {
          teId: '3',
          imageUrl: '/assets/img/daily-shopping-img3.jpg',
          daily_shopping_type: 'sm'
        },
        {
          teId: '4',
          imageUrl: '/assets/img/daily-shopping-img4.jpg',
          daily_shopping_type: 'lg'
        }
      ]
    }
  },
  mounted() {
    this.web_admin_url = Config.WEB_ADMIN_URL
  }
}
</script>
<style scoped>
img {
  width: 100% !important;
}
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
