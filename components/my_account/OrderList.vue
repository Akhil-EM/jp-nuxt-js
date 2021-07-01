<template >
<template v-for="(orderItem,index) in orderData" :key="index">
        <div class="order-details-sec">


                <div class="order-div">
                        <div class="row">
                            <div class="col-md-8">
                            <h3>Order Status</h3>
                            <span class="progress-text" :style="`color:${orderStatus(orderItem.status)}`">
                                <template v-if="orderItem.status.toLowerCase()=='delivery agent assigned' || orderItem.status.toLowerCase()=='delivery agent accepted'">
                                    Order Processing
                                </template>
                                <template v-else>
                                     {{orderItem.status}}
                                </template>
                               
                            </span>
                            <div class="order_invoice" v-if="orderItem.invoiceNumber">
                               Download Invoice:
                                <a target="_blank" :href="`${adminUrl}${orderItem.invoiceUrl}`"><i class="fa fa-download"></i></a>
                            </div>
                            <template v-for="(product,index) in orderItem.itemList" :key="index">
                                    <template v-if="index <2">
                                         <div class="order-section">
                                            <div class="row">
                                                <div class="col-md-2"><span class="orderstatus-img">
                                                    <img :src="`${web_admin_url}${product.imageUrl}`"></span></div>
                                                <div class="col-md-9">
                                                    <span class="ordertxt">{{product.prName}}</span>
                                                     <p v-if="itemStatus(product.itemStatus)" :style="`color:${itemStatus(product.itemStatus)}`">
                                                         {{product.itemStatus}}
                                                     </p>
                                                    
                                                    <a v-if="product.Returnstatus!=0 && product.itemStatus!='Not Available'" href="javascript:void(0)" class="btn btn-danger btn-lg text-white float-right" @click="placeOrderReturn(orderItem,product)">Return</a>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <p v-if="(orderItem.itemList.length -index)==1" :class="`text-center mt-1 product_item_link_${orderItem.orderId}`" @click="loadMoreProItems(orderItem.orderId)">+ {{orderItem.itemList.length-2}} items more</p>

                                                <div  :class="`product_item_${orderItem.orderId} order-section`" v-show="false" >
                                                    <div class="row">
                                                        <div class="col-md-2"><span class="orderstatus-img">
                                                            <img :src="`${web_admin_url}${product.imageUrl}`"></span></div>
                                                        <div class="col-md-9">
                                                            <span class="ordertxt">{{product.prName}}</span>
                                                            <p v-if="itemStatus(product.itemStatus)"  :style="`color:${itemStatus(product.itemStatus)}`">{{product.itemStatus}}</p>
                                                              <a  v-if="product.Returnstatus!=0 && product.itemStatus!='Not Available'" href="javascript:void(0)" class="btn btn-danger btn-lg text-white float-right" @click="placeOrderReturn(orderItem,product)">Return</a>
                                                        </div>
                                                    </div>
                                                </div>
                                    </template>
                                  
                            </template>
                              <p class="otp_text" v-if="orderItem.OTP && orderItem.status!='Order Delivered'">Delivery Confirmation Code {{orderItem.OTP}} </p>
                            
                            </div> 
                            <div class="col-md-4">
                            <h3 class="order-rghttxt">Order Total ({{orderItem.ProductCount}} {{(orderItem.ProductCount >1?'items':'item')}})</h3>
                            <span class="order-price">₹ {{orderItem.orderAmount.toFixed(2)}}</span>
                            <div class="detail-view-text">
                                <button class="primary-btn" type="button" @click="openOrderDetails(orderItem.orderId)">View Details</button></div>
                            <div class="help-text">
                                <router-link to="/contact-form"> Need Help</router-link>
                               
                                </div>
                            <div v-if="orderItem.IsCanCancelOrder&&orderItem.status!='Order Cancelled'&&orderItem.status!='Order Delivered'" class="order_cancel" @click="cancelOrder(orderItem.orderId)">Cancel</div>
                            
                            </div> 
                        </div>
                </div>
    
      
    
        
    
            </div> 
</template>
         

            
    
</template>
<script>
import $ from 'jquery';
import {mapActions} from 'vuex';
import swal from 'sweetalert'
import Config from '../../config';
export default {
    name:'OrderList',
    props:[
        'orderData',
        'web_admin_url'
    ],
    data(){
        return {
            ajaxStatus:'closed',
            adminUrl:''
        }
    },
    mounted(){
        this.adminUrl =Config.WEB_ADMIN_URL;
    },
    methods: {
        ...mapActions(['orderCancel','orderReturn']),
        orderStatus(status){
            let statusColor ='';
            if(status=='Order Placed'){
            statusColor ='#09c';
            }else if(status=='Order Accepted'||status=='Order Packed'||status=='Order Pending'||status=='Assign delivery agent'||status=='Delivery agent assigned'||status=='Order Dispatched'||status=='Order Delivered'){
                 statusColor ='#28ab0f';
            }else if(status=='Order Returned'||status=='Order Cancelled'){
                statusColor ='#f51010';
            }



            return statusColor;

        },
        itemStatus(status){
            let statusColor ='';
           
           if(status=='Not Available'){
                 statusColor ='#f51010';
            }else if(status=='Order Returned'){
                statusColor ='#f51010';
            }else if(status=='Returned'){
                 statusColor ='#f51010';
            }      
            return statusColor;

        },
        openOrderDetails(orderId){
            this.$emit('openOrderDetail',orderId);
        },
       
        loadMoreProItems(itemId){
            
             $(`.product_item_link_${itemId}`).hide();
            $(`.product_item_${itemId}`).show();
        },
        cancelOrder(orderId){

              swal({
                    title: "Are you sure?",
                    text: "Are you want to cancel order",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                    })
                    .then((willDelete) => {
                    if (willDelete) {
                             let $this =this;
                            $this.orderCancel(orderId).then(function(response){
                                $this.$toast.success(`${response.data.Message}`);
                            }).catch(function(error){
                                $this.$toast.error(`${error.response.data.Message}`);
                            });
                      
                        
                    }
                    });
           
        },
        placeOrderReturn(orderDet,product){

            if(this.ajaxStatus=='closed'){
                      swal({
                    title: "Are you sure?",
                    text: "Are you sure to return this item?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                    })
                    .then((willReturn) => {
                    if (willReturn) {
                        let $this =this;
                        $this.ajaxStatus='open';

                           let  custId=localStorage.getItem("custId");
                            
                            let payload ={
                                "custId":custId,
                                "qty":parseInt(product.qty),
                                "orderId":orderDet.orderId,
                                "productId":product.productId
                            }
                            $this.orderReturn(payload).then(function(response){
                                $this.$toast.success(`${response.data.Message}`);
                                 $this.ajaxStatus='closed';
                            }).catch(function(error){
                                $this.$toast.error(error.response.data.Message);
                                 $this.ajaxStatus='closed';
                            });
                        
                    }
                    });
            }
             
        }
    },
}
</script>
<style scoped>
    .order_cancel{
    width: 100%;
    background: transparent;
    color: #fff!important;
    border-radius: 5px;
    font-size: 17px;
    height: 45px;
    text-align: center;
    line-height: 45px;
    display: block;
    margin-top: 10px;
    background: #f35325;
    cursor: pointer;
    }
    .otp_text{
        color: green;
        font-size: 20px;
    }
    .order_invoice{
       margin-top: -20px;
    }
</style>