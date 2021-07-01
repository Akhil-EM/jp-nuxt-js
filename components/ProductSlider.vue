<template>
  <div class="ps-section__content">
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
      <div v-for="product in products" :key="product.productId">
        <div class="produtDeatilsDivFloat">
          <ProductCard
            :product="product"
            :web_admin_url="web_admin_url"
            :cart_ajax="cart_ajax"
            :cart_product_url_key="cart_product_url_key"
            :currency="currency"
            :is_banner="true"
            :offer-badge="true"
            :new-badge="true"
            @addToCart="addtocart($event)"
            @refreshSliderdata="refreshPageEvents"
            @updateCartQty="updateCart($event)"
          >
          </ProductCard>
        </div>
      </div>
    </VueSlickCarousel>
  </div>
</template>
<script>
import helper from '@/helper/helper'
import axios from 'axios'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import ProductCard from '../components/ProductCard'
import { mapActions } from 'vuex'
import Config from '../config'
export default {
  name: 'ProductSlider',
  components: {
    VueSlickCarousel,
    ProductCard
  },
  props: ['products', 'offerBadge', 'newBadge'],
  data() {
    return {
      web_admin_url: '',
      currency: '',
      cart_ajax: 'closed',
      cart_product_url_key: '',
      vendor_url_key: '',
      guest_id: '',
      cust_id: null,
      pincode: '',
      window: {
        width: 0,
        height: 0
      },
      sliderCont: '5',
      button_label: 'Add',
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
  mounted() {
    this.web_admin_url = Config.WEB_ADMIN_URL
    this.currency = Config.CURRECNCY
    this.vendor_url_key = Config.VENDOR_URL_KEY
    this.cust_id = localStorage.getItem('custId')
    if (this.cust_id == null) {
      this.guest_id = localStorage.getItem('guestId')
    }
  },
  methods: {
    ...mapActions(['storeCartSummary']),
    discountPercentage(product) {
      if (product.unitPrice > product.specialPrice) {
        const difference = product.unitPrice - product.specialPrice

        const percentage = (difference * 100) / product.unitPrice

        return percentage.toFixed(2)
      } else {
        return 0
      }
    },
    addtocart(productInfo) {
      const urlKey = productInfo.url_key
      const productQty = productInfo.product_qty
      const $this = this
      $this.cart_ajax = 'open'
      $this.cart_product_url_key = productInfo.url_key
      const payload = {
        cusId: $this.cust_id != null ? Number($this.cust_id) : '',
        guestId: $this.cust_id == null ? $this.guest_id : '',
        pincode: $this.pincode,
        urlKey: urlKey,
        productQty: productQty,
        vendorUrlkey: $this.vendor_url_key
      }

      $this.$store
        .dispatch('addToCart', { payload: payload, toast: $this.$toast })
        .then(function(response) {
          console.log(response)
          $this.cart_ajax = 'closed'
          $this.cart_product_url_key = ''
          $this.customerCart = $this.$store.state.customer_cart
          $this.$emit('cartUpdated', $this.customerCart)
          $this.button_label = 'View in cart'
          // $(`.is_in_cart_${productInfo.url_key}`).html('View in cart');
        })
    },
    refreshPageEvents(product_urlKey) {
      this.$emit('refreshSliderdata', product_urlKey)
    },
    // handleResize() {
    //   this.window.width = window.innerWidth
    //   this.window.height = window.innerHeight
    //   this.calculateSlideCount(window.innerWidth)
    // },
    calculateSlideCount(width) {
      console.log(width)
      if (width <= 360) {
        this.sliderCont = 2
        //  this.$emit('scren_size_change', this.window.width)
      } else if (width > 360 && width <= 450) {
        this.sliderCont = 2
        // this.$emit('scren_size_change', this.window.width)
      } else if (width > 450 && width <= 570) {
        this.sliderCont = 2
      } else if (width > 570 && width <= 767) {
        this.sliderCont = 2
        // this.$emit('scren_size_change', this.window.width)
      } else if (width > 767 && width <= 992) {
        this.sliderCont = 3
        // this.$emit('scren_size_change', this.window.width)
      } else if (width > 992 && width <= 1200) {
        this.sliderCont = 5
        // this.$emit('scren_size_change', this.window.width)
      } else if (width > 1200 && width <= 1920) {
        this.sliderCont = 6
        // this.$emit('scren_size_change', this.window.width)
      } else {
        this.sliderCont = 6
        // this.$emit('scren_size_change', this.window.width)
      }
    },
    truncateString(string, number) {
      return helper.truncateString(string, number)
    },
    updateCart(cartItemInfo) {
      if (cartItemInfo.product_qty == 0) {
        this.rmvCartItem(cartItemInfo)
      }

      if (cartItemInfo.product_qty != 0) {
        let guestId = null
        let custId = null
        custId = localStorage.getItem('custId')
        if (custId == null) {
          guestId = localStorage.getItem('guestId')
        }

        const $this = this
        let cartUpdateUrl = ''
        if (cartItemInfo.type == 'add') {
          cartUpdateUrl = `${Config.BASE_URL}Order/CartItemAddQtyByUrlKey`
        } else if (cartItemInfo.type == 'sub') {
          cartUpdateUrl = `${Config.BASE_URL}Order/CartItemSubQtyByUrlKey`
        }
        if (cartUpdateUrl != '') {
          axios
            .post(
              `${cartUpdateUrl}`,
              {
                urlKey: cartItemInfo.url_key,
                guestId: guestId,
                custId: custId
              },
              Config.ADMIN_API_HEADER
            )
            .then(function(response) {
              if (response.status == 200) {
                const payload = {
                  cusId: custId,
                  guestId: guestId,
                  vendorUrlkey: Config.VENDOR_URL_KEY
                }
                $this.$store.dispatch('getCart', payload).then(function() {
                  $this.$emit('cartUpdated', $this.cart_info)
                  $this.storeCartSummary()
                })
              }
            })
            .catch(function(error) {
              $this.$toast.error(`${error.response.data.Message}`)
              $this.qtyReset = 1
            })
        }
      }
    },
    rmvCartItem(cartItemInfo) {
      const $this = this
      $this.cart_ajax = 'open'
      let guestId = null
      let custId = null
      custId = localStorage.getItem('custId')
      if (custId == null) {
        guestId = localStorage.getItem('guestId')
      }

      axios
        .post(
          `${Config.BASE_URL}Order/RemoveCartItemByUrlkey`,
          {
            urlKey: cartItemInfo.url_key,
            guestId: guestId,
            custId: custId
          },
          Config.ADMIN_API_HEADER
        )
        .then(function(response) {
          if (response.status == 200) {
            $this.cart_ajax = 'closed'

            const payload = {
              cusId: custId,
              guestId: guestId,
              vendorUrlkey: Config.VENDOR_URL_KEY
            }
            $this.$store.dispatch('getCart', payload).then(function() {
              $this.$emit('cartUpdated', $this.cartItemInfo)
              // $this.storeCartSummary();
            })
          }
        })
        .catch(function(error) {
          $this.$toast.error(`${error.response.data.Message}`)
          $this.qtyReset = 1
        })
    }
  },
  created() {
    // window.addEventListener('resize', this.handleResize)
    // this.handleResize()
  },
  unmounted() {
    // window.removeEventListener('resize', this.handleResize)
  }
}
</script>
<style scoped>
.current-price {
  font-weight: 900;
  font-size: 15px;
}

.ps-product__title {
  height: 34px;
}

.discount-price {
  color: #a2a2a2;
  font-size: 16px;
}

.produtDeatilsDivFloat {
  width: 100%;
}
.maxwidthproductmain .img_box {
  width: 87px !important;
}
.maxwidthproductmain .img_box img {
  margin: 0 auto !important;
  width: 100% !important;
}

.produtDeatilsDivFloat .ps-product__title {
  font-size: 15px;
  font-weight: bold;
  color: #000;
  line-height: 23px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  max-width: 147px;
  height: 25px !important;
  padding: 0px;
}

/* 
@media only screen and (min-width: 768px)and (max-width: 1200px) {
    .carousel__slide{
        margin-right: 7px;
        width: 32.3333%  !important;
    }
    
}

@media only screen and (max-width: 767px) {
    .carousel__slide{
        margin-right: 10px;
         width: 30.3333%;
    }
    .ps-product__title{
        height:30px !important
    }
}

@media (min-width: 992px) and (max-width: 1200px){
    .carousel__slide{
       
         width: 24.5%  !important; 
    }
}
@media (min-width:  1201px) and (max-width: 1920px){
    .carousel__slide{
          margin-right: 7px;
          width: 16.2%  !important; 
    }
} */
</style>
