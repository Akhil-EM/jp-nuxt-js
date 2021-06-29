<template >
    <div  v-for="cartItem in cartItems" :key="cartItem.cartId">
              <div :class="{'cartFloatMainall':true,'notServicable':!isCheckProductIsServicable(cartItem)}"    >
                  
           
            <div class="cartFloat1" >
                <div class="ps-product--cart-mobile" >
                <div class="ps-product__thumbnail" >
                    <a href="javascript:void(0)" 
                    ><div class="cat_img_box" >
                        <img :src="`${base_url}${cartItem.imageUrl}`" :alt="cartItem.alt??cartItem.prName" />
                      </div
                    ></a>
                </div>
                <a href="javascript:void(0)"><b>{{cartItem.prName}}</b></a>
                <template v-if="isCheckProductIsServicable(cartItem)==false">
                      <p class="text-danger ">Not deliverable</p>
                  </template>
                <p v-if="cartItem.IsAvailPincode"><b >{{cartItem.qty}} x {{currency}} {{cartItem.unitPrice.toFixed(2)}}</b></p>
                </div>
            </div>
            <div class="cartFloat3" >
                <CartQtyCounter v-if="cartItem.IsAvailPincode"
                    @updateCartQty="updateCart($event)" 
                    :product_url_key="cartItem.urlKey"
                    :cartItemId="cartItem.cartItemsId"
                    :qtyCont="cartItem.qty"
                    :qtyReset="qtyReset"
                    @carQtyReset="cartQtyReset"
                ></CartQtyCounter>
            </div>
            <div class="cartFloat4" >
                <div class="product_price" >
                    <template v-if="cartItem.IsAvailPincode">
                        <small><b>{{currency}} {{cartItem.itemTotal.toFixed(2)}} 
                    <template v-if="getSavingsText(index) !=''">
                                 <span> {{getSavingsText(index)}}</span>
                    </template>
                    </b></small >
                    </template>
                
                </div>
            </div>
            <div class="cartFloat2" >
                <div class="product_action" >
                <a :class="{'ps-product__remove':true,'rm_pro_items':(cartItem.IsAvailPincode==false?true:false)}" href="javascript:void(0)" @click="removeCartItem(cartItem.cartItemsId)" ><i class="icon-cross" ></i></a>
                </div>
            </div>
        </div>
    </div>
  
</template>
<script>
import CartQtyCounter from '@/components/cart/CartQtyCounter'
import helper from  '../../helper/helper';
export default {
    name:'SideCart',
    props:[
        'cartItems',
        'base_url',
        'currency',
        'qtyReset'
    ],
    watch:{
       
    },
    data(){
        return {
            productAvaiavleStatus:true
        }
    },
    components:{       
        CartQtyCounter
    },
    methods:{
        getSavings(index){
               let discount = 0;
                if(this.cartItems!=''){
                     let specialPrice =0;
                      let unitPrice=0;
                      let cartQty='';
                    if(typeof this.cartItems[index] == 'undefined'){
                             specialPrice = 0;
                             unitPrice=0;
                    }else{
                          specialPrice = this.cartItems[index].specialPrice;
                           unitPrice =this.cartItems[index].unitPrice; 
                           cartQty = this.cartItems[index].qty;
                    }
                   
                                  
                    if(Number.isInteger(specialPrice) && Number.isInteger(unitPrice) && unitPrice >specialPrice && specialPrice!=0 ){
                        discount = unitPrice -specialPrice;
                        discount = discount*cartQty;
                        
                    }
                    
                }

                

             return discount.toFixed(2);

        },
          cartQtyReset(){
            this.$emit('cartQtyCntReset');
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
             
         this.$emit('deleteCartItem',cartItemId);
         
        },
        isCheckProductIsServicable(product){
            let productAvailableStatus=true;
                if(product.IsAvailPincode!=true){
                    productAvailableStatus=false
                }

                if(product.status != true || product.delDate != null){
                    productAvailableStatus=false
                }

                if(product.qoh < product.qty && product.backOrders == false){
                    productAvailableStatus=false
                }

                if(product.maxQtyInOrders < product.qty && product.maxQtyInOrders != null && product.maxQtyInOrders != 0){
                    productAvailableStatus=false
                }
                
                if(product.stockAvailability && product.stockAvailability.toLowerCase()=='out of stock'){
                    productAvailableStatus=false
                }

                // if(productAvailableStatus == false){
                //         this.$emit('productAvailableStatus',false);
                // }
               
                // console.log(productAvailableStatus);
                return productAvailableStatus;
               
        }
    }
}
</script>
<style scoped>
    .notServicable{
      position: relative;
      background: #ffc3c3;;
    }

    .notServicable input.form-control {
        background-color: #ffc3c3;
    }

    .notServicable .cat_img_box{
        border: unset;
    }
     strong {
        font-weight: 800 !important;
    }
    .not_service_txt{
        position: absolute;
        width: 110px;
        right: 20px;
        top: 9px;
        font-weight: bold;
        font-size: 16px;
    }
     .rm_pro_items{
      position: absolute;
      right: -117px;
  }  

  @media only screen and (max-width: 600px) {
    

    .rm_pro_items{
        position: absolute;
        right: -261px;
        top: -51px;
    } 
} 
</style>