<template >
        <h3>payement Methods</h3>
        <!-- <div class="radio">
          <input id="radio-1" name="radio" type="radio" disabled  />
          <label for="radio-1" class="radio-label">
            <ul>
              <li>
                Add Debit / Credit / ATM Card
              </li>
              <li><img src="/assets/img/payment-mode-img.png" alt="" /></li>
            </ul>
          </label>
        </div>

        <div class="radio">
          <input id="radio-2" name="radio" type="radio" disabled />
          <label for="radio-2" class="radio-label">
            <ul>
              <li>
                Net Banking
              </li>
              <li>
                <div class="selectMain">
                  <select name="slct" id="slct">
                    <option selected disabled>Choose an option</option>
                    <option value="1">Pure CSS</option>
                    <option value="2">No JS</option>
                    <option value="3">Nice!</option>
                  </select>
                </div>
              </li>
            </ul>
          </label>
        </div>

        <div class="radio">
          <input id="radio-4" name="radio" type="radio" disabled />
          <label for="radio-4" class="radio-label">
            <ul>
              <li>
                Other UPI apps
              </li>
            </ul>
          </label>
        </div> -->

        <!-- <div class="radio">
          <input id="radio-3" name="radio" type="radio" disabled />
          <label for="radio-3" class="radio-label">
            <ul>
              <li>
                EMi Unaviabilae Why
              </li>
            </ul>
          </label>
        </div> -->

        

        <div class="radio">
            <template v-for="(paymentOption,index) in paymentMethods" :key="index">
                    <p @click="selectPaymentMethod(paymentOption.value)">
                    <input  type="radio" :id="paymentOption.value" name="radio-group" checked>
                    <label  class="radio-label" :for="paymentOption.value">{{paymentOption.label}}
                        <ul>
                            
                            <li>
                                <!-- <p>
                                Pay digitally with SMS Pay Link or Cash
                               
                                </p> -->
                            </li>
                            </ul>
                        </label>
                </p>
        </template> 
          
            
        </div>
</template>
<script>
export default {
    name:'PaymentOption',
    data(){
        return {
            'paymentMethods':[
                {
                    'label':'Payment on Delivery',
                    'value':'COD'
                }
            ]
        }
    },
    methods: {
        selectPaymentMethod(paymentMethod){
            this.$emit('selectedPaymentOption',paymentMethod);
        }
    },
}
</script>
<style scoped>
    
</style>