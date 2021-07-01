<template>
  <div>
    <Breadcrumb v-if="comUnmount" :urls="urls"></Breadcrumb>
    <WhatsAppButton></WhatsAppButton>
    <div v-if="productDetail != ''" class="ps-page--product single-product">
      <div class="ps-container">
        <div class="ps-page__container">
          <div class="ps-page__left">
            <div class="ps-product--detail ps-product--fullwidth">
              <div class="ps-product__header">
                <div class="ps-product__thumbnail" data-vertical="true">
                  <figure>
                    <div class="ps-wrapper">
                      <div class="ps-product__gallery" data-arrow="true">
                        <a
                          v-if="
                            productImages.length > 1 && product_img_index > -1
                          "
                          href="javascript:void(0)"
                          class="slick-arrow"
                          style="display: block;"
                          @click="getSliderImage(product_img_index, 'sub')"
                          ><i class="fa fa-angle-left"></i
                        ></a>
                        <div class="item">
                          <!-- <a :href="`${presentProductSliderImg}`"> -->

                          <img
                            :src="`${presentProductSliderImg}`"
                            :alt="
                              productDetail.alt
                                ? productDetail.alt
                                : productDetail.prName
                            "
                            @click="enableImageZoom"
                          />
                          <!-- </a> -->
                          <!-- <image-zoom 
                                                      :regular="`${presentProductSliderImg}`">				
                                                    </image-zoom> -->
                        </div>
                        <a
                          v-if="
                            productImages.length > 1 &&
                              product_img_index < productImages.length
                          "
                          href="javascript:void(0)"
                          class="slick-arrow "
                          style="display: block;"
                          aria-disabled="true"
                          @click="getSliderImage(product_img_index, 'add')"
                          ><i class="fa fa-angle-right"></i
                        ></a>
                      </div>
                    </div>

                    <!-- <zoomOnHover :img-normal="`${presentProductSliderImg}`" :img-zoom="`https://i.picsum.photos/id/996/600/600.jpg?hmac=C3DwKRx_CS34I9jb4PQZ_2NzTA15ag-2LIpr7idOFM4`" :scale="1.5" :disabled="true"
                      @loaded="onload" @resized="onresize"></zoomOnHover> -->
                  </figure>
                  <div
                    class="ps-product__variants"
                    data-item="5"
                    data-md="5"
                    data-sm="5"
                    data-arrow="false"
                  >
                    <div
                      v-for="(productImage, index) in productImages"
                      :key="index"
                      class="item"
                    >
                      <img
                        :src="`${web_admin_url}${productImage.imageUrl}`"
                        :alt="
                          productDetail.alt
                            ? productDetail.alt
                            : productDetail.prName
                        "
                        @click="getSliderImage(index)"
                      />
                    </div>
                  </div>
                </div>
                <div class="ps-product__info">
                  <h1>{{ productDetail.prName }}</h1>
                  <div
                    v-if="
                      Number.isFinite(productDetail.specialPrice) &&
                        productDetail.specialPrice != 0 &&
                        productDetail.unitPrice > productDetail.specialPrice
                    "
                    class="prdt-offer"
                  >
                    {{ offer }}% OFF
                  </div>
                  <div class="ps-product__meta">
                    <p v-if="productBrand != '' && productBrand != 'N/A'">
                      Brand:<a href="javascript:vois(0)"> {{ productBrand }}</a>
                    </p>
                    <p v-if="countryOfOrgin">Country: {{ countryOfOrgin }}</p>
                  </div>
                  <h4 class="ps-product__price">
                    <!-- <div class="prdt-price"  v-if="Number.isInteger(productDetail.specialPrice)&& productDetail.specialPrice!=0 && productDetail.unitPrice >productDetail.specialPrice">
                    <span class="prduct-price-txt mr-lft0">Product MRP :</span>
                    <span class="ps_prdct-price red-text"><del>{{currency}} {{productPrice}}</del></span>
                    
                  </div> -->
                    <div class="prdt-price actual-prdt-price">
                      <!-- <span class="prduct-price-txt pl-0">OUR PRICE :</span> -->
                      <span class="ps_prdct-price"
                        >{{ currency }} {{ ourPrice }}</span
                      >
                      <template
                        v-if="
                          Number.isFinite(productDetail.specialPrice) &&
                            productDetail.specialPrice != 0 &&
                            productDetail.unitPrice > productDetail.specialPrice
                        "
                      >
                        <span class="ps_prdct-price red-text"
                          ><del
                            >MRP: {{ currency }} {{ productPrice }}</del
                          ></span
                        >
                      </template>
                    </div>
                  </h4>

                  <div
                    v-if="
                      Number.isFinite(productDetail.specialPrice) &&
                        productDetail.specialPrice != 0 &&
                        productDetail.unitPrice > productDetail.specialPrice
                    "
                    class="prdt-save-txt"
                  >
                    You Save: {{ currency }} {{ discountAmount }}
                  </div>
                  <p class="mb-0" v-html="productDetail.shortDescription"></p>
                  <ul class="productDeatilBtnnav">
                    <!-- <li><a class="sizeBtn" href="#">12</a></li> -->
                    <template
                      v-if="productDetail.stockAvailability != 'Out of Stock'"
                    >
                      <li v-if="isInCart == 'View in cart'">
                        <div>
                          <cartQtyCounter
                            :product_url_key="productDetail.urlKey"
                            :qty-cont="
                              productDetail.CartItemQty != 0
                                ? productDetail.CartItemQty
                                : 1
                            "
                            :style="counterStyle"
                            @updateCartQty="updateCart($event)"
                          ></cartQtyCounter>
                        </div>
                      </li>

                      <li v-if="isInCart != 'View in cart'">
                        <a
                          class="addToCartProdutDeatil"
                          href="#"
                          @click="addtocart(productDetail)"
                          ><span> <img src="/assets/img/cart-icon.png"/></span>
                          <template v-if="cart_ajax == 'closed'">
                            {{ isInCart }}
                          </template>
                          <template v-else>
                            <ButtonLoader
                              :loader-color="loaderColor"
                              :loader-style="loaderStyle"
                              :cart_ajax="cart_ajax"
                              :loader_min_height="`36px`"
                            >
                            </ButtonLoader>
                          </template>
                        </a>
                      </li>
                      <!-- <li><a class="buynow-btn" href="#" @click="buyNow(productDetail)">Buy Now</a></li> -->
                    </template>
                    <template v-else>
                      <li>
                        <div class="out_stock" data-v-0afcf9c2="">
                          out of stock
                        </div>
                      </li>
                    </template>

                    <li>
                      <a
                        class="addToWislistProdutDeatil"
                        href="#"
                        @click="addToWishList(productDetail)"
                      >
                        <i class="fa fa-heart" aria-hidden="true"></i>Add To
                        Wishlist</a
                      >
                    </li>
                  </ul>

                  <div v-if="variationData.length > 0" class="avilabilty-text">
                    <!-- <h5>Available in:</h5>
                                    <template v-for="(variation,index) in variationData" :key="index">  
                                                                         
                                        <span class="mb-1" style="display:inline-block">
                                         <router-link :to="`/Product-detail/${variation.prUrlkey}`" class="variation-link" >
                                         <label @click="refreshData(variation.prUrlkey)"> {{variation.AttrValuename}}</label>
                                        
                                        </router-link>
                                         </span>  
                                                                             
                                    </template> -->
                    <select
                      v-model="selectedVariation"
                      class="form-control variation_select"
                      @change="loadVariationProduct()"
                    >
                      <div
                        v-for="(variation, index) in variationData"
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
                            <del> {{ currency }} {{ variation.prPrice }} </del>
                            - {{ currency }} {{ variation.prSpecialPrice }}
                          </template>
                          <template v-else>
                            {{ currency }} {{ variation.prPrice }}
                          </template>
                        </option>
                      </div>
                    </select>
                  </div>

                  <div class="ps-product__sharing">
                    <h5>Share This Product</h5>
                    <a href="javascript:void(0)" class="facebook"
                      ><i
                        class="fa fa-facebook"
                        @click="shareItem('facebook')"
                      ></i
                    ></a>

                    <a href="javascript:void(0)" class="mail"
                      ><i
                        class="fa fa-envelope"
                        @click="shareItem('envelope')"
                      ></i
                    ></a>
                    <a href="javascript:void(0)" class="instagram"
                      ><i
                        class="fa fa-instagram"
                        @click="shareItem('instagram')"
                      ></i
                    ></a>
                    <a href="javascript:void(0)" class="whatsapp"
                      ><i
                        class="fa fa-whatsapp"
                        @click="shareItem('whatsapp')"
                      ></i
                    ></a>
                  </div>

                  <h5 class="whyCentralFontTxt">
                    Why shop from Centreal Bazaar ?
                  </h5>
                  <ul class="shop-now">
                    <li>
                      <p>
                        <span><img src="/assets/img/refund-icon.png"/></span>
                        Easy returns &amp; refunds <br />
                        Return products at doorstep and get refund in minutes.
                      </p>
                    </li>
                    <li>
                      <p>
                        <span><img src="/assets/img/rupees-icon.png"/></span
                        >Best quality products<br />
                        Get best quality products at lowest price..
                      </p>
                    </li>
                    <li>
                      <p>
                        <span
                          ><img
                            src="/assets/img/quick-delivery-icon.png"/></span
                        >Quick delivery<br />
                        Get products delivered to your doorsteps in no time.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="prdt-block">
                <div class="overview-txt">
                  <h5>Product details</h5>
                  <div v-html="productDetail.description"></div>
                </div>
              </div>
            </div>
            <div v-if="featured_products != ''" class="featured-box">
              <aside class="widget widget_same-brand">
                <h4>Featured Items</h4>
                <div class="widget__content">
                  <div
                    v-for="(product, index) in featured_products"
                    :key="index"
                  >
                    <div v-if="index < 2" class="ps-product">
                      <div class="ps-product__thumbnail">
                        <router-link :to="`/Product-detail/${product.urlKey}`">
                          <img
                            :src="`${web_admin_url}${product.imageUrl}`"
                            alt=""
                            @click="refreshData(product.urlKey)"
                          />
                        </router-link>
                        <template v-if="product.specialPrice != 0">
                          <div class="ps-product__badge">
                            -{{ discountPercentage(product) }}%
                          </div>
                        </template>
                      </div>
                      <div class="ps-product__container">
                        <!-- <a class="ps-product__vendor" href="#">Robert's Store</a> -->
                        <div class="ps-product__content">
                          <router-link
                            class="ps-product__title"
                            :to="`/Product-detail/${product.urlKey}`"
                          >
                            <span @click="refreshData(product.urlKey)">{{
                              product.prName
                            }}</span>
                          </router-link>

                          <div
                            v-if="product.IsReviewCount"
                            class="ps-product__rating"
                          >
                            <div class="br-wrapper br-theme-fontawesome-stars">
                              <select
                                class="ps-rating"
                                data-read-only="true"
                                style="display: none;"
                              >
                                <option value="1">1</option>
                                <option value="1">2</option>
                                <option value="1">3</option>
                                <option value="1">4</option>
                                <option value="2">5</option>
                              </select>
                              <div class="br-widget br-readonly">
                                <a
                                  href="#"
                                  data-rating-value="1"
                                  data-rating-text="1"
                                  :class="{
                                    'br-selected':
                                      productReviewCnt(
                                        product.IsReviewAvgrating
                                      ) >= 1
                                        ? true
                                        : false,
                                    'br-current': true
                                  }"
                                ></a
                                ><a
                                  href="#"
                                  data-rating-value="1"
                                  data-rating-text="2"
                                  :class="{
                                    'br-selected':
                                      productReviewCnt(
                                        product.IsReviewAvgrating
                                      ) >= 3
                                        ? true
                                        : false,
                                    'br-current': true
                                  }"
                                ></a
                                ><a
                                  href="#"
                                  data-rating-value="1"
                                  data-rating-text="3"
                                  :class="{
                                    'br-selected':
                                      productReviewCnt(
                                        product.IsReviewAvgrating
                                      ) >= 3
                                        ? true
                                        : false,
                                    'br-current': true
                                  }"
                                ></a
                                ><a
                                  href="#"
                                  data-rating-value="1"
                                  data-rating-text="4"
                                  :class="{
                                    'br-selected':
                                      productReviewCnt(
                                        product.IsReviewAvgrating
                                      ) >= 4
                                        ? true
                                        : false,
                                    'br-current': true
                                  }"
                                ></a
                                ><a
                                  href="#"
                                  data-rating-value="2"
                                  data-rating-text="5"
                                  :class="{
                                    'br-selected':
                                      productReviewCnt(
                                        product.IsReviewAvgrating
                                      ) >= 5
                                        ? true
                                        : false,
                                    'br-current': true
                                  }"
                                ></a>
                                <div class="br-current-rating">
                                  {{
                                    productReviewCnt(product.IsReviewAvgrating)
                                  }}
                                </div>
                              </div>
                            </div>
                            <span v-if="product.IsReviewCount">{{
                              product.IsReviewCount
                            }}</span>
                          </div>
                          <p
                            v-if="
                              product.specialPrice != 0 &&
                                product.specialPrice < product.unitPrice
                            "
                            class="ps-product__price sale"
                          >
                            {{ currency }}
                            {{ formatedPrice(product.specialPrice) }}
                            <del
                              >{{ currency }}
                              {{ formatedPrice(product.unitPrice) }}
                            </del>
                          </p>
                          <p v-else class="ps-product__price sale">
                            {{ currency }}
                            {{ formatedPrice(product.unitPrice) }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="productDetail != ''" class="recommend-customers mr-lft-25">
      <h3>Customers who viewed this item also viewed</h3>
      <div class="ps-section__content">
        <!-- <ImageSlider
          :products="home_kitchen_products"
          :web_admin_url="web_admin_url"
          :currency="currency"
          @refreshPagedata="refreshData"
        ></ImageSlider> -->
      </div>
    </div>

    <div
      v-if="home_kitchen_products && productDetail != ''"
      class="ps-deal-of-day subpage-pd"
    >
      <div class="ps-container">
        <div class="ps-section__header">
          <div class="ps-block--countdown-deal">
            <div class="ps-block__left">
              <h3>Home & Kitchen Essentials</h3>
            </div>
          </div>
        </div>
        <div class="ps-section__content">
          <div class="ps-carousel--nav owl-slider">
            <ProductSlider
              :products="home_kitchen_products"
              :offer-badge="true"
              :new-badge="true"
              @refreshSliderdata="refreshImageData"
            ></ProductSlider>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="related_products != '' && productDetail != ''"
      class="ps-deal-of-day mb-4"
    >
      <div class="ps-container">
        <div class="ps-section__header">
          <div class="ps-block--countdown-deal">
            <div class="ps-block__left">
              <h3>Inspired by your browsing history</h3>
            </div>
          </div>
        </div>

        <div class="ps-section__content">
          <div class="ps-carousel--nav owl-slider">
            <ProductSlider
              :products="related_products"
              :offer-badge="true"
              :new-badge="true"
              @refreshSliderdata="refreshImageData"
            ></ProductSlider>
          </div>
        </div>
      </div>
    </div>

    <div v-if="false" class="browse-history">
      <div class="container">
        <h4>
          Your Browsing history <span>View or Edit Your Browsing history</span>
        </h4>
        <ul>
          <span v-for="(product, index) in related_products" :key="index">
            <li v-if="index < 11">
              <img :src="`${web_admin_url}${product.imageUrl}`" alt="" />
            </li>
          </span>
        </ul>
      </div>
    </div>

    <!-- <div class="error_page" v-if="!productDetail.length && ajax=='closed'">
        <h1>Requested item not found</h1>
    </div> -->
    <span class="scrollTop" @click="topToBottom">
      <i class="fa fa-angle-up" aria-hidden="true"></i>
    </span>

    <vue-easy-lightbox
      :visible="visible"
      :imgs="getZoomImages"
      :index="index"
      @hide="handleHide"
    ></vue-easy-lightbox>
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
import $ from 'jquery'
import Config from '@/config'
import helper from '@/helper/helper'
import ProductSlider from '@/components/ProductSlider'
// import ImageSlider from '@/components/ImageSlider'
import ButtonLoader from '@/components/ButtonLoader'
import Breadcrumb from '@/components/Breadcrumb'
import cartQtyCounter from '@/components/cart/CartQtyCounter'
import WhatsAppButton from '@/components/WhatsAppButton'

export default {
  layout: 'frontend',
  name: 'ProductDetail',
  components: {
    ProductSlider,
    // ImageSlider,
    ButtonLoader,
    Breadcrumb,
    cartQtyCounter,
    WhatsAppButton

    // imageZoom
  },
  props: ['changedUrl'],

  data() {
    return {
      productDetail: [],
      web_admin_url: '',
      currency: '',
      productSpecialDetail: [],
      productImages: [],
      variationData: [],
      store_name: '',
      presentProductSliderImg: '',
      product_img_index: 0,
      admin_api_header: '',
      related_products: [],
      home_kitchen_products: [],
      featured_products: [],
      cart_product_url_key: '',
      loaderColor: '#fff',
      cart_ajax: 'closed',
      ajax: 'closed',
      vendor_url_key: '',
      loaderStyle: {
        width: '40px'
      },
      guest_id: '',
      cust_id: null,
      comUnmount: false,
      urls: [
        {
          path: '/',
          name: 'Home'
        },
        {
          path: '/all-category',
          name: 'All Categories '
        },
        {
          path: '/products',
          name: 'Product detail'
        }
      ],
      countryOfOrgin: '',
      counterStyle: {
        padding: '6px 0px'
      },
      visible: false,
      index: 0,
      selectedVariation: ''
    }
  },
  watch: {
    changed_url(url_key) {
      this.loadInitialData(url_key)
    },
    $route() {
      helper.backtoTop()
    }
  },
  async asyncData({ params }) {
    const url_key = params.id

    let productInfo = ''
    const custId = ''
    const guestId = ''
    const API_HEADER = Config.ADMIN_API_HEADER.headers

    productInfo = await fetch(
      `${
        Config.BASE_URL
      }ProductDetails?urlKey=${url_key}&custId=${custId}&guestId=${guestId}`,
      {
        method: 'GET',
        headers: API_HEADER
      }
    ).then(res => res.json())

    productInfo = productInfo.Data.ProdDetails

    return { productInfo }
  },
  head() {
    const title = Config.DEFAULT_META_TITLE
    const description = Config.DEFAULT_META_DESCRIPTION
    const ogImage = Config.DEFAULT_META_OGIMAGE
    const productOgImage =
      Config.WEB_ADMIN_URL + '/' + this.productInfo.featuredImage
    return {
      title:
        this.productInfo.metaTitle != ''
          ? this.productInfo.metaDescription
          : title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            this.productInfo.metaDescription != ''
              ? this.productInfo.metaDescription
              : description
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content:
            this.productInfo.metaTitle != ''
              ? this.productInfo.metaDescription
              : title
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            this.productInfo.featuredImage != '' ? productOgImage : ogImage
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            this.productInfo.metaDescription != ''
              ? this.productInfo.metaDescription
              : description
        }
      ]
    }
  },

  mounted() {
    const $this = this
    const parameters = this.$route.params
    const url_key = parameters.id
    $this.admin_api_header = Config.ADMIN_API_HEADER
    $this.guest_id = localStorage.getItem('guestId')
    $this.cust_id = localStorage.getItem('custId')
    helper.backtoTop()
    $this.loadInitialData(url_key)

    $this.web_admin_url = Config.WEB_ADMIN_URL
    $this.currency = Config.CURRECNCY
    $this.store_name = Config.STORE_NAME
    $this.vendor_url_key = Config.VENDOR_URL_KEY

    if (this.$route.query.loc != '') {
      this.setStoreLocation(this.$route.query.loc)
    }
  },
  methods: {
    ...mapActions(['storeCustomerWishlist']),
    loadVariationProduct() {
      console.log(this.selectedVariation)
      if (this.selectedVariation) {
        const url = '/Product-detail/' + this.selectedVariation.prUrlkey
        this.$router.push({ path: url })
        this.refreshData(this.selectedVariation.prUrlkey)
      }
    },
    topToBottom() {
      helper.backtoTop()
    },
    showImg(index) {
      this.index = index
      this.visible = true
    },
    handleHide() {
      this.visible = false
    },
    enableImageZoom() {
      this.visible = true
    },
    setStoreLocation(vendor_url_key) {
      if (vendor_url_key) {
        const decrypt = atob(vendor_url_key)
        // let locationInfo =JSON.parse(decrypt);
        // this.$cookies.set('location_title',this.location);
        this.$cookies.set('location_info', decrypt)
        localStorage.setItem('location_info', decrypt)
      }
    },

    loadInitialData(url_key) {
      const $this = this
      let guestId = null
      let custId = null
      custId = localStorage.getItem('custId')
      if (custId == null) {
        guestId = localStorage.getItem('guestId')
      }

      $this.ajax = 'open'

      axios
        .get(
          `${
            Config.BASE_URL
          }ProductDetails?urlKey=${url_key}&custId=${custId}&guestId=${guestId}`,
          $this.admin_api_header
        )
        .then(function(response) {
          $this.productDetail = response.data.Data.ProdDetails

          if ($this.productDetail != null) {
            // $this.updateMetaDetails($this.productDetail)
            $this.specDetails = response.data.Data.specDetails
            $this.productImages = response.data.Data.ProdImages
            let variationJson = response.data.Data.ProdDetails.variationJson
            variationJson = JSON.parse(variationJson)

            $this.presentProductSliderImg =
              Config.WEB_ADMIN_URL + response.data.Data.ProdImages[0].imageUrl
            // $("meta[name='og_image']").attr(
            //   'content',
            //   $this.presentProductSliderImg
            // )
            $this.getBrudCumProductName()
            $this.ajax = 'closed'
            if (variationJson != '') {
              if (variationJson.length > 0) {
                $this.variationData = variationJson[0].AttrValues
                if ($this.variationData != '') {
                  $this.selectedVariation = $this.variationData[0]
                }
              }
            }
          } else {
            $this.ajax = 'closed'
            // $this.$router.push({'path':'/item_not_found'});
          }
        })
        .catch(function() {
          $this.cart_ajax = 'closed'
        })

      axios
        .get(
          `${
            Config.BASE_URL
          }RelatedProducts?urlKey=${url_key}&custId=${guestId}&guestId=${guestId}`,
          $this.admin_api_header
        )
        .then(function(response) {
          $this.related_products = response.data.Data.RelatedList
        })

      axios
        .get(
          `${
            Config.BASE_URL
          }RelatedProducts?urlKey=home-care--cleaning&custId=${guestId}&guestId=${guestId}`,
          $this.admin_api_header
        )
        .then(function(response) {
          $this.home_kitchen_products = response.data.Data.RelatedList
        })

      axios
        .get(
          `${
            Config.BASE_URL
          }FeaturedProduct?custId=${custId}&guestId=${guestId}`,
          $this.admin_api_header
        )
        .then(function(response) {
          $this.featured_products = response.data.Data
        })
    },
    getSliderImage(index, nav = '') {
      const imgIndex = this.productImages.length - 1

      if (nav == '') {
        this.product_img_index = index
      } else if (nav == 'add') {
        if (index < imgIndex && index >= 0) {
          this.product_img_index = index + 1
        } else {
          this.product_img_index = 0
        }
      } else if (nav == 'sub') {
        if (index > 0) {
          this.product_img_index = index - 1
        } else {
          this.product_img_index = 0
        }
      }

      const selectedImg = this.productImages[this.product_img_index]
      this.presentProductSliderImg = Config.WEB_ADMIN_URL + selectedImg.imageUrl
    },
    refreshData(product_urlKey) {
      this.$emit('refreshpage', product_urlKey)
    },
    refreshImageData(product_urlKey) {
      this.$emit('refreshpage', product_urlKey)
    },

    formatedPrice(price) {
      let formatedPrice = 0
      if (price != '' && price != 0) {
        formatedPrice = price
      }

      return formatedPrice.toFixed(2)
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
    buyNow(productInfo) {
      const isLoggedIn = helper.isLoginedUser()
      if (isLoggedIn == true) {
        const $this = this
        this.addtocart(productInfo).then(function() {
          $this.$router.push({ path: '/checkout' })
        })
      } else {
        this.$router.push({ path: '/', query: { login: 'failed' } })
      }
    },
    addtocart(productInfo) {
      if (this.isInCart == 'Add to cart') {
        return new Promise((resolve, reject) => {
          const urlKey = productInfo.urlKey
          const productQty = 1
          const $this = this
          $this.cart_ajax = 'open'

          $this.cart_product_url_key = productInfo.urlKey
          const payload = {
            cusId: $this.cust_id != null ? $this.cust_id : '',
            guestId: $this.cust_id == null ? $this.guest_id : '',
            pincode: $this.pincode,
            urlKey: urlKey,
            productQty: productQty,
            vendorUrlkey: $this.vendor_url_key
          }

          $this.$store
            .dispatch('addToCart', { payload: payload, toast: $this.$toast })
            .then(function(response) {
              resolve(response)
              $this.cart_ajax = 'closed'
              $this.cart_product_url_key = ''
              $this.customerCart = $this.$store.state.customer_cart
              $this.$emit('cartUpdated', $this.customerCart)
            })
            .catch(function(error) {
              reject(error)
            })
        })
      } else {
        $('#cart-mobile').css({ left: 'unset', right: '0' })
        $('.ps-panel--sidebar').removeClass('active')
        $('#cart-mobile').addClass('active')
        $('.ps-site-overlay').addClass('active')
      }
    },
    updateCart(cartItemInfo) {
      let guestId = null
      let custId = null
      custId = localStorage.getItem('custId')
      if (custId == null) {
        guestId = localStorage.getItem('guestId')
      }

      if (cartItemInfo.product_qty == 0) {
        this.rmvCartItem(cartItemInfo)
      } else {
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
    },
    addToWishList(productInfo) {
      const isLoggedIn = helper.isLoginedUser()
      if (isLoggedIn == true) {
        const $this = this
        const payload = {
          custId: $this.cust_id != null ? $this.cust_id : '',
          guestId: $this.cust_id == null ? $this.guest_id : '',
          urlKey: productInfo.urlKey
        }

        $this.storeCustomerWishlist(payload).then(function(response) {
          $this.$toast.success(`${response.data.Message}`)
        })
      } else {
        document.getElementById('login_popup_link').click()

        // this.$router.push({ path: "/", query: { login: "failed" } });
      }
    },
    productReviewCnt(value) {
      return Math.ceil(value)
    },
    updateMetaDetails(item) {
      item.metaTitle ? (document.title = item.metaTitle) : ''
      item.shortDescription
        ? $('meta[name=description]').attr('content', item.shortDescription)
        : ''
      item.metaKeywords
        ? $('meta[name=keywords]').attr('content', item.metaKeywords)
        : ''
    },
    shareItem(socialmedia) {
      let shereUrl = ''
      const locationInfo = localStorage.getItem('location_info')
      const encrypted = btoa(locationInfo)
      const pageUrl = `${Config.SITE_URL}${this.$route.path}?loc=${encrypted}`
      if (socialmedia == 'facebook') {
        shereUrl = 'https://www.facebook.com/sharer.php?u=' + pageUrl
      }
      if (socialmedia == 'envelope') {
        shereUrl =
          'mailto:?subject=' +
          this.productDetail.prName +
          '&amp;body=Check out this site' +
          pageUrl
      }
      if (socialmedia == 'instagram') {
        shereUrl = 'https://www.instagram.com/?url=' + pageUrl
      }
      if (socialmedia == 'whatsapp') {
        shereUrl = 'https://wa.me/?text=' + pageUrl
      }
      window.open(shereUrl, '_blank')
    },
    getBrudCumProductName() {
      if (this.productDetail != '') {
        this.urls[1] = {
          path: `/products/${this.productDetail.catUrlKey}`,
          name: this.productDetail.catName
        }
        this.urls[2].name = this.productDetail.prName
        this.comUnmount = false
        this.$nextTick(() => {
          this.comUnmount = true
        })
      }
    }
  },
  computed: {
    ...mapGetters(['getcartList']),
    getZoomImages() {
      const images = []
      const $this = this
      if ($this.productImages) {
        $this.productImages.forEach(function(item) {
          images.push(`${$this.web_admin_url}${item.imageUrl}`)
        })
      }

      return images
    },
    productBrand() {
      let brand = ''
      const $this = this
      if ($this.specDetails != '') {
        $this.specDetails.forEach(function(item) {
          if (item.attrName.toLowerCase() == 'brand') {
            brand = item.attrValue
          }
          if (item.attrName.toLowerCase() == 'country of origin') {
            $this.countryOfOrgin = item.attrValue
          }
        })
      }

      return brand
    },
    productPrice() {
      let price = 0
      if (this.productDetail != '') {
        price = this.productDetail.unitPrice
      }

      return price.toFixed(2)
    },
    ourPrice() {
      let specialPrice = 0
      if (this.productDetail != '') {
        const price = this.productDetail.specialPrice
        if (Number.isFinite(price) && price != 0) {
          specialPrice = price
        } else {
          specialPrice = this.productDetail.unitPrice
        }
      }

      return specialPrice.toFixed(2)
    },
    offer() {
      let offer = 0
      if (this.productDetail != '') {
        const specialPrice = this.productDetail.specialPrice
        const unitPrice = this.productDetail.unitPrice
        let difference = 0
        if (Number.isFinite(specialPrice) && Number.isFinite(unitPrice)) {
          difference = unitPrice - specialPrice
        }
        if (difference != 0) {
          offer = helper.calculatePercentage(unitPrice, difference)
        }
      }
      return offer.toFixed(2)
    },
    discountAmount() {
      let discount = 0
      if (this.productDetail != '') {
        const specialPrice = this.productDetail.specialPrice
        const unitPrice = this.productDetail.unitPrice
        if (Number.isFinite(specialPrice) && Number.isFinite(unitPrice)) {
          discount = unitPrice - specialPrice
        }
      }

      return discount.toFixed(2)
    },
    isInCart() {
      const $this = this
      let addcartBtnText = 'Add to cart'
      if ($this.productDetail.stockAvailability != 'Out of Stock') {
        this.getcartList.forEach(function(cart) {
          if (cart.urlKey == $this.productDetail.urlKey) {
            addcartBtnText = 'View in cart'
          }
        })
      } else {
        addcartBtnText = 'Out of Stock'
      }

      return addcartBtnText
    }
  }
}
</script>

<style scoped>
.variation_select {
  width: 216px;
  display: block;
  clear: both;
  margin-top: 50px;
  height: 35px;
}
.avilabilty-text span {
  padding: 5px;
}

.ps-product--detail .ps-product__sharing a {
  z-index: 999;
}
.prdt-offer {
  width: 140px !important;
}
.buynow-btn {
  margin-top: 10px;
}
.wishlist-bg {
  margin-top: 10px;
}

.overview-txt {
  min-height: 150px;
}
.error_page {
  text-align: center;
  padding: 200px;
}
@media only screen and (max-width: 600px) {
  .overview-txt {
    min-height: 10px;
  }
}

@media (min-width: 992px) {
  .ps-page__left {
    min-width: 999px;
  }
}

.zoom-on-hover {
  position: relative;
  overflow: hidden;
}
.zoom-on-hover .normal {
  width: 100%;
}
.zoom-on-hover .zoom {
  position: absolute;
  opacity: 0;
  transform-origin: top left;
}
.zoom-on-hover.zoomed .zoom {
  opacity: 1;
}
.zoom-on-hover.zoomed .normal {
  opacity: 0;
}
.out_stock {
  height: 35px;
  padding: 8px;
}

.ps-product .ps-product__title {
  height: 35px !important;
}
.ps-product--detail .ps-product__sharing a.mail {
  background-color: #747677;
}
.ps-product--detail .ps-product__sharing a.instagram {
  background-color: #dd4b39;
}
.ps-product--detail .ps-product__sharing a.whatsapp {
  background-color: #5fa30e;
}
.ps-product--detail .ps-product__sharing {
  padding-top: 0px;
  padding-bottom: 2rem;
  margin-bottom: 0;
}
.ps-product--detail .ps-product__price del {
  font-size: 1.7rem;
  margin-left: 10px;
}

.ps-product--detail .ps-product__sharing {
  float: left;
  width: 100%;
  margin-top: 10px;
}
.productDeatilBtnnav li {
  float: left;
}
</style>
<style>
.vel-modal {
  z-index: 9999999;
}
</style>
