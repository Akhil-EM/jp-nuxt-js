<template>
  <div
    id="product-quickview"
    class="modal fade"
    tabindex="-1"
    data-backdrop="static"
    role="dialog"
    aria-labelledby="product-quickview"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <!-- Modal content-->
      <div class="modal-content">
        <span v-if="isneedPopuClose" class="modal-close" data-dismiss="modal"
          ><i class="icon-cross2" @click="clearValidationError"></i
        ></span>
        <div class="modal-body">
          <form
            autocomplete="off"
            method="get"
            action=""
            @Submit.prevent="setLocation"
          >
            <input
              id="fname"
              v-model="location"
              autocomplete="off"
              :type="inputType"
              placeholder="choose your location"
              @input="searchLocation"
            />
            <!-- <Multiselect
              v-model="value"
              placeholder="Select your location"
              :options="makeLocationOptions"
              :searchable="true"
              label="name"
              track-by="name"
            >
              <template v-slot:singleLabel="{ value }">
                {{ value.name }}
              </template>
              <template v-slot:option="{ option }">
                {{ option.name }}
              </template>
            </Multiselect> -->
            <p :class="{ 'text-danger': locationError != '', 'mt-3': true }">
              {{ locationError }}
            </p>
            <div id="" class="location_suggetion">
              <ul>
                <div v-for="(pincode, index) in pincodeSearchList" :key="index">
                  <li
                    href="javascript:void(0)"
                    @click="updateSearchString(pincode.area, pincode)"
                  >
                    {{ pincode.area }}
                  </li>
                </div>
              </ul>
            </div>
          </form>

          <div class="srch_btn">
            <input type="submit" value="Submit" @click="setLocation" />
          </div>
          <a class="available_loc" href="/locations">Available locations</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import $ from 'jquery'
// import Multiselect from '@vueform/multiselect'
import Config from '../config'
export default {
  name: 'Location',
  components: {
    // Multiselect
  },
  data() {
    return {
      location: '',
      pincodeList: [],
      pincodeSearchList: [],
      selectedLocation: [],
      isneedPopuClose: false,
      inputType: 'text',
      locationError: '',
      value: null
    }
  },

  mounted() {
    const $this = this
    this.getPincodeList().then(function(response) {
      $this.pincodeList = response.data.Data
    })

    if (Config.PINCODE_ID != '') {
      this.isneedPopuClose = true
    } else {
      $('#product-quickview').addClass('show')
      $('#product-quickview').css({ display: 'block' })
      $('.ps-site-overlay').css({ visibility: 'visible', opacity: ' .8' })
    }
  },
  methods: {
    ...mapActions(['getPincodeList']),

    goToAvialableLocation() {
      $('#product-quickview').removeClass('show')
      $('#product-quickview').css({ display: 'none' })
      $('.ps-site-overlay').css({ visibility: 'hidden', opacity: ' 0' })
      $('.modal-backdrop').remove()
      this.$router.push({ path: '/locations' })
    },
    searchLocation() {
      $('.location_suggetion').css({ display: 'block' })
      const $this = this
      if (this.location != '') {
        let results = ''
        if ($this.pincodeList != '') {
          results = $this.pincodeList.filter(function(value) {
            return (
              value.area.toLowerCase().indexOf($this.location.toLowerCase()) >=
              0
            )
          })
        }

        $this.pincodeSearchList = results
      }

      if ($this.pincodeSearchList == '') {
        $('.location_suggetion').css({ display: 'none' })
      }
    },
    updateSearchString(search_value, pincode) {
      this.location = search_value
      this.selectedLocation = pincode
      $('.location_suggetion').css({ display: 'none' })
    },
    setLocation() {
      if (this.value != '') {
        let locationExist = false
        const $this = this
        let selectedLocation = ''
        this.pincodeList.forEach(function(item) {
          if (item.area.toLowerCase() == $this.value.toLowerCase()) {
            locationExist = true
            selectedLocation = item
          }
        })

        if (locationExist == false) {
          $this.locationError = 'Invalid location'
          return
        } else {
          $this.locationError = ''
        }

        $('.srch').removeClass('error_border')
        this.$cookies.set('location_title', selectedLocation.area)
        this.$cookies.set('location_info', selectedLocation)
        localStorage.setItem('location_info', JSON.stringify(selectedLocation))
        Config.PINCODE_ID = selectedLocation.pincodeId
        Config.VENDOR_URL_KEY = selectedLocation.vendorUrlKey
        Config.ADMIN_API_HEADER.headers.vendorUrlKey =
          selectedLocation.vendorUrlKey
        Config.CUSTOMER_API_HEADER.headers.vendorUrlKey =
          selectedLocation.vendorUrlKey

        this.$emit('location_updated')
        this.location = ''
        $('#product-quickview').removeClass('show')
        $('#product-quickview').css({ display: 'none' })
        $('.ps-site-overlay').css({ visibility: 'hidden', opacity: ' 0' })
        $('.modal-backdrop').remove()
        location.reload()
      } else {
        $('.srch').addClass('error_border')
      }
    },
    clearValidationError() {
      $('.srch').removeClass('error_border')
      $('#product-quickview').removeClass('show')
      $('#product-quickview').css({ display: 'none' })
      $('.ps-site-overlay').css({ visibility: 'hidden', opacity: ' 0' })
    },
    noop() {
      alert(event)
    }
  },
  computed: {
    ...mapGetters(['fetctPincodeList']),
    makeLocationOptions() {
      const options = []
      this.pincodeList.forEach(function(item) {
        const option = {
          value: item.area,
          name: item.area
        }
        options.push(option)
      })

      return options
    }
  }
}
</script>
<style scoped>
#fname {
  border-bottom: 1px solid #ddd;
}

.location_suggetion {
  display: none;
  position: absolute;
  z-index: 100;
  background: #f9f9f9;
  width: 95%;
  min-height: 50px;
  max-height: 400px;
  overflow-y: scroll;
  left: 8px;
  top: 56px;
  padding-left: 10px;
}
.available_loc {
  display: inline-block;
  cursor: pointer;
  position: absolute;
  right: 22px;
}
.error_border {
  border: 1px solid red !important;
}
#fname {
  border-bottom: none !important;
}
.srch {
  height: 48px !important;
}
@media only screen and (max-width: 600px) {
  #product-quickview {
    top: -60px !important;
    z-index: 99999999;
  }
}
</style>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>
.multiselect-option.is-selected {
  background: #023f88 !important;
}
.multiselect-option.is-selected.is-pointed {
  background: #023f88 !important;
}
.multiselect-options::-webkit-scrollbar {
  display: none;
}
</style>
