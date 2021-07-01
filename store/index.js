import axios from 'axios'
import helper from '@/helper/helper'
import Config from '../config'
export const state = () => ({
  category_list: [],
  customer_cart: [],
  cart_summary: [],
  home_banners: [],
  top_category: [],
  deal_of_theday_products: [],
  home_promobanner_2: [],
  home_dailyShoping: [],
  popular_product: [],
  recent_viewed_product: [],
  promo_fullwidth_banner: [],
  is_customer_loggined: false,
  customer_info: [],
  customer_address_list: [],
  customer_order_list: [],
  customer_wishlist_data: [],
  search_string: '',
  customerCouponList: [],
  custOrderDetail: [],
  request_response: [],
  save_for_laterItems: [],
  county_list: [],
  state_list: [],
  pincodeList: [],
  deliverySlotes: [],
  home_mob_banners: [],
  top_brand_List: [],
  popupBannerData: [],
  vendorList: [],
  areaByVendor: [],
  companyPolicy: []
})

export const mutations = {
  async setCompanyPolicy(state, payload) {
    await (state.companyPolicy = payload)
  },
  async setAreaByVendorlist(state, payload) {
    await (state.areaByVendor = payload)
  },
  async setVendorList(state, payload) {
    await (state.vendorList = payload)
  },
  async setDeliverySlot(state, payload) {
    await (state.deliverySlotes = payload)
  },
  async setSaveForlater(state, payload) {
    await (state.save_for_laterItems = payload)
  },
  async setPincodeList(state, payload) {
    await (state.pincodeList = payload)
  },

  async setCategoryList(state, payload) {
    await (state.category_list = payload)
  },
  async setCartItem(state, payload) {
    await (state.customer_cart = payload)
  },

  async setCartSummary(state, payload) {
    await (state.cart_summary = payload)
  },
  async setHomeBanners(state, payload) {
    await (state.home_banners = payload)
  },
  async setMobHomeBanners(state, payload) {
    await (state.home_mob_banners = payload)
  },
  async setTopCategoryBanners(state, payload) {
    await (state.top_category = payload)
  },
  async setDealoftheDayProducts(state, payload) {
    await (state.deal_of_theday_products = payload)
  },
  async setHomePromoBanner2(state, payload) {
    await (state.home_promobanner_2 = payload)
  },
  async setDailyShopping(state, payload) {
    await (state.home_dailyShoping = payload)
  },
  async setPopularProduct(state, payload) {
    await (state.popular_product = payload)
  },
  async setRecentViewedProduct(state, payload) {
    await (state.recent_viewed_product = payload)
  },
  async setPromoFullWidthBanner(state, payload) {
    await (state.promo_fullwidth_banner = payload)
  },
  async setIsCustomerLoggined(state, payload) {
    await (state.is_customer_loggined = payload)
  },
  async setCustomerInfo(state, payload) {
    await (state.customer_info = payload)
  },
  async setCustomerAddressList(state, payload) {
    await (state.customer_address_list = payload)
  },
  async setCustomerOrderList(state, payload) {
    await (state.customer_order_list = payload)
  },
  async setSearchString(state, payload) {
    await (state.search_string = payload)
  },
  async setCustomerWishlist(state, payload) {
    await (state.customer_wishlist_data = payload)
  },
  async setCustomerCouponList(state, payload) {
    await (state.customerCouponList = payload)
  },
  async setCustOrderDetail(state, payload) {
    await (state.custOrderDetail = payload)
  },
  async setRequestResponse(state, payload) {
    await (state.request_response = payload)
  },
  async setCountryList(state, payload) {
    await (state.county_list = payload)
  },
  async setStateList(state, payload) {
    await (state.state_list = payload)
  },
  async setTopbrands(state, payload) {
    await (state.top_brand_List = payload)
  },
  async setPopupBanner(state, payload) {
    await (state.popupBannerData = payload)
  }
}

export const getters = {
  getcartList(state) {
    return state.customer_cart
  },
  getCategoryList(state) {
    return state.category_list
  },
  getCartSummaryList(state) {
    return state.cart_summary
  },
  getHomeBanner(state) {
    return state.home_banners
  },
  getHomeMobBanners(state) {
    return state.home_mob_banners
  },
  getTopCategories(state) {
    return state.top_category
  },
  getDealoftheDayProducts(state) {
    return state.deal_of_theday_products
  },
  getPromoBanner2(state) {
    return state.home_promobanner_2
  },
  getDailyShoppingBaner(state) {
    return state.home_dailyShoping
  },
  getPopularProducts(state) {
    return state.popular_product
  },
  getRecentProducts(state) {
    return state.recent_viewed_product
  },
  getPromoFullWidthBanner(state) {
    return state.promo_fullwidth_banner
  },
  isCustomerLoggined(state) {
    return state.is_customer_loggined
  },
  getCustomerInfo(state) {
    return state.customer_info
  },
  fetchCustomerAddressList(state) {
    return state.customer_address_list
  },
  getSearchString(state) {
    return state.search_string
  },
  fetctCustomerWishlist(state) {
    return state.customer_wishlist_data
  },
  fetctCustomerOrderlist(state) {
    return state.customer_order_list
  },
  fetctCustomerCouponlist(state) {
    return state.customerCouponList
  },
  fetctsavedCartItems(state) {
    return state.save_for_laterItems
  },
  fetctPincodeList(state) {
    return state.pincodeList
  },
  fetchTopBrandList(state) {
    return state.top_brand_List
  },
  fetchPopupbannerData(state) {
    return state.popupBannerData
  },
  fetchCompanyPolicyData(state) {
    return state.companyPolicy
  }
}
export const actions = {
  getCompanyPolicy({ commit }, header) {
    console.log(header)
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.BASE_URL}CompanyPolicy`, header)
        .then(function(response) {
          if (response.status == 200) {
            resolve(response)
            commit('setCompanyPolicy', response.data.Data)
          }
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },

  getAreaByVendor({ commit }, header) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.BASE_URL}GetAreaByVendor`, header)
        .then(function(response) {
          if (response.status == 200) {
            resolve(response)
            commit('setAreaByVendorlist', response.data.Data)
          }
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },

  getVendorList({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.BASE_URL}Vendor/vendorsList`, Config.ADMIN_API_HEADER)
        .then(function(response) {
          if (response.status == 200) {
            resolve(response)
            commit('setVendorList', response.data.Data)
          }
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },

  getPincodeInfo({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${Config.BASE_URL}Customer/getPincodeList?term=${payload}`,
          Config.ADMIN_API_HEADER
        )
        .then(function(response) {
          if (response.status == 200) {
            resolve(response)
            commit('setRequestResponse', response.data.Data)
          }
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },

  orderCancel({ dispatch }, orderID) {
    return new Promise((resolve, reject) => {
      const custId = localStorage.getItem('custId')
      axios
        .get(
          `${
            Config.BASE_URL
          }Order/CancelOrder?orderId=${orderID}&custId=${custId}`,
          Config.CUSTOMER_API_HEADER
        )
        .then(function(response) {
          if (response.status == 200) {
            dispatch('getCustomerOrders')
            resolve(response)
          }
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },
  orderReturn({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${Config.BASE_URL}Order/ReturnRequest`,
          payload,
          Config.CUSTOMER_API_HEADER
        )
        .then(function(response) {
          if (response.status == 200) {
            dispatch('getCustomerOrders')
            resolve(response)
          }
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },

  switchDeliveryMod({ dispatch }, delmod) {
    return new Promise((resolve, reject) => {
      const custId = localStorage.getItem('custId')
      axios
        .get(
          `${
            Config.BASE_URL
          }Order/UpdateDeliveryMode?custId=${custId}&deliveryMode=${delmod}`,
          Config.CUSTOMER_API_HEADER
        )
        .then(function(response) {
          if (response.status == 200) {
            const data = {
              cusId: custId,
              guestId: 'NULL'
            }
            dispatch('getCart', data)

            resolve(response)
          }
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },

  getDeliverySlot({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${Config.BASE_URL}Order/GetTimeSlot?vendorUrlkey=${
            Config.VENDOR_URL_KEY
          }&pincodeId=${Config.PINCODE_ID}`,
          Config.CUSTOMER_API_HEADER
        )
        .then(function(response) {
          if (response.status == 200) {
            resolve(response)
            commit('setDeliverySlot', response.data.Data)
          }
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },

  getPincodeList({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${Config.BASE_URL}Customer/getPincodeList?term=`,
          Config.ADMIN_API_HEADER
        )
        .then(function(response) {
          if (response.status == 200) {
            resolve(response)
            commit('setPincodeList', response.data.Data)
          }
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },

  getCountryList({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.BASE_URL}CountryList`, Config.ADMIN_API_HEADER)
        .then(function(response) {
          if (response.status == 200) {
            resolve(response)
            commit('setCountryList', response.data.Data)
          }
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },
  getStateList({ commit }, country) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${Config.BASE_URL}StateList?CountryId=${country}`,
          Config.ADMIN_API_HEADER
        )
        .then(function(response) {
          if (response.status == 200) {
            resolve(response)
            commit('setStateList', response.data.Data)
          }
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },

  addToCartSavelater({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${Config.BASE_URL}Order/InsertSaveForLater`,
          payload,
          Config.ADMIN_API_HEADER
        )
        .then(function(response) {
          if (response.status == 200) {
            resolve(response)
            dispatch('getSaveCartList', payload)
            const data = {
              cusId: payload.custId,
              guestId: payload.guestId
            }
            dispatch('getCart', data)
          }
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },
  getSaveCartList({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${Config.BASE_URL}Order/saveForLaterList?custId=${
            payload.custId
          }&guestId=${payload.guestId}`,
          Config.ADMIN_API_HEADER
        )
        .then(function(response) {
          if (response.status == 200) {
            commit('setSaveForlater', response.data.Data)
            resolve(response)
          }
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },
  async removeSaveCartItem({ commit, state }, urlKey) {
    if (urlKey != '') {
      let guestId = null
      let custId = null
      custId = localStorage.getItem('custId')
      if (custId == null) {
        guestId = localStorage.getItem('guestId')
      }

      axios
        .post(
          `${
            Config.BASE_URL
          }Order/DeleteSaveForLater?custId=${custId}&guestId=${guestId}&urlKey=${urlKey}`,
          {},
          Config.ADMIN_API_HEADER
        )
        .then(function(response) {
          if (response.status == 200) {
            let cartItems = []
            if (state.save_for_laterItems != '') {
              cartItems = state.save_for_laterItems

              cartItems = cartItems.filter(function(item) {
                if (item.urlKey == urlKey) {
                  return false
                }
                return true
              })

              commit('setSaveForlater', cartItems)
            }
          }
        })
    }
  },

  movedfromSaveedToCart({ dispatch }, payload) {
    // let guestId=null;
    // let custId =null;
    // custId=localStorage.getItem("custId");
    // if(custId==null){
    //     guestId =localStorage.getItem("guestId");
    // }

    return new Promise((resolve, reject) => {
      axios
        .post(
          `${Config.BASE_URL}Order/MoveFromSaveForLaterToCart`,
          payload,
          Config.ADMIN_API_HEADER
        )
        .then(function(response) {
          if (response.status == 200) {
            const data1 = {
              custId: payload.cusId,
              guestId: payload.guestId
            }

            dispatch('getSaveCartList', data1)

            const data2 = {
              cusId: payload.cusId,
              guestId: payload.guestId
            }
            dispatch('getCart', data2)
            resolve(response)
          }
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },

  storeCategoryList({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.BASE_URL}Category`)
        .then(function(response) {
          commit('setCategoryList', response.data.Data)
          resolve(response)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },
  async addToCart({ dispatch }, { payload, toast }) {
    await axios
      .post(
        `${Config.BASE_URL}Order/AddToCart`,
        payload,
        Config.ADMIN_API_HEADER
      )
      .then(function(response) {
        if (response.status == 200) {
          return dispatch('getCart', payload)
        }
      })
      .catch(function(error) {
        toast.error(error.response.data.Message)
      })
  },
  getCart({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${Config.BASE_URL}Order/CartList?cusId=${payload.cusId}&guestId=${
            payload.guestId
          }`,
          Config.ADMIN_API_HEADER
        )
        .then(function(response) {
          if (response.status == 200) {
            commit('setCartItem', response.data.Data.cartList)
            dispatch('storeCartSummary')
          }
          resolve(response)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },
  async removeCartItem({ commit, dispatch, state }, cartItemId) {
    if (cartItemId != '') {
      await axios
        .get(`${Config.BASE_URL}Order/RemoveCartItem?cartItemId=${cartItemId}`)
        .then(function(response) {
          if (response.status == 200) {
            let cartItems = []
            if (state.customer_cart != '') {
              cartItems = state.customer_cart

              cartItems = cartItems.filter(function(item) {
                if (item.cartItemsId == cartItemId) {
                  return false
                }
                return true
              })

              commit('setCartItem', cartItems)
              let guestId = null
              let custId = null
              custId = localStorage.getItem('custId')
              if (custId == null) {
                guestId = localStorage.getItem('guestId')
              }
              const data2 = {
                cusId: custId,
                guestId: guestId
              }
              dispatch('getCart', data2)
            }
          }
        })
    }
  },
  async storeCartSummary({ commit }) {
    let guestId = null
    let custId = null
    custId = localStorage.getItem('custId')
    if (custId == null) {
      guestId = localStorage.getItem('guestId')
    }

    await axios
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
          commit('setCartSummary', response.data.Data)
        }
      })
  },
  async storeHomeBammer({ commit, dispatch }) {
    dispatch('fetchTopCategoryList')
    await axios
      .get(`${Config.BASE_URL}Products/HomeProducts`, Config.ADMIN_API_HEADER)
      .then(function(response) {
        if (response.status == '200') {
          commit('setHomeBanners', response.data.Data.MainBanners)
          commit('setHomePromoBanner2', response.data.Data.Promo21)
          commit('setPromoFullWidthBanner', response.data.Data.PromoFull)
          commit('setMobHomeBanners', response.data.Data.MobileMainBanners)
          commit('setDailyShopping', response.data.Data.DailyShop2)
          commit('setPopupBanner', response.data.Data.PopupBanner)
        }
      })
  },
  async fetchTopCategoryList({ commit }) {
    await axios
      .get(`${Config.BASE_URL}category/TopCategory`, Config.ADMIN_API_HEADER)
      .then(function(response) {
        if (response.status == '200') {
          commit('setTopCategoryBanners', response.data.Data)
        }
      })
  },

  async storeDealoftheDayProducts({ commit }) {
    let guestId = null
    let custId = null
    custId = localStorage.getItem('custId')
    if (custId == null) {
      guestId = localStorage.getItem('guestId')
    }

    await axios
      .get(
        `${Config.BASE_URL}DealOfDay?custId=${guestId}&guestId=${guestId}`,
        Config.ADMIN_API_HEADER
      )
      .then(function(response) {
        if (response.status == '200') {
          commit('setDealoftheDayProducts', response.data.Data)
        }
      })
  },
  async setPopularProduct({ commit }) {
    let guestId = null
    let custId = null
    custId = localStorage.getItem('custId')
    if (custId == null) {
      guestId = localStorage.getItem('guestId')
    }

    await axios
      .get(
        `${Config.BASE_URL}PopularProduct?custId=${custId}&guestId=${guestId}`,
        Config.ADMIN_API_HEADER
      )
      .then(function(response) {
        if (response.status == '200') {
          commit('setPopularProduct', response.data.Data)
        }
      })
  },

  async storeRecentViewedProducts({ commit }) {
    let guestId = ''
    let custId = null
    custId = localStorage.getItem('custId')
    if (custId == null) {
      guestId = localStorage.getItem('guestId')
    }

    await axios
      .get(
        `${Config.BASE_URL}RecentProducts?custId=${custId}&guestId=${guestId}`,
        Config.CUSTOMER_API_HEADER
      )
      .then(function(response) {
        if (response.status == '200') {
          commit('setRecentViewedProduct', response.data.Data)
        }
      })
  },
  customerOtpLogin({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${Config.BASE_URL}LoginOtpSend?UserName=${payload.userName}`,
          Config.ADMIN_API_HEADER
        )
        .then(function(response) {
          commit('setRequestResponse', response.data)
          resolve(response)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },
  customerLoginOtpVerify({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${Config.BASE_URL}LoginOtpVerify?OtpUrlKey=${payload.otp_url}&Otp=${
            payload.otp
          }`,
          Config.ADMIN_API_HEADER
        )
        .then(function(response) {
          if (response.status == '200') {
            commit('setIsCustomerLoggined', true)
            commit('setCustomerInfo', response.data.Data)
            localStorage.setItem('custId', response.data.Data.custId)
            localStorage.setItem('customer_token', response.data.Data.token)
            dispatch('mergeCustomerCart')
          }
          resolve(response)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },
  customerLogin({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${Config.BASE_URL}Account/Login`,
          payload,
          Config.ADMIN_API_HEADER
        )
        .then(function(response) {
          if (response.status == '200') {
            commit('setIsCustomerLoggined', true)
            commit('setCustomerInfo', response.data.Data)
            localStorage.setItem('custId', response.data.Data.custId)
            localStorage.setItem('customer_token', response.data.Data.token)
            dispatch('mergeCustomerCart')
          }
          resolve(response)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },
  async reloadCustomerInfo({ commit, state }) {
    const custId = localStorage.getItem('custId')
    if (state.customer_info == '' && custId != null) {
      await axios
        .get(
          `${Config.BASE_URL}CustomerDetails?custId=${custId}`,
          Config.CUSTOMER_API_HEADER
        )
        .then(function(response) {
          if (response.status == '200') {
            commit('setCustomerInfo', response.data.Data)
            commit('setIsCustomerLoggined', true)
          }
        })
        .catch(function(error) {
          if (error.response.status) {
            helper.logout()
          }
        })
    }
  },

  async mergeCustomerCart({ dispatch }) {
    const custId = localStorage.getItem('custId')
    const guestId = localStorage.getItem('guestId')
    if (custId != '' && guestId != '') {
      const payload = {
        custId: custId,
        guestId: guestId
      }

      await axios
        .post(
          `${Config.BASE_URL}Order/MergeUserCart`,
          payload,
          Config.ADMIN_API_HEADER
        )
        .then(function(response) {
          if (response.status == 200) {
            const payload = {
              cusId: custId != null ? custId : '',
              guestId: guestId != null ? guestId : ''
            }

            return dispatch('getCart', payload)
          }
        })
    }
  },
  async storeCustomerAddress({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${Config.BASE_URL}NewAddress`,
          payload,
          Config.CUSTOMER_API_HEADER
        )
        .then(function(response) {
          if (response.status == 200) {
            dispatch('getCustomerAddressList', payload)
          }
          resolve(response)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },
  async updateCustomerAddress({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${Config.BASE_URL}Customer/UpdateAddress`,
          payload,
          Config.CUSTOMER_API_HEADER
        )
        .then(function(response) {
          if (response.status == 200) {
            dispatch('getCustomerAddressList', payload)
          }
          resolve(response)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },

  async getCustomerAddressList({ commit }) {
    return new Promise((resolve, reject) => {
      const custId = localStorage.getItem('custId')
      axios
        .get(
          `${Config.BASE_URL}Order/CusAddressList?cusId=${custId}`,
          Config.CUSTOMER_API_HEADER
        )
        .then(function(response) {
          if (response.status == '200') {
            commit('setCustomerAddressList', response.data.Data)
            resolve(response)
          }
        })
        .catch(function(error) {
          if (error.response.status) {
            helper.logout()
          }
          reject(error)
        })
    })
  },

  async deleteCustomerAddress({ commit, state }, addressid) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${Config.BASE_URL}Customer/DelAddress/${addressid}`,
          Config.CUSTOMER_API_HEADER
        )
        .then(function(response) {
          if (response.status == '200') {
            let addressList = []
            if (state.customer_address_list != '') {
              addressList = state.customer_address_list

              addressList = addressList.filter(function(item) {
                if (item.custAdressId == addressid) {
                  return false
                }
                return true
              })

              commit('setCustomerAddressList', addressList)
            }
            resolve(response)
          }
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },
  async placeOrder({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${Config.BASE_URL}Order`, payload, Config.CUSTOMER_API_HEADER)
        .then(function(response) {
          if (response.status == 200) {
            const custId = localStorage.getItem('custId')
            const guestId = localStorage.getItem('guestId')
            const payload = {
              cusId: custId != null ? custId : '',
              guestId: guestId != null ? guestId : ''
            }
            dispatch('getCart', payload)
            dispatch('storeCartSummary')
          }
          resolve(response)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },

  async getCustomerOrders({ commit }) {
    const custId = localStorage.getItem('custId')
    await axios
      .get(
        `${Config.BASE_URL}Order/CustOrderList?cusId=${custId}`,
        Config.CUSTOMER_API_HEADER
      )
      .then(function(response) {
        if (response.status == '200') {
          commit('setCustomerOrderList', response.data.Data)
        }
      })
  },
  async storeSearchString({ commit }, payload) {
    commit('setSearchString', payload)
  },
  async storeCustomerWishlist({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${Config.BASE_URL}Order/InsertWishLists`,
          payload,
          Config.CUSTOMER_API_HEADER
        )
        .then(function(response) {
          if (response.status == 200) {
            dispatch('getCustomerWishlist', payload)
          }
          resolve(response)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },
  async removeCustomerWishlist({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${Config.BASE_URL}Order/InsertWishListsDel?custId=${
            payload.custId
          }&guestId=${payload.guestId}&urlKey=${payload.urlKey}`,
          payload,
          Config.CUSTOMER_API_HEADER
        )
        .then(function(response) {
          if (response.status == 200) {
            dispatch('getCustomerWishlist', payload)
          }
          resolve(response)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },
  async getCustomerWishlist({ commit }) {
    const custId = localStorage.getItem('custId')

    await axios
      .get(
        `${Config.BASE_URL}Order/WishLists?custId=${custId}&guestId=`,
        Config.CUSTOMER_API_HEADER
      )
      .then(function(response) {
        if (response.status == '200') {
          commit('setCustomerWishlist', response.data.Data)
        }
      })
  },
  async getCustomerCouponList({ commit }) {
    const custId = localStorage.getItem('custId')
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${Config.BASE_URL}CouponList?custId=${custId}`,
          Config.CUSTOMER_API_HEADER
        )
        .then(function(response) {
          if (response.status == '200') {
            commit('setCustomerCouponList', response.data.Data)
          }
          resolve(response)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },
  async applyCustomerOffer({ dispatch }, offerCode) {
    return new Promise((resolve, reject) => {
      const custId = localStorage.getItem('custId')
      const data = {
        custId: custId,
        ccode: offerCode,
        vendorurlkey: Config.VENDOR_URL_KEY
      }

      axios
        .post(
          `${Config.BASE_URL}Order/ApplyCouponCode`,
          data,
          Config.CUSTOMER_API_HEADER
        )
        .then(function(response) {
          if (response.status == 200) {
            const guestId = localStorage.getItem('guestId')
            const payload = {
              cusId: custId != null ? custId : '',
              guestId: guestId != null ? guestId : ''
            }
            dispatch('getCart', payload)
            dispatch('storeCartSummary')
          }
          resolve(response)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },
  async getCustOrderDetail({ commit }, orderId) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${Config.BASE_URL}Order/CustOrderItemList?orderId=${orderId}`,
          Config.CUSTOMER_API_HEADER
        )
        .then(function(response) {
          if (response.status == '200') {
            resolve(response)
          }
          commit('setCustOrderDetail', response.data.Data)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },

  async updatePassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${Config.BASE_URL}customer/ChangePassword`,
          payload,
          Config.CUSTOMER_API_HEADER
        )
        .then(function(response) {
          commit('setRequestResponse', response.data)
          resolve(response)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },
  async updateProfile({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${Config.BASE_URL}ProfileUpdate`,
          payload,
          Config.CUSTOMER_API_HEADER
        )
        .then(function(response) {
          axios
            .get(
              `${Config.BASE_URL}CustomerDetails?custId=${payload.custId}`,
              Config.CUSTOMER_API_HEADER
            )
            .then(function(response) {
              if (response.status == '200') {
                commit('setCustomerInfo', response.data.Data)
                commit('setIsCustomerLoggined', true)
              }
              // else if(response.status=='401'){
              //   helper.logout();
              // }
            })
          resolve(response)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },
  async submitContactform({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${Config.BASE_URL}Support`, payload, Config.ADMIN_API_HEADER)
        .then(function(response) {
          if (response.status == 200) {
            commit('setRequestResponse', response.data)
          }
          resolve(response)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },
  async sendOrderNotification({ commit }, orderID) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${Config.BASE_URL}OrderComplete?orderId=${orderID}`,
          Config.CUSTOMER_API_HEADER
        )
        .then(function(response) {
          if (response.status == 200) {
            commit('setRequestResponse', response.data)
          }
          resolve(response)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },
  async getTopBrandList({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.BASE_URL}BrandList`, Config.ADMIN_API_HEADER)
        .then(function(response) {
          if (response.status == 200) {
            commit('setTopbrands', response.data.Data)
          }
          resolve(response)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  }
}
