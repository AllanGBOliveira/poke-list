<template>
  <v-row>
    <v-col v-for="(poke, index) in pokemon" :key="index" cols="6" sm="4" md="3" lg="2" xl="1">
        <Pokemon :key="reload" :url="poke.url" />
    </v-col>

    <v-col v-if="pagination.count" cols="12">
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
        reload: false,
        pagination: {
          count: null,
          next: null,
          previous: null
        },
      }
  },
  async fetch() {
    if(this.$route.query.type && this.$route.query.type !== this.type) {
       this.pokemon  = await this.$axios.$get(`https://pokeapi.co/api/v2/type/${this.$route.query.type}`);
       this.pokemon = this.pokemon.pokemon
       this.pokemon = this.pokemon.map(element => element.pokemon);
       this.limit = 60;
       this.offset = 0;
       this.reload = !this.reload
       this.pagination.count = null;
       this.pagination.next = null 
       this.pagination.previous = null
       return
    }
    this.pokemon  = await this.$axios.$get(`https://pokeapi.co/api/v2/pokemon/?offset=${this.offset}&limit=${this.limit}`);
    this.pagination.count = this.pokemon.count;
    this.pagination.next = this.pokemon.next 
    this.pagination.previous = this.pokemon.previous 
    this.pokemon = this.pokemon.results
  },

  watch: {
   '$route.query': '$fetch'
  },

  methods: {
    loadMore() {          
      this.offset = this.limit;
      this.limit  += 60;
      this.$router.push( {path: this.$route.path, query: {offset: this.offset, limit: this.limit}})
    }
  },

}
</script>