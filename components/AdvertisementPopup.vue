<template>
  <div
    id="advtisement-popup"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="advtisement-popup"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <!-- Modal content-->
      <div class="modal-content">
        <span
          id="offer_popup_close"
          class="modal-close"
          data-dismiss="modal"
          @click="closeModdal"
          ><i class="icon-cross2"></i
        ></span>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-12">
              <router-link :to="`/${templateData.Link ?? '/'}`">
                <img
                  :src="`${web_admin_url}${templateData.imageUrl}`"
                  @click="clickBanner"
                />
              </router-link>
            </div>
            <!-- <div class="col-md-7">
                   <div class="offer_cbox">
                       <h3>Offer title</h3>
                       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                           Ea ab impedit ducimus eaque quidem earum nemo velit tempora 
                           quibusdam quas! Cum id voluptate et voluptates. Ex exercitationem neque nulla inventore?</p>
                         <a>Explore</a>  
                   </div>
               </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import Config from '../config'
export default {
  name: 'AdvertisementPopup',
  props: ['showModal', 'templateData'],
  data() {
    return {
      web_admin_url: ''
    }
  },
  watch: {
    showModal(value) {
      if (value == true) {
        this.openModel()
      }
    }
  },
  mounted() {
    this.web_admin_url = Config.WEB_ADMIN_URL
  },
  methods: {
    closeModdal() {
      $('#advtisement-popup').removeClass('show')
      $('#advtisement-popup').css({ display: 'none' })
      $('.ps-site-overlay').css({ visibility: 'hidden', opacity: ' 0' })
    },
    openModel() {
      $('#advtisement-popup').addClass('show')
      $('#advtisement-popup').css({ display: 'block' })
      $('.ps-site-overlay').css({ visibility: 'visible', opacity: ' .8' })
    },
    clickBanner() {
      $('.ps-site-overlay').css({ visibility: 'hidden', opacity: ' 0' })
    }
  }
}
</script>
<style scoped>
.modal-lg {
  max-width: 840px !important;
}

.ps-site-overlay {
  z-index: 999999999;
}
.offer_cbox {
  margin-top: 50px;
  align-content: center;
}
.offer_cbox h3 {
  text-align: center;
}
.offer_cbox a {
  font-size: 12px;
  border: none;
  font-weight: 600;
  display: block;
  border-radius: 4px;
  width: 100px;
  padding: 8px;
  color: #fff;
  text-align: center;
  background: #d71920 !important;
  margin-top: 20px;
  align-items: center;
}
span.modal-close {
  position: absolute;
  z-index: 9999;
  right: -28px;
  margin-top: 15px;
  margin-right: 5px;
  cursor: pointer;
  top: -29px;
  color: #fff;
}
img {
  widows: 100% !important;
}
@media only screen and (max-width: 1200px) {
  .modal-lg {
    max-width: 100% !important;
  }
}
@media only screen and (max-width: 600px) {
  #offer_popup_close {
    margin-top: 6px !important;
    margin-right: 40px !important;
    color: #2b2929 !important;
  }
}
</style>
