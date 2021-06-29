<template>
    
       <div class="maxwidthproductmain">
           <div class="whilistIconwrapper">              
               </div>
               <div class="ps-product__thumbnail img_box" >
                   <router-link :to="`/products/${category.catUrlKey}`" class="nav-link" >
                            <img :src="`${web_admin_url}${category.imageUrl}`" :alt="category.catName">
                   </router-link>
               </div>
               <div class="ps-product__container">
                   <div class="ps-product__content">
                        <router-link :to="`/products/${category.catUrlKey}`" class="nav-link" >
                            <span >{{category.catName}}</span>
                        </router-link>
                       
                    </div>
                </div>
            </div>
   
</template>
<script>

export default {
   name:'CategoryCard',
   props:[
       'web_admin_url',
       'category'
   ]
    
}
</script>
<style scoped>
    .maxwidthproductmain{
        min-height: 237px;
    }
 

</style>