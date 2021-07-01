<template >
        <h3>Order Summary</h3>
          <ul class="subOrdersummaryNav1">
            <li>items:<span>{{currency}} {{cartItems!=''?paymentInfo.subTotal?paymentInfo.subTotal.toFixed(2):'0.00':'0.00'}}  </span></li>
            <li>Delivery:<span> {{cartItems!=''?paymentInfo.deliveryCharge? currency+paymentInfo.deliveryCharge.toFixed(2):'Free':'0.00'}}   </span></li>
             <li>Promotion applied:<span> {{currency}} {{paymentInfo.couponAmount?paymentInfo.couponAmount.toFixed(2):'0.00'}}</span></li>
            <li>Discount:<span> {{currency}} {{paymentInfo.discountAmount?paymentInfo.discountAmount.toFixed(2):'0.00'}}</span></li>
            <li>Total:<span>{{currency}} {{cartItems!=''?paymentInfo.grandTotal?paymentInfo.grandTotal.toFixed(2):'0.00':'0.00'}}  </span></li>
          </ul>
          <ul class="subOrdersummaryNav2">
            <li>Order Total<span>{{currency}} {{cartItems!=''?paymentInfo.grandTotal?paymentInfo.grandTotal.toFixed(2):'0.00':'0.00'}}</span></li>
          </ul>
</template>
<script>
export default {
    name:'PaymentDetail',
    props:[
        'currency',
        'paymentInfo',
        'cartItems'
    ]
}
</script>
<style scoped>
    
</style>