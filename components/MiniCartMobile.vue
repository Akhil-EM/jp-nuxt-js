<template>
  <div class="ps-cart--mobile">
    <div class="ps-cart__content">
      <div v-for="(cartItem, index) in cartItems" :key="index">
        <div class="cartFloatMainall">
          <div class="cartFloat1">
            <div class="ps-product--cart-mobile">
              <div class="ps-product__thumbnail">
                <a
                  href="javascript:void(0)"
                  @click="goToDetailpage(cartItem.urlKey)"
                >
                  <div class="cat_img_box">
                    <img
                      :src="`${web_admin_url}${cartItem.imageUrl}`"
                      :alt="cartItem.alt ? cartItem.alt : cartItem.prName"
                    />
                  </div>
                </a>
              </div>

              <a
                href="javascript:void(0)"
                @click="goToDetailpage(cartItem.urlKey)"
              >
                <b>{{ cartItem.prName }}</b></a
              >
              <p v-if="cartItem.IsAvailPincode == false" class="text-danger">
                Item not deliverable
              </p>

              <p v-if="cartItem.IsAvailPincode">
                <b
                  >{{ cartItem.qty }} x {{ currency }}
                  {{ cartItem.unitPrice.toFixed(2) }}</b
                >
              </p>
            </div>
          </div>
          <div class="cartFloat3">
            <CartQtyCounter
              v-if="cartItem.IsAvailPincode"
              :product_url_key="cartItem.urlKey"
              :cart-item-id="cartItem.cartItemsId"
              :qty-cont="cartItem.qty"
              :qty-reset="qtyReset"
              @updateCartQty="updateCart($event)"
              @carQtyReset="cartQtyReset"
            ></CartQtyCounter>
          </div>
          <div class="cartFloat4">
            <div class="product_price">
              <div v-if="cartItem.IsAvailPincode">
                <template
                  v-if="
                    Number.isFinite(cartItem.specialPrice) &&
                      cartItem.specialPrice != 0 &&
                      cartItem.unitPrice > cartItem.specialPrice
                  "
                >
                  <small
                    ><b
                      ><span class="item_disc_strike"
                        >{{ currency }}
                        {{ cartItem.unitPrice.toFixed(2) * cartItem.qty }}
                      </span>
                      <span class="item_special_price"
                        >{{ currency
                        }}{{ cartItem.specialPrice.toFixed(2) }}</span
                      >
                      <template v-if="getSavingsText(index) != ''">
                        <span> {{ getSavingsText(index) }}</span>
                      </template>
                    </b></small
                  >
                </template>
                <template v-else>
                  <small
                    ><b
                      >{{ currency }}
                      {{ (cartItem.unitPrice * cartItem.qty).toFixed(2) }}
                      <template v-if="getSavingsText(index) != ''">
                        <span> {{ getSavingsText(index) }}</span>
                      </template>
                    </b></small
                  >
                </template>
              </div>
            </div>
          </div>
          <div class="cartFloat2">
            <div class="product_action">
              <a
                :class="{
                  'ps-product__remove': true,
                  rm_pro_items: cartItem.IsAvailPincode == false ? true : false
                }"
                href="javascript:void(0)"
                @click="removeCartItem(cartItem.cartItemsId)"
              >
                <i v-if="cart_ajax == 'closed'" class="icon-cross"></i>
                <template
                  v-if="
                    rmv_cartItemId == cartItem.cartItemsId &&
                      cart_ajax == 'open'
                  "
                >
                  <ButtonLoader
                    :loader-color="loaderColor"
                    :loader-style="loaderStyle"
                    :cart_ajax="cart_ajax"
                  >
                  </ButtonLoader>
                </template>

                <template
                  v-if="
                    cart_ajax == 'open' &&
                      rmv_cartItemId != cartItem.cartItemsId
                  "
                >
                  <i class="icon-cross"></i>
                </template>
              </a>
            </div>
          </div>
        </div>
      </div>
      <EmptyItem v-if="cartItems.length < 1"></EmptyItem>
    </div>
    <div v-if="cartItems.length > 0" class="ps-cart__footer">
      <div class="subTotalDiv">
        <ul class="tatal_section">
          <!-- <li v-if="getCartSummaryList.discountAmount"> Discount<span>{{currency}} {{getCartSummaryList.discountAmount.toFixed(2)}}</span></li>     -->

          <li v-if="getCartSummaryList != ''">
            Sub Total<span
              >{{ currency }}
              {{
                (
                  getCartSummaryList.subTotal -
                  getCartSummaryList.discountAmount
                ).toFixed(2)
              }}</span
            >
          </li>
        </ul>
      </div>
      <div class="footer_links">
        <ul>
          <li>
            <a
              href="javascript:void()"
              class=" color_blue"
              @click="goToCartFullPage"
              >View Cart</a
            >
          </li>
          <li>
            <a
              href="javascript:void()"
              class=" color_red"
              @click="goToCheckOutpage"
              >Checkout</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'
import Config from '../config'
import ButtonLoader from '../components/ButtonLoader'
import CartQtyCounter from '@/components/cart/CartQtyCounter'
import EmptyItem from '@/components/EmptyItem'
import helper from '@/helper/helper'
export default {
  name: 'MiniCartMobile',
  components: {
    ButtonLoader,
    CartQtyCounter,
    EmptyItem
  },
  props: ['cartItems', 'cartAjax', 'qtyReset'],
  data() {
    return {
      web_admin_url: '',
      currency: '',
      loaderColor: 'red',
      rmv_cartItemId: '',
      loaderStyle: {
        width: '35px'
      }
    }
  },
  mounted() {
    this.web_admin_url = Config.WEB_ADMIN_URL
    this.currency = Config.CURRECNCY
  },
  methods: {
    goToDetailpage(urlkey) {
      this.$router.push({ path: `/product-detail/${urlkey}` })
    },
    removeCartItem(cartItemId) {
      this.rmv_cartItemId = cartItemId
      this.$emit('deleteCartItem', cartItemId)
    },
    updateCart(cartItemInfo) {
      this.$emit('updateCartQantity', cartItemInfo)
    },
    goToCheckOutpage() {
      this.close_minicart()
      const isLoggedIn = helper.isLoginedUser()
      if (isLoggedIn == true) {
        let isFoundNotDeliverableProduct = false
        // let $this =this;
        this.cartItems.forEach(function(item) {
          if (item.IsAvailPincode != true) {
            isFoundNotDeliverableProduct = true
          }
        })

        if (isFoundNotDeliverableProduct != true) {
          this.$router.push({ path: `/checkout` })
        } else {
          this.$toast.error(
            'Some of the items in cart are not deliverable. Please remove not deliverable item from cart.'
          )
        }
      } else {
        document.getElementById('login_popup_link').click()
      }
    },
    goToCartFullPage() {
      this.close_minicart()
      this.$router.push({ path: `/cart` })
    },
    close_minicart() {
      $('#cart-mobile').removeClass('active')
      $('.ps-site-overlay').removeClass('active')
      $('#cart-mobile').removeAttr('style')
    },
    getSavings(index) {
      let discount = 0
      if (this.cartData != '') {
        let specialPrice = 0
        let unitPrice = 0
        let cartQty = ''
        if (typeof this.cartItems[index] == 'undefined') {
          specialPrice = 0
          unitPrice = 0
        } else {
          specialPrice = this.cartItems[index].specialPrice
          unitPrice = this.cartItems[index].unitPrice
          cartQty = this.cartItems[index].qty
        }

        if (
          Number.isFinite(specialPrice) &&
          Number.isFinite(unitPrice) &&
          unitPrice > specialPrice &&
          specialPrice != 0
        ) {
          discount = unitPrice - specialPrice
          discount = discount * cartQty
        }
      }

      return discount.toFixed(2)
    },
    getdiscountPercentage(index) {
      const savingsAmount = this.getSavings(index)

      let discountPercentageAmt = 0
      if (savingsAmount != 0) {
        const unitPrice = this.cartItems[index].unitPrice
        console.log(savingsAmount)
        discountPercentageAmt = helper.calculatePercentage(
          unitPrice,
          savingsAmount
        )
      }

      return discountPercentageAmt
    },

    getSavingsText(index) {
      let savingsText = ''
      const savingsAmount = this.getSavings(index)
      // let savingsPercentage =this.getdiscountPercentage(index);

      if (savingsAmount != 0) {
        savingsText = `Saved ${this.currency} ${savingsAmount}`
      } else {
        savingsText = ``
      }

      return savingsText
    },
    cartQtyReset() {
      this.$emit('cartQtyCntReset')
    }
  },
  computed: {
    ...mapGetters(['getCartSummaryList']),
    getSubTotal() {
      let subTotal = 0
      this.cartItems.forEach(function(item) {
        subTotal += item.itemTotal
      })

      return subTotal.toFixed(2)
    }
  }
}
</script>
<style scoped>
.ps-cart__content {
  height: 400px;
  overflow-y: scroll;
}
.subTotalDiv {
  padding-right: 20px;
  padding-bottom: 20px;
}
.tatal_section {
}

.footer_links {
  clear: both;
}
.ps-cart__footer {
  position: absolute;
  bottom: calc(100vh - calc(100vh + -20px));
  left: 0px;
}
.footer_links ul li {
  display: inline-block;
  width: 50%;
  padding: 0 6px;
}
.item_disc_strike {
  text-decoration: line-through;
  display: inline-block;
  width: auto !important;
  color: #686868 !important;
}
.item_special_price {
  width: auto !important;
  color: #686868 !important;
  display: inline-block;
}
.rm_pro_items {
  position: absolute;
  right: -86px;
}

.footer_links ul li a {
  font-size: 16px;
  border: none;
  font-weight: 600;
  display: block;
  border-radius: 4px;
  width: 100%;
  padding: 13px;
  color: #fff;
  text-align: center;
}
@media only screen and (max-width: 600px) {
  .ps-cart--mobile .ps-cart__footer {
    padding-top: 0px;
    padding-bottom: 60px;
    background: #fff;
    z-index: 10001;
  }

  .rm_pro_items {
    position: absolute;
    right: -263px;
  }

  .ps-cart__footer {
    position: absolute;
    bottom: calc(100vh - calc(100vh + -64px));
    left: 0px;
  }
}
</style>
