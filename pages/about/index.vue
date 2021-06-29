<template>
  <div class="text-center ">
    <nuxt-link to="/">home</nuxt-link>
    <nuxt-link to="about">about</nuxt-link>
  </div>
</template>

<script>
export default {
  layout: 'frontend',
  head() {
    return {
      title: 'about page title',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'about page discription'
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'about page title'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            'http://wpr.intertoons.net/centrealadmin/assets/images/uploads/productimages/Dabur-Chyawanprash-2Ximmunity-500G-Centreal-Bazaar-Supermarket-in-Kerala.jpg'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'about page discription'
        }
      ]
    }
  }
}
</script>
