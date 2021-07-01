<template lang="">
        <div class="ps-site-features">
            <div class="container">
                 <h3>Shop From Top Categories</h3>
                <div class="ps-section__content">

                    <div class="top_cat_desktop">
                             <carousel :itemsToShow="sliderCont" v-if="render_slider_card" >
                                <slide v-for="category in top_categories" :key="category.catId">
                                    <div class="ps-product">
                                            <div class="ps-product__thumbnail">
                                                <router-link :to="`/products/${category.catUrlKey}`">
                                                    <img :src="`${web_admin_url}${category.imageUrl}`" :alt="category.catName" />
                                                </router-link>
                                                
                                            </div>
                                            <div class="ps-product__container">
                                                <div class="ps-product__content">
                                                    <router-link  class="ps-product__title" :to="`/products/${category.catUrlKey}`">{{category.catName}}</router-link>
                                                
                                                </div>

                                            </div>
                                        </div>                         
                                </slide>

                            <template #addons>
                            <navigation />
                           
                            </template>
                        </carousel>
                    </div>
                    <div class="top_cat_mob">
                        <template v-if="render_slider_card" >
                                <template v-for="category in top_categories" :key="category.catId">
                                    <div class="ps-product">
                                                <div class="ps-product__thumbnail">
                                                    <router-link :to="`/products/${category.catUrlKey}`">
                                                        <img :src="`${web_admin_url}${category.imageUrl}`" :alt="category.catName" />
                                                    </router-link>
                                                    
                                                </div>
                                                <div class="ps-product__container">
                                                    <div class="ps-product__content">
                                                        <router-link  class="ps-product__title" :to="`/products/${category.catUrlKey}`">{{category.catName}}</router-link>
                                                    
                                                    </div>

                                                </div>
                                        </div>        

                                </template>

                        </template>

                     </div>   

                   
                    
                        
                     
                 
                </div>
            </div>
        </div>
</template>
<script>
import Config from  '../config';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
export default {
    name:'TopCategorySlider',
    props:[
        'top_categories'
    ],
     components: {
       Carousel,
        Slide,
       
        Navigation,
  },
    watch:{
        sliderCont(){
            this.render_slider_card=false;
            let $this=this;
             this.$nextTick(() => {
                // Add the component back in
                $this.render_slider_card = true;
            });
        }
    },
  data(){
      return {
          'web_admin_url':'',
           'window': {
                    width: 0,
                    height: 0
                },
            'sliderCont':'5',
            'render_slider_card':true
      }
  },
  mounted(){
          this.web_admin_url =Config.WEB_ADMIN_URL;
         
    },
    methods:{
        handleResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
            this.calculateSlideCount(window.innerWidth);
        },
        calculateSlideCount(width){
            console.log(width);
                if(width <=360){
                    this.sliderCont=2;
                }else if(width>360 && width <=450){
                     this.sliderCont=2;
                }else if(width>450 && width <=570){
                    this.sliderCont=2;
                }else if(width>570 && width <=767){
                    this.sliderCont=2;
                }else if(width>767 && width <=992){
                    this.sliderCont=3;
                }else if(width>992 && width <=1200){
                    this.sliderCont=4;
                }else if(width>1200 && width <=1920){
                    this.sliderCont=5;
                }else{
                   // this.sliderCont=5; 
                }
        } 
    },created(){
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    unmounted() {
        window.removeEventListener('resize', this.handleResize);
    },
}
</script>
<style scoped>
    .ps-product{
        border: none !important;
    }
    .ps-product .ps-product__title {
        font-family: intro;
        text-transform: capitalize;
    }

    @media screen and (max-width: 570px){
         .shopCategoriesDiv .ps-product__thumbnail {
             width:auto !important;
             max-width: auto !important;
         }
    }

   
</style>