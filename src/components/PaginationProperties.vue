<template>
  <div>
    <div class="text-center">
      <v-pagination v-model="page" :length="6"></v-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pagination-properties',
    data () {
      return {
        page: 1
      }
    }
  }
</script>