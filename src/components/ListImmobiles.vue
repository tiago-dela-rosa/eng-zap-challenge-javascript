<template>
  <div>
    <v-card v-for="(immob) in pageResultImmobs" class="immobile" :key="immob.id" outlined>
      <v-row no-gutters>
        <v-col sm="5" cols="12">
          <v-carousel hide-delimiters height="273">
            <v-carousel-item v-for="(item,i) in immob.images" :key="i" :src="item"></v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col sm="7" cols="12">
          <v-card-title>Apartamento {{immob.pricingInfos.businessType | businessTypeTranslated }}, {{immob.usableAreas}}m²</v-card-title>
          <v-card-text>
            <div class="text--primary">
              <p v-show="immob.address.neighborhood && immob.address.city">{{immob.address.neighborhood}}, {{immob.address.city}}</p>

              <span v-if="immob.pricingInfos.businessType == 'SALE'" class="font-weight-medium display-1 teal--text">{{ immob.pricingInfos.price | currency}}</span>
              <span v-if="immob.pricingInfos.businessType == 'RENTAL'" class="font-weight-medium display-1 teal--text">{{ immob.pricingInfos.rentalTotalPrice | currency}}</span>  

              <span v-if="immob.pricingInfos.monthlyCondoFee > 0" class="grey--text"> <br> + {{immob.pricingInfos.monthlyCondoFee | currency}} Condomínio</span>
              <span v-else class="grey--text"><br>Não possui condomínio</span>
              <v-row no-gutters style="height: 20px;"></v-row>
              <p class="d-flex lex-column flex-sm-inline-flex">
                <span class="pr-5"><v-icon>mdi-car-multiple</v-icon> {{immob.parkingSpaces}} Vagas</span>
                <span class="pr-5"><v-icon>mdi-bed-empty</v-icon> {{immob.bedrooms}} Quartos</span>
                <span class="pr-5"><v-icon>mdi-shower</v-icon> {{immob.bathrooms}} Banheiros</span>
              </p>

              <img v-if="immob.portal.indexOf('vivaReal') > -1" class="logo vivareal" src="@/assets/logos/vivareal.svg" alt="Viva Real" title="Viva Real">
              <img v-if="immob.portal.indexOf('zap') > -1" class="logo zap" src="@/assets/logos/zap.png" alt="Zap" title="Zap">           
            </div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>  

    <v-pagination v-model="pagination.current" :total-visible="7" :length="totalPages" @input="next"></v-pagination>
  </div>
</template>

<script>

export default {
   props: {
     listImmobiles: {
       type: Array,
       required: true
     }
   },   
   data: () => ({
      pagination: {
         current: 1,
         total: 6,
         results: 20
      }
   }),

   computed: {

      totalPages: function (){
         if(this.listImmobiles.length >= this.pagination.results){
            return Math.ceil(this.listImmobiles.length / this.pagination.results);   
         }
      },

      pageResultImmobs: {
         get: function(){
            return this.listImmobiles.slice((this.pagination.current * this.pagination.results) - this.pagination.results, this.pagination.current * this.pagination.results)
         }
      }
   },  

   filters: {
      businessTypeTranslated: function (value) {
         switch(value){
            case 'RENTAL' : return 'para Aluguel';
            case 'SALE' : return 'à Venda';
         }
      }
   },

   watch : {

      // Paginação se adapta de acordo com os resultados filtrados.
      listImmobiles: function(value){
        if(value.length < this.pagination.current * this.pagination.results){
          this.pagination.current = 1;
        }
      }
   },

   methods:{
      next(page){
         this.pagination.current = page;
      }
  } 
};
</script>

<style>
  .immobile{margin-bottom: 10px;}
  .immobile:hover{-webkit-box-shadow: 2px 2px 5px 0px rgba(173,173,173,1);
-moz-box-shadow: 2px 2px 5px 0px rgba(173,173,173,1);
box-shadow: 2px 2px 5px 0px rgba(173,173,173,1);}
  .logo{max-width: 120px; display: inline; margin-right: 10px;}
  .logo:last-child{margin-right: 0px;}
  .zap{max-width: 80px;}  
  .vivareal{background: #1190CD; padding: 5px; border-radius: 5px;}
</style>