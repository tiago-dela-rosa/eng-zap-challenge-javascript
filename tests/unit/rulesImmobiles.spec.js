import { shallowMount } from '@vue/test-utils'
import RulesImmobiles from '@/mixins/RulesImmobiles.vue'

describe('RulesImmobiles.vue', () => {

	// test('Retorna imóveis do json', () => {
	// 	const wrapper = shallowMount(RulesImmobiles)
	// 	const immobiles = wrapper.vm.getImmobiles()
	// 	expect.arrayContaining(immobiles)
	// })

	/* 
		getImmobile(ID_DO_IMOVEL)
		id válidos: fed26dbe5881
		id inválidos: 7baf2775d4a2
	*/
	test('Procura imovel desejado', () => {
		const wrapper = shallowMount(RulesImmobiles)
		expect.arrayContaining(wrapper.vm.getImmobile('fed26dbe5881'))
	})

})