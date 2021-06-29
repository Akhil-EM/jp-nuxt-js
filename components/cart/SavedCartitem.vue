<template >
      <div>
        <template v-if="fetctsavedCartItems!=''">            
                <div class="cartHederBorderMain"  v-for="(cartItem,index) in fetctsavedCartItems" :key="index">
                    <div class="headerFloat1">
                        <div class="subcartImgDivWrapper">
                        <div class="subcartImgDiv">
                            <div class="imag_box">
                                <img :src="`${web_admin_url}${cartItem.imageUrl}`" :alt="cartItem.prName"  />
                            </div>
                            
                        </div>
                        <h4>
                            {{cartItem.prName}}
                        </h4>
                        <!-- <span>200g</span> -->
                        <template v-if="Number.isInteger(cartItem.specialPrice)&& cartItem.specialPrice!=0 && cartItem.unitPrice >cartItem.specialPrice">
                                  
                                    <label>OUR PRICE :<strong>{{currency}} {{cartItem.specialPrice.toFixed(2)}}</strong></label>
                            </template>
                            <template v-else>
                                 <label>OUR PRICE :<strong>{{currency}}  {{cartItem.unitPrice.toFixed(2)}}</strong></label>
                            </template>
                        
                        <ul class="deleteUlNav">
                            <li><a href="javascript:void(0)"  @click="removeSaveforlater(cartItem.urlKey)">Delete</a></li>
                            <li>
                                <template v-if="cartItem.stockAvailability !='Out of Stock'">
                                     <template v-if="cartItem.status==true">
                                          <a href="javascript:void(0)" @click="moveToCart(cartItem)">Move to cart</a>
                                     </template>
                                     <template v-else>
                                          <a href="javascript:void(0)" class="text-danger">Not available</a>
                                     </template>
                                    
                                </template>
                                <template v-else>
                                         <a href="javascript:void(0)" class="text-danger">Out of stock</a>
                                </template>
                               
                            </li>
                        </ul>
                        </div>
                    </div>
                    <div class="priceMobileDivMain">
                        <div class="headerFloat2" >
                             <!-- <CartQtyCounter @updateCartQty="updateCart($event)" 
                                :product_url_key="cartItem.urlKey"
                                :cartItemId="cartItem.cartItemsId"
                                :qtyCont="cartItem.qty"
                            ></CartQtyCounter> -->
                        </div>
                        <div class="headerFloat2 youSaveDiv">
                            <template v-if="getSavingsText(index) !=''">
                                 <p> {{getSavingsText(index)}}</p>
                            </template>
                            <template v-else>
                                <p style="visibility: hidden;">0</p>
                            </template>
                       
                        </div>
                        <div class="headerFloat2">
                        <label>{{currency}} {{getItemSubTotal(index)}}</label>
                        </div>
                    </div>
                </div>
          
        </template>
        <template v-else>
           
          <div class="empty_cart">
                    <p>Saved Cart is empty</p>
           </div>
               
            
        </template>
        </div>
</template>
<script>
import Config from  '../../config';
import helper from  '../../helper/helper';
// import CartQtyCounter from './CartQtyCounter';
import {  mapActions, mapGetters } from "vuex";
export default {
    name:'SavedCartItem',
    props:[
        'savedcartData',
        'cart_ajax',
        'cart_type'
    ],
    watch:{
        savedcartData(savedData){
            this.cartData = savedData;
        }
    },
    components:{
        // CartQtyCounter
    },
    computed:{
        ...mapGetters(['fetctsavedCartItems']),
    },
    data(){
        return {
            'web_admin_url':'',
            'currency':'',
            'cartData':[]
            
            
        }
    },mounted(){
        this.web_admin_url =Config.WEB_ADMIN_URL;
        this.currency =Config.CURRECNCY;
    },methods:{
        ...mapActions(['removeSaveCartItem','movedfromSaveedToCart']),
        getItemSubTotal(index){
            let subTotal =0;
            if(this.fetctsavedCartItems!=''){
                subTotal = this.fetctsavedCartItems[index].unitPrice;
            }

            return subTotal.toFixed(2);
        },
        getSavings(index){
               let discount = 0;
                if(this.cartData!=''){
                     let specialPrice =0;
                      let unitPrice=0;
                      let cartQty='';
                    if(typeof this.fetctsavedCartItems[index] == 'undefined'){
                             specialPrice = 0;
                             unitPrice=0;
                    }else{
                          specialPrice = this.fetctsavedCartItems[index].specialPrice;
                           unitPrice =this.fetctsavedCartItems[index].unitPrice; 
                           cartQty = this.fetctsavedCartItems[index].qty??1;
                    }
                   
                                  
                    if(Number.isInteger(specialPrice) && Number.isInteger(unitPrice) && unitPrice >specialPrice && specialPrice!=0 ){
                        discount = unitPrice -specialPrice;
                        discount = discount*cartQty;
                        
                    }
                    
                }

                

             return discount.toFixed(2);

        },
        getdiscountPercentage(index){
            let savingsAmount = this.getSavings(index);
           
            let discountPercentageAmt =0;                
            if(savingsAmount!=0){
                  let unitPrice =this.fetctsavedCartItems[index].unitPrice; 
                  console.log(savingsAmount);
                   discountPercentageAmt= helper.calculatePercentage(unitPrice,savingsAmount);
            }

            return  discountPercentageAmt;
        },

        getSavingsText(index){
            let savingsText='';
            let savingsAmount = this.getSavings(index);
            let savingsPercentage =this.getdiscountPercentage(index);
            if(savingsAmount!=0){
                savingsText=`You Save ${this.currency} ${savingsAmount} (${savingsPercentage.toFixed(2)}%)`;
            }else{
               savingsText =``; 
            }

            return savingsText;
        },
        updateCart(){
           // this.$emit('updateCartQantity',cartItemInfo);
        },
        removeCartItem(cartItemId){          
         this.$emit('deleteCartItem',cartItemId)
        },
        saveToLaterCatrt(cartItem){
             let isLoggedIn =  helper.isLoginedUser();               
                if(isLoggedIn == true){
                    this.$emit('placetoSavelater',cartItem);
                }else{
                    document.getElementById("login_popup_link").click(); 
                }
            
        },
        removeSaveforlater(urlKey){
            let $this =this;
            $this.removeSaveCartItem(urlKey).then(function(response){
                console.log(response);
            });
        },
         moveToCart(cartItem){
             let productUrlKey= cartItem.urlKey;
            
            let guestId=null;
            let custId =null;
            custId=localStorage.getItem("custId");
            if(custId==null){
                guestId =localStorage.getItem("guestId");
            }
             let $this =this;
             let payload ={
                 "urlKey":productUrlKey,
                    "productQty":1,
                    "cusId":custId,
                    "guestId":guestId,
                    "vendorUrlKey":Config.VENDOR_URL_KEY
                }
             $this.movedfromSaveedToCart(payload).then(function(response){
                     $this.$toast.success(`${response.data.Message}`);
             }).catch(function(error){
                    $this.$toast.error(`${error.response}`);
             });

         },
                          

    
    }
}
</script>
<style scoped>
    .empty_cart{
        width: 100%;
        margin:20px;
    }
    .empty_cart p{
        text-align: center;
    }
    .imag_box{
        width: 100px; 
       overflow: hidden;
    }

@media only screen and (max-width: 600px) {
   .deleteUlNav{
       bottom:0px;
   }
}
</style>