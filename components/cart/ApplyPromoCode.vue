<template >
        <div class="applyCodeDivBg">
                <div class="subScribeWrapper">
                    <input placeholder="Enter voucher code" name="" type="text" v-model="offerCode" />
                    <button class="subScribeWrapperDiv"  @click="applyCoupon()">Apply</button>
                    <div></div>
                </div>
                <div class="applyCodeDivBgPattern">
                    <template v-if="couponCount>0">
                         <p data-toggle="modal" data-target="#promocode-view"> {{couponCount}} promocodes applicable</p>
                    </template>
                    <template v-else>
                         <p> {{couponCount}} promocodes applicable</p>
                    </template>
                   
                </div>
         </div>
          <router-link :to="`/products`" class="continueShopBtnMain" > 
                <span><i class="fa fa-arrow-circle-left" aria-hidden="true"></i></span>Continue Shopping
          </router-link>
        
         
</template>
<script>
export default {
    name:'ApplyPromoCode',
    props:[
        'selectedCoupon',
        'coupon_list',
        'cart_summary'
    ],
    watch:{
        selectedCoupon(couponcode){
            this.offerCode =couponcode;
        },
        cart_summary(cartSummary){
            if(cartSummary !=''){
                this.offerCode = cartSummary.cpcode;
            }
            
        }
    },
    data(){
        return {
            'offerCode':''
        }
    },
    computed:{
        couponCount(){
            let couponCount =0;
            if(this.coupon_list!=0){
                 couponCount =this.coupon_list.length;
            }
            return couponCount;
        }
    },
    methods:{
        applyCoupon(){
            this.$emit('applayCoupon',this.offerCode);
        }
    }
}
</script>
<style scoped>
    
</style>