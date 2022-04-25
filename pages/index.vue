<template>
 <div>
    <ListPokemon/>
 </div>
</template>

<script>
import ListPokemon from '../components/ListPokemon.vue'
export default {
    components: { ListPokemon },
  name: 'IndexPage',
  
  async asyncData({ $axios }) {
  const pokemons = await $axios.$get('http://icanhazip.com')
  return { pokemons }
},

}
</script>
