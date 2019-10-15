<template>
  <div id="filter">
    <v-row no-gutters>

      <v-col class="mx-auto block flex-row d-md-none d-lg-none" cols="12">  
        <v-card outlined>
          <v-btn :loading="loading3" :disabled="loading3" color="teal" class="ma-2 white--text flex-row justify-end" @click="filterDisplay = true">
            <v-icon left dark>mdi-filter-variant-plus</v-icon>Filtrar 
          </v-btn>          
          <v-btn text small @click="filterClear()" class="flex-row justify-start">Limpar filtros</v-btn>     
        </v-card>
      </v-col>
      
      <v-col cols="12">  
        <v-card class="d-none d-sm-none d-md-flex d-lg-flex" v-bind:class="{ 'd-flex' : filterDisplay, 'd-sm-flex' : filterDisplay }" outlined>
          <v-form>   
            <v-card-text> 
              <h2 class="headline">Tipo de operação</h2> 
              <v-radio-group v-model="businessType" column>
                <v-radio label="Aluguel" value="RENTAL"></v-radio>
                <v-radio label="Venda" value="SALE"></v-radio>
              </v-radio-group>
            </v-card-text>  

            <v-card-text>
              <h2 class="headline">Onde procurar?</h2>
              <div>
                <v-autocomplete label="Digite a cidade ou bairro" :items="cidadesBairros"></v-autocomplete>
              </div>                  
            </v-card-text>
            
            <v-card-text>
              <h2 class="headline">Preço</h2>
              <v-row>
                <v-col cols="6">
                  <v-text-field v-model="price.minPrice" label="R$ De:" required></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="price.maxPrice" label="R$ Até:" required></v-text-field>       
                </v-col>
              </v-row>
           </v-card-text>

            <v-card-text>
              <h2 class="headline">Caracteristicas</h2>
              <v-subheader class="pl-1"></v-subheader>
              <v-slider v-model="parkingSpaces" min="0" max="6" label="Vagas" :thumb-size="20" thumb-label="always"></v-slider>
              <v-slider v-model="bathrooms" min="0" max="6" label="Suítes" :thumb-size="20" thumb-label="always"></v-slider>
              <v-slider v-model="bedrooms" min="0" max="6" label="Quartos" :thumb-size="20" thumb-label="always"></v-slider>
           </v-card-text>    
          </v-form>
        </v-card>
      </v-col>

    </v-row>
  </div>
</template>

<script>
export default {
  name: 'FilterProperties',    
  data: () => ({
    filterDisplay: false,
    loading3: false,
    price: {
      minPrice: null,
      maxPrice: null,
      monthlyCondoFee: 'Não possui',
      yearlyIptu: 'Não possui'
    },
    bedrooms: 0,
    bathrooms: 0,
    parkingSpaces: 0,
    businessType: null,
    cidadesBairros: [
      'Cotia', 'Vargem Grande Paulista', 'São Paulo', 'São Bernado', 'São Caetano do Sul',
    ],
  }),
  methods: {
    filterClear(){
      this.filterDisplay = false;
    }
  }
};
</script>
