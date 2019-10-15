<template>
  <v-app>
    <v-container fluid class="grey lighten-5">
       <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({ 
    // dados para todas as paginas
  })  
};
</script>
