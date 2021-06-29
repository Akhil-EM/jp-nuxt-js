<template>
  <div class="ps-breadcrumb">
    <div class="ps-container">
      <ul class="breadcrumb">
        <li v-for="(url, index) in urls" :key="index">
          <template v-if="urls.length - 1 != index">
            <router-link :to="url.path">{{ url.name }}</router-link>
          </template>
          <template v-else>
            {{ url.name }}
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Breadcrumb',
  props: ['urls']
}
</script>
<style scopped></style>
