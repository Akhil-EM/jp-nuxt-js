<template lang="">
        <div class="cart-sec">
            <div class="input-group inline-group">
                <div class="input-group-prepend">
                    <button class="btn btn-outline-secondary btn-minus" @click="sub()">
                        <i class="fa fa-minus"></i>
                    </button>
                </div>
                <input class="form-control quantity" min="1" name="quantity" v-model="count" type="number">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary btn-plus" @click="add()">
                        <i class="fa fa-plus"></i>
                    </button>
                </div>
            </div>
            <div class="addcart-btn" @click="addtocart(product.urlKey)">
                       <template v-if="cart_ajax=='closed'">
                                <span :class="`is_in_cart_${product.urlKey}`">{{isIncart()}}</span>
                            </template>
                            <template v-if="cart_ajax=='open' && cart_product_url_key==product.urlKey">
                                <ButtonLoader :loaderColor="loaderColor"
                                                :loaderStyle="loaderStyle"
                                                :cart_ajax="cart_ajax">
                                </ButtonLoader>
                            </template>
                            <template v-if="cart_ajax=='open' && cart_product_url_key!=product.urlKey">
                                <span :class="`is_in_cart_${product.urlKey}`">{{isIncart()}}</span>
                            </template>
            </div>
        </div>
</template>
<script>
import ButtonLoader from '../../components/ButtonLoader';
export default {
    name:'QantityBox',
    props:[
        'cart_ajax',
        'cart_product_url_key',
        'product',
        'button_label'
    ],
    watch:{
        button_label(){
            this.isIncart();
        }
    },
    data(){
        return {
             'count':1,
             'loaderColor':'#fff',
                'loaderStyle':{
                    'width':'35px'
            },
        }
    },
    components:{
        ButtonLoader
    },
    computed:{
    
    },
    methods:{

        isIncart(){
                  if(this.product.IsCarted==true){
                    return 'View in cart';
                    }else{
                        return 'Add';
                    
                    }
            
        },
         add(){
            this.count++;
        },
        sub(){
            if(this.count>1){
                this.count--;
            }else{
                 this.count =1;
            }
             
        },
        addtocart(url_key){               
           
            let productInfo ={
                'url_key':url_key,
                'product_qty':this.count
            }
            this.$emit('addToCart',productInfo)
        }
    },

}
</script>
<style scoped>
    
</style>