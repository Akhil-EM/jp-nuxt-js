<template >

     <div class="addressFloat1" :id="`selected_address_${address.custAdressId}`">
            {{setDefaultShippingAddress()}}
            <div class="address_text_box"  @click="SelectedAddress(address)">
                <h3>{{address.firstName}} {{address.lastName}}</h3>
                <p>{{address.addLine1}} {{address.addLine2}} 
                <br> {{address.landmark}} {{(address.landmark!=''?',':'')}} {{address.pincode}} <br>
                {{address.area}} ,{{address.country}}, {{address.state}}, <br/>
                {{countryCode}} {{address.phone}}</p>
            </div>
            <!-- <a class="addDeliveryBtnmain" href="#">Add delivery address</a> -->
            <button  @click="SelectedAddress(address)" class="deliverToAddressBtn">Deliver to this address</button>
            <ul>
              <li><a href="javascript:void(0)"  @click="editAddress(address)">Edit</a></li>
              <li><a href="javascript:void(0)"  @click="deleteAddres(address.custAdressId)">Delete</a></li>
            </ul>
          </div>

     
 
</template>
<script>
import $ from "jquery";
import {mapActions} from 'vuex';
import Config from "@/config";
export default {
    name:'AddressListItem',
    props:[
        'address',
        'index',
        'jquery'
    ],
    
    data(){
        return {
            selectedAddressID:"",
            pincodeList:[],
            countryCode:'',
            initialVendorURLKey:''
        }
    },
    computed:{
        selectedAddressId(){
            return this.selectedAddressID;
        }
    },
    mounted(){
            let $this =this;
            $this.getPincodeList().then(function(response){
                 $this.pincodeList =response.data.Data;
            });
            $this.countryCode = Config.COUNTRY_CODE;

            this.initialVendorURLKey = Config.VENDOR_URL_KEY;
    },
   
    methods: {
        ...mapActions(['getPincodeList','storeCartSummary',"getPincodeInfo"]),
        setDefaultShippingAddress(){
             let $this =this;
               if($this.address.isDefaultShippingAddress==true){
                        $this.selectedAddressID=$this.address.custAdressId;
                            
                        $this.getPincodeInfo($this.address.area).then(function(response){
                              if(response.data.Data !=''){
                                    let defaultAddress = response.data.Data['0'];
                                    if(defaultAddress){

                                        if(defaultAddress.vendorUrlKey == Config.VENDOR_URL_KEY){
                                                $this.$emit('selectedCustAddress',$this.address.custAdressId);
                                                $this.SelectedAddress($this.address);
                                        }

                                    }
                              }
                        });


                        
                       
                }
        },
        getCityname(cityId){
                let cityname = '';
                let $this =this;
                $this.pincodeList.forEach(function(item){
                    if(item.pincodeId == cityId){
                        cityname = item.area;
                    }
                });

                return cityname;

        },
        deleteAddres(addresId){           
            this.$emit('deleteCustomerAddress',addresId);
        },

        editAddress(address){            
            this.$emit('editAddress',address);
        },
        SelectedAddress(address){
             
             if(address.IsAvailableCartProducts==false){
                 this.$toast.error('Cart Items Not deliverable to this Address');
                 return;
             }

             $('.addressFloat1 ').removeClass('sltd');  
             $(`#selected_address_${address.custAdressId}`).addClass('sltd');
             this.selectedAddressID =address.custAdressId;
             let selectedLoc ='';
             this.pincodeList.forEach(function(item){
                    if(item.pincodeId == address.areaId){
                        selectedLoc = item;
                    }
                });

                if(selectedLoc !=''){
                     
                     if(this.initialVendorURLKey!==selectedLoc.vendorUrlKey){
                         this.$toast.error('The address you have selected is different from the selected location.you cart items may effected.',{
                             duration:'9000'
                         });
                     }

                     this.$cookies.set('location_title',selectedLoc.area);
                     this.$cookies.set('location_info',selectedLoc);
                     localStorage.setItem('location_info',JSON.stringify(selectedLoc));   
                     Config.PINCODE_ID = selectedLoc.pincodeId;  
                     Config.VENDOR_URL_KEY = selectedLoc.vendorUrlKey;
                     Config.ADMIN_API_HEADER.headers.vendorUrlKey = selectedLoc.vendorUrlKey; 
                     Config.CUSTOMER_API_HEADER.headers.vendorUrlKey = selectedLoc.vendorUrlKey;  
                     let $this =this;

                        let guestId=null;
                        let custId =null;
                        custId=localStorage.getItem("custId");
                        if(custId==null){
                            guestId =localStorage.getItem("guestId");
                        }

                     let payload ={
                        'cusId':custId,
                        'guestId':guestId,
                        'vendorUrlkey': Config.VENDOR_URL_KEY         
                        };
                        $this.$store.dispatch("getCart",payload).then(function(response){                                   
                            $this.$emit('cartUpdated',response.data.Data.cartList);
                            $this.storeCartSummary();
                            
                        });
                     
                    
                }
                
             this.$emit('selectedCustAddress',address.custAdressId);

        },
        
        

    },
}
</script>
<style scoped>


.addressFloat1{
        padding: 17px !important;
    }
    .addressFloat1.sltd{
        background: #f9f9f9; border: 2px #ddd solid;
}

.my_address_page button{
    display: none !important;
  }
  .address_text_box{
      min-height: 115px;
      cursor: pointer;
  }
    
</style>