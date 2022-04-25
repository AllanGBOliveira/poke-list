<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="localePath(item.to)"
          @click="item.click? $vuetify.theme.dark=! $vuetify.theme.dark: null"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="toggleDrawer()" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-menu
        bottom
        rounded
        offset-y
        class="lang-menu"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
          >
            <!-- <v-avatar
              color="brown"
              size="30"
            >
            <v-img :src="currentLocale.flag"  ></v-img>
            </v-avatar> -->

            <div class="avatar">
              <img :src="currentLocale.flag" alt="">
            </div>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="lang-menu">
              <nuxt-link
                class="lang-btn"
                v-for="locale in availableLocales"
                :key="locale.code"
                :to="switchLocalePath(locale.code)">{{ locale.name }}
              </nuxt-link>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Vue from 'vue'
import global from '~/mixins/global.js'

Vue.mixin(global)

export default {
  name: 'DefaultLayout',
  data () {
    return {
      user: {
        initials: 'JD',
        fullName: 'John Doe',
        email: 'john.doe@doe.com',
      },
      isMobile: false,
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-cellphone',
          title: this.$t('labels.home'),
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        },
        {
          icon: 'mdi-toggle-switch',
          title: 'Dark Mode',
          click: true
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Poke-List'
    }
  },

  methods: {
    isMobileCheck() {
      if(window.matchMedia("(max-width: 768px)").matches) {
        this.isMobile = true;
        return this.isMobile
      }
      
        this.isMobile = false;
        return this.isMobile
    },
    toggleMiniVariant() {
    if(this.isMobileCheck()) {
      this.drawer = false
      this.miniVariant = false 
    }
    else {
       this.drawer = true
       this.miniVariant = false 
     }
    },
    toggleDrawer() {
    if(this.isMobileCheck()) {
      this.miniVariant = false 
      this.drawer = !this.drawer
    }
    else {

      this.miniVariant = !this.miniVariant
      this.drawer = true
     }
    }
  },

  created() {
    this.toggleMiniVariant()
    console.log(this.$i18n.locale);
  },

  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
    currentLocale () {
      return this.$i18n.locales.find(i => i.code === this.$i18n.locale)
    }
  },  
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/pokeball/globals/variables.scss";
@import "~assets/styles/pokeball/layouts/layout.scss";
</style>
