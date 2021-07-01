<template >
 <div v-if="addressList">
        <template v-for="(address,index) in addressList" :key="index">
            <AddressListItem :address="address"
                :index="index"
                @deleteCustomerAddress="deleteAddress"
                @editAddress ="editAddressItem"
                @selectedCustAddress="selectedAddress"
              
                ></AddressListItem>
        </template>        
     </div> 
     <div v-else>
         <p class="text-center">No address found</p>
    </div>       
</template>
<script>
import AddressListItem from './AddressListItem';

export default {
    name:'customerAddressList',
    props:[
        'addressList',
       
    ],
    components:{
        AddressListItem
    },
    methods: {
        deleteAddress(addressId){
             this.$emit('deleteCustomerAddress',addressId);
        },
        editAddressItem(address){
           
            this.$emit('editAddress',address);
        },
        selectedAddress(addressID){
             this.$emit('selectedCustId',addressID);
        }
    },
}
</script>
<style scoped>
    
</style>