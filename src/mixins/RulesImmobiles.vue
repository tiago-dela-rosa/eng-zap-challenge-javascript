<template>
	<div>
		<!-- Apenas regra de negócio -->
	</div>
</template>

<script>

import axios from 'axios';

export default {
 
	data: () => ({
		loading: true,
		immobiles: [],
		rules: {
			zap: {
				minRental: 3500,
				minSale: 600000,
				boundingBox: {
					minLon: -46.693419,
					maxLon: -46.641146,
					minLat: -23.568704,
					maxLat: -23.546686					
				}				
			},
			vivareal: {
				minPercentMonthlyCondoFeeByRental: 30, 
				maxRental: 4000,
				maxSale: 700000
			} 
		},
		errors: []
	}),

	computed: {

		boundingBoxZapMinSale: {
			cache: false,
			get: function(){
				return (this.rules.zap.minSale * 0.90);
			}
		},
		
		boundingBoxVivaRealMaxRental: {
			cache: false,
			get: function(){
				return (this.rules.vivareal.maxRental * 1.50);
			}	
		}

	},

	methods: {
		async getImmobiles(){
			try {
				const response = await axios.get(`http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-1.json`)
				return response.data
			}
			catch (e) {
				return console.error('Não foi possivel buscar dados da url requisitada')
			}	
		},

		is_locationValid(lon, lat){

			if(isNaN(lon)|| isNaN(lat))
				return false

			if(lon == 0 || lat == 0)
				return false

			return true			
		},

		is_insideBoundingBox(lon, lat){

			if(!this.is_locationValid(lon, lat)){
				return false
			}
			if(lon > this.rules.zap.boundingBox.maxLon || lon < this.rules.zap.boundingBox.minLon){
				return false
			}
			if(lat > this.rules.zap.boundingBox.maxLat || lat < this.rules.zap.boundingBox.minLat){
				return false
			}
			return true			
		},		

		calcAreaPrice(area, price){
			try {

				if(isNaN(area))
					throw new Error("Área não é um número")

				if(area <= 0)
					throw new Error("Área não pode ser menor ou igual que 0")

				if(isNaN(price))
					throw new Error("Preço não é um número")

				if(price <= 0)
					throw new Error("Preço não pode ser menor ou igual que 0")				
			
				return (price / area);
			}
			catch (e){
				console.error(e.message);
				return false;
			}
		},

		validateImmobile(obj){
			try{

				if(!this.is_locationValid(obj.address.geoLocation.location.lon, obj.address.geoLocation.location.lat))
					throw new Error("Longitude ou Latitude invalidos")
				
				if(obj.pricingInfos.monthlyCondoFee <= 0 || isNaN(obj.pricingInfos.monthlyCondoFee))
					throw new Error("Valor do condomínio inválido")

				if(this.is_insideBoundingBox(obj.address.geoLocation.location.lon, obj.address.geoLocation.location.lat)){
					console.log('Imóvel faz parte do boundingBox', [obj.address.geoLocation.location.lon, obj.address.geoLocation.location.lat])
					tempRentalPrice = this.boundingBoxVivaRealMaxRental;
				}
				if(!this.is_insideBoundingBox(obj.address.geoLocation.location.lon, obj.address.geoLocation.location.lat)){
					console.log('Imóvel não faz parte do boundingBox', [obj.address.geoLocation.location.lon, obj.address.geoLocation.location.lat])
					tempRentalPrice = obj.pricingInfos.rentalTotalPrice;
				}				
			}
			catch(e){
				console.error(e.message)
			}
			finally{
				console.table(this.rules.zap.boundingBox)
			}
		},

		getImmobile(id){
			
			this.getImmobiles().then((resp) => {
				const search = resp.filter((immob) => {
					return immob.id == id; 
				})

				if(search.length > 0){
					this.validateImmobile(search[0])
				}
				else{
					console.log('Imóvel não encontrado')
					return false; 
				}

			})
		}
	},

	created(){

		this.getImmobiles().then((resp) => {

			resp.forEach((immob) => {

				let tempSalePrice = '';
				let tempRentalPrice = ''; 
				immob.portal = [];

				// apenas lon e lat validos
				if(!this.is_locationValid(immob.address.geoLocation.location.lon, immob.address.geoLocation.location.lat))
					return false;

				// portal[zap | vivaReal]
				if(immob.pricingInfos.businessType === 'RENTAL') {

					if(immob.pricingInfos.monthlyCondoFee <= 0 || isNaN(immob.pricingInfos.monthlyCondoFee))
						return false

					if(immob.pricingInfos.rentalTotalPrice >= this.rules.zap.minRental)
						immob.portal.push('zap')

					if(immob.pricingInfos.rentalTotalPrice <= this.rules.vivareal.maxRental)
						immob.portal.push('vivaReal')

					if(this.is_insideBoundingBox(immob.address.geoLocation.location.lon, immob.address.geoLocation.location.lat)){
						tempRentalPrice = this.boundingBoxVivaRealMaxRental;
					}
					else{
						tempRentalPrice = immob.pricingInfos.rentalTotalPrice;
					}

					if((immob.pricingInfos.monthlyCondoFee * 100) / tempRentalPrice >= this.rules.vivareal.minPercentMonthlyCondoFeeByRental)
					{
						// Remove viva real
						const i = immob.portal.indexOf('vivaReal')
						if (i > -1) {
						  immob.portal.splice(i, 1)
						}
					}		

				}
				else if(immob.pricingInfos.businessType === 'SALE') {

					if(immob.usableAreas <= 0)
						return false;

					if(immob.pricingInfos.price >= this.rules.zap.minSale)
						immob.portal.push('zap')

					if(immob.pricingInfos.price <= this.rules.vivareal.maxSale)
						immob.portal.push('vivaReal')

					if(this.is_insideBoundingBox(immob.address.geoLocation.location.lon, immob.address.geoLocation.location.lat)){
						tempSalePrice = this.boundingBoxZapMinSale;
					}
					else{
						tempSalePrice = immob.pricingInfos.price;
					}

					//Remove zap
					if(Math.ceil(this.calcAreaPrice(immob.usableAreas, tempSalePrice)) <= 3500){	
						const i = immob.portal.indexOf('zap')
						if (i > -1) {
						  immob.portal.splice(i, 1)
						}
					}

				}

				this.immobiles.push(immob);
			})

		}).then(() => {
			this.loading = false;
		})
   }
};
</script>