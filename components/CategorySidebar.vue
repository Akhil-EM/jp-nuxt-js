<template>
       <aside class="widget widget_shop" v-if="productCnt!=0">
                        <h4 class="widget-title">Categories</h4>
                        <ul class="ps-list--categories">
                          <template v-for="(category,index) in  categories" :key="index">
                             <template v-if="category.catName!='Root Category'">  
                              <template v-if="findDepthOfCatTree(category)<2">
                                   <li class="current-menu-item ">
                                       
                                       <router-link :to="`/all-category?subCat=${category.catUrlKey}&pid=${category.parentId}`">
                                        <span @click="refreshPageEvent(cat.catUrlKey)">{{category.catName}}</span> 
                                       </router-link>
                                       
                                    </li>

                              </template >
                              <template v-if="findDepthOfCatTree(category)==2">
                                  <li class="current-menu-item menu-item-has-children" @click="showDropDown(category.catId)">{{category.catName}}<span class="sub-toggle"><i class="fa fa-angle-right"></i></span>
                                   <ul :class="`sub-menu sub_menu_id_${category.catId}` " :id="`sub_menu_id_${category.catId}`">
                                     <template v-for="(cat,index) in  categories" :key="index">                                   
                                            <li class="current-menu-item " v-if="category.catId ==cat.parentId">
                                                 <router-link :to="`/all-category?subCat=${cat.catUrlKey}&pid=${cat.parentId}`">
                                                   <span @click="refreshPageEvent(cat.catUrlKey)">{{cat.catName}}</span>
                                                 </router-link>
                                                        <ul class="superSubMenu" >
                                                           
                                                              <template v-for="cat1 in categories" :key="cat1.catId">
                                                                
                                                                    <li  v-if="cat.catId ==cat1.parentId">
                                                                        <router-link :to="`/all-category?subCat=${cat1.catUrlKey}&pid=${cat1.parentId}`" class="nav-link" >
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
</template>
<script>
import $ from 'jquery';
export default {
    name:'CategorySidebar',
    props:[
        'categories'
    ],
    methods:{
          findDepthOfCatTree(category){
            let treelength =0;
            var code = category.code;
            let parts = code.split("#");
            treelength = parts.length;            
            return treelength;
        },
        showDropDown(category_id){
           
           $(`.sub_menu_id_${category_id}`).toggle()
        },
        refreshPageEvent(urlkey){
             this.url_key = urlkey;
             this.$emit('refreshpage',this.url_key)
        }

    }
}
</script>
<style scoped>
  
   @media only screen and (max-width: 600px) {
       #mySidenav2 aside{
           margin-top:12%!important;
       }

      
    }
</style>