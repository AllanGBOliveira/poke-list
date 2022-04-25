<template>
  <v-row>
    <v-col v-for="(poke, index) in pokemon.results" :key="index" cols="6" sm="4" md="3" lg="2" xl="1">
        <Pokemon :url="poke.url" />
    </v-col>

    <v-col cols="12">
       <button @click="loadMore()">Load More</button>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ListPokemon",

  data() {
      return {
        pokemon: [],
        limit: 60,
        offset: 0,
      }
  },
  async fetch() {
    this.pokemon  = await this.$axios.$get(`https://pokeapi.co/api/v2/pokemon/?offset=${this.offset}&limit=${this.limit}`);
  },

  watch: {
   '$route.query': '$fetch'
  },

  methods: {
    loadMore() {          
      this.offset = this.limit;
      this.limit  += 60

      this.$router.push( {path: this.$route.path, query: {offset: this.offset, limit: this.limit}})
    }
  },

}
</script>