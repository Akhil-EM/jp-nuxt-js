<template >

  <div class="modal fade address_popup" id="address_form_popup" tabindex="-1" role="dialog" aria-labelledby="address_form_popup" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
             <!-- Modal content-->
            <div class="modal-content">
                <span class="modal-close" data-dismiss="modal" @click="hideAddressForm"><i class="icon-cross2"></i></span>
                <div class="modal-body" id="address_form_body">

                    <div :class="{'add-adress_sec':true,'show':form_open_status}">
                      
                        <div class="col-md-12">
                            <div class="address_search">
                                    <input type="text" ref="search" v-model="location"  id="map_input"   />
                                </div>
                            <div class="map_area">
                                
                             <div id="map_box" style="width: 100%; height: 200px" />
                            </div>
                            
                                
                        </div>
                       
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-6 pd_rght-0">
                                <input type="text" :class="{error_border:errors.firstName_error}" v-model="addressForm.firstName"  name="name" placeholder="First Name">
                                </div>
                                <div class="col-md-6">
                                <input type="text" name="last-name"   v-model="addressForm.lastName"  placeholder="Last Name">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                                  <div class="row">
                                        <div class="col-md-6 pd_rght-0">
                                                <input type="text" name="address" :class="{error_border:errors.addLine1_error}" v-model="addressForm.addLine1"  placeholder="Delivery address line1">
                                        </div>
                                        <div class="col-md-6">
                                        <input type="text" name="address" v-model="addressForm.addLine2" placeholder="Delivery address line2">
                                        </div>
                                    
                                    </div>
                        </div>
                        <div class="col-md-12">
                                 <div class="row">
                                    <div class="col-md-6 pd-rght-0">
                                        <!-- <input type="text" name="province" :class="{error_border:errors.state_error}"  v-model="addressForm.state" placeholder="State"> -->
                                         <select name="province" :class="{error_border:errors.state_error}"  v-model="addressForm.state">
                                            
                                       <template  v-for="(state,index) in state_list" :key="index">
                                           <option v-if="state.name=='Kerala'" >{{state.name}}</option>
                                       </template>
                                       
                                   </select>
                                    </div>
                                    <div class="col-md-6">
                                    <!-- <input type="text" name="country" :class="{error_border:errors.country_error}"  v-model="addressForm.country"  placeholder="Country"> -->
                                   <select name="country" :class="{error_border:errors.country_error}"  v-model="addressForm.country"  @change="searchStateList()">
                                       
                                       <template  v-for="(country,index) in countryList" :key="index">

                                           <option v-if="country.name=='India'" >{{country.name}}</option>
                                       </template>
                                       
                                   </select>
                                   
                                    </div>
                                    
                                </div>
                        </div>
                          
                           
                           
                            

                            <div class="col-md-12">
                            <div class="row">
                               
                                    <div class="col-md-6 pd_rght-0">
                                         <select name="city" :class="{error_border:errors.district_error}"    v-model="addressForm.district">
                                              <option v-if="addressForm.district==''" value="">Select location</option>
                                        <template  v-for="(pincode,index) in pincodeList" :key="index">
                                            <option :value="`${pincode.pincodeId}_${pincode.area}`" >{{pincode.area}}</option>
                                        </template>
                                         </select>
                                    </div>
                                <div class="col-md-6 pd-rght-0">
                                    <input type="text" name="post-code" :class="{error_border:errors.pincode_error}"  v-model="addressForm.pincode" placeholder="Post Code/ ZIP">
                                </div>

                            <div class="col-md-12 pd-rght-0">
                                <div style="display:flex">
                                <div style="width:20%;margin-right: 10px;" >
                                    <input type="text" v-model="countryCode" />
                                </div>
                                <div style="width:79%">
                                   <input type="text" name="phone" :class="{error_border:errors.phone_error}"  v-model="addressForm.phone" placeholder="Phone">
                                </div>
                                </div>
                                
                            </div>
                        
                            <div class="col-md-10">
                                <input type="checkbox" id="save" name="save" value="true" v-model="addressForm.isDefaultShippingAddress"> Mark as default Delivery Address </div>
                            <!-- <div class="col-md-10">
                                <input type="checkbox" id="save" name="true" value="save" v-model="addressForm.isDefaultBillingAddress"> Mark as default Biiling Address 
                            </div> -->
                            

                            <div class="col-md-5 mr-top_15">
                                <div class="row">
                                    
                                    <div class="col-md-5">

                                        <div class="savebtn">
                                            <template v-if="isAddAddresClick==true">
                                                <button type="submit" @click="SaveAddress" >SAVE ADDRESS</button>
                                            </template>
                                            <template v-else>
                                                <button type="submit" @click="updateCustAddress" >UPDATE ADDRESS</button>
                                                
                                            </template>
                                        
                                        </div>
                                    </div>
                                </div>
                            </div> 
                                
                                
                            
                            </div>
                        </div>
                    </div>

                </div>
            
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable no-undef */

import {mapActions} from 'vuex';
import Config from "@/config";

import axios from "axios";

export default {
    name:'AddressForm',
    props:[
        'openStatus',
        'updateAddress',
        'isAddAddresClick'
    ],

   

    watch:{
        otherPos(value){
           this.findLocationInfo(value);
        },
        updateAddress(updateAddress){
                    if(this.updateAddress !=''){
                        this.addressForm.addLine1 =updateAddress.addLine1;
                        this.addressForm.addLine2 =updateAddress.addLine2;
                        this.addressForm.firstName =updateAddress.firstName;
                        this.addressForm.lastName =updateAddress.lastName;
                        this.addressForm.pincode =updateAddress.pincode;
                        this.addressForm.landmark =updateAddress.landmark;
                        this.addressForm.district =updateAddress.areaId+'_'+updateAddress.area;
                        this.addressForm.state =updateAddress.state;
                         this.addressForm.phone =updateAddress.phone;
                        this.addressForm.country =updateAddress.country;
                        this.addressForm.isDefaultShippingAddress =updateAddress.isDefaultShippingAddress;
                        this.addressForm.isDefaultBillingAddress =updateAddress.isDefaultBillingAddress;
                        this.addressForm.longitude =(updateAddress.longitude==''?'10.0224634':updateAddress.longitude);
                        this.addressForm.latitude =(updateAddress.latitude==''?'76.30415390000007':updateAddress.latitude);
                        this.addressForm.custAdressId = updateAddress.custAdressId;

                        this.form_open_status =true;

                        if(updateAddress.longitude!=''){
                           
                            this.center= {lat: parseFloat(updateAddress.latitude), lng: parseFloat(updateAddress.longitude)};
                            this.initLocationSearch();
                          
                        }
            }
        },
        openStatus(status){
            this.form_open_status= status;
        },
        isAddAddresClick(status){
            if(status==true){
                this.clearForm();
            }
        }
    },
    data(){
            return{
                'addressForm':{
                    "addLine1":'',
                    "addLine2":'',
                    "phone":'',
                    "custId":'',
                    "firstName":'',
                    "lastName":'',
                    "pincode":'',
                    "landmark":'',
                    "district":'',
                    "state":'Kerala',
                    "country":'India',
                    "addressType":'',
                    "isDefaultShippingAddress":false,
                    "isDefaultBillingAddress":false,
                    "custAdressId":'',
                    "longitude":'',
                    "latitude":'',
                    "area":'',
                    "area_id":""                 


                },
            'errors':{
                "addLine1_error":'',
                "addLine1_error_msg":'',                
                "phone_error":'',
                "phone_error_msg":'',
                "firstName_error":'',
                "firstName_error_msg":'',
                "pincode_error":'',
                "pincode_error_msg":'',
                "state_error":'',
                "state_error_msg":'',
                "district_error":'',
                "district_error_msg":'',
                "address_type_error":'',
                "country_error":""


                
             },    
                'form_submit_error_status':false,
                'form_submit_response':'',
                'form_open_status':'',
                'countryList':[],
                'state_list':[],
                'pincodeList':[],
                'countryCode':'',
                'lattitude':'0000',
                'longittude':'',
                location: null,
                localmap:'',
                center: {lat: 10.0224634, lng: 76.30415390000007}
                
            }
    },
    computed:{
       
    },
    mounted(){

       window.checkAndAttachMapScript(this.initLocationSearch);
       
       this.addressForm.custId = localStorage.getItem('custId');
       let $this =this;
       $this.getCountryList().then(function(response){
           $this.countryList=response.data.Data;          
       });

       $this.getStateList(101).then(function(response){
           $this.state_list =response.data.Data;
       });

       $this.getPincodeList().then(function(response){
          $this.pincodeList =response.data.Data;
      });

      $this.countryCode=Config.COUNTRY_CODE;
       
    },
    methods: {
           ...mapActions(['storeCustomerAddress','updateCustomerAddress','getCountryList','getStateList','getPincodeList']),
        hideAddressForm(){
           
            this.$emit('hideAddressForm')
        },
        initLocationSearch() {

            
                let geocoder = new window.google.maps.Geocoder();
                let localmap = new window.google.maps.Map(document.getElementById('map_box'), {
                    center: this.center,
                    zoom: 14,
                    draggable: true,           
                    animation: window.google.maps.Animation.DROP,
                    streetViewControl: false,
                    mapTypeControl: false,
                });

                    var input = document.getElementById('map_input');
                
                    localmap.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);
                    var options = {
                        componentRestrictions: {country: "in"}
                    };


                let autocomplete = new window.google.maps.places.Autocomplete(this.$refs.search,options);
                autocomplete.bindTo('bounds', localmap);
                let infowindow = new window.google.maps.InfoWindow();
                    let marker = new window.google.maps.Marker({
                        position: this.center,
                        map: localmap,
                        draggable: true,
                    });
                    
                        window.google.maps.event.addListener(marker, 'dragend', function (marker) {          
                        
                        var latLng = marker.latLng;
                    
                        geocoder.geocode({
                            latLng: latLng
                        }, function(responses) {
                            if (responses && responses.length > 0) {

                                //console.log(JSON.stringify(responses[0]));

                            let place = responses[0];
                                console.log(place);

                    

                                //updateMarkerAddress(responses[0].formatted_address);
                            } else {
                                //updateMarkerAddress('Cannot determine address at this location.');
                            }
                        });
                        infowindow.close();
                    });

                    let $this =this;

                    autocomplete.addListener('place_changed', function () {

                    let place = autocomplete.getPlace();
                    if (place && place.address_components) {
                       let geocode ={
                           lat:place.geometry.location.lat(),
                           lng: place.geometry.location.lng()
                       };
                        $this.findLocationInfo(geocode);
                    // console.log(place.address_components);
                        marker.setPosition(place.geometry.location);
                        // If the place has a geometry, then present it on a map.
                        if (place.geometry.viewport) {
                            localmap.fitBounds(place.geometry.viewport);
                        } else {
                            localmap.setCenter(place.geometry.location);
                            localmap.setZoom(17);
                        }
                    }
                    
                        
            
                });

                localmap.addListener(
                        'click',
                        ({ latLng: { lat, lng } }) =>{
                        let cordinates = { lat: lat(), lng: lng() };
                       
                        this.findLocationInfo(cordinates);
                        }
                        
                    );
            },
    
        findLocationInfo(geoCode){
            let $this =this;
            let url=`https://maps.googleapis.com/maps/api/geocode/json?latlng=${geoCode.lat}, ${geoCode.lng}&result_type=route&key=AIzaSyD8L237G-BLrf0hQtqaTdTiezwwqEzoq4A`;
            axios.get(url).then(function(response){
                let addresComponent = response.data.results[0]['address_components']??[];
                if(addresComponent!=''){
                    $this.addressForm.latitude =geoCode.lat;
                    $this.addressForm.longitude =geoCode.lng;

                    let addressline1 ='';
                    addresComponent.forEach(function(item){
                        let types =item.types;
                        if(types.includes("postal_code")){                           
                            $this.addressForm.pincode = item.long_name;
                        }
                        if(types.includes("locality")){                           
                            $this.addressForm.addLine2 = item.long_name;
                        }
                        if(types.includes("route")){   
                            
                            if(item.long_name!='Unnamed Road'){
                                addressline1 +=item.long_name;
                            }                        
                            $this.addressForm.addLine1 =  addressline1;
                        }

                        if(types.includes("sublocality")){   
                            
                            if(addressline1!=''){
                                addressline1 +=','+item.long_name;
                            }else{
                                 addressline1 =item.long_name;
                            }                        
                            $this.addressForm.addLine1 =  addressline1;
                        }


                    });

                }
            });
        },
        searchStateList(){
           
            let $this= this;
            let result = this.countryList.find(function(item){
                    if(item.name ===$this.addressForm.country){
                        return true;
                    }
            });


             $this.getStateList(result.id).then(function(response){
                $this.state_list =response.data.Data;
            });
           
        },         
        SaveAddress(){
            let errorStatus= false;
           errorStatus = this.validate_address_form();
            if(errorStatus==false){
                let $this =this;
                let location =$this.addressForm.district.split("_");
                let area_id =location[0];
                let area =location[1];
                $this.addressForm.areaId = area_id;
                $this.addressForm.area = area;
           
              
                $this.storeCustomerAddress($this.addressForm).then(function(response){
                    console.log(response.data.Message);
                    $this.$toast.success(`${response.data.Message}`); 
                    $this.clearForm(); 
                    $this.hideAddressForm();  
                }).catch(function(error){
                      $this.$toast.error(`${error.response.data.Message}`);   
                });


            }
        },

        updateCustAddress(){
             let errorStatus= false;
             errorStatus = this.validate_address_form();
                 if(errorStatus==false){
                    let $this =this;
                    let location =$this.addressForm.district.split("_");
                    let area_id =location[0];
                    let area =location[1];
                    $this.addressForm.areaId = area_id;
                    $this.addressForm.area = area;
                    $this.updateCustomerAddress($this.addressForm).then(function(response){
                        console.log(response.data.Message);
                        $this.$toast.success(`${response.data.Message}`); 
                        $this.clearForm();  
                         $this.hideAddressForm();
                    }).catch(function(error){
                        $this.$toast.error(`${error.response.data.Message}`);   
                    });


            }
        },
        validate_address_form(){
             let errorStatus= false;
              if(this.addressForm.firstName==''){
                this.errors.firstName_error=true;
                errorStatus  =true;
                }else{
                    this.errors.firstName_error=false;
                    
                }

                if(this.addressForm.addLine1==''){
                    this.errors.addLine1_error=true;
                errorStatus  =true;
                }else{
                    this.errors.addLine1_error=false;
                     
                }

                if(this.addressForm.phone==''){
                    this.errors.phone_error=true;
                    errorStatus  =true;
                }else{
                       let a = /^\d{10}$/; 
                        if (a.test(this.addressForm.phone)) {
                            this.errors.phone_error=false;
                           
                        }else{
                             this.errors.phone_error=true;
                             errorStatus  =true;
                        }
                   
                }

                if(this.addressForm.pincode==''){
                    this.errors.pincode_error=true;
                    errorStatus  =true;
                }else{
                    var pat1=/^\d{6}$/;
                    if(!pat1.test(this.addressForm.pincode))
                        {  
                        this.errors.pincode_error=true;                      
                         errorStatus  =true;
                        }else{
                            this.errors.pincode_error=false;
                        }
                    
                }

                if(this.addressForm.state==''){
                    this.errors.state_error=true;
                errorStatus  =true;
                }else{
                    this.errors.state_error=false;
                }

                 if(this.addressForm.country==''){
                    this.errors.country_error=true;
                errorStatus  =true;
                }else{
                    this.errors.country_error=false;
                }

                if(this.addressForm.district==''){
                    this.errors.district_error=true;
                errorStatus  =true;
                }else{
                    this.errors.district_error=false;
                }

                // if(this.addressForm.isDefaultShippingAddress == false && this.addressForm.isDefaultShippingAddress == false){
                //       errorStatus  =true;
                // }

               

                return errorStatus;
        },
        clearForm(){

            let addressForm={
                    "addLine1":'',
                    "addLine2":'',
                    "phone":'',
                    "custId":'',
                    "firstName":'',
                    "lastName":'',
                    "pincode":'',
                    "landmark":'',
                    "district":'',
                    "state":'Kerala',
                    "country":'India',
                    "addressType":'',
                    "isDefaultShippingAddress":false,
                    "isDefaultBillingAddress":false,
                    "custAdressId":'',
                    "longitude":'',
                    "latitude":'',
                }

                this.addressForm = addressForm;
                this.addressForm.custId = localStorage.getItem('custId');

        }
    },

}
</script>
<style scoped>
   
  
    #address_form_body{
        max-height: 500px;
       overflow-y: scroll;
    }
     .map_area{
         max-height: 200px;
        overflow: hidden;
        margin-bottom: 10px;
     }
    .error_border{
        border: 1px solid red !important;
    }

    .address_popup{
        /* max-width: 700px !important;
        margin: 0 auto  !important; */
    }

    .address_popup .modal-dialog{
        max-width: 700px !important;        
        overflow-y: auto;
        
      
    }

    .address_popup .modal-body{
        padding: 30px;
    }
    .modal-close{
        right:30px
    }

    #address_form_popup{
        z-index: 9999999999!important
    }

    .add-adress_sec select {
    width: 100%;
    box-shadow: inherit;
    height: 45px;
    padding-left: 15px;
    margin-bottom: 15px;
    border: 1px solid #b3b3b396;
    font-size: 15px;
    border-radius: 0;
}

   @media only screen and (max-width: 600px) {
       /* .address_popup .modal-dialog{
           height: 200px;
            padding-top: 250px;
       } */

       .address_popup {
           top:0px !important;
           overflow: auto !important;
       }
   }


  
 
</style>