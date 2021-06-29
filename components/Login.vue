<template>
  <div
    id="sign-in"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="sign-in"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <!-- Modal content-->
      <div class="modal-content">
        <span class="modal-close" data-dismiss="modal" @click="closeLoginModdal"
          ><i id="icon-cross2" class="icon-cross2"></i
        ></span>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6">
              <div class="login-bnr">
                <img src="/assets/img/sign-up-image.jpg" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="log_area">
                <div class="login-box">
                  <template v-if="loginType == 'otp'">
                    <template v-if="otp_login.login_otp_send_status == false">
                      <h3>Login</h3>
                      <p>
                        This phone/email/whatsApp will get a confirmation code.
                      </p>
                      <input
                        id="login"
                        v-model="otp_login.username"
                        type="text"
                        :class="{ error_border: otp_login.user_name_error }"
                        placeholder="Type Your Mobile Number/Email"
                      />
                      <div class="srch_btn">
                        <button
                          class="srch_btn"
                          type="submit"
                          @click="otpLogin()"
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
                      </div>
                    </template>
                    <template v-if="otp_login.login_otp_send_status == true">
                      <h3>Verify OTP</h3>

                      <input
                        id="login"
                        v-model="otp_login.login_otp"
                        type="text"
                        :class="{
                          error_border: otp_login.verify_otp_error_msg
                        }"
                        placeholder="Please enter OTP"
                      />
                      <div class="srch_btn">
                        <button
                          class="srch_btn"
                          type="submit"
                          @click="verifyLoginOtp()"
                        >
                          <template v-if="cart_ajax == 'closed'">
                            Verify
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
                      </div>
                      <template v-if="otp_login.login_otp_send_status == true">
                        <div class="login_reset_link">
                          <a href="javascript:void(0)" @click="resentLoginOtp()"
                            >Resend OTP</a
                          >
                        </div>
                      </template>
                    </template>
                  </template>
                  <template v-if="loginType == 'password'">
                    <h3>Login</h3>
                    <p>Email / Mobile Number</p>
                    <input
                      id="login"
                      v-model="login_form.user_name"
                      type="text"
                      :class="{ error_border: login_form.user_name_error }"
                      placeholder="Email / Mobile Number"
                    />
                    <p>Password</p>
                    <input
                      id="login"
                      v-model="login_form.password"
                      type="password"
                      :class="{ error_border: login_form.password_error }"
                      placeholder="Password"
                    />
                    <div class="srch_btn">
                      <button class="srch_btn" type="submit" @click="login()">
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
                    </div>
                  </template>

                  <template v-if="login_form.login_error_status == true">
                    <div class="alert alert-danger mt-4" role="alert">
                      {{ login_form.login_error_msg }}
                    </div>
                  </template>
                  <template v-if="otp_login.verify_otp_error_status == true">
                    <div class="alert alert-danger mt-4" role="alert">
                      {{ otp_login.verify_otp_error_msg }}
                    </div>
                  </template>
                  <template v-if="otp_login.login_otp_error_status == true">
                    <div class="alert alert-danger mt-4" role="alert">
                      {{ otp_login.login_otp_error_msg }}
                    </div>
                  </template>
                  <div class="w-100 text-center mt-2">
                    <a
                      href="javascript:void(0)"
                      class="text-warning"
                      @click="Registerpopup()"
                      >Register
                    </a>
                    <a href="javascript:void(0)" @click="passwordReset()"
                      >Forgot Password ?</a
                    >
                    <p>or</p>
                    <a
                      class="text-warning"
                      @click="
                        switchLoginType(loginType == 'otp' ? 'password' : 'otp')
                      "
                      >Login with
                      {{ loginType == 'otp' ? 'password' : 'OTP' }}</a
                    >
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
import $ from 'jquery'
import { mapGetters, mapActions } from 'vuex'
import ButtonLoader from '../components/ButtonLoader'
export default {
  name: 'Login',
  components: {
    ButtonLoader
  },
  data() {
    return {
      login_form: {
        user_name: '',
        user_name_error: '',
        user_name_error_msg: '',
        password: '',
        password_error: '',
        password_error_msg: '',
        login_error_status: false,
        login_error_msg: ''
      },
      cart_ajax: 'closed',
      loaderColor: '#fff',
      loaderStyle: {
        width: '35px'
      },
      otp_login: {
        username: '',
        user_name_error: '',
        user_name_error_msg: '',
        login_otp_error_status: '',
        login_otp_error_msg: '',
        login_otp_url_key: '',
        login_otp_send_status: false,
        login_otp: '',
        verify_otp_error_status: false,
        verify_otp_error_msg: ''
      },
      loginType: 'password'
    }
  },
  methods: {
    ...mapActions([
      'customerLogin',
      'customerOtpLogin',
      'customerLoginOtpVerify'
    ]),
    switchLoginType(type) {
      this.loginType = type
    },

    otpLogin() {
      let errorStatus = false
      if (this.otp_login.username == '') {
        this.otp_login.user_name_error = true
        errorStatus = true
        this.otp_login.user_name_error_msg =
          'Email /mobile number filed required'
      } else {
        this.otp_login.user_name_error = false
        this.otp_login.user_name_error_msg = ''
      }

      if (errorStatus == false) {
        this.cart_ajax = 'open'
        const $this = this
        const payload = {
          userName: $this.otp_login.username
        }
        $this
          .customerOtpLogin(payload)
          .then(function(response) {
            $this.cart_ajax = 'closed'
            if (response.status == 200) {
              $this.otp_login.login_otp_error_status = false
              $this.otp_login.login_otp_url_key = response.data.Data
              $this.otp_login.login_otp_send_status = true
              $this.$toast.success(`${response.data.Message}`)
            }
          })
          .catch(function(error) {
            $this.cart_ajax = 'closed'

            $this.otp_login.login_otp_error_status = true
            $this.otp_login.login_otp_error_msg = error.response.data.Message
          })
      }
    },

    verifyLoginOtp() {
      let errorStatus = false
      if (this.otp_login.login_otp == '') {
        this.otp_login.verify_otp_error_status = true
        errorStatus = true
        this.otp_login.verify_otp_error_msg =
          'Email /mobile number filed required'
      } else {
        this.otp_login.verify_otp_error_status = false
        this.otp_login.verify_otp_error_msg = ''
      }

      if (errorStatus == false) {
        this.cart_ajax = 'open'
        const $this = this
        const payload = {
          otp: $this.otp_login.login_otp,
          otp_url: $this.otp_login.login_otp_url_key
        }
        $this
          .customerLoginOtpVerify(payload)
          .then(function(response) {
            $this.cart_ajax = 'closed'
            if (response.status == 200) {
              $this.otp_login.verify_otp_error_status = false
              $this.$toast.success(`${response.data.Message}`)
              window.location.reload()
            }
          })
          .catch(function(error) {
            $this.cart_ajax = 'closed'

            $this.otp_login.verify_otp_error_status = true
            $this.otp_login.verify_otp_error_msg = error.response.data.Message
          })
      }
    },
    resentLoginOtp() {
      const $this = this
      const payload = {
        userName: $this.otp_login.username
      }
      $this
        .customerOtpLogin(payload)
        .then(function(response) {
          $this.cart_ajax = 'closed'
          if (response.status == 200) {
            $this.otp_login.login_otp_error_status = false
            $this.otp_login.login_otp_url_key = response.data.Data
            $this.otp_login.login_otp_send_status = true
            $this.$toast.success(`${response.data.Message}`)
          }
        })
        .catch(function(error) {
          $this.cart_ajax = 'closed'

          $this.otp_login.login_otp_error_status = true
          $this.otp_login.login_otp_error_msg = error.response.data.Message
        })
    },

    login() {
      let errorStatus = false
      if (this.login_form.user_name == '') {
        this.login_form.user_name_error = true
        errorStatus = true
        this.login_form.user_name_error_msg =
          'Email /mobile number filed required'
      } else {
        this.login_form.user_name_error = false
        this.login_form.user_name_error_msg = ''
      }

      if (this.login_form.password == '') {
        this.login_form.password_error = true
        errorStatus = true
        this.login_form.password_error_msg = 'Password filed required'
      } else {
        this.login_form.password_error = false
        this.login_form.password_error_msg = ''
      }

      if (errorStatus == false) {
        this.cart_ajax = 'open'
        const $this = this
        const payload = {
          userName: this.login_form.user_name,
          password: this.login_form.password
        }
        $this
          .customerLogin(payload)
          .then(function(response) {
            $this.cart_ajax = 'closed'
            if (response.status == 200) {
              $this.login_form.login_error_status = false
              $this.$toast.success(`successfully logined`)
              window.location.reload()
              // console.log(response.data)
            }
          })
          .catch(function(error) {
            $this.cart_ajax = 'closed'
            console.log(error)
            console.log(error.response.data.Message)
            $this.login_form.login_error_status = true
            $this.login_form.login_error_msg = error.response.data.Message
          })
      }
    },
    passwordReset() {
      this.closeLoginModdal()
      $('#forget-password').addClass('show')
      $('#forget-password').css({ display: 'block' })
      $('.ps-site-overlay').css({ visibility: 'visible', opacity: ' .8' })
      $('#sign-in').attr('aria-hidden', true)
    },
    Registerpopup() {
      this.$emit('open_register_popup', true)
      $('#icon-cross2').trigger('click')
      $('#sign-up').addClass('show')
      $('#sign-up').css({ display: 'block' })
      $('.ps-site-overlay').css({ visibility: 'visible', opacity: ' .8' })
      // $('.login-box input').removeClass('error_border');
      $('.login-box .text-danger').html('')
    },
    closeLoginModdal() {
      $('#sign-in').removeClass('show')
      $('#sign-in').css({ display: 'none' })
      $('.ps-site-overlay').css({ visibility: 'hidden', opacity: ' 0' })
    }
  },
  computed: {
    ...mapGetters(['getCustomerInfo', 'isCustomerLoggined'])
  },
  mounted() {}
}
</script>
<style scoped>
.error_border {
  border: 1px solid red !important;
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

  background: #41b548 !important;
  color: #fff;
  border-radius: 7px;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.7px;
}
.login_reset_link {
  text-align: center;
  padding: 10px;
}
</style>
