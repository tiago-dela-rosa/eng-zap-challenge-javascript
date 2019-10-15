<template>
  <div>
    <v-card outlined>
      <v-row no-gutters>
        <v-col sm="5" cols="12">
          <v-carousel hide-delimiters height="273">
            <v-carousel-item v-for="(item,i) in propierties.images" :key="i" :src="item.src" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col sm="7" cols="12">
          <v-card-title>Apartamento para aluguel, 47m²</v-card-title>
          <v-card-text>
            <div class="text--primary">
              <p>Vila Brasílio Machado, São Paulo</p>
              <span class="font-weight-medium display-1 teal--text">R$ 89.00</span><span class="grey--text"> <br> + R$ 35,00 Condominio</span>
              <v-row no-gutters style="height: 20px;"></v-row>
              <p class="d-flex lex-column flex-sm-inline-flex">
                <span class="pr-5"><v-icon>mdi-car-multiple</v-icon> 3 Vagas</span>
                <span class="pr-5"><v-icon>mdi-bed-empty</v-icon> 3 Quartos</span>
                <span class="pr-5"><v-icon>mdi-shower</v-icon> 3 Suítes</span>
              </p>

              <img class="logo vivareal" src="@/assets/logos/vivareal.svg" alt="Viva Real" title="Viva Real">
              <img class="logo zap" src="@/assets/logos/zap.png" alt="Zap" title="Zap">           
            </div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>

    <pagination-properties />    

  </div>
</template>

<script>

import PaginationProperties from '@/components/PaginationProperties';
import LogoVivaReal from '@/assets/logos/vivareal.svg';

export default {
  name: 'ListProperties',
  components: {
    PaginationProperties
  },
  data: () => ({
    propierties: {
        price: {
          minPrice: null,
          maxPrice: null,
          monthlyCondoFee: 'Não possui',
          yearlyIptu: 'Não possui'
        },
        images: [
          {      
            src: 'http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/images/pic6.jpg',
          },
          {
            src: "http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/images/pic17.jpg",
          },
          {
            src: "http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/images/pic14.jpg",
          },
          {
            src: "http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/images/pic11.jpg",
          }
        ]                 
      }
  }),
};
</script>

<style>
  .logo{max-width: 120px; display: inline; margin-right: 10px;}
  .logo:last-child{margin-right: 0px;}
  .zap{max-width: 80px;}  
  .vivareal{background: #1190CD; padding: 5px; border-radius: 5px;}
</style>