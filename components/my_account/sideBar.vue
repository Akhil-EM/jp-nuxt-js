<template >
<div class="account-lft-bar">
        <ul>
        <li :class="{'order':true,'active':isActivatedLink('MyOrder')}" >
            <router-link :to="`/my-order`"> My Orders</router-link>
           
        </li>
        <li  :class="{'wishlist':true,'active':isActivatedLink('MyWishlist')}" >
            <router-link :to="`/my-wishlist`">My Wishlist</router-link>
        </li>
        <!-- <li  :class="{'cart':true,'active':isActivatedLink('MyCart')}"  >
            <router-link :to="`/my-cart`">My Cart</router-link>
           </li> -->
        <li :class="{'profile':true,'active':isActivatedLink('MyProfile')}" >
             <router-link :to="`/my-profile`">My Profile</router-link>
        </li>
        <li :class="{'address':true,'active':isActivatedLink('MyAddrss')}"  >
             <router-link :to="`/my-address`">My Address</router-link>
        </li>
        <li :class="{'coupons':true,'active':isActivatedLink('MyCoupons')}" >
             <router-link :to="`/my-coupons`">Coupons</router-link>
           
        </li> 
         <li :class="{'coupons':true,'active':isActivatedLink('ChangePassword')}" >
             <router-link :to="`/change-password`">Change Password</router-link>
           
        </li>  
        <li :class="{'coupons':true,'active':isActivatedLink('ContactUs')}" >
             <router-link :to="`/contact-us`">Contact Us</router-link>
           
        </li>   
        <li @click="logout">Log Out</li>    
        </ul>   
    </div>
    
</template>
<script>
export default {
    name:'Sidebar',
    data(){
        return {
            'active_link':'order'
        }
    },
    methods: {
        logout(){
            localStorage.removeItem('custId');
            localStorage.removeItem('customer_token');
            // location.reload();
             window.location.href="/";
        },
        makeActiveLink(link){
             this.active_link = link;
        },
        isActivatedLink(link){
            
            if(this.active_link == link){
                return true;
            }else{
                return false;
            }
        },
       
        
    },
     mounted(){
          this.active_link = this.$route.name;
            
        }
    
}
</script>
<style scoped>
    
</style>