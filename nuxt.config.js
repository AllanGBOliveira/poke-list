import colors from 'vuetify/es5/util/colors'
import { join } from 'path'
import { copySync, removeSync } from 'fs-extra'
require('dotenv').config()

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'poke-list',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/axios'
  ],

  axios: {
    proxy: true // Can be also an object with default options
  },

  proxy: {
    '/api/': 'http://api.example.com',
    '/api2/': 'http://api.another-website.com'
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/i18n',

  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.red.darken1,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,

          menu_bg: '#121212',
          bg_primary: colors.grey.darken4,

        },
        light: {
          primary: colors.red.darken1,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,

          menu_bg: '#121212',
          bg_primary: colors.grey.darken4,
        }
      }
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/style.scss'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // Nuxt i18n Configuration https://i18n.nuxtjs.org/  
  i18n: {
    locales: [
      {
        code: 'pt',
        file: 'pt-BR.js',
        name: 'Poruguês',
        flag: 'https://countryflagsapi.com/png/brazil'
      },
      {
        code: 'en',
        file: 'en-US.js',
        name: 'English',
        flag: 'https://countryflagsapi.com/png/the united states of america'
      }
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'pt',
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true
    }
  },
}
