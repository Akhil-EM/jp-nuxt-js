<template >
      <div class="borderSummaryShadow">
              <div class="orderSummaryDivMain">
                  <a @click="goToCheckout()"  class="proceedBtnMain">    Proceed to CheckOut
                        <span><i class="fa fa-arrow-circle-right" aria-hidden="true" ></i></span></a>
                
                
              </div>
              <div class="borderSummaryWhite">
                <ul class="subTotalDivNav1">
                  <li><label>Subtotal</label> <span>{{(cartData!=''?getsubTotal:'0.00')}}</span></li>
                  <li>
                    Delivery Charges
                    <i class="fa fa-question-circle " aria-hidden="true"></i>
                    <span class="freeColorGreen">{{(cartData!=''?getDeliveryCharge:'0.00')}}</span>
                  </li>
                  <template v-if="cart_summary.couponAmount >0 " >
                       <li>
                            Coupon Discount                           
                            <span class="freeColorGreen">{{(cartData!=''?cart_summary.couponAmount.toFixed(2):'0.00')}}</span>
                        </li>
                        
                  </template>
                       <li v-if="cart_summary.discountAmount >0 ">
                            Discount                           
                            <span class="freeColorGreen">{{(cartData!=''?cart_summary.discountAmount.toFixed(2):'0.00')}}</span>
                        </li>
                  
                 
                </ul>
                <span class="rsSpanTxt">({{getItemCnt}})</span>
                <h4 class="rsSpanTxtHeader"><span>Total</span>{{(cartData!=''?getCartTotal:'0.00')}}</h4>
                

                <template v-if="cart_summary.couponAmount >0 ||cart_summary.discountAmount" >
                    <div class="youSavedDivBg" v-if="cartData!=''">
                        <ul class="youSavedDivBgNav">
                            <li>You saved!<span>{{getSavedAmount}}</span></li>
                        </ul>
                     </div>    
                </template>    
                  


               
              </div>
            </div>

            <ul class="priceRangeTxtNav" v-if="cartData!=''">
              <li>{{currency}} 0 <span>{{currency}}{{freeDeliveryAmount}}</span></li>
            </ul>
            <div class="priceRangeDiv" v-if="cartData!=''">
              <div :style="progress_bar"></div>
            </div>
</template>
<script>
import Config from  '../../config';
import helper from "@/helper/helper";
export default {
    name:'OrderSummary',
    props:[
        'cart_summary',
        'cartData',
        'getItemCnt'
    ],
      watch:{
      cart_summary(){
         
           this.getCartTotalWithSymbol(false);
      }
    },
    data(){
        return {
            currency:'',
             progress_bar:"",
             freeDeliveryAmount:''
        }
    },mounted(){
        this.currency = Config.CURRECNCY;
    }
    ,computed:{
        getsubTotal(){
            let subTotal =0;
            if(this.cart_summary!=''){
                subTotal = this.currency+' '+this.cart_summary.subTotal.toFixed(2);
            }else{
                subTotal =`${this.currency} 0.00`
            }

            return subTotal;
        },
        getDeliveryCharge(){
            let deliveryCharge = 'Free';
             if(this.cart_summary!='' && this.cart_summary.deliveryCharge!=0){
                deliveryCharge = this.currency+' '+this.cart_summary.deliveryCharge.toFixed(2);
            }

            return deliveryCharge;

        },
        getCartTotal(){
            let cartTotal=0;
             if(this.cart_summary!=''){
                cartTotal = this.currency+' '+this.cart_summary.grandTotal.toFixed(2);
            }else{
                cartTotal =`${this.currency} 0.00`
            }

           

            return cartTotal;
        },
        getSavedAmount(){
            let savedAmount = 0;
             if(this.cart_summary!=''){
                savedAmount = this.currency+' '+(this.cart_summary.discountAmount+this.cart_summary.couponAmount).toFixed(2);
            }else{
                savedAmount =`${this.currency} 0.00`
            }
           
            return savedAmount;
        },
  
    },
    methods:{
        getCartTotalWithSymbol(withSymbol=false){
           let cartTotal=0;
           let freeDeliveryLimit =0;
          if(withSymbol == true){                
                if(this.cart_summary!=''){
                    cartTotal = this.currency+' '+this.cart_summary.grandTotal.toFixed(2);
                    this.freeDeliveryAmount =this.cart_summary.FreeDeliveryCharge;
                }else{
                    cartTotal =`${this.currency} 0.00`
                }
          }else{
              if(this.cart_summary!=''){
                cartTotal = this.cart_summary.grandTotal;
                freeDeliveryLimit =this.cart_summary.FreeDeliveryCharge;
                this.freeDeliveryAmount =freeDeliveryLimit;
                this.pricePrgoress(cartTotal,freeDeliveryLimit);
              }
          }
            
            return cartTotal;
      },
         pricePrgoress(cartTotal,deliveryLimit){
          let progressPercentage =0;
          if(cartTotal>deliveryLimit){
              cartTotal =deliveryLimit;
          }
          progressPercentage =   (cartTotal*100)/deliveryLimit;
          this.progress_bar = {
              "width":progressPercentage+'%'
          }
      },
      goToCheckout(){
             let isLoggedIn =  helper.isLoginedUser();
            if(isLoggedIn==true){
                           let isFoundNotDeliverableProduct=false;
               
                this.cartData.forEach(function(item){
                        if(item.IsAvailPincode!=true){
                            isFoundNotDeliverableProduct =true
                        }
                });

                if(isFoundNotDeliverableProduct!=true){
                     this.$router.push({ path: `/checkout` });
                }else{
                    this.$toast.error('Some of the items in cart are not deliverable. Please remove not deliverable item from cart.');
                }
            }else{
                 document.getElementById("login_popup_link").click(); 
            }
      }
    }
}
</script>
<style scoped>
    
</style>