<template >
     <div class="ps-section__content">

                    <carousel :itemsToShow="sliderCont"  >
                            <slide v-for="product in products" :key="product.productId">
                                          <div class="ps-product">
                                                <div class="ps-product__badge" v-if="offerBadge && product.specialPrice !=0 ">-{{discountPercentage(product)}}%</div>
                                                <div class="ps-product__badge arrivals"  v-if="newBadge">New</div>
                                        <div class="ps-product__thumbnail">
                                            <router-link :to="`/Product-detail/${product.urlKey}`">
                                                <img :src="`${web_admin_url}${product.imageUrl}`" alt="" @click="refreshPageEvents(product.urlKey)" />
                                            </router-link>
                                           
                                            
                                        </div>
                                        <div class="ps-product__container">
                                            <div class="ps-product__content">
                                                <router-link class="ps-product__title" :to="`/Product-detail/${product.urlKey}`" >
                                                {{truncateString(product.prName,30)}}
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
                                              
                                                 <!-- <template v-if="Number.isInteger(product.specialPrice)&& product.specialPrice!=0 && product.unitPrice >product.specialPrice">
                                                    <p class="ps-product__price sale">
                                                        <del>{{currency}} {{product.unitPrice.toFixed(2)}}</del> <span class="green-text">Save {{currency}} {{product.specialPrice}} ({{discountPercentage(product)}}%)</span>
                                                    </p>
                                                 </template>
                                                 <template v-else>
                                                     <p style="height:17px"></p>
                                                 </template> -->
                                                </div>
                                                <template  v-if="product.stockAvailability !='Out of Stock'">
                                                    <QantityBox
                                                        :cart_product_url_key="cart_product_url_key"
                                                        :cart_ajax="cart_ajax"
                                                        @addToCart="addtocart($event)"
                                                        :product="product"
                                                        :button_label="button_label"
                                                        ></QantityBox>
                                                </template>
                                                  <template v-else>
                                                    <div class="cart-sec " style="width:173px">                                            
                                                        <div class="out_stock" style="height: 34px;">out of stock</div>                                           
                                                </div> 

                                            </template>
                                                
                                            </div>
                                        
                                        </div>
                                    </div>              
                            </slide>

                            <template #addons>
                            <navigation />
                           
                            </template>
                        </carousel>
                   
                </div>
</template>
<script>
import Config from  '../config';
import helper from '@/helper/helper'
import QantityBox from '../components/cart/QantityBox';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
export default {
    name:'ProductSlider',
    props:[
        'products',
        'offerBadge',
        'newBadge'
    ],
    data(){
            return {
                'web_admin_url':'',
                'currency':'',
                'cart_ajax':'closed',
                'cart_product_url_key':'',
                'vendor_url_key':'',
                'guest_id':'',
                'cust_id':null,
                'pincode':'',
                'window': {
                    width: 0,
                    height: 0
                },
                'sliderCont':'5',
                'button_label':'Add'
                

            }
    },
    components: {
       Carousel,
        Slide,       
        Navigation,
        QantityBox,
      
        
  },mounted(){
          this.web_admin_url =Config.WEB_ADMIN_URL;
          this.currency = Config.CURRECNCY;         
          this.cust_id=localStorage.getItem("custId");
            if(this.cust_id==null){
                this.guest_id =localStorage.getItem("guestId");
            }

            
         
    },
    methods:{
         discountPercentage(product){
            if(product.unitPrice >product.specialPrice){

                 let difference= product.unitPrice -product.specialPrice;

                let percentage = (difference *100)/product.unitPrice;

                return percentage.toFixed(2);

            }else{
                return 0;
            }

        },
            addtocart(productInfo){
            let urlKey = productInfo.url_key;           
            let productQty = productInfo.product_qty;
            let $this = this;
            $this.cart_ajax ='open';
            $this.cart_product_url_key =productInfo.url_key;
            let payload ={
                'cusId':Number(($this.cust_id!=null?$this.cust_id:'')),
                'guestId':($this.cust_id==null?$this.guest_id:''),
                'pincode':$this.pincode,
                'urlKey':urlKey,
                'productQty':productQty,
                'vendorUrlkey': $this.vendor_url_key
            };
           

             $this.$store.dispatch("addToCart",{payload:payload,toast:$this.$toast}).then(function(response){
                 console.log(response);
                    $this.cart_ajax ='closed';
                    $this.cart_product_url_key ='';
                    $this.customerCart = $this.$store.state.customer_cart;
                    $this.$emit('cartUpdated',$this.customerCart);
                    $this.button_label ='View in cart';
                    // $(`.is_in_cart_${productInfo.url_key}`).html('View in cart');
                   
            });

        },
         refreshPageEvents(product_urlKey){
          
            this.$emit('refreshPage',product_urlKey);
        },
        handleResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
            this.calculateSlideCount(window.innerWidth);
        },
        calculateSlideCount(width){
            console.log(width);
                if(width <=360){
                    this.sliderCont=1;
                }else if(width>360 && width <=450){
                     this.sliderCont=1;
                }else if(width>450 && width <=570){
                    this.sliderCont=2;
                }else if(width>570 && width <=767){
                    this.sliderCont=2;
                }else if(width>767 && width <=992){
                    this.sliderCont=3;
                }else if(width>992 && width <=1200){
                    this.sliderCont=5;
                }else if(width>1200 && width <=1920){
                    this.sliderCont=6;
                }else{
                    this.sliderCont=6; 
                }
        },
         truncateString(string,number){
           return  helper.truncateString(string,number);
        } 
    }, 
    created(){
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    unmounted() {
        window.removeEventListener('resize', this.handleResize);
    },
    

   


    
}
</script>
<style scoped>
.current-price{
    font-weight: 900;
    font-size: 15px;
}
 .carousel__slide{
    width: 17.5% ;
}
.ps-product__title{
    height: 34px;
}

.discount-price{
    color: #a2a2a2;
    font-size: 16px;
}


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
}
    
</style>