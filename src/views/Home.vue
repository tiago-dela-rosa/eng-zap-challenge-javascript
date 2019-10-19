<template>
  <v-row no-gutters>

    <v-col class="pa-2" sm="12" md="3" cols="12">
      <FilterImmobiles :locations="filterLocations" @onFiltering="filterApply" class="d-sm-flex"/>
    </v-col>

    <v-col class="pa-2" md="9" cols="12">
      <div v-if="loading">
        <v-skeleton-loader v-for="index in 3" height="273" type="card"></v-skeleton-loader>
      </div>
      <div v-else>
        <v-alert v-if="!loading && filteredImmobs.length <= 0" border="right" colored-border color="teal" icon="mdi-card-search" elevation="2" prominent>
          Ops, Neste momento não temos imóveis com o perfil que está procurando. <br> Tente <a @click.submit.prevent="filterClear()"  href="#" class="markdown--link markdown--internal teal--text">limpar o filtro</a> para encontrar mais opções.
        </v-alert>        
        <ListImmobiles :listImmobiles="filteredImmobs" />
      </div>      
    </v-col>

  </v-row>
</template>

<script>
// A parte mais dificil foi nomear imóvel, ficava entre: immobile, realty, property
import RulesImmobiles from '../mixins/RulesImmobiles';
import FilterImmobiles from '../components/FilterImmobiles';
import ListImmobiles from '../components/ListImmobiles';

export default {
  name: 'Home',
  mixins: [RulesImmobiles],
  components: {
    FilterImmobiles,
    ListImmobiles
  },
  data: () => ({ 
    loading: true,
    transition: 'scale-transition',    
    filterData: {
      is_filtered: false,
      businessType: ''
    }
  }),
  methods: {

    filterApply(variable) {
      this.filterData = variable;
    },

    filterClear(){
      for (const prop of Object.keys(this.filterData)) {
        this.filterData[prop] = null;
      }
      this.filterData.is_filtered = true;
    }

  },
  computed: {

    filterLocations: function(){

       const locations = this.immobiles.map((item, index) => {
          return item.address.neighborhood;

      }).filter((item) => { return item !== '' })
      return locations;
    },

    filteredImmobs: {
      get: function(){

        if(!this.filterData.is_filtered)
        {
          return this.immobiles;
        }
        else
        {
          return this.immobiles.filter((item) => {
            
            if(this.filterData.businessType)
              return item.pricingInfos.businessType == this.filterData.businessType
            else
              return true

          }).filter((item) =>{
            
            if(this.filterData.neighborhood)
              return item.address.neighborhood == this.filterData.neighborhood
            else
              return true
          
          }).filter((item) => {

            if(this.filterData.parkingSpaces)
              return item.parkingSpaces == this.filterData.parkingSpaces
            else
              return true

          }).filter((item) => {

            if(this.filterData.bathrooms)
              return item.bathrooms == this.filterData.bathrooms
            else
              return true

          }).filter((item) => {

            if(this.filterData.bedrooms)
              return item.bedrooms == this.filterData.bedrooms
            else
              return true
          })
        }
      }
    }    
  }
};
</script>
