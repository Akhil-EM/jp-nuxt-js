<template>
  <div>
    <section class="subscraibeBGSec">
      <div class="container">
        <div class="row">
          <div class="col-xl-4 col-md-12">
            <div class="socialMediaFooterBgSec">
              <ul>
                <li>
                  <a
                    target="_blank"
                    href="https://www.facebook.com/centrealbazaar"
                    ><i class="fa fa-facebook" aria-hidden="true"></i
                  ></a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.instagram.com/centrealbazaar"
                    ><i class="fa fa-instagram" aria-hidden="true"></i
                  ></a>
                </li>
                <li>
                  <a target="_blank" href="https://twitter.com/centrealbazaar"
                    ><i class="fa fa-twitter" aria-hidden="true"></i
                  ></a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.youtube.com/centrealbazaar"
                    ><i class="fa fa-youtube-play" aria-hidden="true"></i
                  ></a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/company/centrealbazaar"
                    ><i class="fa fa-linkedin" aria-hidden="true"></i
                  ></a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://in.pinterest.com/centrealbazaar"
                    ><i class="fa fa-pinterest-p" aria-hidden="true"></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-xl-8 ccol-md-12">
            <div class="subscribeDivMain">
              <div class="subscribeWrapperMain">
                <div class="subscribeWrapperMainDiv">
                  <h3>Sign Up For Newsletter</h3>
                </div>
                <div class="searchWrappermain">
                  <input
                    class="searchWrappermainInputFiled"
                    autocomplete="off"
                    type="text"
                    placeholder="Your Email Address"
                  />
                  <div class="searchWrappermainWrapperDiv">
                    <button class="searchBtnMain">Subscribe</button>
                  </div>
                  <div id="search_suggetions" class="search_suggetions"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="prdt-footer-sec">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <div class="prdt-footer-box">
              <div class="prdt-footer-img">
                <img src="/assets/img/assortment-icon.png" />
              </div>
              <p>
                <span class="txt-new-sub">Wide Assortment</span>
                <br />
                Choose from 5000+ products across food, personal care,
                <br />
                household &amp; other categories.
              </p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="prdt-footer-box">
              <div class="prdt-footer-img">
                <img src="/assets/img/price-offer-icon.png" />
              </div>
              <p>
                <span class="txt-new-sub">Best Price & Offers</span>
                <br />
                Cheaper prices than your local supermarket, great
                <br />
                cash back offer to top it off
              </p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="prdt-footer-box">
              <div class="prdt-footer-img">
                <img src="/assets/img/easy-return-icon.png" />
              </div>
              <p>
                <span class="txt-new-sub">Easy Returns </span>
                <br />
                Not satisfied with a product? Return it at the
                <br />
                doorstep & get a refund within hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="ps-footer">
      <div class="container">
        <div class="fooetrlinkAlldivBorder">
          <div class="row">
            <div class="col-md-3">
              <div v-for="(cat, index) in maincategory" :key="index">
                <template v-if="index == 0">
                  <router-link
                    :to="`/products/${cat.catUrlKey}`"
                    class="nav-link"
                    style="padding:0px"
                  >
                    <h4 @click="refreshPageEvent(cat)">{{ cat.catName }}</h4>
                  </router-link>
                  <ul class="footer_ul">
                    <div v-for="(cat1, index) in getCategoryList" :key="index">
                      <li v-if="cat.catId == cat1.parentId && index">
                        <router-link
                          :to="`/products/${cat1.catUrlKey}`"
                          class="nav-link"
                          style="padding:0px"
                        >
                          <span @click="refreshPageEvent(cat)">{{
                            cat1.catName
                          }}</span>
                        </router-link>
                      </li>
                    </div>
                  </ul>
                </template>
              </div>
            </div>
            <div class="col-md-3">
              <div v-for="(cat, index) in maincategory" :key="index">
                <template v-if="index == 2">
                  <router-link
                    :to="`/products/${cat.catUrlKey}`"
                    class="nav-link"
                    style="padding:0px"
                  >
                    <h4 @click="refreshPageEvent(cat)">{{ cat.catName }}</h4>
                  </router-link>

                  <ul class="footer_ul">
                    <div v-for="(cat1, index) in getCategoryList" :key="index">
                      <li v-if="cat.catId == cat1.parentId && index">
                        <router-link
                          :to="`/products/${cat1.catUrlKey}`"
                          class="nav-link"
                          style="padding:0px"
                        >
                          <span @click="refreshPageEvent(cat)">{{
                            cat1.catName
                          }}</span>
                        </router-link>
                      </li>
                    </div>
                  </ul>
                </template>
              </div>
            </div>
            <div class="col-md-3">
              <div v-for="(cat, index) in maincategory" :key="index">
                <template v-if="index == 4">
                  <router-link
                    :to="`/products/${cat.catUrlKey}`"
                    class="nav-link"
                    style="padding:0px"
                  >
                    <h4 @click="refreshPageEvent(cat)">{{ cat.catName }}</h4>
                  </router-link>

                  <ul class="footer_ul">
                    <div v-for="(cat1, index) in getCategoryList" :key="index">
                      <li v-if="cat.catId == cat1.parentId && index">
                        <router-link
                          :to="`/products/${cat1.catUrlKey}`"
                          class="nav-link"
                          style="padding:0px"
                        >
                          <span @click="refreshPageEvent(cat)">{{
                            cat1.catName
                          }}</span>
                        </router-link>
                      </li>
                    </div>
                  </ul>
                </template>
              </div>
            </div>
            <div class="col-md-3">
              <div v-for="(cat, index) in maincategory" :key="index">
                <template v-if="index == 7">
                  <router-link
                    :to="`/products/${cat.catUrlKey}`"
                    class="nav-link"
                    style="padding:0px"
                  >
                    <h4 @click="refreshPageEvent(cat)">{{ cat.catName }}</h4>
                  </router-link>
                  <ul class="footer_ul">
                    <div v-for="(cat1, index) in getCategoryList" :key="index">
                      <li v-if="cat.catId == cat1.parentId && index">
                        <router-link
                          :to="`/products/${cat1.catUrlKey}`"
                          class="nav-link"
                          style="padding:0px"
                        >
                          <span @click="refreshPageEvent(cat)">{{
                            cat1.catName
                          }}</span>
                        </router-link>
                      </li>
                    </div>
                  </ul>
                </template>
              </div>
            </div>

            <div class="col-md-3">
              <div v-for="(cat, index) in maincategory" :key="index">
                <template v-if="index == 3">
                  <router-link
                    :to="`/products/${cat.catUrlKey}`"
                    class="nav-link"
                    style="padding:0px"
                  >
                    <h4 @click="refreshPageEvent(cat)">{{ cat.catName }}</h4>
                  </router-link>
                  <ul class="footer_ul">
                    <div v-for="(cat1, index) in getCategoryList" :key="index">
                      <li v-if="cat.catId == cat1.parentId && index">
                        <router-link
                          :to="`/products/${cat1.catUrlKey}`"
                          class="nav-link"
                          style="padding:0px"
                        >
                          <span @click="refreshPageEvent(cat)">{{
                            cat1.catName
                          }}</span>
                        </router-link>
                      </li>
                    </div>
                  </ul>
                </template>
              </div>
            </div>
            <div class="col-md-3">
              <div v-for="(cat, index) in maincategory" :key="index">
                <template v-if="index == 8">
                  <router-link
                    :to="`/products/${cat.catUrlKey}`"
                    class="nav-link"
                    style="padding:0px"
                  >
                    <h4 @click="refreshPageEvent(cat)">{{ cat.catName }}</h4>
                  </router-link>

                  <ul class="footer_ul">
                    <div
                      v-for="(cat1, key, index) in getCategoryList"
                      :key="index"
                    >
                      <li v-if="cat.catId == cat1.parentId">
                        <router-link
                          :to="`/products/${cat1.catUrlKey}`"
                          class="nav-link"
                          style="padding:0px"
                        >
                          <span @click="refreshPageEvent(cat)">{{
                            cat1.catName
                          }}</span>
                        </router-link>
                      </li>
                    </div>
                  </ul>
                </template>
              </div>
            </div>
            <div class="col-md-3">
              <div v-for="(cat, index) in maincategory" :key="index">
                <template v-if="index == 9">
                  <router-link
                    :to="`/products/${cat.catUrlKey}`"
                    class="nav-link"
                    style="padding:0px"
                  >
                    <h4 @click="refreshPageEvent(cat)">{{ cat.catName }}</h4>
                  </router-link>

                  <ul class="footer_ul">
                    <div v-for="(cat1, index) in getCategoryList" :key="index">
                      <li v-if="cat.catId == cat1.parentId && index">
                        <router-link
                          :to="`/products/${cat1.catUrlKey}`"
                          class="nav-link"
                          style="padding:0px"
                        >
                          <span @click="refreshPageEvent(cat)">{{
                            cat1.catName
                          }}</span>
                        </router-link>
                      </li>
                    </div>
                  </ul>
                </template>
              </div>
            </div>
            <div class="col-md-3">
              <div v-for="(cat, index) in maincategory" :key="index">
                <template v-if="index == 5">
                  <router-link
                    :to="`/products/${cat.catUrlKey}`"
                    class="nav-link"
                    style="padding:0px"
                  >
                    <h4 @click="refreshPageEvent(cat)">{{ cat.catName }}</h4>
                  </router-link>
                  <ul class="footer_ul">
                    <div v-for="(cat1, index) in getCategoryList" :key="index">
                      <li v-if="cat.catId == cat1.parentId && index">
                        <router-link
                          :to="`/products/${cat1.catUrlKey}`"
                          class="nav-link"
                          style="padding:0px"
                        >
                          <span @click="refreshPageEvent(cat)">{{
                            cat1.catName
                          }}</span>
                        </router-link>
                      </li>
                    </div>
                  </ul>
                </template>
              </div>
            </div>
          </div>
          <router-link :to="`/all-category`" class="viewAllcategorymainBtn"
            >View all Category</router-link
          >
        </div>
      </div>
      <div class="footerBorder">
        <div class="container">
          <div class="row address-sec">
            <div class="col-md-3">
              <span class="foter-txt">Call us friendly support 24/7</span>

              <h5>+91 7594999934</h5>
              <p><i>Centreal Bazaar India Ltd</i></p>
              <p>
                <i>Address</i>: Central Tower, Near Metro Pillar NO: P/319,
                Kalamassery, Kochi, Kerala - 682033
              </p>
              <p><i>Email </i>: info@centrealbazaaronline.com</p>
            </div>
            <div class="col-md-3">
              <p>Effortless Shopping</p>
              <h3 class="footertxtDownload">Download App</h3>
              <div class="payment-app-img">
                <img src="/assets/img/google-play.png" />
                <img src="/assets/img/app-store.png" />
              </div>
            </div>
            <div class="col-md-3">
              <h4>Informations</h4>
              <ul class="footer_ul">
                <li>
                  <a href="javascript:void(0)">Job Opportunities</a>
                </li>
                <li>
                  <a href="javascript:void(0)">Investors</a>
                </li>
                <li>
                  <a href="javascript:void(0)">Events</a>
                </li>
                <li>
                  <router-link :to="`/contact-form`">Contact Us</router-link>
                </li>
              </ul>
            </div>
            <div class="col-md-3">
              <h4>Let Us Help You</h4>
              <ul>
                <li>
                  <router-link :to="`/my-profile`">Your Account</router-link>
                </li>
                <li>
                  <router-link :to="`/about`">About Us</router-link>
                </li>
                <li>
                  <router-link :to="`/terms-condition`"
                    >Terms & Conditions</router-link
                  >
                </li>
                <li>
                  <router-link :to="`/return-policy`"
                    >Cancellation and Refund Policy</router-link
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="footerSec1">
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <h3>Centreal Bazaar: Online Grocery Store Kerala</h3>
              <p>
                Centreal Bazaar is a purposeful, values-driven, human
                organization. We are dedicated to serving our customers,
                employees, vendors, shareholders and the communities in which we
                operate. And we know that each of our stakeholders expects that
                we operate in an entirely ethical manner.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="footerSec1">
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <h3>Fast Growing supermarket Chain In India</h3>
              <p>
                Centreal Bazaar is a chain of retail concept supermarkets with
                the most modern amenities within the reach of the common man.
                Fully backed up by CFCICI India Ltd, a Multi-State Credit
                Co-operative Society registered under Govt. of India, Centreal
                Bazaar aims to become the most prominent supermarket chain in
                India, delivering value to all stakeholders.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="footerSec1">
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <div class="popularProductdivMain">
                <div class="popularProductMain">
                  <h3>Popular Categories</h3>
                </div>

                <span v-for="(cat, index) in maincategory" :key="index">
                  <router-link
                    :to="`/products/${cat.catUrlKey}`"
                    class="main_cat"
                    style="padding:0px"
                  >
                    <span @click="refreshPageEvent(cat)"
                      >{{ cat.catName }}:
                    </span>
                  </router-link>
                  <span v-for="(cat1, index) in getCategoryList" :key="index">
                    <template v-if="cat.catId == cat1.parentId && index">
                      <router-link
                        :to="`/products/${cat1.catUrlKey}`"
                        class=""
                        style="padding:0px"
                      >
                        <span @click="refreshPageEvent(cat)">{{
                          cat1.catName
                        }}</span
                        >,
                      </router-link>
                    </template>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footerSec1">
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <div class="popularProductdivMain">
                <div class="popularProductMain">
                  <h3>Popular Brands</h3>
                </div>
                <span v-for="(brands, index) in topBrands" :key="index">
                  <a href="javascript:void(0)" class="brand_items"
                    >{{ brands.attrValue }},
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ps-footer__copyright">
        <div class="container">
          <div class="row">
            <div class="col-sm-6">
              <p>
                © 2021 Copyright Centreal Bazaar India Ltd. All Rights Reserved
                Designed by
                <a class="ml-0" target="_blank" href="https://intertoons.com/"
                  >Intertoons</a
                >
              </p>
            </div>
            <div class="col-sm-6">
              <ul class="footerPaymentMethodNav">
                <li><p>We accept Payment Method</p></li>
                <li><img src="/assets/img/payment-method/5.jpg" /></li>
                <li><img src="/assets/img/payment-method/3.jpg" /></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <div class="ps-site-overlay"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import $ from 'jquery'
export default {
  name: 'Footer',
  data() {
    return {
      maincategory: [],
      topBrands: []
    }
  },
  computed: {
    ...mapGetters(['getCategoryList', 'getPopularProducts'])
  },
  watch: {
    getCategoryList() {
      this.filterMainCategory()
    }
  },
  methods: {
    ...mapActions(['getTopBrandList']),

    filterMainCategory() {
      const mainCatArr = []
      const mainCatArrMob = []
      let mainCatCnt = 0
      this.getCategoryList.forEach(function(item) {
        if (item.parentId == 1 && mainCatCnt < 6) {
          mainCatArr.push(item)
          mainCatCnt++
        }
        if (item.parentId == 1) {
          mainCatArrMob.push(item)
        }
      })
      this.maincategory = mainCatArrMob
    },
    refreshPageEvent(cat) {
      this.url_key = cat.catUrlKey
      this.updateMetaDetails(cat)
      this.$emit('refreshpage', this.url_key)
    },
    updateMetaDetails(item) {
      document.title = item.metaTitle ? item.metaTitle : 'Centreal Supermarket'
      $('meta[name=description]').attr('content', item.shortDescription)
      $('meta[name=keywords]').attr('content', item.metaKeywords)
    }
  },
  mounted() {
    const $this = this
    $this.getTopBrandList().then(function(response) {
      $this.topBrands = response.data.Data
    })
  }
}
</script>
<style scoped>
.footerSec1 p {
  font-size: 12px;
}
.footer_ul {
  max-height: 134px;
  overflow: hidden;
}

.ps-footer h4 {
  margin-top: 20px;
}
.main_cat {
  font-weight: bold;

  padding-right: 5px;
  color: #000;
}
.main_cat span {
  font-weight: bold;

  padding-right: 5px;
  color: #000;
}
.brand_items {
  margin-right: 5px;
  font-weight: bold;
}
.router-link-active {
  display: inline-block;
}
</style>
