<template>
        <div :class="{'sltd':openStatus,'view-details':true}" >
        <span class="clse-btn" @click="closeOrderDetBox">X</span>
                <ButtonLoader
                    :loaderColor="loaderColor"
                    :loaderStyle="loaderStyle"
                    :cart_ajax="ajax_status">
                ></ButtonLoader>
            <template v-if="orderDetail!=''">
                   
            <div class="view-hdr"><h3>View Details</h3></div>
            <div class="order-status">
             <div class="delivery_mod">
                 <span class="badge badge-success ">Delivery mode: {{orderDetail.OrderDetails.deliveryMode}}</span>
                 <template v-if="orderDetail.OrderDetails.deliveryMode !='Express Shipping'"> 
                     <p v-if="orderDetail.OrderDetails.orderSlotDate">Slot:{{formatedDate(orderDetail.OrderDetails.orderSlotDate,true)}} between </p>
                     <p class="mb-2" v-if="orderDetail.OrderDetails.orderDeliverySlotTime">{{getTimeSlot(orderDetail)}}</p>
                 </template>
                 
            </div> 
         
            <h3>Order Status</h3> 
           
            <h5 class="delivered-text mb-3" :style="`color:${orderStatus(orderDetail.OrderDetails.status)}`">
                <template v-if="orderDetail.OrderDetails.status.toLowerCase()=='delivery agent assigned' || orderDetail.OrderDetails.status.toLowerCase()=='delivery agent accepted'">
                    ORDER PROCESSING
                </template>
                <template v-else>
                        {{orderDetail.OrderDetails.status}}
                </template>
                
            </h5>

            <template v-if="orderDetail.OrderDetails.deliveryMode!='Pickup From Store'">

                    <a href="javascript:void(0)" @click="deliveryAddressShow=!deliveryAddressShow">
                        <span class="del_loc_icon"><i class="fa fa-map-marker" aria-hidden="true"></i></span>
                        <b>Delivery address</b>
                    <span class="del_togle_icon">
                        <template v-if="!deliveryAddressShow">
                            <i class="fa fa-angle-down"></i>
                        </template>
                        <template v-else>
                            <i class="fa fa-angle-up"></i>
                        </template>
                    </span>
                
                    </a>
                    <div class="order_delivery_address" v-if="deliveryAddressShow">
                    
                        {{orderDetail.BillingAddress.firstName}} {{orderDetail.BillingAddress.lastName}}<br/>
                        {{orderDetail.BillingAddress.addLine1}} <br/>
                        {{orderDetail.BillingAddress.addLine2}} <br/>
                        {{orderDetail.BillingAddress.area}},{{orderDetail.BillingAddress.state}}
                    </div> 

            </template>

    
            <p class="order-text">Payment:  {{getPaymentOption(orderDetail.OrderDetails.PayMethod)}}</p> 
            <h3 class="order-text">Order #{{orderDetail.OrderDetails.orderNumber}}</h3> 
            
           
            <h3 class="brdr-block track-order" @click="trackOrderShow=!trackOrderShow">Track Order
                 <span class="del_togle_icon">
                    <template v-if="!trackOrderShow">
                        <i class="fa fa-angle-down"></i>
                    </template>
                    <template v-else>
                        <i class="fa fa-angle-up"></i>
                    </template>
                </span>
            </h3> 
            <ul class="track-order" v-if="trackOrderShow">
            <li class="tick-icon">
            <h5 class="mr-btm-0">Ordered
                 <p>{{formatedDate(orderDetail.OrderDetails.orderDate)}}</p>
            </h5>
           
            </li> 
            <li :class="`${(orderAcceptedDate!=''?'tick-icon':'red-tick-icon')}`" v-if="OrderCancelDate!=true">
            <h5>Order Accepted
                 <p v-if="getOrderAcceptedDate" >{{formatedDate(getOrderAcceptedDate)}}</p>
            </h5>
           
            </li>
            
            <!-- <li :class="`${(orderPackedDate==true?'tick-icon':'red-tick-icon')}`">
            <h5>Packed
                <p v-if="getOrderPickedDate" >{{formatedDate(getOrderPackedDate)}}</p>
            </h5>
            
            </li>   -->
         
              
            <li :class="`${(orderPickedDate!=''?'tick-icon':'red-tick-icon')}`" v-if="OrderCancelDate!=true">
            <h5>Dispatched 
                 <p v-if="getOrderPickedDate" >{{formatedDate(getOrderPickedDate)}}</p>
            </h5>
            
            </li>    
            <li :class="`${(OrderDeliveredDate!=''?'tick-icon':'red-tick-icon')}`" v-if="OrderCancelDate!=true">
            <h5>Delivered
                 <p v-if="getOrderDeliveredDate" >{{formatedDate(getOrderDeliveredDate)}}</p>
            </h5>
            
            </li>  
             <li :class="`${(OrdeReturnDate!=''?'tick-icon':'red-tick-icon')}`"  v-if="getOrderReturnDateDate">
            <h5>Returned
                 <p >{{formatedDate(getOrderReturnDateDate)}}</p>
            </h5>
            
            </li>  
            <li :class="`${(OrderCancelDate!=''?'tick-icon':'red-tick-icon')}`"  v-if="getOrderCancelDate">
            <h5>Order Cancelled
                 <p >{{formatedDate(getOrderCancelDate)}}</p>
            </h5>
            
            </li>      
                
            </ul> 
            <h3 class="order-item-hdr">Order items</h3>
                
            <div class="order_item_box">
                <ul class="order-item">
                <template v-for="(orderItem,index) in orderDetail.OrderItemsDetails" :key="index">
                      <li style="position: relative;">
                        <div class="order-item-img">
                            <img :src="`${web_admin_url}${orderItem.imageUrl}`"></div>
                        <div class="order-item-text">
                            <h5>{{orderItem.prName}}</h5>
                            <h4>{{currency}}{{orderItem.itemTotal.toFixed(2)}}
                                <span class="offer_strike" v-if="orderItem.productSpecialPrice"><del>{{currency}}{{(orderItem.productPrice*orderItem.qty).toFixed(2)}}</del></span>
                            </h4>

                            <span>Qty: {{Math.round(orderItem.qty)}}</span>
                            <span v-if="itemStatus(orderItem.itemStatus)!=''" class="ml-10" :style="`color:${itemStatus(orderItem.itemStatus)}`">{{orderItem.itemStatus}}</span>
                        </div>
                       
                        <template v-if="orderItem.Reviewstatus!=0 && orderItem.itemStatus!='Not Available'">
                            <a class="review_link" @click="openProductReview(orderItem.urlKey)">Review</a>
                        </template>
                        
                    </li>
                </template>
                </ul>
            </div>
                

                 <div class="subTotalDiv" style="padding-top:20px">
                             <ul class="tatal_section">
                                <li v-if="orderDetail.OrderDetails.subTotal!=0">Sub Total<span>{{currency}} {{orderDetail.OrderDetails.subTotal.toFixed(2)}}</span></li>
                                <li v-if="orderDetail.OrderDetails.orderDeliveryCharge!=0">Delivery Charge<span>{{currency}} {{orderDetail.OrderDetails.orderDeliveryCharge.toFixed(2)}}</span></li>
                              <li v-if="orderDetail.OrderDetails.couponDiscount!=0">Coupon Discount<span>{{currency}} {{orderDetail.OrderDetails.couponDiscount.toFixed(2)}}</span></li> 
                               <li v-if="orderDetail.OrderDetails.orderDiscount!=0">Discount<span>{{currency}} {{orderDetail.OrderDetails.orderDiscount.toFixed(2)}}</span></li>    
                             <li>Grand Total<span>{{currency}} {{orderDetail.OrderDetails.orderAmount.toFixed(2)}}</span></li>
                             <li v-if="orderDetail.OrderDetails.InvoiceTotal!=0">Invoice Total<span>{{currency}} {{orderDetail.OrderDetails.InvoiceTotal.toFixed(2)}}</span></li>
                             <li v-if="orderDetail.OrderDetails.ReturnedTotal!=0">Refund Amound<span>{{currency}} {{orderDetail.OrderDetails.ReturnedTotal.toFixed(2)}}</span></li>
                             
                             </ul>
                </div>
                
            </div>
            </template>
       
    </div>
</template>
<script>
import moment from 'moment'
import ButtonLoader from '@/components/ButtonLoader';
export default {
    name:'OrderDetail',
    props:[
        'openStatus',
        'orderDetail',
        'web_admin_url',
        'currency',
        'ajax_status'
    ],
    components:{
        ButtonLoader
    },
    data(){
        return {
                loaderColor:'red',
                loaderStyle:{
                    'width':'70px',
                    'margin-top':'100px'                   
                },
                orderAcceptedDate:'',
                orderPackedDate:'',
                orderPickedDate:'',
                OrderDeliveredDate:'',
                OrdeReturnDate:'',
                OrderCancelDate:'',
                deliveryAddressShow:false,
                trackOrderShow:false
        }
    },watch:{
        ajax_status(status){
            if(status=='closed'){
                this.orderAcceptedDate='',
                this.orderPackedDate='',
                this.orderPickedDate='',
                this.OrderDeliveredDate='',
                this.OrdeReturnDate='',
                this.OrderCancelDate=''
            }
               
        }
    },
    computed:{
        getOrderAcceptedDate(){
            let orderTrackerinfo =this.orderDetail.orderTracks;            
            let orederAcceptedDate='';
            let $this =this;
            orderTrackerinfo.forEach(function(item){
              
                    if(item.status=='Order Accepted'){
                         $this.orderAcceptedDate=true;
                        orederAcceptedDate=item.statusDate;
                        
                    }
            });

            return orederAcceptedDate;
        },
        getOrderPackedDate(){
            let orderTrackerinfo =this.orderDetail.orderTracks;            
            let orederPackedDate='';
             let $this =this;
            orderTrackerinfo.forEach(function(item){
                   
                    if(item.status=='Order Packed'){
                        $this.orderAcceptedDate=true;
                        $this.orderPackedDate = true;
                        orederPackedDate=item.statusDate;
                        
                    }
            });

            return orederPackedDate;
        },
        getOrderPickedDate(){
            let orderTrackerinfo =this.orderDetail.orderTracks;            
            let orederPickedDate='';
             let $this =this;
            orderTrackerinfo.forEach(function(item){
              
                    if(item.status=='Order Dispatched'){
                        $this.orderAcceptedDate=true;
                        $this.orderPackedDate = true;
                        $this.orderPickedDate =true;                        
                        orederPickedDate=item.statusDate;
                        
                    }
            });

            return orederPickedDate;
        },
         getOrderDeliveredDate(){
            let orderTrackerinfo =this.orderDetail.orderTracks;            
            let orederPickedDate='';
             let $this =this;
            orderTrackerinfo.forEach(function(item){
              
                    if(item.status=='Order Delivered'){
                        $this.orderAcceptedDate=true;
                        $this.orderPackedDate = true;
                        $this.orderPickedDate =true
                        $this.OrderDeliveredDate =true;
                        orederPickedDate=item.statusDate;
                        
                    }
            });

            return orederPickedDate;
        },
        getOrderReturnDateDate(){
            let orderTrackerinfo =this.orderDetail.orderTracks;            
            let returnDate='';
             let $this =this;
            orderTrackerinfo.forEach(function(item){
              
                    if(item.status=='Order Returned'||item.status=='Returned'){
                        $this.orderAcceptedDate=true;
                        $this.orderPackedDate = true;
                        $this.orderPickedDate =true;
                        $this.OrdeReturnDate =true;
                        $this.OrderDeliveredDate =true;
                        returnDate=item.statusDate;
                        
                    }
            });

            return returnDate;
        },getOrderCancelDate(){
                let orderTrackerinfo =this.orderDetail.orderTracks;            
                let returnDate='';
                let $this =this;
                orderTrackerinfo.forEach(function(item){
                
                        if(item.status=='Order Cancelled'){
                            // $this.orderAcceptedDate=true;
                            // $this.orderPackedDate = true;
                            // $this.orderPickedDate =true;                           
                            // $this.OrderDeliveredDate =true;
                            $this.OrderCancelDate=true;
                            returnDate=item.statusDate;
                            
                        }
                });

                return returnDate;
        }

    },
    methods: {
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
        closeOrderDetBox(){
            this.$emit('closeOrderDet')
        },
        formatedDate(date,withoutTime=''){
            if(date!='' && withoutTime==''){
                  return moment(date).format('MMMM D, YYYY, h:mma');
            }else{
                 return moment(date).format('MMMM D, YYYY');
            }
          
        },
         openProductReview(productid){
            this.$emit('openOrderReview',productid);
        },
        GetTime(timeString) {
      
         
            const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
                .toLocaleTimeString({},
                    { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
                );
             
            return timeString12hr;
        },
        getTimeSlot(orderDetail){
            console.log(orderDetail.OrderDetails);
            if (orderDetail.OrderDetails.orderDeliverySlotTime!=null) {
                        var sltime = orderDetail.OrderDetails.orderDeliverySlotTime.split('-');

                    return this.GetTime(sltime[0]) + '-' + this.GetTime(sltime[1])
                       
            }
        },
        getPaymentOption(payment){
            let paymentString ='';
            if(payment =='COD'){
                paymentString ='Payment on Delivery';
            }

            return paymentString;
        }
    },
}
</script>
<style scoped>
    .view-details{
        z-index: 99999999;
    }
    .order_item_box{
        max-height: 186px;
        overflow-y: auto;
    }
    .review_link{
            position: absolute;
            right: 0;
            cursor: pointer;
            background: #e32727;
            padding: 5px 9px;    
            border-radius: 4px;
            color: #fff !important;    
            bottom: 18px;
    }
    .track-order p {
    font-size: 13px;
    display: inline-block;
    }
    .delivery_mod{
        position: absolute;
        right: 20px;
    }
    .subTotalDiv{
        padding-top: 20px;
        position: absolute;
        bottom: 0;
        right: 0px;
        width: 100%;
        background: #fff;
    }
    .subTotalDiv ul {
        text-align: right;
        padding-right:10px
    }
    .del_togle_icon{
        font-size: 14px;
        margin-left: 5px;
        font-weight: bold;
    }
    .del_loc_icon{
        font-size: 14px;
        font-weight: bold;
        margin-right: 5px;
    }
    .track-order{
        cursor: pointer;
    }

    .offer_strike{
        color:#494545eb
    }
    @media only screen and (max-width: 600px) {
        .subTotalDiv{
            bottom: unset!important;
        }
    }
   
</style>