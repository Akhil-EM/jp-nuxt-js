<template >
      <div class="modal fade" id="sign-in" tabindex="-1" role="dialog" aria-labelledby="sign-in" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
             <!-- Modal content-->
      <div class="modal-content">
        <span class="modal-close" data-dismiss="modal"><i class="icon-cross2"></i></span>
        <div class="modal-body">
          <div class="row">
              <div class="col-md-6"><div class="login-bnr"><img src="/assets/img/sign-up-image.jpg"></div></div>
              <div class="col-md-6">
              <div class="log_area">    
              <div class="login-box">
                 <h3>Login</h3>
                 <p>This number will get a confirmation code.</p>
                 <input type="text" id="login" :class="{error_border:login_form.mobile_number_error}" v-model="login_form.mobile_number" placeholder="Type Your Mobile Number">
                  <div class="srch_btn"><input type="submit" value="Submit" @click="login()"></div>
                  <template v-if="login_form.mobile_number_error==true">
                    <div class="alert alert-danger mt-4" role="alert">
                       {{login_form.mobile_number_error_msg}}
                      </div>
                  </template>
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
export default {
    name:'OtpLogin',
    data(){
      return {       
        'login_form':{
          'mobile_number':'',
          'mobile_number_error':'',
          'mobile_mumber_error_msg':'',
        }
      }
    },methods:{
      login(){
        let errorStatus=false;
        if(this.login_form.mobile_number==''){
            this.login_form.mobile_number_error=true;
            errorStatus=true;
            this.login_form.mobile_number_error_msg='Mobile number filed required';
        }else{
               let a = /^\d{10}$/; 
                if(a.test(this.login_form.mobile_number)){
                    this.login_form.mobile_number_error=false;
                     this.login_form.mobile_number_error_msg='';                  
                }else{
                    this.login_form.mobile_number_error=true;
                     errorStatus  =true;
                     this.login_form.mobile_number_error_msg='Invalid mobile number, Its length not matched';   
                }
        }

        if(errorStatus==false){
            alert('success');
        }


      }
    }
}
</script>
<style scoped>
    .error_border{
      border: 1px solid red !important;
    }
</style>