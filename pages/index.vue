<template>
  <div id="homepage-3">
    <template v-if="getHomeBanner != ''">
      <HomeBanner
        :banners="getHomeBanner"
        :mob-banners="getHomeMobBanners"
      ></HomeBanner>
    </template>
    <template v-else>
      <EmptylodderBox></EmptylodderBox>
    </template>
    <!-- <div id="home_whatsapp_icon">
            <a target="_blank" href="https://wa.me/917592899991/?text="><img src="/assets/img/whatsapp-shake.gif"/></a>
        </div>  -->
    <div class="white">
      <div>
        <a target="_blank" href="https://wa.me/917594999934/?text=">
          <i class="fa fa-phone" aria-hidden="true"></i
        ></a>
      </div>
    </div>

    <template v-if="getTopCategories != ''">
      <TopCategorySlider :top_categories="getTopCategories"></TopCategorySlider>
    </template>
    <template v-else>
      <EmptylodderBox></EmptylodderBox>
    </template>

    <div
      v-if="getDealoftheDayProducts != ''"
      class="ps-product-list ps-recommend-for-you"
    >
      <div class="container">
        <h3>Hot Deals</h3>
        <template v-if="getDealoftheDayProducts != ''">
          <ProductSlider
            :products="getDealoftheDayProducts"
            @cartUpdated="cartUpdated($event)"
          ></ProductSlider>
        </template>
        <template v-else>
          <EmptylodderBox></EmptylodderBox>
        </template>
      </div>
    </div>

    <span class="scrollTop" @click="topToBottom">
      <i class="fa fa-angle-up" aria-hidden="true"></i>
    </span>
  </div>
</template>

<script>
import HomeBanner from '@/components/HomeBanner'
// import BrandSlider from '@/components/BrandSlider'
import TopCategorySlider from '@/components/TopCategorySlider'
import ProductSlider from '@/components/ProductSlider'
// import HomePromoBanner from '@/components/HomePromoBanner'
// import BottomBanner from '@/components/BottomBanner'
// import PriceStoreBanner from '@/components/PriceStoreBanner'
// import DailyShopingBanner from '@/components/DailyShopingBanner'
import EmptylodderBox from '@/components/EmptylodderBox'
// import AdvertisementPopup from '@/components/AdvertisementPopup'
import { mapGetters, mapActions } from 'vuex'
import $ from 'jquery'
import helper from '@/helper/helper'
export default {
  layout: 'frontend',

  components: {
    HomeBanner,
    TopCategorySlider,
    ProductSlider,
    // HomePromoBanner,
    // BottomBanner,
    // PriceStoreBanner,
    // DailyShopingBanner,
    EmptylodderBox
    // BrandSlider,
    // AdvertisementPopup
  },
  watch: {
    fetchPopupbannerData(value) {
      const locationInfo = localStorage.getItem('location_info')
      if (value != '' && locationInfo) {
        const popupTemplate = value[0]
        if (popupTemplate.status == true) {
          // this.openPopupbanner()
          this.popupTemplateData = popupTemplate
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'getHomeBanner',
      'getTopCategories',
      'getDealoftheDayProducts',
      'getPromoBanner2',
      'getPopularProducts',
      'getRecentProducts',
      'getPromoFullWidthBanner',
      'getHomeMobBanners',
      'getDailyShoppingBaner',
      'fetchTopBrandList',
      'fetchPopupbannerData'
    ])
  },
  data() {
    return {
      showModal: false,
      popupTemplateData: []
    }
  },
  mounted() {
    this.storeHomeBammer()
    this.storeDealoftheDayProducts()
    this.setPopularProduct()
    this.storeRecentViewedProducts()
    // this.updateMetaDetails();
    this.isAuthUser()
    this.topToBottom()
  },
  methods: {
    ...mapActions([
      'storeHomeBammer',
      'storeDealoftheDayProducts',
      'setPopularProduct',
      'storeRecentViewedProducts'
    ]),
    cartUpdated(customerCart) {
      this.$emit('cartUpdated', customerCart)
    },
    topToBottom() {
      helper.backtoTop()
    },
    openPopupbanner() {
      const popupCookie = this.$cookies.get('offerpop')
      if (popupCookie === null) {
        this.showModal = true
        this.$cookies.set('offerpop', true, 60 * 60 * 24)
      }
    },
    isAuthUser() {
      let isLogedUserChk = ''
      if (this.$router.params != '') {
        isLogedUserChk = this.$route.query.login
      }

      if (isLogedUserChk == 'failed') {
        document.getElementById('login_popup_link').click()
      }
    },
    updateMetaDetails() {
      document.title =
        'Online shopping at kochi. Shop on Keralas best ecommerce portal. Faster Delivery. Centreal Supermarket'
      $('meta[name=description]').attr(
        'content',
        'Get the best deals for Fruits,Vegetables,Fish,Meat,Bakery,Fresh Food,Egg,Branded Foods,Beverages,Frozen Dishes,Diary products,Dry Fruits,Chocolates,Auto accesories,Masala,Oils,Home care,Personal Care,Pet Care products'
      )
      $('meta[name=keywords]').attr(
        'content',
        'Shop online Kochi,Beast online supermarket,best deals kochi,best offers kochi,Fast Delivery,Fruits,Vegetables,Fish,Meat,Bakery,Fresh Food,Egg,Branded Foods,Beverages,Frozen Dishes,Diary products,Dry Fruits,Chocolates,Auto accesories,Masala,Oils,Home care,Personal Care,Pet Care products'
      )
      $("meta[property='og\\title']").attr(
        'content',
        'Online shopping at kochi. Shop on Keralas best ecommerce portal. Faster Delivery. Centreal Supermarket'
      )
      $("meta[property='og\\description']").attr(
        'content',
        'Get the best deals for Fruits,Vegetables,Fish,Meat,Bakery,Fresh Food,Egg,Branded Foods,Beverages,Frozen Dishes,Diary products,Dry Fruits,Chocolates,Auto accesories,Masala,Oils,Home care,Personal Care,Pet Care products'
      )
      $("meta[property='og\\image']").attr(
        'content',
        '/assets/img/Centreal Bazaar_Brand icon_.png'
      )
    }
    // handleScroll(){
    //     console.log(Math.round(window.pageYOffset));
    // }
  },
  created() {
    // window.addEventListener('scroll', this.handleScroll);
    // this.handleScroll();
  },
  unmounted() {
    // window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>
<style scoped>
.ps-home-banner {
  padding-top: 20px;
}
#home_whatsapp_icon {
  position: fixed;
  top: 68%;
  width: 50px;
  right: 30px;
  cursor: pointer;
  z-index: 99999;
}
</style>
<style>
@media only screen and (max-width: 600px) {
  .modal-backdrop {
    z-index: 999999 !important;
  }
  .modal {
    z-index: 99999999 !important;
  }

  .modal-content {
    z-index: 9999999 !important;
  }
}
</style>
