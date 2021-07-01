<template>
  <div class="maxwidthproductmain">
    <template v-if="is_banner == true">
      <div
        v-if="
          offerBadge &&
            Number.isFinite(productSpecialPrice) &&
            productSpecialPrice != 0 &&
            productPrice > productSpecialPrice
        "
        class="product_discount_badge"
      >
        -{{ discountPercentage(product) }}%
      </div>
      <template
        v-if="
          isNewProduct(product.prDate) != 0 && isNewProduct(product.prDate) <= 7
        "
      >
        <div v-if="newBadge" class="new_arrival_badge">New</div>
      </template>
    </template>
    <template v-else>
      <div :class="{ whilistIconwrapper: true }">
        <a
          :id="`wishlist_item_${product.productId}`"
          href="javascript:void(0)"
          :class="{ 'is-active': product.IsWishlisted || feverate_status }"
          @click="addToWishList(product)"
        >
          <i class="fa fa-heart-o" aria-hidden="true"></i>
        </a>
      </div>
      <template
        v-if="
          Number.isFinite(productSpecialPrice) &&
            productSpecialPrice != 0 &&
            productPrice > productSpecialPrice
        "
      >
        <div class="percentageDivGreeen">
          <p>{{ discountPercentage(product) }}% off</p>
        </div>
      </template>
    </template>

    <div class="ps-product__thumbnail img_box">
      <router-link :to="`/Product-detail/${product.urlKey}`">
        <img
          :src="`${web_admin_url}${product.imageUrl}`"
          :alt="product.alt != '' ? product.alt : product.prName"
          @click="refreshPageEvent(product.urlKey)"
        />
      </router-link>
      <!-- <a  href="javascript:void(0)" @click="goToDetailpage(product.urlKey)">
          <img :src="`${web_admin_url}${product.imageUrl}`" alt="" />
      </a> -->
    </div>
    <div class="ps-product__container">
      <div v-if="product.IsReviewCount > 0" class="product_review_sec">
        <span class="rating_box"
          >{{ productReviewCnt(product.IsReviewAvgrating) }}.0
          <i class="fa fa-star"></i></span
        >({{ productReviewCnt(product.IsReviewCount) }})
      </div>

      <div class="ps-product__content">
        <router-link
          class="ps-product__title"
          :to="`/Product-detail/${product.urlKey}`"
        >
          <span @click="refreshPageEvent(product.urlKey)">{{
            productname
          }}</span>
        </router-link>

        <div class="priceinfo">
          <template
            v-if="
              Number.isFinite(productSpecialPrice) &&
                productSpecialPrice != 0 &&
                productPrice > productSpecialPrice
            "
          >
            <p class="current-price mb-0">
              {{ currency }}{{ productSpecialPrice }}

              <span class="discount-price">
                <del>{{ currency }} {{ productPrice }}</del>
              </span>
            </p>
          </template>
          <template v-else>
            <p class="current-price mb-0">{{ currency }}{{ productPrice }}</p>
          </template>
        </div>
        <div
          v-if="product.stockAvailability != 'Out of Stock'"
          class="cart-sec"
        >
          <!--if product contain variation start--->
          <template v-if="productVeriation">
            <div class="variation_box">
              <div class="variation_select_area">
                <select
                  v-model="selected_variation"
                  class="form-control v_select"
                  @click="UpdateProductUrlKey"
                >
                  <div
                    v-for="(variation, index) in productVeriation[0].AttrValues"
                    :key="index"
                  >
                    <option :value="variation"
                      >{{ variation.AttrValuename }}

                      <template
                        v-if="
                          Number.isFinite(variation.prSpecialPrice) &&
                            variation.prSpecialPrice != 0 &&
                            variation.prPrice > variation.prSpecialPrice
                        "
                      >
                        <span class="forDesk">
                          <del> {{ currency }} {{ variation.prPrice }} </del> -
                          {{ currency }} {{ variation.prSpecialPrice }}
                        </span>
                      </template>
                      <template v-else>
                        <i class="forDesk">
                          {{ currency }} {{ variation.prPrice }}</i
                        >
                      </template>
                    </option>
                  </div>
                </select>
              </div>
              <div class="variation_btn_area">
                <div
                  v-if="isInCart == 'View in cart'"
                  :class="{
                    'input-group inline-group': true,
                    mob_cart: true,
                    'v-incart': isInCart == 'View in cart'
                  }"
                >
                  <div class="input-group-prepend">
                    <button
                      class="btn btn-outline-secondary btn-minus"
                      @click="sub(isInCart)"
                    >
                      <i class="fa fa-minus"></i>
                    </button>
                  </div>
                  <input
                    :ref="product.urlKey"
                    v-model="count"
                    class="form-control quantity"
                    min="0"
                    readonly
                    name="quantity"
                    type="number"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-secondary btn-plus"
                      @click="add(isInCart)"
                    >
                      <i class="fa fa-plus"></i>
                    </button>
                  </div>
                </div>

                <div
                  v-if="isInCart != 'View in cart'"
                  :class="
                    `cartSecBlock w-100 ${
                      isInCart == 'View in cart' ? ' hide_el' : ''
                    }`
                  "
                >
                  <div
                    :class="{ 'w-100': isInCart == 'View in cart' }"
                    @click="addtocart(productUrlKey, productWishlistId)"
                  >
                    <template v-if="cart_ajax == 'closed'">
                      <div class="cat-btn-text">
                        <p class="addcart-btn">
                          <span class="addcart-img"
                            ><img :src="`/assets/img/carticon.png`"/></span
                          >{{ isInCart }}
                        </p>
                      </div>
                    </template>
                    <template
                      v-if="
                        cart_ajax == 'open' &&
                          cart_product_url_key == productUrlKey
                      "
                    >
                      <div class="cat-btn-text">
                        <p class="addcart-btn">
                          <ButtonLoader
                            :loader-color="loaderColor"
                            :loader-style="loaderStyle"
                            :cart_ajax="cart_ajax"
                          >
                          </ButtonLoader>
                        </p>
                      </div>
                    </template>

                    <template
                      v-if="
                        cart_ajax == 'open' &&
                          cart_product_url_key != productUrlKey
                      "
                    >
                      <div class="cat-btn-text">
                        <p class="addcart-btn">
                          <span class="addcart-img"
                            ><img :src="`/assets/img/carticon.png`"/></span
                          >{{ isInCart }}
                        </p>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <!--if product contain variation end--->
          <template v-else>
            <div :class="`cartSecBlock  w-100`">
              <div
                v-if="isInCart == 'View in cart'"
                :class="{
                  'input-group inline-group': true,
                  mob_cart: true,
                  'v-incart': isInCart == 'View in cart'
                }"
              >
                <div class="input-group-prepend">
                  <button
                    class="btn btn-outline-secondary btn-minus"
                    @click="sub(isInCart)"
                  >
                    <i class="fa fa-minus"></i>
                  </button>
                </div>
                <input
                  :ref="product.urlKey"
                  v-model="count"
                  class="form-control quantity"
                  min="0"
                  readonly
                  name="quantity"
                  type="number"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary btn-plus"
                    @click="add(isInCart)"
                  >
                    <i class="fa fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div
              v-if="isInCart != 'View in cart'"
              :class="
                `cartSecBlock w-100 ${
                  isInCart == 'View in cart' ? ' hide_el' : ''
                }`
              "
            >
              <div
                :class="{ 'w-100': isInCart == 'View in cart' }"
                @click="addtocart(productUrlKey, productWishlistId)"
              >
                <template v-if="cart_ajax == 'closed'">
                  <div class="cat-btn-text">
                    <p class="addcart-btn">
                      <span class="addcart-img"
                        ><img :src="`/assets/img/carticon.png`"/></span
                      >{{ isInCart }}
                    </p>
                  </div>
                </template>
                <template
                  v-if="
                    cart_ajax == 'open' && cart_product_url_key == productUrlKey
                  "
                >
                  <div class="cat-btn-text">
                    <p class="addcart-btn">
                      <ButtonLoader
                        :loader-color="loaderColor"
                        :loader-style="loaderStyle"
                        :cart_ajax="cart_ajax"
                      >
                      </ButtonLoader>
                    </p>
                  </div>
                </template>

                <template
                  v-if="
                    cart_ajax == 'open' && cart_product_url_key != productUrlKey
                  "
                >
                  <div class="cat-btn-text">
                    <p class="addcart-btn">
                      <span class="addcart-img"
                        ><img :src="`/assets/img/carticon.png`"/></span
                      >{{ isInCart }}
                    </p>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
        <template v-else>
          <div class="cart-sec w-100">
            <div class="out_stock">out of stock</div>
          </div>
        </template>
        <!--variation section start-->

        <!-- <div class="variation_product" v-if="isOpen">
          <p>select an option</p>
          <ul v-if="productVeriation">
            <template v-for="(variation,index) in productVeriation[0].AttrValues" :key="index">
                 <li>             
                    <input class="variation_input" name="variation_item" :value="variation" v-model="selected_variation" type="radio" @click="UpdateProductUrlKey"/><i>{{variation.AttrValuename}}</i>
                    <span>
                         <template v-if=" Number.isFinite(variation.prSpecialPrice) && variation.prSpecialPrice!=0 && variation.prPrice >variation.prSpecialPrice ">
                            <del> {{currency}} {{variation.prPrice}} </del> - {{currency}} {{variation.prSpecialPrice}}
                        </template>
                        <template v-else>
                            {{currency}} {{variation.prPrice}}
                        </template>
                      </span>
                </li>
            </template>
           
           
          </ul>

        </div> -->
        <!--variation section end-->
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import $ from 'jquery'
import moment from 'moment'
import ButtonLoader from '../components/ButtonLoader'
import Config from '@/config'

import helper from '@/helper/helper'

export default {
  name: 'ProductCard',
  components: {
    ButtonLoader
  },
  props: [
    'product',
    'webAdminUrl',
    'cartAjax',
    'cartProductUrlKey',
    'currency',
    'fevareRequired',
    'feverateStatus',
    'isBanner',
    'offerBadge',
    'newBadge'
  ],
  data() {
    return {
      web_admin_url: '',
      count: 1,
      loaderColor: '#fff',
      loaderStyle: {
        width: '35px'
      },
      guest_id: '',
      cust_id: null,
      isOpen: false,
      productVeriation: JSON.parse(this.product.variationJson),
      productUrlKey: this.product.urlKey,
      productname: this.product.prName,
      productSpecialPrice: this.product.specialPrice,
      productPrice: this.product.unitPrice,
      productWishlistId: this.product.wishlistId,
      selected_variation: this.product.variationJson
        ? JSON.parse(this.product.variationJson)[0].AttrValues[0]
        : ''
    }
  },
  mounted() {
    this.admin_api_header = Config.ADMIN_API_HEADER
    this.guest_id = localStorage.getItem('guestId')
    this.cust_id = localStorage.getItem('custId')
    this.count = this.product.CartItemQty != 0 ? this.product.CartItemQty : 1
    this.web_admin_url = Config.WEB_ADMIN_URL
  },
  methods: {
    ...mapActions([
      'storeCustomerWishlist',
      'removeCustomerWishlist',
      'getCustomerWishlist'
    ]),

    UpdateProductUrlKey() {
      this.productUrlKey = this.selected_variation.prUrlkey
      this.productname = this.selected_variation.prName
      this.productSpecialPrice = this.selected_variation.prSpecialPrice
      this.productPrice = this.selected_variation.prPrice
    },
    // openClose() {

    //    let _this = this;
    //   //   const closeListerner = (e) => {
    //   //     if ( _this.catchOutsideClick(e, _this.$refs.menu ) )
    //   //       window.removeEventListener('click', closeListerner) , _this.isOpen = false

    //   //   }

    //   //  window.addEventListener('click', closeListerner)
    //   _this.isOpen = !_this.isOpen;

    // },
    // catchOutsideClick(event, dropdown)  {
    //   // When user clicks menu — do nothing
    //   if( dropdown == event.target )
    //     return false

    //   // When user clicks outside of the menu — close the menu
    //   if( this.isOpen && dropdown != event.target )
    //     return true

    // },
    goToDetailpage(urlkey) {
      this.$router.push({ path: `/product-detail/${urlkey}` })
    },
    refreshPageEvent(product_urlKey) {
      this.$emit('refreshSliderdata', product_urlKey)
    },
    discountPercentage(product) {
      if (product.unitPrice > product.specialPrice) {
        const difference = product.unitPrice - product.specialPrice

        const percentage = (difference * 100) / product.unitPrice

        return percentage.toFixed(2)
      } else {
        return 0
      }
    },
    addtocart(url_key, wishlistId = '') {
      // let productQty = this.$refs[url_key].value;
      const productQty = 1
      const productInfo = {
        url_key: url_key,
        product_qty: productQty
      }

      if (this.isInCart == 'Add') {
        if (this.feverate_status != true) {
          this.$emit('addToCart', productInfo)
        } else {
          const payload = {
            custId: localStorage.getItem('custId'),
            guestId: null,
            WishlistId: wishlistId,
            productQty: productQty,
            vendorUrlkey: Config.VENDOR_URL_KEY,
            url_key: url_key
          }
          this.$emit('moveToCart', payload)
        }
      } else {
        $('#cart-mobile').css({ left: 'unset', right: '0' })
        $('.ps-panel--sidebar').removeClass('active')
        $('#cart-mobile').addClass('active')
        $('.ps-site-overlay').addClass('active')
      }

      if (this.count == 0) {
        this.count = 1
      }
    },
    add(isInCart) {
      if (this.count < this.product.qoh) {
        this.count++
      }

      if (isInCart == 'View in cart') {
        this.updateCartQuntity('add')
      }
    },
    sub(isInCart) {
      if (this.count > 1) {
        this.count--
      } else {
        this.count = 0
      }

      if (isInCart == 'View in cart') {
        this.updateCartQuntity('sub')
      }
    },
    updateCartQuntity(type) {
      const cartItemInfo = {
        product_qty: this.count,
        url_key: this.productUrlKey,
        type: type,
        cart_item_id: 0
      }
      if (this.count > -1) {
        this.$emit('updateCartQty', cartItemInfo)
      }
    },

    addToWishList(productInfo) {
      const isLoggedIn = helper.isLoginedUser()
      const $this = this
      if (isLoggedIn == true) {
        if (
          $(`#wishlist_item_${productInfo.productId}`).hasClass('is-active')
        ) {
          const payload = {
            custId: localStorage.getItem('custId'),
            guestId: '',
            urlKey: productInfo.urlKey
          }
          $(`#wishlist_item_${productInfo.productId}`).removeClass('is-active')
          $this.removeCustomerWishlist(payload).then(function(response) {
            $this.$toast.success(`${response.data.Message}`)
          })
        } else {
          $(`#wishlist_item_${productInfo.productId}`).addClass('is-active')

          const payload = {
            custId: $this.cust_id != null ? $this.cust_id : '',
            guestId: $this.cust_id == null ? $this.guest_id : '',
            urlKey: productInfo.urlKey
          }

          $this.storeCustomerWishlist(payload).then(function(response) {
            $this.$toast.success(`${response.data.Message}`)
          })
        }
      } else {
        document.getElementById('login_popup_link').click()
        // this.$router.push({'path':'/',query:{'login':'failed'}});
      }
    },
    isNewProduct(proDate) {
      let diff = 0
      if (this.product.prDate != '') {
        diff = moment().diff(proDate, 'Days')
      }

      return diff
    },
    productReviewCnt(value) {
      return Math.ceil(value)
    }
  },
  computed: {
    ...mapGetters(['getcartList']),
    isInCart() {
      const $this = this
      let addcartBtnText = 'Add'
      this.getcartList.forEach(function(cart) {
        if (cart.urlKey == $this.productUrlKey) {
          addcartBtnText = 'View in cart'
          $this.count = cart.qty
        }
      })
      return addcartBtnText
    }
  }
}
</script>
<style scoped>
.variation_box {
  width: 100%;
}
.variation_select_area {
  float: left;
  width: 60%;
  padding-right: 2px;
}
.variation_btn_area {
  float: left;
  width: 40%;
  padding-left: 1px;
}
.variation_select_area select {
  height: 30px;
}

.variation_product i {
  font-style: normal;
  padding-left: 20px;
}
.variation_product {
  position: absolute;
  background: #fff;
  width: 100%;
  text-align: left !important;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  z-index: 999;
}
.variation_product p {
  font-size: 1.6rem;
  color: #023f88;
}
.variation_product li {
  position: relative;
  margin-bottom: 5px;
}
.variation_product span {
  position: absolute;
  right: 0px;
}
.variation_input {
  left: 0px !important;
}

.cat-btn-text {
  position: relative;
}
.variation_oprions {
  position: absolute;
  right: -30px;
  top: -8px;
  font-size: 34px;
  color: #023f88;
}
.ps-product__content {
  min-height: 115px;
}
.maxwidthproductmain .ps-product__title {
  height: 40px;
}
.v-incart {
  width: 80px;
}

.cartSecBlock {
  width: 50%;
  float: left;
  padding: 0px 3px;
  position: relative;
}
.addcart-img {
  display: inline-block;
  margin-right: 7px;
}
.addcart-img img {
  width: 18px;
}
.fevarate {
  position: absolute;
  top: 0;
  left: 0;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  line-height: 20px;
  border-radius: 4px;
  color: red;
  font-size: 24px;
}
.percentageDivGreeen {
  z-index: 1;
}
.whilistIconwrapper {
  z-index: 99;
}
.whilistIconwrapper:hover {
  z-index: 99;
}
.is-active {
  background: #d81c24;
}
.whilistIconwrapper i {
  color: #fff;
}
.maxwidthproductmain .img_box {
  width: 120px !important;
  min-height: 120px;
}
.maxwidthproductmain .img_box img {
  margin: 0 auto !important;
  width: 100% !important;
}
.cart-sec {
  min-width: 100px;
}
.hide_el {
  display: none;
}
.maxwidthproductmain .ps-product__title {
  font-size: 15px;
  font-weight: bold;
  color: #000;
  line-height: 21px;
  display: block;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  max-width: 217px;
  margin: 7px auto 10px;
  height: 42px !important;
}
.new_arrival_badge {
  background: #77bd1d !important;
  position: absolute;
  width: 55px;
  text-align: center;
  right: 8px;
  z-index: 100;
  color: #fff;
  border-radius: 4px;
  padding: 1px;
  display: block;
  top: 7px;
}
.product_discount_badge {
  z-index: 99;
  top: 5px;
  position: absolute;
  font-size: 9px;
  font-weight: 600;
  padding: 13px;
  border-radius: 4px;
  background: url(/assets/img/offer_bg.jpg) center no-repeat;
  color: #fff;
  left: 2px;
  width: 50px;
  height: 50px;
  display: flex;
  -webkit-diplay: flex;
  -moz-diplay: flex;
  justify-content: center;
  -webkit-content: center;
  -moz-content: center;
  align-items: center;
  -webkit-align-items: center;
  -moz-align-items: center;
}
.out_stock {
  text-align: center;
  color: #e81111;
  font-size: 16px;
  font-weight: bold;
  padding: 6px;
}

@media screen and (max-width: 567px) {
  .forDesk {
    display: none;
  }
  .variation_btn_area .mob_cart {
    width: 100%;
  }

  .variation_btn_area .cat-btn-text {
    width: 100%;
    margin-top: 0px !important;
  }
  .maxwidthproductmain .img_box {
    width: 87px !important;
    min-height: 119px;
  }

  .mob_cart .btn {
    padding: 0.375rem 4px;
  }

  .addcart-btn {
    padding: 0px 8px;
  }
  .maxwidthproductmain {
    padding: 37px 8px 15px;
  }
  .addcart-img img {
    width: 14px;
  }

  .cartSecBlock {
    width: 100%;
  }
  .mob_cart {
    width: 60px;
    margin: 0 auto;
  }
  .cat-btn-text {
    width: 107px;
    margin: 0 auto;
    margin-top: 5px;
  }
}
.ps-product__container {
  position: relative;
  margin-top: 25px;
}
.product_review_box {
  width: 70px;
  display: inline-block;
  margin-bottom: 5px;
}
.product_review_sec {
  width: 70px;
  display: inline-block;
  left: 5px;
  position: absolute;
  top: -22px;
}

.product_review_sec .rating_box {
  background: #71ce63;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  margin-right: 5px;
}
</style>
