<template>
  <div class="white">
    <div>
      <a target="_blank" href="https://wa.me/917594999934/?text=">
        <i class="fa fa-phone" aria-hidden="true"></i
      ></a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WhatsAppButton'
}
</script>
<style scoped>
.white {
  z-index: 999;
  position: fixed;
  right: 10px;
}
@media only screen and (max-width: 600px) {
  .white {
    top: 13% !important;
    z-index: 1000000000 !important;
    position: fixed;
    right: 0px !important;
  }
}
</style>
