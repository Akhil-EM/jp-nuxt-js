<template>
  <div v-if="count > -1" class="product_qty">
    <div class="form-group--number" :style="style">
      <button class="up" @click="add()">
        <i class="fa fa-plus" aria-hidden="true"></i>
      </button>
      <button class="down" @click="sub()">
        <i class="fa fa-minus" aria-hidden="true"></i>
      </button>
      <input
        v-model="count"
        class="form-control"
        type="text"
        readonly
        placeholder="1"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'CartQtyCounter',
  props: ['productUrlKey', 'cartItemId', 'qtyCont', 'qtyReset', 'style'],
  data() {
    return {
      count: this.qtyCont > 0 ? this.qtyCont : 0
    }
  },
  watch: {
    qtyCont(newCount) {
      this.count = newCount > 0 ? newCount : 1
    },
    qtyReset(count) {
      if (count != 0) {
        if (this.count > 1) {
          this.count = this.count - count
        }

        this.$emit('carQtyReset')
      }
    }
  },
  methods: {
    add() {
      this.count++
      this.updateCartQuntity('add')
    },
    sub() {
      if (this.count > 1) {
        this.count--
      } else {
        this.count = 1
      }
      this.updateCartQuntity('sub')
    },
    updateCartQuntity(type) {
      const cartItemInfo = {
        product_qty: this.count,
        url_key: this.product_url_key,
        type: type,
        cart_item_id: this.cartItemId
      }
      if (this.count > 0) {
        this.$emit('updateCartQty', cartItemInfo)
      }
    }
  }
}
</script>
<style scoped></style>
