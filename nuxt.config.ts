// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-mongoose'],
  typescript: {
    strict: false,
    typeCheck: false
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            primary: {
              DEFAULT: '#3d3d3d',      // основной цвет (тёмно-серый)
              dark: '#2d2d2d',
              light: '#5d5d5d'
            },
            accent: '#f29b06'          // оранжевый акцент
          }
        }
      }
    }
  }
})