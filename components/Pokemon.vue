<template>
  <v-card class="pokemon" v-if="pokemon" alt="" @mouseover="(hovered = pokemon.id)" @mouseleave="(hovered = null)" >
    <p class="pokemon-id">{{'#'+pokemon.id}}</p>
    <p class="pokemon-name">{{pokemon.name}}</p>
    <!-- <img :src="pokemon.sprites.other['official-artwork'].front_default" alt=""> -->

    <!-- <div class="pokemon-thumb">
      <img :key="hovered" ref="pokemon" :src="hovered === pokemon.id ? pokemon.sprites.front_default: pokemon.sprites.other['official-artwork'].front_default" alt="" crossorigin>
    </div> -->
      <!-- <v-img
      :key="hovered"
      :src="hovered === pokemon.id ? pokemon.sprites.front_default: pokemon.sprites.other['official-artwork'].front_default" 
      :lazy--src="pokemon.sprites.other['official-artwork'].front_default"
    >
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img> -->

     <div class="pokemon-thumb">
      <v-img
      :src="hovered === pokemon.id ? pokemon.sprites.front_default: pokemon.sprites.other['official-artwork'].front_default" 
      :lazy--src="pokemon.sprites.other['official-artwork'].front_default"
    >
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    </div>
        <ul class="pokemon-types">
      <li v-for="(type, i) in pokemon.types" :key="i" :class="type.type.name">
        <nuxt-link :to="{path: $route.path, query:{type: type.type.name } }" :title="type.type.name">
          {{type.type.name}}
        </nuxt-link>
      </li>
    </ul>
  </v-card>
</template>

<script>
export default {
  name: "Pokemon",

  props: {
    url: {type: String , required: true}
  },

  data() {
    return {
      rgb: { 
        R: 255, 
        G: 255, 
        B: 255
        },
        hovered: null,
        pokemon: null,
        loading: true
      }
  },
    async fetch() {
    this.pokemon  = await this.$axios.$get(this.url);
  },

  // watch: {
  //   hovered(newValue, oldValue) {
  //     if(newValue) {
  //       this.rgb = this.loadImg();
  //       return
  //     }

  //     this.rgb = { R:255, G: 255, B: 255}
  //   },
  // },  

  // methods: {
  //   loadImg() {
  //     let img = this.$refs.pokemon
  //     let {R, G, B} = this.getColor(img, 4)

  //     return {
  //       R,
  //       G,
  //       B
  //     }
  //   }
  // },  
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/pokeball/globals/variables.scss';
@import '~assets/styles/pokeball/components/pokemon.scss';
</style>