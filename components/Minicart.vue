<template>
<div class="ps-cart__content">
        <div class="ps-cart__items">
            <template v-for="(cartItem,index) in cartItems" :key="index">

                    <div class="ps-product--cart-mobile">
                    <div class="ps-product__thumbnail"><a href="#"><img :src="`${web_admin_url}${cartItem.imageUrl}`" alt=""></a></div>
                        <div class="ps-product__content">
                            <a class="ps-product__remove" href="javascript:void(0)" @click="removeCartItem(cartItem.cartItemsId)">
                                <i class="icon-cross" v-if="cart_ajax=='closed'"></i>
                                <template v-if="(rmv_cartItemId==cartItem.cartItemsId)  && (cart_ajax=='open')">
                                     <ButtonLoader
                                        :loaderColor="loaderColor"
                                        :loaderStyle="loaderStyle"
                                        :cart_ajax="cart_ajax"                                       
                                        >
                                   </ButtonLoader>                                  
                                </template>

                                 <template v-if="cart_ajax=='open' && rmv_cartItemId!=cartItem.cartItemsId">
                                       <i class="icon-cross"></i> 
                                </template>
                               
                            </a>
                            <a href="javascript:void(0)" @click="goToDetailpage(cartItem.urlKey)">{{cartItem.prName}}</a>
                       <small>{{cartItem.qty}} <template v-if="cartItem.unitPrice!=null">x {{currency}} {{cartItem.unitPrice.toFixed(2)}}</template></small>
                        </div>
                </div>

            </template>
            
            
        </div>
        <div class="ps-cart__footer" v-if="cartItems.length >0">
            <h3>Sub Total:<strong>{{currency}} {{getSubTotal}}</strong></h3>
                <figure>
                   <router-link :to="`/cart`" class="ps-btn clor-blue clor-white" >View Cart</router-link>  
                   <router-link :to="`/checkout`" class="ps-btn clor-green clor-white" >Checkout</router-link>
                </figure>
        </div>
        <div class="ps-cart__footer" v-else>
            <p class="text-center">Cart is empty</p>
        </div>
    </div>
    
</template>
<script>

import Config from  '../config';
import ButtonLoader from '../components/ButtonLoader';
export default {
    name:'MiniCart',
    props:[
        'cartItems',
        'cart_ajax'
    ],
    components:{
        ButtonLoader
    },
    data(){
        return{
            'web_admin_url':'',
            'currency':'',
            'loaderColor':'red',
            'rmv_cartItemId':'',
             'loaderStyle':{
                 'width':'35px'
             }
        }
    },
    mounted(){
         this.web_admin_url =Config.WEB_ADMIN_URL;
          this.currency =Config.CURRECNCY;
    },methods:{
         goToDetailpage(urlkey){
              this.$router.push({ path: `/product-detail/${urlkey}` });
        },
        removeCartItem(cartItemId){
             this.rmv_cartItemId =cartItemId;
             this.$emit('deleteCartItem',cartItemId)
        }
    },computed:{
        getSubTotal(){
            let subTotal=0;
            this.cartItems.forEach(function(item){
                subTotal +=item.itemTotal
            });

            if(subTotal !='0'){
                return subTotal.toFixed(2);
            }else{
                return '0.00';
            }

            

        }
    }

}
</script>

<style scoped>

</style>