<template >
          <div class="modal fade" id="product_review" tabindex="-1" role="dialog" aria-labelledby="product_review" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
             <!-- Modal content-->
      <div class="modal-content">
        <span class="modal-close" data-dismiss="modal"  @click="closeReviewModdal"><i id="icon-cross2" class="icon-cross2"></i></span>
        <div class="modal-body">
            <div class="row">
                <div class="col-md-12">
                    <h2>Product review </h2>
                    <hr/>
                    <h4>Submit your review</h4>
                    <p>Your rating of this product</p>
                     <form class="rating">
                                <label>
                                    <input type="radio" name="stars" value="1" @click="updaterating(1)" />
                                    <span class="icon">★</span>
                                </label>
                                <label>
                                    <input type="radio" name="stars" value="2"  @click="updaterating(2)"/>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                </label>
                                <label>
                                    <input type="radio" name="stars" value="3"  @click="updaterating(3)"/>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>   
                                </label>
                                <label>
                                    <input type="radio" name="stars" value="4"  @click="updaterating(4)"/>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                </label>
                                <label>
                                    <input type="radio" name="stars" value="5"  @click="updaterating(5)"/>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                    <span class="icon">★</span>
                                </label>
                                </form>
                     <input class="review_input form-control" v-model="review_title" placeholder="Write your title here"/>
                     <textarea class="review_input mt-2 form-control" v-model="review_description"  placeholder="Write your review here"></textarea>
                     <div class="footer_area">
                         <a href="javascript:void(0)" class="rv_close_btn"  @click="closeReviewModdal">Close</a>
                         <a href="javascript:void(0)" class="rv_submit_btn" @click="submitReview">Submit review</a>

                     </div>
                </div>

            </div>

        </div>
       
      </div>
        </div>
    </div>
</template>
<script>
import $ from "jquery";
import axios from "axios";
import Config from  '../config';
export default {
    name:'ProductReview',
    props:[
        'review_open_status',
        'review_product_url_key'
    ],
    watch:{
        review_open_status(openStatus){
            if(openStatus ==true){
                this.openReviewPopup();
            }
        }
    },
    methods:{
         closeReviewModdal(){
             this.$emit('close_review_popup');
            $('#product_review').removeClass('show');
            $('#product_review').css({'display':'none'});
            $('.ps-site-overlay').css({'visibility':'hidden','opacity':' 0'});
        },
        updaterating(rating){
            this.rating=rating;
        },
        submitReview(){
            let errorStatus =false;
             if(this.review_title==''){
                this.review_title_error=true;
                errorStatus  =true;
            }else{
                 this.review_title_error=false;
            }

            if(this.review_description==''){
                this.review_description_error=true;
                errorStatus  =true;
            }else{
                 this.review_description_error=false;
            }

            if(errorStatus == false){
                let payload ={
                    "cusId":localStorage.getItem("custId"),
                    "urlKey":this.review_product_url_key,
                    "rating":this.rating,
                    "review":this.review_description,
                    "reviewtitle":this.review_title
                }
                let $this =this;
               axios.post(`${Config.BASE_URL}Product/ProductReviewSubmit`,payload,Config.CUSTOMER_API_HEADER).then(function(response){
                   $this.closeReviewModdal();
                   $this.$toast.success(`${response.data.Message}`);
               });
            }
        },
        openReviewPopup(){        
                $('#product_review').addClass('show');
                $('#product_review').css({'display':'block'});
                $('.ps-site-overlay').css({'visibility':'visible','opacity':' .8'});
        }
    },
    data(){
        return {
            'rating':0,
            'review_title':'',
            'review_description':'',
            'review_title_error':'',
            'review_description_error':''
        }
    }
}
</script>
<style >
#product_review .modal-body{
        padding: 30px;
}
.footer_area{
    margin-top:20px;
    margin-bottom:20px
}
.rv_close_btn{
       background: #a5a7a6;
        color: #fff;
        padding: 10px;
        text-align: center;
        font-size: 15px;
        cursor: pointer;
        width: 180px;
        border-radius: 3px;
        border: none;
        margin-right: 10px;
}
    .rv_submit_btn{
        background: #22e282;
        color: #fff;
        padding: 10px;
        text-align: center;
        font-size: 15px;
        cursor: pointer;
        width: 180px;
        border-radius: 3px;
        border: none;
    }

    .rating {
  display: inline-block;
  position: relative;
  height: 50px;
  line-height: 50px;
  font-size: 50px;
}

.rating label {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  cursor: pointer;
}

.rating label:last-child {
  position: static;
}

.rating label:nth-child(1) {
  z-index: 5;
}

.rating label:nth-child(2) {
  z-index: 4;
}

.rating label:nth-child(3) {
  z-index: 3;
}

.rating label:nth-child(4) {
  z-index: 2;
}

.rating label:nth-child(5) {
  z-index: 1;
}

.rating label input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.rating label .icon {
  float: left;
  color: transparent;
}

.rating label:last-child .icon {
  color: #000;
}

.rating:not(:hover) label input:checked ~ .icon,
.rating:hover label:hover input ~ .icon {
  color: rgb(241 16 16);
}

.rating label input:focus:not(:checked) ~ .icon:last-child {
  color: #000;
  text-shadow: 0 0 5px rgb(241 16 16);
}
</style>