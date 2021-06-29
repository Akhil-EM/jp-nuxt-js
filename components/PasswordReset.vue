<template>
  <div
    id="forget-password"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="forget-password"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <!-- Modal content-->
      <div class="modal-content">
        <span class="modal-close" data-dismiss="modal"
          ><i id="icon-cross2" class="icon-cross2" @click="closeModdal()"></i
        ></span>
        <div class="modal-body">
          <div class="signWrapperMainDiv forgetWrappermain">
            <div class="log_area">
              <div class="login-box">
                <template
                  v-if="
                    password_resetform.reset_request_status == true &&
                      opt_verify_form.verification_request_status == false
                  "
                >
                  <h3>Enter OTP :</h3>
                  <p>OTP has been Sended to Email/SMS/WhatsApp</p>
                  <input
                    id="login"
                    v-model="opt_verify_form.otp"
                    type="text"
                    :class="{ error_border: opt_verify_form.otp_error }"
                    placeholder="Enter OTP here"
                  />
                  <div class="srch_btn">
                    <input
                      type="submit"
                      value="Verify OTP"
                      @click="verifyOtp()"
                    />
                  </div>
                  <div class="w-100 text-center mt-4">
                    <a href="javascript:void(0)" @click="resentOTP()">
                      Resend OTP</a
                    >
                  </div>
                </template>
                <template
                  v-else-if="password_resetform.reset_request_status == false"
                >
                  <h3>Forgot Password ?</h3>
                  <p>Email Id</p>
                  <input
                    id="login"
                    v-model="password_resetform.email"
                    type="text"
                    :class="{ error_border: password_resetform.email_error }"
                    placeholder="Enter Email ID"
                  />
                  <h5>--or--</h5>
                  <p>Mobile Number</p>
                  <input
                    id="login"
                    v-model="password_resetform.mobile"
                    type="text"
                    :class="{ error_border: password_resetform.mobile_error }"
                    placeholder="Enter Mobile Number"
                  />
                  <div class="srch_btn">
                    <input type="submit" value="Get OTP" @click="getOtp()" />
                  </div>

                  <template
                    v-if="
                      password_resetform.password_reset_error_status == true
                    "
                  >
                    <div class="alert alert-danger mt-4" role="alert">
                      {{ password_resetform.password_reset_error_msg }}
                    </div>
                  </template>
                </template>

                <template
                  v-if="opt_verify_form.verification_request_status == true"
                >
                  <h3>Reset Password ?</h3>
                  <p>Password</p>
                  <input
                    id="login"
                    v-model="password_update_form.password"
                    type="password"
                    :class="{
                      error_border: password_update_form.password_error
                    }"
                    placeholder="Enter new password"
                  />
                  <p
                    v-if="password_update_form.password_error"
                    class="text-danger"
                  >
                    {{ password_update_form.password_error_msg }}
                  </p>
                  <p>Confirm password</p>
                  <input
                    id="login"
                    v-model="password_update_form.confirm_password"
                    type="password"
                    :class="{
                      error_border: password_update_form.confirm_password_error
                    }"
                    placeholder="Re-type your password"
                  />
                  <p
                    v-if="password_update_form.confirm_password_error"
                    class="text-danger"
                  >
                    {{ password_update_form.confirm_password_error_msg }}
                  </p>
                  <div class="srch_btn">
                    <input
                      type="submit"
                      value="Update password"
                      @click="updatepassword()"
                    />
                  </div>
                </template>
              </div>
            </div>
            <div class="signWrapperMain forgetPassDivMain">
              <div class="login-bnr">
                <img src="/assets/img/sign-up-image.jpg" />
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
import axios from 'axios'
import Config from '../config'
export default {
  name: 'PasswordReset',
  data() {
    return {
      password_resetform: {
        email: '',
        mobile: '',
        email_error: '',
        mobile_error: '',
        password_reset_error_status: false,
        password_reset_error_msg: '',
        reset_request_status: '',
        reset_request_response: ''
      },
      opt_verify_form: {
        otp: '',
        otp_error: '',
        verification_request_status: '',
        verification_request_response: ''
      },
      password_update_form: {
        password: '',
        confirm_password: '',
        password_error: '',
        password_error_msg: '',
        confirm_password_error: '',
        confirm_password_error_msg: '',
        password_update_request_status: '',
        password_update_request_response: ''
      }
    }
  },
  methods: {
    closeModdal() {
      $('#forget-password').removeClass('show')
      $('#forget-password').css({ display: 'none' })
      $('.ps-site-overlay').css({ visibility: 'hidden', opacity: ' 0' })
      $('.modal-backdrop').remove()
    },
    getOtp() {
      let errorStatus = false
      if (this.password_resetform.email == '') {
        this.password_resetform.email_error = true
      } else {
        this.password_resetform.email_error = false
      }
      if (this.password_resetform.mobile == '') {
        this.password_resetform.mobile_error = true
      } else {
        this.password_resetform.mobile_error = false
      }

      if (
        this.password_resetform.mobile_error == false ||
        this.password_resetform.email_error == false
      ) {
        errorStatus = false
      } else {
        errorStatus = true
      }

      if (errorStatus == false) {
        const $this = this

        axios
          .get(
            `${Config.BASE_URL}Customer/ForgotPassword?email=${
              $this.password_resetform.email
            }&mobileNumber=${$this.password_resetform.mobile}`,
            Config.ADMIN_API_HEADER
          )
          .then(function(response) {
            $this.password_resetform.reset_request_status = true
            $this.password_resetform.password_reset_error_status = false
            $this.password_resetform.reset_request_response = response.data.Data
            $this.$toast.success(`OTP request successfully Send`)
          })
          .catch(function(error) {
            $this.password_resetform.password_reset_error_msg =
              error.response.data.Message
            $this.password_resetform.reset_request_status = false
            $this.password_resetform.password_reset_error_status = true
            $this.$toast.error(`${error.response.data.Message}`)
          })
      }
    },
    verifyOtp() {
      let errorStatus = false
      if (this.opt_verify_form.otp == '') {
        this.opt_verify_form.otp_error = true
        errorStatus = true
      } else {
        this.opt_verify_form.otp_error = false
        errorStatus = false
      }

      if (errorStatus == false) {
        const $this = this
        const otpURLKey = $this.password_resetform.reset_request_response
        axios
          .get(
            `${Config.BASE_URL}Customer/VerifyOTP?OTP=${
              $this.opt_verify_form.otp
            }&OtpUrlKey=${otpURLKey}`,
            Config.ADMIN_API_HEADER
          )
          .then(function(response) {
            $this.opt_verify_form.verification_request_status = true
            $this.opt_verify_form.verification_request_response =
              response.data.Data
            $this.$toast.success(`${response.data.Message}`)
          })
          .catch(function(error) {
            $this.opt_verify_form.verification_request_status = false
            $this.$toast.error(`${error.response.data.Message}`)
          })
      }
    },
    updatepassword() {
      let errorStatus = false
      if (this.password_update_form.password == '') {
        this.password_update_form.password_error = true
        errorStatus = true
      } else if (this.password_update_form.password.length < 6) {
        this.password_update_form.password_error = true
        errorStatus = true
        this.password_update_form.password_error_msg =
          'Please enter at least 6 characters.'
      } else {
        this.password_update_form.password_error_msg = ''
        this.password_update_form.password_error = false
      }

      if (this.password_update_form.password == '') {
        this.password_update_form.confirm_password_error = true
        errorStatus = true
      } else if (
        this.password_update_form.password !=
        this.password_update_form.confirm_password
      ) {
        this.password_update_form.confirm_password_error = true
        errorStatus = true
        this.password_update_form.confirm_password_error_msg =
          'Enter the same password'
      } else {
        this.password_update_form.confirm_password_error = false
        this.password_update_form.confirm_password_error_msg = ''
      }

      if (errorStatus == false) {
        const $this = this
        const otpUrlKey = $this.opt_verify_form.verification_request_response
        const password = $this.password_update_form.password
        axios
          .get(
            `${
              Config.BASE_URL
            }Customer/ResetPassword?OtpUrlKey=${otpUrlKey}&password=${password}`,
            Config.ADMIN_API_HEADER
          )
          .then(function(response) {
            $this.password_update_form.password_update_request_status = true
            $this.password_update_form.password_update_request_response =
              response.data.Data
            $this.$toast.success(`${response.data.Message}`)
            $this.password_update_form.password = ''
            $this.password_update_form.confirm_password_error = ''
            $this.closeModdal()
          })
          .catch(function(error) {
            $this.password_update_form.password_update_request_status = false
            $this.$toast.error(`${error.response.data.Message}`)
          })
      }
    },

    resentOTP() {
      const $this = this
      const otpURLKEey = $this.password_resetform.reset_request_response

      axios
        .get(
          `${Config.BASE_URL}Customer/SendAgainOTP?OtpUrlKey=${otpURLKEey}`,
          Config.ADMIN_API_HEADER
        )
        .then(function(response) {
          $this.$toast.success(`${response.data.Message}`)
        })
        .catch(function(error) {
          $this.$toast.error(`${error.response.data.Message}`)
        })
    }
  }
}
</script>
<style scoped>
@media screen and (min-width: 720px) {
}
.error_border {
  border: 1px solid red !important;
}
</style>
