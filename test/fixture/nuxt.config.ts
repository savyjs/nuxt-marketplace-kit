import {defineNuxtConfig} from 'nuxt'
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: [
        '~/assets/font-css/fontiran.css'
    ],
    buildModules: [
        'vite-plugin-vue-type-imports/nuxt',
    ],
    modules: [
        // Using package name
        // '@nuxt/content',
        // Relative to your project srcDir
        '@nuxtjs/tailwindcss',
        '~/../..',
        // Providing options
    ],
    ntm: {
        logo: '/assets/dkala/logo.svg',
        title: 'NTM'
    },
    content: {
        base: '/content'
    }
})
