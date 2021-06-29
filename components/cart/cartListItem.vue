<template >
       
        <template v-if="cartData!=''">
            
                <div class="cartHederBorderMain"  v-for="(cartItem,index) in cartData" :key="index">
                    <div class="headerFloat1">
                        <div class="subcartImgDivWrapper">
                        <div class="subcartImgDiv">
                            <div class="imag_box">
                                <img :src="`${web_admin_url}${cartItem.imageUrl}`" :alt="cartItem.alt??cartItem.prName"  />
                            </div>
                            
                        </div>
                        <h4>
                            {{cartItem.prName}}
                        </h4>
                        <!-- <span>200g</span> -->
                        <template  v-if="cartItem.IsAvailPincode">
                            <template v-if="Number.isInteger(cartItem.specialPrice)&& cartItem.specialPrice!=0 && cartItem.unitPrice >cartItem.specialPrice">
                                  
                                    <p>MRP :<del>{{currency}} {{cartItem.unitPrice.toFixed(2)}}</del></p>
                                    <label>OUR PRICE :<strong>{{currency}} {{cartItem.specialPrice.toFixed(2)}}</strong></label>
                            </template>
                            <template v-else>
                                 <label>OUR PRICE :<strong>{{currency}}  {{cartItem.unitPrice.toFixed(2)}}</strong></label>
                            </template>
                        </template>
                         <p class="text-danger" v-if="cartItem.IsAvailPincode==false">Item not deliverable</p>
                        <ul class="deleteUlNav">
                            <li><a href="javascript:void(0)"  @click="removeCartItem(cartItem.cartItemsId)">Delete</a></li>
                            <li v-if="cartItem.IsAvailPincode==true"><a href="javascript:void(0)" @click="saveToLaterCatrt(cartItem)">Save for later</a></li>
                        </ul>
                        </div>
                    </div>
                    <div class="priceMobileDivMain">
                        <div class="headerFloat2" v-if="cartItem.IsAvailPincode">
                             <CartQtyCounter @updateCartQty="updateCart($event)" 
                                :product_url_key="cartItem.urlKey"
                                :cartItemId="cartItem.cartItemsId"
                                :qtyCont="cartItem.qty"
                                :qtyReset="qtyReset"
                                @carQtyReset="cartQtyReset"
                            ></CartQtyCounter>
                        </div>
                        <div class="headerFloat2 youSaveDiv" v-if="cartItem.IsAvailPincode">
                            <template v-if="getSavingsText(index) !=''">
                                 <p> {{getSavingsText(index)}}</p>
                            </template>
                            <template v-else>
                                <p style="visibility: hidden;">0</p>
                            </template>
                       
                        </div>
                        <div class="headerFloat2" v-if="cartItem.IsAvailPincode">
                            
                        <label>{{currency}} {{getItemSubTotal(index)}}</label>
                        </div>
                    </div>
                </div>
          
        </template>
        <template v-else>
           
          <div class="empty_cart">
                    <p>Cart is empty</p>
           </div>
               
            
        </template>
        
</template>
<script>
import Config from  '../../config';
import helper from  '../../helper/helper';
import CartQtyCounter from './CartQtyCounter';
export default {
    name:'CartListItem',
    props:[
        'cartData',
        'cart_ajax',
        'cart_type',
        'qtyReset'
    ],
    components:{
        CartQtyCounter
    },
    data(){
        return {
            'web_admin_url':'',
            'currency':'',
            
            
        }
    },mounted(){
        this.web_admin_url =Config.WEB_ADMIN_URL;
        this.currency =Config.CURRECNCY;
    },methods:{
        getItemSubTotal(index){
            let subTotal =0;
            if(this.cartData!=''){
                subTotal = this.cartData[index].itemTotal;
            }

            return subTotal.toFixed(2);
        },
        cartQtyReset(){
            this.$emit('cartQtyCntReset');
        },
        getSavings(index){
               let discount = 0;
                if(this.cartData!=''){
                     let specialPrice =0;
                      let unitPrice=0;
                      let cartQty='';
                    if(typeof this.cartData[index] == 'undefined'){
                             specialPrice = 0;
                             unitPrice=0;
                    }else{
                          specialPrice = this.cartData[index].specialPrice;
                           unitPrice =this.cartData[index].unitPrice; 
                           cartQty = this.cartData[index].qty;
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
                  let unitPrice =this.cartData[index].unitPrice; 
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
        updateCart(cartItemInfo){
            this.$emit('updateCartQantity',cartItemInfo);
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
        }
    
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

    @media screen and (max-width: 570px){
            .subcartImgDivWrapper p {
                display: block !important;
            }
    }

</style>