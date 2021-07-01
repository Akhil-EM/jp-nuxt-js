<template>
  <div>
    <header id="myHeader" class="header-main">
      <div class="container maxContainermain">
        <div class="floatLeftHederAll">
          <div class="floatLeftHeder">
            <router-link class="ps-logo" :to="`/`">
              <img src="/assets/img/Centreal_Bazaar.png" alt="" />
            </router-link>
          </div>
          <div class="floatLeftHeder">
            <form autocomplete="off">
              <div class="searchWrappermain">
                <template v-if="search_string != '' && search_string != null">
                  <span class="search_clear" @click="clearSearchString">X</span>
                </template>

                <input
                  v-model="search_string"
                  class="searchWrappermainInputFiled"
                  autocomplete="off"
                  type="text"
                  placeholder="Search inside 15,000 products"
                  @input="onLeave"
                />
                <div class="searchWrappermainWrapperDiv">
                  <button class="searchBtnMain" @click="searchProduct">
                    Search
                  </button>
                </div>
                <div id="search_suggetions" class="search_suggetions">
                  <ul>
                    <li v-if="cart_ajax == 'open'" class="loading">
                      Loading results...
                    </li>
                    <div
                      v-for="(segection, index) in searchSugetions"
                      :key="index"
                    >
                      <li>
                        <div>
                          <div style="width:10%;display:inline-block">
                            <img
                              class="seg_img"
                              :src="`${web_admin_url}${segection.imageUrl}`"
                            />
                          </div>
                          <div style="width:90%;display:inline-block">
                            <a
                              href="javascript:void(0)"
                              @click="updateSearchString(segection.ProductName)"
                            >
                              {{ segection.ProductName }}
                            </a>
                          </div>
                        </div>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="floatRightHedaer">
          <div class="headerFloatLeft1">
            <router-link class="heartWrapper" :to="`/my-wishlist`">
              <i class="icon-heart"
                ><span class="wishCnt">{{
                  fetctCustomerWishlist.length
                }}</span></i
              >
            </router-link>
          </div>
          <div class="headerFloatLeft1">
            <a
              href="#"
              class="heartWrapper heartWrapperBag"
              @click="openMiniCart()"
            >
              <i class="icon-bag2">
                <span>{{ getCartItemCnt }}</span>
              </i>
            </a>
          </div>
          <div class="headerFloatLeft1">
            <div class="loginWrapperIcons">
              <div class="loginWrapperDivIcon">
                <template v-if="isCustomerLoggined == true">
                  <router-link :to="`/my-profile`">
                    <i class="icon-user"></i
                  ></router-link>
                </template>
                <template v-else>
                  <i
                    class="icon-user"
                    data-toggle="modal"
                    data-target="#sign-in"
                  ></i>
                </template>
              </div>
              <template v-if="isCustomerLoggined == true">
                <router-link :to="`/my-profile`" class="text-white username">{{
                  truncateString(getCustomerInfo.custName, 12)
                }}</router-link>
              </template>
              <template v-else>
                <ul>
                  <li>
                    <a
                      id="login_popup_link"
                      href="javascript:void(0)"
                      @click="openLoginPopup"
                      >Login</a
                    >
                  </li>
                  <!-- <li><a href="" data-toggle="modal" id="register_popup_link" data-target="#sign-up">Register</a></li> -->
                </ul>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="product_search_wrapper">
        <div class="container maxContainermain pt-0">
          <div class="product_search">
            <div class="search_box">
              <div class="search_group">
                <a href="javascript:void(0)" @click="searchProduct">
                  <i class="fa fa-search"></i>
                </a>
                <form autocomplete="off" @Submit.prevent="searchProduct">
                  <input
                    id="product_search_field"
                    v-model="search_string"
                    :type="inputType"
                    name="product_search_field"
                    autocomplete="off"
                    placeholder="Search product"
                    @input="onLeave"
                  />
                </form>
              </div>

              <div class="cat_btn_box">
                <button
                  class="cat_btn ps-toggle--sidebar"
                  href="#navigation-mobile"
                >
                  Category
                </button>
              </div>
            </div>
            <!--search sugetion start-->
            <div id="search_suggetions" class="search_suggetions">
              <ul>
                <li v-if="cart_ajax == 'open'" class="loading">
                  Loading results...
                </li>
                <div v-for="(segection, index) in searchSugetions" :key="index">
                  <li>
                    <div>
                      <div style="width:10%;display:inline-block">
                        <img
                          class="seg_img"
                          :src="`${web_admin_url}${segection.imageUrl}`"
                        />
                      </div>
                      <div style="width:90%;display:inline-block">
                        <a
                          href="javascript:void(0)"
                          @click="updateSearchString(segection.ProductName)"
                          >{{ segection.ProductName }}</a
                        >
                      </div>
                    </div>
                  </li>
                </div>
              </ul>
            </div>
            <!--search sugetion end-->
          </div>
        </div>
      </div>

      <nav class="navigation navigationMain">
        <div class="container maxContainermain p-0">
          <div class="menuFloatDiv1">
            <div class="navigation__right ">
              <div class="menu--product-categories">
                <div class="menu__toggle menuOpen">
                  <a
                    class="navigation__item ps-toggle--sidebar"
                    href="#menu-mobile"
                  >
                    <i class="icon-menu"></i>
                  </a>
                </div>
              </div>
              <ul class="menu">
                <li
                  v-for="category in maincategory"
                  :key="category.catId"
                  :class="{ 'current-menu-item': true, 'has-mega-menu': true }"
                >
                  <router-link
                    :to="`/products/${category.catUrlKey}`"
                    class="nav-link"
                    ><span
                      class="third_cat"
                      @click="refreshPageEvent(category)"
                      >{{ category.catName }}</span
                    ></router-link
                  >
                  <span class="sub-toggle"></span>
                  <div
                    v-if="findDepthOfCatTree(category.catId) == 2"
                    :class="`mega-menu ${category.catUrlKey}_${category.catId}`"
                  >
                    <div class="mega-menu__column">
                      <div v-for="cat in categoryList" :key="cat.catId">
                        <div
                          style="float:left; width:20%"
                          :class="`${cat.catUrlKey}`"
                        >
                          <div style="float:left; width:100%">
                            <ul v-if="category.catId == cat.parentId">
                              <h4>
                                <router-link
                                  :to="`/products/${cat.catUrlKey}`"
                                  class="nav-link"
                                >
                                  <span
                                    class="third_cat"
                                    @click="refreshPageEvent(cat)"
                                    >{{ cat.catName }}</span
                                  >
                                </router-link>
                              </h4>

                              <!-- <ul class="mega-menu__list"  v-if="check3levelCat(cat.catId)"> -->
                              <template v-if="check3levelCat(cat.catId)">
                                <div
                                  v-for="cat1 in categoryList"
                                  :key="cat1.catId"
                                >
                                  <li v-if="cat.catId == cat1.parentId">
                                    <router-link
                                      :to="`/products/${cat1.catUrlKey}`"
                                      class="nav-link"
                                    >
                                      <span
                                        class="third_cat"
                                        @click="refreshPageEvent(cat)"
                                        >{{ cat1.catName }}</span
                                      >
                                    </router-link>
                                  </li>
                                </div>
                              </template>
                              <!-- </ul> -->
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li v-if="categoryList != ''">
                  <router-link :to="`/all-category`" class="nav-link more-link">
                    <span>More</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <div
            id="location_popup"
            class="menuFloatDiv2"
            data-toggle="modal"
            data-target="#product-quickview"
          >
            <p>
              <span><img src="/assets/img/locate-icon.png" alt=""/></span>
              <template v-if="location_text">
                Deliver to: {{ deliveryLocation() }}
              </template>
            </p>
          </div>
        </div>
      </nav>
    </header>
    <Login @open_register_popup="openRegisterPopup"></Login>
    <Register :open_register="openRegister"></Register>
    <Location @location_updated="locationUpdated"></Location>
    <PasswordReset></PasswordReset>

    <MobileCatnav
      :maincategory="maincategoryMob"
      :category-list="categoryList"
      @refreshPageEvent="refreshPageEvent"
    ></MobileCatnav>
    <div id="search-sidebar" class="ps-panel--sidebar">
      <div class="ps-panel__header">
        <form class="ps-form--search-mobile" action="" method="get">
          <span class="cat_close">X</span>
          <div class="form-group--nest">
            <template v-if="search_string != ''">
              <span class="search_clear_mob" @click="clearSearchString">X</span>
            </template>
            <input
              v-model="search_string"
              class="form-control"
              type="text"
              autocomplete="off"
              placeholder="Search something..."
              @input="onLeave"
            />
            <button @click="searchProduct">
              <i class="icon-magnifier"></i>
            </button>
            <div id="search_suggetions" class="search_suggetions">
              <ul>
                <li v-if="cart_ajax == 'open'" class="loading">
                  Loading results...
                </li>
                <div
                  v-for="(segection, index) in searchSugetions"
                  :key="index"
                  class="d-flex"
                >
                  <li>
                    <div>
                      <div
                        style="width:10%;display:inline-block"
                        class="imgBox"
                      >
                        <img
                          class="seg_img"
                          :src="`${web_admin_url}${segection.imageUrl}`"
                        />
                      </div>
                      <div style="width:90%;display:inline-block">
                        <a
                          href="javascript:void(0)"
                          @click="updateSearchString(segection.ProductName)"
                          >{{ segection.ProductName }}</a
                        >
                      </div>
                    </div>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </form>
      </div>
      <div class="navigation__content"></div>
    </div>
    <div id="cart-mobile" class="ps-panel--sidebar sidePannelMenu">
      <div class="ps-panel__header cart_head_box">
        <h3 class="cart_head">
          <span>My Cart </span
          ><span class="cart_cnt"
            ><b>{{ getcartList.length }}</b></span
          >
        </h3>
        <a class="minicart_close_btn" @click="close_minicart">
          <i class="icon-cross"></i
        ></a>
      </div>
      <div class="navigation__content">
        <MiniCartMobile
          :cart-items="getcartList"
          :cart_ajax="cart_ajax"
          :qty-reset="qtyReset"
          @deleteCartItem="rmvCartItem($event)"
          @updateCartQantity="updateCart"
          @cartQtyCntReset="qtyCntReset"
        ></MiniCartMobile>
      </div>
    </div>
    <div class="menu__content">
      <span class="close-btn">X</span>
      <div class="menuhdr">
        <template v-if="isCustomerLoggined == true">
          <div class="menu-user-name">
            Hello, {{ truncateString(getCustomerInfo.custName, 12) }}
          </div>
        </template>
        <div class="account-info">
          <ul>
            <li class="menu_link">
              <router-link :to="`/my-profile`">Account</router-link>
            </li>

            <li class="menu_link">
              <router-link :to="`/my-order`"> My Orders</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="menu-list">
        <ul class="brdr-line">
          <li class="menu_link">
            <router-link :to="`/`"> Home</router-link>
          </li>
          <li class="menu_link">
            <router-link :to="`/my-wishlist`">My Wishlist</router-link>
          </li>
          <li class="menu_link">
            <router-link :to="`/my-coupons`"> All Offers</router-link>
          </li>
        </ul>

        <ul>
          <li class="menu_link">
            <router-link :to="`/my-profile`">Account</router-link>
          </li>
          <li class="menu_link">
            <router-link :to="`/contact-form`"> Help</router-link>
          </li>
          <li class="menu_link">
            <router-link :to="`/about`"> About Us</router-link>
          </li>
          <li>
            <a href="javascript:void(0)" @click="openChangeLocationPopup"
              >Change location ( {{ deliveryLocation() }})</a
            >
          </li>

          <template v-if="isCustomerLoggined == true">
            <li class="menu_link" @click="logout">
              <a href="javascript:void(0)">Sign Out</a>
            </li>
          </template>
          <template v-else>
            <li class="menu_link">
              <a
                id="login_popup_link"
                href="javascript:void(0)"
                @click="openLoginPopup"
                >Login</a
              >
            </li>
            <li class="menu_link">
              <a
                id="register_popup_link"
                href=""
                data-toggle="modal"
                data-target="#sign-up"
                >Register</a
              >
            </li>
          </template>
        </ul>

        <div class="menu-contact">
          <h5>CONTACT US</h5>
          <a target="_blank" href="https://wa.me/917594999934/?text="
            ><span>WhatsApp Us +91 7594999934</span></a
          >
          <span>Call Us +91 7594999934</span>
        </div>
      </div>
    </div>

    <div class="navigation--list">
      <div class="navigation__content">
        <a class="navigation__item ps-toggle--sidebar" href="#menu-mobile"
          ><i class="icon-menu"></i><span> Menu</span></a
        >
        <a class="navigation__item ps-toggle--sidebar" href="#navigation-mobile"
          ><i class="icon-list4"></i><span> Categories</span></a
        >
        <a class="navigation__item ps-toggle--sidebar" href="#search-sidebar"
          ><i class="icon-magnifier"></i><span> Search</span></a
        >
        <a class="navigation__item ps-toggle--sidebar" href="#cart-mobile"
          ><i class="icon-bag2"></i
          ><span>
            <span class="mob_cart_cnt">{{ getCartItemCnt }}</span
            >Cart</span
          ></a
        >
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import helper from '@/helper/helper'
import { mapGetters, mapActions } from 'vuex'
import $ from 'jquery'
import Config from '../config'

import Login from '@/components/Login'
import Register from '@/components/Register'
import PasswordReset from '@/components/PasswordReset'
import Location from '@/components/Location'
import MiniCartMobile from '@/components/MiniCartMobile'
import MobileCatnav from '@/components/MobileCatnav'
export default {
  name: 'Header',
  components: {
    Login,
    Register,
    Location,
    PasswordReset,
    MiniCartMobile,
    MobileCatnav
  },
  data() {
    return {
      categoryList: this.$store.state.category_list,
      maincategory: [],
      maincategoryMob: [],
      url_key: '',
      customer_cart_data: this.cartData,
      cart_ajax: 'closed',
      cartSummary: [],
      search_string:
        this.$route.query.search != '' ? this.$route.query.search : '',
      cartData: [],
      searchSugetions: [],
      openRegister: '',
      location_text: true,
      isLoggedIn: '',
      qtyReset: 0,
      catRoupCnt: 0,
      web_admin_url: '',
      inputType: 'text'
    }
  },
  computed: {
    ...mapGetters([
      'getCustomerInfo',
      'isCustomerLoggined',
      'fetctCustomerWishlist',
      'getcartList'
    ]),
    getCartItemCnt() {
      let cartItemCnt = 0
      if (this.getcartList != '') {
        cartItemCnt = this.getcartList.length
      }

      return cartItemCnt
    }
  },

  mounted() {
    const $this = this
    let guestId = null
    let custId = null
    this.web_admin_url = Config.WEB_ADMIN_URL
    this.getCompanyPolicy()

    custId = localStorage.getItem('custId')
    if (custId == null) {
      guestId = localStorage.getItem('guestId')
    }

    if (custId != '') {
      $this.reloadCustomerInfo()
    }

    const uri = window.location.search.substring(1)
    const params = new URLSearchParams(uri)
    this.search_string = params.get('search')

    this.isLoggedIn = helper.isLoginedUser()
    axios
      .get(
        `${
          Config.BASE_URL
        }Order/CartSummary?cusId=${custId}&guestId=${guestId}&vendorUrlKey=${
          Config.VENDOR_URL_KEY
        }`,
        Config.ADMIN_API_HEADER
      )
      .then(function(response) {
        if (response.status == '200') {
          $this.$emit('cartSummaryUpdated', response.data.Data)
          $this.cartSummary = response.data.Data
        }
      })
  },
  created() {
    const $this = this
    if (this.categoryList.length < 1) {
      $this.$store.dispatch('storeCategoryList').then(function() {
        $this.categoryList = $this.$store.state.category_list
        $this.maincategory = $this.filterMainCategory()
      })
    }
  },
  methods: {
    ...mapActions([
      'reloadCustomerInfo',
      'storeSearchString',
      'storeCartSummary',
      'getCompanyPolicy'
    ]),
    filterMainCategory() {
      const mainCatArr = []
      const mainCatArrMob = []
      let mainCatCnt = 0
      this.categoryList.forEach(function(item) {
        if (item.parentId == 1 && mainCatCnt < 5) {
          mainCatArr.push(item)
          mainCatCnt++
        }
        if (item.parentId == 1) {
          mainCatArrMob.push(item)
        }
      })
      this.maincategoryMob = mainCatArrMob

      return mainCatArr
    },
    refreshPageEvent(cat) {
      this.clearSearchString()
      this.url_key = cat.catUrlKey
      this.updateMetaDetails(cat)
      this.$emit('refreshpage', this.url_key)
    },
    updateMetaDetails(item) {
      document.title =
        item.metaTitle != '' ? item.metaTitle : 'Centreal Supermarket'
      $('meta[name=description]').attr('content', item.shortDescription)
      $('meta[name=keywords]').attr('content', item.metaKeywords)
    },
    findDepthOfCatTree(catId) {
      let treelength = 0

      this.categoryList.forEach(function(item) {
        if (item.catId == catId) {
          const code = item.code
          const parts = code.split('#')
          treelength = parts.length
        }
      })

      return treelength
    },
    check3levelCat(parantCat) {
      let isThirdLevel = false
      this.categoryList.forEach(function(item) {
        if (item.parentId == parantCat) {
          isThirdLevel = true
        }
      })
      return isThirdLevel
    },
    rmvCartItem(cartItemId) {
      const $this = this
      $this.cart_ajax = 'open'
      $this.$store.dispatch('removeCartItem', cartItemId).then(function() {
        const customerCart = $this.$store.state.customer_cart
        $this.customer_cart_data = customerCart
        $this.$emit('cartUpdated', customerCart)
        $this.cart_ajax = 'closed'
      })
    },
    updateCart(cartItemInfo) {
      if (cartItemInfo.product_qty == 0) {
        this.rmvCartItem(cartItemInfo.cart_item_id)
      } else {
        const $this = this
        let cartUpdateUrl = ''
        if (cartItemInfo.type == 'add') {
          cartUpdateUrl = `${Config.BASE_URL}Order/CartItemAddQty?cartItemId=${
            cartItemInfo.cart_item_id
          }`
        } else if (cartItemInfo.type == 'sub') {
          cartUpdateUrl = `${Config.BASE_URL}Order/CartItemSubQty?cartItemId=${
            cartItemInfo.cart_item_id
          }`
        }
        if (cartUpdateUrl != '') {
          axios
            .get(`${cartUpdateUrl}`, Config.ADMIN_API_HEADER)
            .then(function(response) {
              if (response.status == 200) {
                let guestId = null
                let custId = null
                custId = localStorage.getItem('custId')
                if (custId == null) {
                  guestId = localStorage.getItem('guestId')
                }

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
    qtyCntReset() {
      this.qtyReset = 0
    },
    openRegisterPopup() {
      this.openRegister = false
    },
    searchProduct() {
      event.preventDefault()
      $('.ps-panel--sidebar').removeClass('active')
      $('.ps-site-overlay').removeClass('active')
      this.storeSearchString(this.search_string)
      this.$emit('search_trigger', this.search_string)
      this.$router.push({
        path: `/products`,
        query: { search: this.search_string }
      })
      const uri = window.location.toString()
      let clean_uri = ''
      let newUrl = ''
      if (uri.indexOf('?') > 0) {
        clean_uri = uri.substring(0, uri.indexOf('?'))
      }
      if (clean_uri != '') {
        // alert(clean_uri);
        newUrl = clean_uri = '?search=' + this.search_string
        window.history.replaceState({}, document.title, newUrl)
      }
    },
    truncateString(string, number) {
      return helper.truncateString(string, number)
    },
    close_minicart() {
      $('#cart-mobile').removeClass('active')
      $('.ps-site-overlay').removeClass('active')
      $('#cart-mobile').removeAttr('style')
    },
    openMiniCart() {
      // $("#cart-mobile").css({"left":"unset","right":"0"});
      $('.ps-panel--sidebar').removeClass('active')
      $('#cart-mobile').addClass('active')
      $('.ps-site-overlay').addClass('active')
    },
    onLeave() {
      this.cart_ajax = 'open'
      $('.search_suggetions').css({ display: 'block' })
      const $this = this
      axios
        .get(
          `${Config.BASE_URL}/Product/SearchAutoComplete?term=${
            this.search_string
          }`,
          Config.CUSTOMER_API_HEADER
        )
        .then(function(response) {
          $this.searchSugetions = response.data.Data
          $this.cart_ajax = 'closed'
        })
    },
    updateSearchString(search_value) {
      this.search_string = search_value
      $('.searchBtnMain').trigger('click')
      $('.search_suggetions').css({ display: 'none' })
    },
    logout() {
      localStorage.removeItem('custId')
      localStorage.removeItem('customer_token')
      location.reload()
    },
    clearSearchString() {
      const uri = window.location.toString()
      if (uri.indexOf('?') > 0) {
        const clean_uri = uri.substring(0, uri.indexOf('?'))
        window.history.replaceState({}, document.title, clean_uri)
      }
      this.search_string = ''
      this.storeSearchString(this.search_string)
      this.$emit('search_trigger', this.search_string)
    },
    openLoginPopup() {
      $('#sign-in').addClass('show')
      $('#sign-in').css({ display: 'block' })
      $('.ps-site-overlay').css({ visibility: 'visible', opacity: ' .8' })
    },
    deliveryLocation() {
      let locationHtml = ''
      const locationInfo = ''
      if (locationInfo != null) {
        locationHtml = ` ${locationInfo.area}`
      } else {
        locationHtml = 'Set delivery location'
      }

      return locationHtml
    },

    locationUpdated() {
      this.location_text = false
      const $this = this
      this.$nextTick(() => {
        $this.location_text = true
      })
      // this.deliveryLocation();
    },
    openChangeLocationPopup() {
      $('.menu__content').removeClass('active-menu')
      $('.menu-overlay').removeClass('active-overlay')

      $('.ps-panel--sidebar').removeClass('active')
      $('.ps-site-overlay').removeClass('active')

      $('#product-quickview').addClass('show')
      $('#product-quickview').css({ display: 'block' })
      $('.ps-site-overlay').css({ visibility: 'visible', opacity: ' .8' })
    },
    setCatGroupCnt(cat) {
      this.catRoupCnt++
      if (this.catRoupCnt % 2 == 0) {
        if (cat != '') {
          //  alert(cat);
          console.log(cat)
        }
      }
    }
  }
}
</script>
<style scoped>
.search_clear {
  right: 120px !important;
  font-size: 22px !important;
  top: 8px !important;
}
.icon-heart {
  position: relative;
}
.icon-bag2 {
  position: relative;
}
.product_search_wrapper {
  display: none;
}
.nav-link span {
  font-weight: 900;
}

.menuFloatDiv2 p {
  max-width: 218px !important;
}

.locMobIcon p {
  color: #fff !important;
}
.location_search_icon {
  display: none;
}
.menu--product-categories .menu__toggle i {
  color: #d71920;
}
@media only screen and (max-width: 1200px) {
  .menu--product-categories .menu__toggle i {
    display: none;
  }
  .location_search_icon {
    display: block;
  }
  .navigationMain {
    display: block;
    background: #ddd;
    height: 41px;
    margin-top: 44px;
  }
  .header-main {
    padding: 10px 0px 0px;
  }
  .menuFloatDiv2 {
    position: absolute;
    left: 20px;
    right: auto;
  }
}

@media only screen and (max-width: 767px) {
  .loginWrapperIcons i {
    font-size: 22px;
  }

  .floatLeftHederAll {
    float: left;
    padding-bottom: 7px;
  }
  .floatRightHedaer {
    padding-top: 5px;
  }
  .heartWrapper i {
    font-size: 22px;
  }

  .search_group {
    position: relative;
  }

  .product_search_wrapper .search_box {
    position: relative;
    padding-left: 134px;
    min-height: 39px;
  }
  .search_box a {
    color: #747474;
    position: absolute;
    left: 13px;
    top: 3px;
    font-size: 20px;
    z-index: 999;
  }
  .product_search_wrapper .cat_btn_box {
    position: absolute;
    left: 0;
    top: 0;
  }
  .product_search_wrapper .product_search {
    position: relative;
  }

  .product_search_wrapper {
    position: relative;
    display: block;
    background-color: #fff;
    float: left;
    width: 100%;
    height: 65px;
    padding: 14px 0px;
  }
  .cat_btn {
    text-align: center;
    border: 1px solid #ddd;
    border-color: #7c7c7c;
    width: 120px;
    font-size: 15px !important;
    padding: 7px;
    background: transparent;
  }
  #product_search_field {
    width: 100%;
    font-size: 15px !important;
    padding: 17px;
    display: block;
    background: transparent;
    text-align: right;
    height: 38px;
    border: 1px solid #ddd;
    border-color: #7c7c7c;
    position: relative;
    padding-left: 40px;
  }

  .ps-home-banner {
    padding-top: 17px !important;
  }

  .locMobIcon img {
    width: 25px;
  }

  .ps-logo img {
    width: 122px;
  }
}
.search_suggetions {
  display: none;
  position: absolute;
  z-index: 100;
  background: #f9f9f9;
  width: 100%;
  min-height: 50px;
  max-height: 400px;
  overflow-y: scroll;
  left: 0;
  top: 40px;
  text-align: left !important;
}
.search_suggetions ul {
  margin: 0;
  padding: 0px;
}
.search_suggetions li a {
  color: #333;
  padding: 10px 15px;
  font-size: 15px;
  font-weight: normal;
  display: block;
  text-transform: capitalize;
}

.search_suggetions li a:hover {
  background: #d71920;
  color: #fff !important;
}
.search_suggetions.show {
  display: block;
}
.cat_close {
  top: 8px;
  right: 16px;
  position: absolute;
  z-index: 999;
  color: #fff;
  margin-right: 11px;
  margin-top: 7px;
  font-size: 17px;
  cursor: pointer;
}
.form-group--nest {
  margin-top: 35px;
  position: relative;
}

.mob_cart_cnt {
  position: absolute;
  top: -4px;
  background: red;
  color: #fff !important;
  width: 16px;
  border-radius: 14px;
  right: -9px;
  width: 20px;
  height: 20px;
}
.c-toast-container {
  z-index: 10000000000 !important;
}
.v--default-css .c-toast {
  margin-bottom: 100px !important;
  margin-right: 15px !important;
}
.search_clear {
  cursor: pointer;
}
#location_popup {
  cursor: pointer;
}

.mega-menu__column .nav-link {
  padding: 0.5rem 0px !important;
}

.foodgrain-oil--masala_176 {
  overflow: auto;
  height: 400px;
}

.branded-foods--beaverages_172 {
  overflow: auto;
  height: 400px;
}
.ready-to-eat {
  position: absolute;
  top: 107px;
}

.soft-drinksjuices {
  position: absolute;
  top: 176px;
  left: 40%;
}
.tea-coffee {
  position: absolute;
  left: 20.3%;
  top: 84px;
}
.water {
  position: absolute;
  top: 296px;
  right: 268px;
}

.ready-to-cook {
  position: absolute;
  right: 0px;
}
.jamsaucemayonnaisespreads {
  position: absolute;
  right: 268px;
}
.spice-powderwhole-loose {
  position: absolute;
  top: 88px;
}

.more-link:before {
  display: none !important;
}
.seg_img {
  width: 45px;
  margin-left: 10px;
}

@media only screen and (max-width: 1250px) {
  .water {
    left: 677px !important;
  }
  .soft-drinksjuices {
    left: 480px !important;
  }
  .tea-coffee {
    left: 244px !important;
  }
}
@media only screen and (max-width: 467px) {
  .loginWrapperIcons .username {
    display: none;
  }
}
</style>
