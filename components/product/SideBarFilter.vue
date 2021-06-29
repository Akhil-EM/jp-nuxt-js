<template >

                     <aside class="widget widget_shop" v-if="productCnt!=0">
                        <h4 class="widget-title">Categories</h4>
                        <ul class="ps-list--categories">
                           
                          
                           
                          <template v-for="(category,index) in  productFilters['categoryList']" :key="index">
                             <template v-if="category.catName!='Root Category'">  
                              <template v-if="findDepthOfCatTree(category)<2">
                                   <li class="current-menu-item ">
                                       
                                       <router-link :to="`/products/${category.catUrlKey}`">
                                        <span @click="refreshPageEvent(cat.catUrlKey)">{{category.catName}}</span> 
                                       </router-link>
                                       
                                    </li>

                              </template >
                              <template v-if="findDepthOfCatTree(category)==2">
                                  <li class="current-menu-item menu-item-has-children" @click="showDropDown(category.catId)">{{category.catName}}<span class="sub-toggle"><i class="fa fa-angle-right"></i></span>
                                   <ul :class="`sub-menu sub_menu_id_${category.catId}` " :id="`sub_menu_id_${category.catId}`">
                                     <template v-for="(cat,index) in  productFilters['categoryList']" :key="index">                                   
                                            <li class="current-menu-item " v-if="category.catId ==cat.parentId">
                                                 <router-link :to="`/products/${cat.catUrlKey}`">
                                                   <span @click="refreshPageEvent(cat.catUrlKey)">{{cat.catName}}</span>
                                                 </router-link>
                                                        <ul class="superSubMenu" >
                                                           
                                                              <template v-for="cat1 in productFilters['categoryList']" :key="cat1.catId">
                                                                
                                                                    <li  v-if="cat.catId ==cat1.parentId">
                                                                        <router-link :to="`/products/${cat1.catUrlKey}`" class="nav-link" >
                                                                            <span @click="refreshPageEvent(cat)">{{cat1.catName}}</span>
                                                                        </router-link>
                                                                        
                                                                    </li>
                                                             </template>
                                                            
                                                        </ul>
                                                
                                            </li>
                                          
                                        </template>
                                    </ul>
                                </li>

                              </template>
                                
                            </template>
                         </template>    
                          
                            
                           
                        </ul>
                    </aside>
                    <aside class="widget widget_shop">
                        <div class="paddingSpaceMain">
                            <template  v-if="filteredBrand !='' && filteredBrand[0].attrName=='Brand' && filteredBrand[0].attrValue!='N/A'">
                                 <h4 class="widget-title" >Search</h4>
                                <form class="ps-form--widget-search" action="" method="get" @Submit.prevent="searchBrands">
                                    <input placeholder="Search " class="form-control" v-model="brand_search" type="text" @keyup="searchBrands">
                                
                                </form>
                            </template>
                       

                            <div class="ps-checkbox1"  v-if="filteredBrand !='' && filteredBrand[0].attrName=='Brand'">
                                
                                <template v-for="(brand,index) in  filteredBrand" :key="index">
                                    
                                 
                                    <template v-if="brand.attrName=='Brand' && brand.attrValue!='N/A'">
                                        <div class="check_box_item" @click="pickedBrands(brand.attrValueId,index)">
                                            <input  type="checkbox" :id="`brand-${index}`" :checked="checkedBrands[index]"    name="brand" >
                                            <label  >{{brand.attrValue}}</label>
                                        </div>
                                            
                                           
                                    </template>
                                    
                                </template>
                                
                            </div>
                       
                        <figure class="brdr-btm-none">
                            <h4 class="widget-title price-range"> Price</h4>
                              
                                <Slider v-model="price"  :max="max"  @click="filterPriceRange" />
                        </figure>
                        <!-- <figure>
                            <h4 class="widget-title">Discount</h4>
                            <div class="ps-checkbox">
                                <input class="form-control" type="checkbox" id="discount-1" name="discount">
                                <label for="discount-1">15%-25% (140) </label>
                            </div>
                            <div class="ps-checkbox">
                                <input class="form-control" type="checkbox" id="discount-2" name="discount">
                                <label for="discount-2">35%-55% (190) </label>
                            </div>
                        </figure> -->
                        <!-- <figure>
                            <h4 class="widget-title">Availability</h4>
                            <div class="ps-checkbox">
                                <input class="form-control" type="checkbox" id="available" name="available">
                                <label for="available">inStock Products</label>
                            </div>
                        </figure> -->
                        </div>
                    </aside>

                   
                
   
</template>
<script>
 import Slider from '@vueform/slider'
 import $ from 'jquery';

export default {
    name:'SideBarFilter',
     
    props:[
        'productFilters',
        'minPrize',
        'maxPrize',
        'products'
    ],
    watch:{
        minPrize(minPrice){
            this.price[0]=minPrice;
        },
        maxPrize(maxPrize){
            this.price[1]=maxPrize;
            this.max=maxPrize;
        },
        productFilters(productFilters){
            this.brands = productFilters['attributes'];
            this.filteredBrand=productFilters['attributes'];
             for (let key in productFilters['attributes']) {
               
                this.checkedBrands[key]=false ;
            }

          
        },
        products(products){
            let productCnt=0;
                if(products!=''){
                    productCnt=products.length;
                }

            this.productCnt=productCnt;     
        },
        brand_search(){
             if(this.productFilters!=''){
                 for (let key in this.productFilters['attributes']) {               
                    this.checkedBrands[key]=false ;
                    this.selected_brands=[];
                }
             }
              
             
                
        }
    },

    data(){
        return{
           'price': [0,0],
           'max':5000,
           'brands':[],
           'checkedBrands':[],
           'selected_brands':[],
           'brand_search':'',
           'filteredBrand':[],
           
   
           
        }
       
    },
    components:{
        Slider
    },mounted(){
       this.price[0]=this.minPrize;
       this.price[1]=this.maxPrize;      
       this.filterPriceRange();

    },methods: {
        filterPriceRange(){
            this.$emit('price_range',this.price);
        },
        handleStickyEvent(payload){
            console.log(payload);
            // {evtName: "affix-top", vnode: vnode}
            payload.vnode.elm.classList('you-reached-the-top');
        },
        searchBrands(){
              let $this = this;
              $this.filteredBrand=[];
                if($this.brand_search !=''){

                        var results = this.brands.filter(function(value) {
                        return value.attrValue.toLowerCase().indexOf($this.brand_search.toLowerCase()) >= 0;
                        });

                         $this.filteredBrand=results;
                }else{
                     $this.filteredBrand=$this.brands;
                }
                
        },
           findDepthOfCatTree(category){
            let treelength =0;
            var code = category.code;
            let parts = code.split("#");
            treelength = parts.length;            
            return treelength;
        },
           refreshPageEvent(urlkey){
            this.url_key = urlkey;
            this.$emit('refreshpage',this.url_key)
            
        },
        showDropDown(category_id){
           
           $(`.sub_menu_id_${category_id}`).toggle()
        },
        // SelectedBrands(){
        //     let $this =this;
        //     setTimeout(function(){
        //          $this.$emit('checkedBrand',$this.checkedBrands);
        //     },1000)
            
            
            
        // },
        check3levelCat(parantCat){

            let isThirdLevel =false;          
                this.productFilters['categoryList'].forEach(function(item){                  
                        if(item.parentId ==parantCat){
                                isThirdLevel =true                    
                        }
                });
              return isThirdLevel;
        },
        pickedBrands(attributeId,index){         
           
           this.checkedBrands[index]=!this.checkedBrands[index];

            if(this.selected_brands.indexOf(attributeId) !== -1){
         
                this.selected_brands.splice(this.selected_brands.indexOf(attributeId), 1);
            } else{
               
                  this.selected_brands.push(attributeId);  
            }  
            
             this.$emit('checkedBrand',this.selected_brands);
            
        }

        
    },created(){

                
    }
}
</script>
<style src="@vueform/slider/themes/default.css"></style>

<style >
    .slider-connect {
    background: #d1131c;
    
  }
  .slider-tooltip{
      border: 1px solid #d1131c;
      background: #d1131c;
  }
  [type="checkbox"]
    {
        vertical-align:middle;
        width: 18px;
    }
   .check_box_item{
       display: block;
       padding-top: 5px;
        padding-bottom: 5px;
   } 
   .check_box_item label{
       
       margin-right: 3px;
       font-weight: 900;
       font-size: 16px;
       margin-left: 10px;
       color:#5d5a5a
   }
   .ps-layout--shop .ps-layout__left h4.widget-title.price-range {
       margin-bottom: 40px !important;
   }
   .ps-checkbox1{
       max-height: 170px;
       overflow-y: auto;
   }
   .ps-form--widget-search{
       margin-bottom: 20px;
   }

   @media only screen and (max-width: 1200px) {
    .filterDivMain{top: 100px;}
    .widget_shop{padding-bottom: 50px;}
        
    }
</style>