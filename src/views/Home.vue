<template>
   <v-row no-gutters>
     <v-col class="pa-2" sm="12" md="3" cols="12">
       <FilterProperties class="d-sm-flex"/>
     </v-col>

     <v-col class="pa-2" md="9" cols="12">
       <ListProperties/>
     </v-col> 

   </v-row>
</template>

<script>
import FilterProperties from '../components/FilterProperties';
import ListProperties from '../components/ListProperties';

export default {
  name: 'Home',
  components: {
    FilterProperties,
    ListProperties
  },
  data: () => ({ 
    pizza: 2
  }),
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    },
  }   
};
</script>
