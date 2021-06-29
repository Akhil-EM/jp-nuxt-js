<template >
      <div class="modal fade" id="promocode-view" tabindex="-1" role="dialog" aria-labelledby="promocode-view" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <!-- Modal content-->
                <div class="modal-content">
                    <span class="modal-close" data-dismiss="modal"><i class="icon-cross2"></i></span>
                    <div class="modal-body voucher">
                        <h5>Apply Voucher</h5>
                        <template v-for="(coupon,index) in coupon_list" :key="index">
                               <div class="voucher-box" :id="`voucher_box_${coupon.cpCode}`"  @click="selectCoupon(`${coupon.cpCode}`)">
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="form-box">
                                            <!-- <input type="radio" :id="`coupon_${index}`" name="radio-group1" :value="coupon.cpCode"> -->
                                            <label :for="`coupon_${index}`" class="voucher-code"><span>{{coupon.cpCode}}</span></label>
                                        </div>
                                        </div>
                                    <div class="col-md-9">
                                        <template v-if="coupon.cpMode=='PERCENTAGE'">
                                            <p>Rs.{{coupon.cpAmount}} % OFF upto RS. {{coupon.cpCap}}</p>
                                        </template>
                                        <template v-else>
                                            <p>Rs.{{coupon.cpAmount}} OFF</p>
                                        </template> 
                                        <p v-if="coupon.catName">Only for {{coupon.catName}} products</p>  
                                         <p v-if="coupon.vendorName">Only for {{coupon.vendorName}} products</p> 
                                        
                                        <p>Expire on: {{getExpireDate(coupon.cpExpiry)}}</p>
                                        <span class="voucher-subtxt">Minimum order amount {{coupon.cpMinOrderAmount}}</span>
                                    </div>
                                </div>
                            </div>
                        </template>
                     
                  
                    
                      
                      
                        <div class="apply-now">
                            <button type="submit" @click="applyCoupon" >Apply Voucher</button></div>
                    </div>

                </div>
            </div>
        </div>
</template>
<script>
import moment from 'moment';
import $ from 'jquery';
export default {
    name:'OfferPopup',
    props:[
        'coupon_list'
    ],
    data(){
        return{
            'selected_coupon_code':'',
            'isSelected':false
        }
    },
    methods:{
            selectCoupon(couponCode){
                this.selected_coupon_code =couponCode;
                $(`.voucher-box`).removeClass('is_selected');
                $(`#voucher_box_${couponCode}`).addClass('is_selected');
               
            },
            applyCoupon(){
                this.$emit('coupon_code',this.selected_coupon_code);
            },
            getExpireDate(expireDate){
                 return moment(expireDate).format('MMMM D, YYYY');
            }
    }
}
</script>
<style scoped>
    .is_selected{
        background: #ddd;
    }
   
    .voucher-code span {  
        min-width: 120px;
    }
    #promocode-view .apply-now button {
       background: #d71920;
        color: #fff;
        padding: 10px;
        text-align: center;
        font-size: 15px;
        cursor: pointer;
        width: 180px;
        border-radius: 3px;
        border: none;
        float: right;
    }
    @media only screen and (max-width: 767px) {
        .modal-body.voucher .form-box {
            margin-left: 0px !important;
        }

        .voucher-code{
            height: auto !important;
            width: auto !important;
            margin-bottom: 15px !important;
        }
        .voucher-box{
            text-align: center;
        }
        .voucher-subtxt {          
            float: none;
          
        }
    }
</style>