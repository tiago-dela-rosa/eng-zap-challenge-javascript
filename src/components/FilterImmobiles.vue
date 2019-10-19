<template>
  <div id="filter">
    <v-row no-gutters>

      <v-col class="mx-auto block flex-row d-md-none d-lg-none" cols="12">  
        <v-card outlined>
          <v-btn v-show="!filterDisplay" color="teal" class="ma-2 white--text flex-row justify-end" @click="filterDisplay = true">
            <v-icon left dark>mdi-filter-variant-plus</v-icon>Filtrar 
          </v-btn>
          <v-btn v-show="filterDisplay" color="teal" class="ma-2 white--text flex-row justify-end" @click="filterDisplay = false">
            <v-icon left dark>mdi-filter-variant-minus</v-icon>Recolher Filtro 
          </v-btn>                      
          <v-btn text small @click="filterClear()" class="flex-row justify-end">Limpar filtros</v-btn>     
        </v-card>
      </v-col>
      
      <v-col cols="12">  
        <v-card class="d-none d-sm-none d-md-flex d-lg-flex" v-bind:class="{ 'd-flex' : filterDisplay, 'd-sm-flex' : filterDisplay }" outlined>
          <v-form>   
            <v-card-text> 
              <h2 class="headline">Tipo de operação</h2> 
              <v-radio-group v-model="filter.businessType" column>
                <v-radio @change="filterApply()" label="Aluguel" value="RENTAL"></v-radio>
                <v-radio @change="filterApply()" label="Venda" value="SALE"></v-radio>
              </v-radio-group>
            </v-card-text>  

            <v-card-text>
              <h2 class="headline">Onde procurar?</h2>
              <div>
                <v-autocomplete label="Digite o nome do bairro" v-model="filter.neighborhood" @change="filterApply()" clearable :items="locations"></v-autocomplete>
              </div>                  
            </v-card-text>

            <v-card-text>
              <h2 class="headline">Característica</h2>
              <v-subheader class="pl-1"></v-subheader>
              <v-slider @change="filterApply()" v-model="filter.parkingSpaces" min="0" max="6" label="Vagas" :thumb-size="20" thumb-label="always"></v-slider>
              <v-slider @change="filterApply()" v-model="filter.bedrooms" min="0" max="6" label="Quartos" :thumb-size="20" thumb-label="always"></v-slider>
              <v-slider @change="filterApply()" v-model="filter.bathrooms" min="0" max="6" label="Banheiros" :thumb-size="20" thumb-label="always"></v-slider>
           </v-card-text>

           <v-card-text>     
            <v-btn @click="filterClear()" class="ma-2" tile outlined color="teal">
              <v-icon left>mdi-filter-remove</v-icon> Limpar filtros
            </v-btn>            
           </v-card-text>

          </v-form>
        </v-card>
      </v-col>

    </v-row>
  </div>
</template>

<script>
export default {
   props: {
     locations: {
       type: Array,
       required: true
     }
   },        
  data: () => ({    
    filterDisplay: false,
    filter: {
      is_filtered: true,
      businessType: null,
      neighborhood: null,
      parkingSpaces: 0,
      bathrooms: 0,
      bedrooms: 0
    }
  }),
  methods: {

    filterApply(){
      this.$emit("onFiltering", this.filter);
    },

    filterClear(){
      for (const prop of Object.keys(this.filter)) {
        this.filter[prop] = null;
      }
      this.filter.is_filtered = true;
    }

  }
};
</script>
