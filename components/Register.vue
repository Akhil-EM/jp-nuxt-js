<template>
  <div
    id="sign-up"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="sign-up"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <!-- Modal content-->
      <div class="modal-content">
        <span class="modal-close" data-dismiss="modal" @click="closeModdal"
          ><i class="icon-cross2"></i
        ></span>
        <div class="modal-body">
          <div class="signWrapperMainDiv">
            <div class="log_area">
              <div class="login-box">
                <template v-if="register_form.registration_status == false">
                  <h3>Sign Up</h3>
                  <p>Please Enter Your Details</p>
                  <input
                    id="login"
                    v-model="register_form.first_name"
                    type="text"
                    :class="{ error_border: register_form.first_name_error }"
                    placeholder="Your First Name"
                  />

                  <input
                    id="login"
                    v-model="register_form.last_name"
                    type="text"
                    :class="{ error_border: register_form.last_name_error }"
                    placeholder="Your Last Name"
                  />

                  <div style="display:flex">
                    <div style="width:20%" class="mr-1">
                      <input id="login" v-model="country_code" type="text" />
                    </div>
                    <div style="width:79%">
                      <input
                        id="login"
                        v-model="register_form.phone"
                        type="text"
                        :class="{ error_border: register_form.phone_error }"
                        placeholder="Enter Your Phone number"
                        @change="OnchangeUsername()"
                      />
                    </div>
                  </div>
                  <p v-if="register_form.email_error" class="text-danger">
                    {{ register_form.phone_error_msg }}
                  </p>
                  <input
                    id="login"
                    v-model="register_form.email"
                    type="text"
                    :class="{ error_border: register_form.email_error }"
                    placeholder="Enter Your Email Id"
                    @change="OnchangeUsername()"
                  />
                  <p v-if="register_form.email_error" class="text-danger">
                    {{ register_form.email_error_msg }}
                  </p>
                  <input
                    id="login"
                    v-model="register_form.password"
                    type="password"
                    :class="{ error_border: register_form.password_error }"
                    placeholder="Enter Your Password"
                  />
                  <p v-if="register_form.password_error" class="text-danger">
                    {{ register_form.password_error_msg }}
                  </p>
                  <input
                    id="login"
                    v-model="register_form.confirm_password"
                    type="password"
                    :class="{
                      error_border: register_form.confirm_password_error
                    }"
                    placeholder="Confirm Your Password"
                  />
                  <p
                    v-if="register_form.confirm_password_error"
                    class="text-danger"
                  >
                    {{ register_form.confirm_password_error_msg }}
                  </p>

                  <button
                    class="srch_btn"
                    type="submit"
                    @click="registration()"
                  >
                    <template v-if="cart_ajax == 'closed'">
                      Submit
                    </template>
                    <template v-if="cart_ajax == 'open'">
                      <ButtonLoader
                        :loader-color="loaderColor"
                        :loader-style="loaderStyle"
                        :cart_ajax="cart_ajax"
                      >
                      </ButtonLoader>
                    </template>
                  </button>
                </template>
                <template v-else>
                  <h3>Verify OTP</h3>
                  <p>SMS/email/whatsApp will get a confirmation code.</p>
                  <input
                    id="login"
                    v-model="verify_opt.registration_otp"
                    type="text"
                    :class="{ error_border: verify_opt.confirm_password_error }"
                    placeholder="Enter OTP"
                  />
                  <p
                    v-if="verify_opt.registration_otp_error"
                    class="text-danger"
                  >
                    {{ verify_opt.registration_otp_error_msg }}
                  </p>
                  <div class="srch_btn">
                    <input
                      type="submit"
                      value="Verify OTP"
                      @click="verifyOTP()"
                    />
                  </div>
                  <template v-if="verify_opt.otp_verify_status">
                    <div class="alert alert-success mt-4" role="alert">
                      <i class="fa fa-check-circle"></i>
                      OTP verified successfully
                    </div>
                  </template>
                </template>
              </div>

              <div class="signWrapperMain">
                <div class="login-bnr">
                  <img src="/assets/img/sign-up-image.jpg" />
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
import axios from 'axios'
import $ from 'jquery'
import Config from '../config'
import ButtonLoader from '../components/ButtonLoader'

export default {
  name: 'Register',
  components: {
    ButtonLoader
  },
  props: ['openRegister'],
  data() {
    return {
      register_form: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        phone_error: '',
        phone_error_msg: '',
        password: '',
        confirm_password: '',
        first_name_error: '',
        last_name_error: '',
        email_error: '',
        email_error_msg: '',
        password_error: '',
        password_error_msg: '',
        confirm_password_error: '',
        confirm_password_error_msg: '',
        registration_status: false
      },
      registration_response: '',
      verify_opt: {
        registration_otp: '',
        registration_otp_error: '',
        registration_otp_error_msg: '',
        otp_verify_status: false
      },
      country_code: '',
      errorStatus: false,
      userChkError: '',
      cart_ajax: 'closed',
      loaderColor: '#fff',
      loaderStyle: {
        width: '35px'
      }
    }
  },
  watch: {
    open_register(registerStatus) {
      if (registerStatus == false) {
        this.register_form.registration_status = false
      }
    }
  },
  mounted() {
    this.country_code = Config.COUNTRY_CODE
  },
  methods: {
    registration() {
      this.errorStatus = false
      this.reSetRegForm()

      if (this.register_form.first_name == '') {
        this.register_form.first_name_error = true
        this.errorStatus = true
      } else {
        this.register_form.first_name_error = false
      }
      if (this.register_form.last_name == '') {
        this.register_form.last_name_error = true
        this.errorStatus = true
      } else {
        this.register_form.last_name_error = false
      }
      if (this.register_form.phone == '') {
        this.register_form.phone_error = true
        this.errorStatus = true
      } else {
        const a = /^\d{10}$/
        if (a.test(this.register_form.phone)) {
          this.register_form.phone_error = false
          this.register_form.phone_error_msg = ''
        } else {
          this.register_form.phone_error = true
          this.register_form.phone_error_msg =
            'Invalid mobile number, Its length not matched'
        }
      }

      if (this.register_form.email == '') {
        this.register_form.email_error = true
        this.errorStatus = true
      } else if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          this.register_form.email
        )
      ) {
        this.register_form.email_error = false
        this.register_form.email_error_msg = ''
      } else {
        this.register_form.email_error = true
        this.errorStatus = true
        this.register_form.email_error_msg =
          'Please enter a valid email address.'
      }

      if (this.register_form.password == '') {
        this.register_form.password_error = true
        this.errorStatus = true
      } else if (this.register_form.password.length < 6) {
        this.register_form.password_error = true
        this.errorStatus = true
        this.register_form.password_error_msg =
          'Please enter at least 6 characters.'
      } else {
        this.register_form.password_error_msg = ''
        this.register_form.password_error = false
      }
      if (this.register_form.password == '') {
        this.register_form.confirm_password_error = true
        this.errorStatus = true
      } else if (
        this.register_form.password != this.register_form.confirm_password
      ) {
        this.register_form.confirm_password_error = true
        this.errorStatus = true
        this.register_form.confirm_password_error_msg =
          'Enter the same password'
      } else {
        this.register_form.confirm_password_error = false
        this.register_form.confirm_password_error_msg = ''
      }

      if (this.errorStatus == false && this.cart_ajax == 'closed') {
        this.cart_ajax = 'open'
        const $this = this
        const payload = {
          email: this.register_form.email,
          mobile: this.register_form.phone,
          name: `${this.register_form.first_name} ${
            this.register_form.last_name
          }`,
          password: this.register_form.password
        }
        axios
          .post(
            `${Config.BASE_URL}Customer/Register`,
            payload,
            Config.ADMIN_API_HEADER
          )
          .then(function(response) {
            if (response.status == 200) {
              // $this.$toast.success(`${response.data.Message}`);
              $this.registration_response = response.data.Data
              $this.register_form.registration_status = true

              $this.register_form.first_name = ''
              $this.register_form.last_name = ''
              $this.register_form.email = ''
              $this.register_form.phone = ''
              $this.register_form.confirm_password = ''
              $this.register_form.password = ''
            } else {
              $this.$toast.error(`Something went wrong please try again`)
              $this.register_form.registration_status = false
            }

            $this.cart_ajax = 'closed'
          })
          .catch(function(error) {
            $this.$toast.error(`${error.response.data.Message}`)
            $this.cart_ajax = 'closed'
          })
      } else if (this.userChkError != '') {
        this.$toast.error(`${this.userChkError}`)
        this.cart_ajax = 'closed'
      }
    },
    verifyOTP() {
      let errorStatus = false
      if (this.verify_opt.registration_otp == '') {
        this.verify_opt.registration_otp_error = true
        this.verify_opt.registration_otp_error_msg = 'Please enter valid OTP'
        errorStatus = true
      } else {
        this.verify_opt.registration_otp_error = false
        this.verify_opt.registration_otp_error_msg = ''
        errorStatus = false
      }

      if (errorStatus == false) {
        const otp_url_key = this.registration_response.otpUrlKey
        const $this = this
        axios
          .get(
            `${Config.BASE_URL}Customer/RegisterVerifyOTP?OTP=${
              $this.verify_opt.registration_otp
            }&OtpUrlKey=${otp_url_key}`,
            Config.ADMIN_API_HEADER
          )
          .then(function(response) {
            if (response.status == 200) {
              $this.$toast.success(`${response.data.Message}`)
              $this.verify_opt.otp_verify_status = true
              $this.closeModdal()
              $this.openLoginForm()
            }
          })
          .catch(function(error) {
            $this.verify_opt.registration_otp_error_msg =
              error.response.data.Message
            $this.verify_opt.registration_otp_error = true
            $this.verify_opt.otp_verify_status = false
          })
      }
    },
    closeModdal() {
      $('#sign-up').removeClass('show')
      $('#sign-up').css({ display: 'none' })
      $('.ps-site-overlay').css({ visibility: 'hidden', opacity: ' 0' })
    },
    openLoginForm() {
      $('#sign-in').addClass('show')
      $('#sign-in').css({ display: 'block' })
      $('.ps-site-overlay').css({ visibility: 'visible', opacity: ' .8' })
    },
    OnchangeUsername() {
      // let username ='';
      // if(type=='email'){
      //     username =this.register_form.email;
      // }else if(type =='phone'){
      //       username =this.register_form.phone
      // }
      const $this = this
      $this.userChkError = ''
      $this.errorStatus = false
      const checkingArr = ['email', 'phone']
      checkingArr.forEach(function(item) {
        if (item == 'email' && $this.register_form.email != '') {
          axios
            .get(
              `${Config.BASE_URL}Customer/UserExistCheck?UserName=${
                $this.register_form.email
              }`,
              Config.ADMIN_API_HEADER
            )
            .then(function(response) {
              console.log(response)
              if (response.data.Data == true) {
                $this.$toast.error(`${response.data.Message}`)
                $this.errorStatus = true
                $this.userChkError = response.data.Message
              }
            })
        }

        if (item == 'phone' && $this.register_form.phone != '') {
          axios
            .get(
              `${Config.BASE_URL}Customer/UserExistCheck?UserName=${
                $this.register_form.phone
              }`,
              Config.ADMIN_API_HEADER
            )
            .then(function(response) {
              console.log(response)
              if (response.data.Data == true) {
                $this.$toast.error(`${response.data.Message}`)
                $this.errorStatus = true
                $this.userChkError = response.data.Message
              }
            })
        }
      })
    },
    reSetRegForm() {
      this.register_form.phone_error = false
      this.register_form.phone_error_msg = ''
      this.register_form.first_name_error = false
      this.register_form.last_name_error = ''
      this.register_form.email_error = false
      this.register_form.email_error_msg = ''
      this.register_form.password_error = false
      this.register_form.confirm_password_error = false
      this.register_form.confirm_password_error_msg = ''
      this.register_form.phone_error_msg = ''
    }
  }
}
</script>
<style scoped>
.error_border {
  border: 1px solid red !important;
}
.login-bnr {
  padding-bottom: 20px !important;
}
button {
  background: #41b548;
  border: none;
  border-radius: 10px;
  color: #fff;
  text-transform: uppercase;
}
.srch_btn button {
  height: 100%;
  width: 100px;
  background: #41b548 !important;
  color: #fff;
  border-radius: 7px;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.7px;
}
#sign-up .modal-body {
  /* min-height: 200px !important; */
  min-height: 504px !important;
}
</style>
