import { siteData } from './data'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-12-25',
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxt/devtools',
    '@vueuse/nuxt',
    '@formkit/auto-animate',
    '@stefanobartoletti/nuxt-social-share',
    'nuxt-icon',
    'nuxt-og-image',
    'nitro-cloudflare-dev',
  ],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width,initial-scale=1',
      title: siteData.title,
      titleTemplate: `%s - ${siteData.title}`,
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  sitemap: {
    strictNuxtContentPaths: true,
  },

  runtimeConfig: {
    public: {
      site: '', // resolve from .env file or platform variables in production
    },
    private: {},
  },

  typescript: {
    strict: true,
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      // routes: ['/blogs', '/tags', '/rss.xml'],
      autoSubfolderIndex: false,
      ignore: ['/', '/about', '/api/', '/admin/'],
    },
    experimental: {
      wasm: true, // 启用 WASM 支持
    },
    preset: 'cloudflare-pages',
    // storage: {
    //   data: {
    //     driver: 'fs',
    //     base: './data',
    //   },
    // },
    cloudflareDev: {},
  },

  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'light',
  },

  content: {
    highlight: {
      theme: 'github-dark',
      langs: [
        'js',
        'jsx',
        'json',
        'ts',
        'tsx',
        'vue',
        'css',
        'html',
        'vue',
        'bash',
        'md',
        'mdc',
        'yaml',
      ],
    },
  },

  fonts: {
    families: [
      {
        name: 'Noto Sans SC', // Specify the font family name
        provider: 'bunny', // Use Bunny as the font provider
        weights: [400, 500], // Specify the weights you want to use
        subsets: ['latin', 'chinese-simplified'], // specify subsets to use chinese and english
        styles: ['normal', 'italic'], // Specify styles if needed
      },
      {
        name: 'Noto Serif SC',
        provider: 'bunny',
        subsets: ['latin', 'chinese-simplified'], // specify subsets to use chinese and english
        weights: [400, 500],
        styles: ['normal', 'italic'],
      },
    ],

    providers: {
      google: false,
      googleicons: false,
    },
  },
  robots: {
    disableNuxtContentIntegration: true,
    robotsTxt: true,
    disallowNonIndexableRoutes: true,
    robotsDisabledValue: 'noindex, nofollow',
    sitemap: 'https://blog.henryleu.pages.dev/sitemap.xml',
  },
})
