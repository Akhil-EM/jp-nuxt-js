<template>
  <div class="maxwidthproductmain">
    
    <template v-if="is_banner==true">
       <div class="product_discount_badge" v-if="offerBadge && Number.isInteger(product.specialPrice) && product.specialPrice!=0 && product.unitPrice >product.specialPrice ">-{{discountPercentage(product)}}%</div>
       <template v-if="isNewProduct(product.prDate) !=0 && isNewProduct(product.prDate)<=7">
          <div class="new_arrival_badge"  v-if="newBadge">New</div>
       </template>
       
    </template>
    <template v-else>
         
            <div :class="{'whilistIconwrapper':true}" >
                <a href="javascript:void(0)" @click="addToWishList(product)" :class="{'is-active':(product.IsWishlisted||feverate_status)}" :id="`wishlist_item_${product.productId}`">
                    <i class="fa fa-heart-o" aria-hidden="true"></i>
                </a>
            
            </div>
          <template v-if="Number.isInteger(product.specialPrice)&& product.specialPrice!=0 && product.unitPrice >product.specialPrice">
              <div class="percentageDivGreeen"><p>{{discountPercentage(product)}}% off</p></div>
          </template>

    </template>
    

   
    <div class="ps-product__thumbnail img_box"  >
      <router-link :to="`/Product-detail/${product.urlKey}`"  >
        <img :src="`${web_admin_url}${product.imageUrl}`" :alt="product.alt??product.prName"  @click="refreshPageEvent(product.urlKey)" />
    </router-link>
      <!-- <a  href="javascript:void(0)" @click="goToDetailpage(product.urlKey)">
          <img :src="`${web_admin_url}${product.imageUrl}`" alt="" />
      </a> -->
    </div>
    <div class="ps-product__container">
      <div class="ps-product__content">
         <router-link class="ps-product__title"  :to="`/Product-detail/${product.urlKey}`" >
         <span  @click="refreshPageEvent(product.urlKey)" >{{product.prName}}</span>
         </router-link>

        <div class="priceinfo">
           <template v-if="Number.isInteger(product.specialPrice)&& product.specialPrice!=0 && product.unitPrice >product.specialPrice">
                          <p class="current-price mb-0">{{currency}}{{product.specialPrice.toFixed(2)}}
                          
                          <span class="discount-price">
                              <del>{{currency}} {{product.unitPrice.toFixed(2)}}</del> 
                          </span>
                            </p>
                        </template>
                        <template v-else>
                            <p class="current-price mb-0">{{currency}}{{product.unitPrice.toFixed(2)}}
                          
                          
                            </p>
                        </template>
        </div>
        <div class="cart-sec" v-if="product.stockAvailability !='Out of Stock'" >
        <div>
             <div :class="{'input-group inline-group':true,'hide_el':(isInCart=='View in cart'),'mob_cart':true}">
            <div class="input-group-prepend">
              <button class="btn btn-outline-secondary btn-minus" @click="sub()">
                <i class="fa fa-minus"></i>
              </button>
            </div>
            <input class="form-control quantity" min="0" :ref="product.urlKey" name="quantity" v-model="count" type="number"/>
            <div class="input-group-append">
              <button class="btn btn-outline-secondary btn-plus" @click="add()">
                <i class="fa fa-plus"></i>
              </button>
            </div>
            </div>
        </div>
        <div>
             
          <div :class="{'addcart-btn':true,'w-100':(isInCart=='View in cart')}" @click="addtocart(product.urlKey,product.wishlistId)">
                      <span></span>
                       <template v-if="cart_ajax=='closed'">
                            {{isInCart}}
                        </template>
                        <template v-if="cart_ajax=='open' && cart_product_url_key==product.urlKey">
                            <ButtonLoader :loaderColor="loaderColor"
                                            :loaderStyle="loaderStyle"
                                            :cart_ajax="cart_ajax">
                            </ButtonLoader>
                        </template>
                        <template v-if="cart_ajax=='open' && cart_product_url_key!=product.urlKey">
                                {{isInCart}}
                        </template>
           </div>
        </div>
    
        </div>
        <template v-else>
                <div class="cart-sec w-100">                                            
                    <div class="out_stock">out of stock</div>                                           
            </div> 

        </template>
      </div>
    </div>
  </div>
</template>
<script>
import ButtonLoader from '../components/ButtonLoader';
import Config from  '../config';
import { mapGetters, mapActions } from "vuex";

import helper from  '../helper/helper';
import $ from "jquery";
import moment from 'moment';

export default {
  name: "ProductCard",
  props: [
    "product",
    "web_admin_url",
    "cart_ajax",
    "cart_product_url_key",
    "currency",
    "fevare_required",
    "feverate_status",
    "is_banner",
    "offerBadge",
    "newBadge"

  ],
  components: {
     ButtonLoader
  },
  data() {
    return {
      count: 1,
      loaderColor: "#fff",
      loaderStyle: {
        width: "35px",
      },
      guest_id:'',
      cust_id:null,
    };
  },
  mounted(){
        this.admin_api_header = Config.ADMIN_API_HEADER;
        this.guest_id = localStorage.getItem("guestId");
        this.cust_id = localStorage.getItem("custId");
  },
  methods: {
    ...mapActions(["storeCustomerWishlist", "removeCustomerWishlist","getCustomerWishlist"]),
    goToDetailpage(urlkey) {      
      this.$router.push({ path: `/product-detail/${urlkey}` });
      
    },
      refreshPageEvent(product_urlKey){
        
            this.$emit('refreshSliderdata',product_urlKey);
    }
    ,
    discountPercentage(product) {
      if (product.unitPrice > product.specialPrice) {
        let difference = product.unitPrice - product.specialPrice;

        let percentage = (difference * 100) / product.unitPrice;

        return percentage.toFixed(2);
      } else {
        return 0;
      }
    },
    addtocart(url_key,wishlistId='') {
      let productQty = this.$refs[url_key].value;
      let productInfo = {
        url_key: url_key,
        product_qty: productQty,
      };

     

      if (this.isInCart == "Add") {
        if(this.feverate_status !=true){
             this.$emit("addToCart", productInfo);
        }else{
            let payload ={
              "custId":localStorage.getItem("custId"),
              "guestId":null,
              "WishlistId":wishlistId,
              "productQty":productQty,
              "vendorUrlkey":Config.VENDOR_URL_KEY,
               "url_key": url_key,
              }
            this.$emit("moveToCart",payload);
       
        }
       
      } else {
        $("#cart-mobile").css({ left: "unset", right: "0" });
        $(".ps-panel--sidebar").removeClass("active");
        $("#cart-mobile").addClass("active");
        $(".ps-site-overlay").addClass("active");
      }
    },
    add() {
      this.count++;
    },
    sub() {
      if (this.count > 1) {
        this.count--;
      } else {
        this.count = 1;
      }
    },
   
      addToWishList(productInfo){
        let isLoggedIn =  helper.isLoginedUser();
         let $this = this;
        if(isLoggedIn == true){

            if($(`#wishlist_item_${productInfo.productId}`).hasClass('is-active')){
               
                    let payload ={
                                'custId':localStorage.getItem("custId"),
                                'guestId':"",                           
                                'urlKey':productInfo.urlKey,
                                
                            }; 
                      $(`#wishlist_item_${productInfo.productId}`).removeClass('is-active');                                 
                    $this.removeCustomerWishlist(payload).then(function(response){
                         console.log(productInfo.productId);
                         
                        $this.$toast.success(`${response.data.Message}`);
                    });
            }else{
                $(`#wishlist_item_${productInfo.productId}`).addClass('is-active');
                    
                        let payload ={
                                'custId':($this.cust_id!=null?$this.cust_id:''),
                                'guestId':($this.cust_id==null?$this.guest_id:''),                           
                                'urlKey':productInfo.urlKey,
                                
                            };
                    
                    $this.storeCustomerWishlist(payload).then(function(response){
                        
                        
                        $this.$toast.success(`${response.data.Message}`);
                    });
            }
                   
            }else{
                 document.getElementById("login_popup_link").click(); 
                // this.$router.push({'path':'/',query:{'login':'failed'}});
            }
        }, isNewProduct(proDate){
              let diff =0;
            if(this.product.prDate !=''){
              diff=  moment().diff(proDate,'Days');
            }
            
            return diff;
      
        }
  },
  computed: {
    ...mapGetters(["getcartList"]),
    isInCart() {
      let $this = this;
      let addcartBtnText = "Add";
      this.getcartList.forEach(function(cart) {
        console.log(` ${cart.urlKey}==${$this.product.urlKey}`);
        if (cart.urlKey == $this.product.urlKey) {
          addcartBtnText = "View in cart";
          console.log(addcartBtnText);
        }
      });
      return addcartBtnText;
    },

  },

};
</script>
<style scoped>
.maxwidthproductmain .ps-product__title {
    height: 40px;
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
.percentageDivGreeen{
    z-index: 1;
}
.whilistIconwrapper{
    z-index: 99;
}
.whilistIconwrapper:hover {   
    z-index: 99;
}
.is-active{
    background: #d81c24;
  
}
.whilistIconwrapper i {
     color:#fff
    }
.maxwidthproductmain  .img_box {  
    width: 87px!important;
    min-height: 119px;
    }
.maxwidthproductmain  .img_box img{ margin: 0 auto!important; width: 100% !important;}
 .cart-sec{
   min-width: 100px;
 }   
 .hide_el{
   display: none;
 }
 .maxwidthproductmain .ps-product__title {
    font-size: 15px;
    font-weight: bold;
    color: #000;
    line-height: 20px;
    display: block;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    max-width: 217px;
    margin: 7px auto 10px;
    height: 20px!important;
}
.new_arrival_badge{
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
.product_discount_badge{
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


</style>
