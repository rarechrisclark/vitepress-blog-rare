import { defineConfig } from 'vitepress'
import { getPosts } from './buildUtils'

const pageSize = 6
const siteUrl = 'https://example.com'

export default defineConfig({
  /** ----------------------------------------------------------------
   * Site Configuration
   * https://vitepress.dev/config/#title
   */
  base: '/',
  srcDir: '.',
  outDir: './dist',
  assetsDir: 'assets', // relative to outDir (e.g. dist/assets)
  cacheDir: './.vitepress/.vite',

  ignoreDeadLinks: true,
  srcExclude: [],
  cleanUrls: true, // remove .html extensions from generated URLs
  metaChunk: true, // extract pages metadata to a separate JavaScript chunk instead of inlining it in the initial HTML
  mpa: false, // build the site as a multi-page app
  lastUpdated: false, // do not display the last updated time of pages
  appearance: true, // the default theme will be determined by the user's preferred color scheme.

  // Site Metadata
  title: 'Vitepress Blog Rare',
  description: 'Welcome to my little corner of the internet.',
  lang: 'en-AU',
  head: [
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      }
    ],
    [
      'link',
      { rel: 'mask-icon', color: '#20c997', href: '/safari-pinned-tab.svg' }
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#603cba' }],
    ['meta', { name: 'theme-color', content: '#20c997' }]
  ],

  // Sitemap
  sitemap: {
    hostname: 'https://example.com'
  },

  /** ----------------------------------------------------------------
   * Vite Configuration
   * https://vitejs.dev/config/
   */
  vite: {
    build: {
      // minify: true,
      // cssMinify: 'esbuild'
    }
  },

  /** ----------------------------------------------------------------
   * Markdown Configuration
   * https://vitepress.dev/config/#markdown
   */
  markdown: {},

  /** ----------------------------------------------------------------
   * Vue Configuration
   * https://vitepress.dev/config/#vue
   */
  vue: {},

  /** ----------------------------------------------------------------
   * Theme Configuration
   * https://vitepress.dev/config/#themeconfig
   */
  themeConfig: {
    // Logo
    logo: {
      light: {
        src: '/logo.svg',
        alt: 'Vitepress Blog Rare Logo',
        width: 24,
        height: 24
      },
      dark: {
        src: '/logo-dark.svg',
        alt: 'Vitepress Blog Rare Dark Logo',
        width: 24,
        height: 24
      }
    },
    // Navbar
    nav: [
      {
        text: 'Blog',
        items: [
          { text: 'Categories', link: '/categories' },
          { text: 'Tags', link: '/tags' },
          { text: 'Archives', link: '/archives' }
        ]
      },
      // { text: 'Notes', link: '/notes' },
      { text: 'Bookmarks', link: '/bookmarks' },
      { text: 'About', link: '/about' }
    ],
    // Local Search (minisearch)
    search: {
      provider: 'local',
      options: {
        detailedView: 'auto' // disabled until the user enables it via the UI button
      },
      searchOptions: {
        scope: '/'
      }
    },
    // Sidebar
    sidebar: {},

    // Aside
    aside: false,
    outline: false,
    // Social links
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/rarechrisclark'
      },
      {
        icon: 'linkedin',
        link: 'https://linkedin.com/in/rarechrisclark'
      }
    ],
    docFooter: {
      next: false,
      prev: false
    },
    // Other options
    externalLinkIcon: true,
    editLink: false,
    i18nRouting: false,

    /** ----------------------------------------------------------------
     * Custom Configuration
     * https://vitepress.dev/config/#customconfig
     *
     * Note: This is a custom configuration that is NOT part of the default VitePress configuration.
     */

    // Used with generatePaginationPages() function for pagination
    posts: await getPosts(pageSize),

    // Used with component: <RareAuthor.vue>
    author: {
      name: 'Chris Clark',
      bio: 'Designer, Developer, Photographer, Mechanic, Life Enthusiast.',
      link: {
        text: '@rarechrisclark',
        url: 'https://github.com/rarechrisclark'
      },
      avatar: '/my-avatar.svg'
    }
  },

  /** ----------------------------------------------------------------
   * Build Hooks
   * https://vitepress.dev/reference/site-config#build-hooks
   */

  async transformPageData(pageData) {
    const isPost = pageData.frontmatter.tags

    const canonicalUrl = `${siteUrl}/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '.html')

    // Initialise head array
    pageData.frontmatter.head ??= []

    // Add page class for posts
    if (isPost) {
      pageData.frontmatter.pageClass = 'BlogPostLayout'
    }

    // Add Open Graph meta tags to posts
    if (isPost) {
      const openGraphMetaTags = [
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:site_name', content: 'rareChrisClark' }],
        ['meta', { property: 'og:title', content: pageData.title }],
        ['meta', { property: 'og:description', content: pageData.description }],
        ['meta', { property: 'og:url', content: canonicalUrl }],
        ['meta', { property: 'og:image', content: `${siteUrl}/og-image.png` }],
        ['meta', { property: 'og:image:type', content: 'image/png' }],
        [
          'meta',
          { property: 'og:image:alt', content: 'Site logo and site title' }
        ],
        ['meta', { property: 'og:image:width', content: '1200' }],
        ['meta', { property: 'og:image:height', content: '630' }]
      ]

      // Add Open Graph meta tags to the head array
      pageData.frontmatter.head.push(...openGraphMetaTags)
    }

    // Add canonical URL to all pages
    pageData.frontmatter.head.push([
      'link',
      { rel: 'canonical', href: canonicalUrl }
    ])
  }
})
