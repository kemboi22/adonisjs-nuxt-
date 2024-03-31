// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    'shadcn-nuxt',
    "@pinia-plugin-persistedstate/nuxt"
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  runtimeConfig: {
    // Will be available in both server and client
    apiUrl: process.env.NUXT_PUBLIC_API_BASE,
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE
    }
  }
})