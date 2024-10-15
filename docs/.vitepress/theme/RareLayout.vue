<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'

import RareBackToBlog from './components/RareBackToBlog.vue'
import RarePageHeader from './components/RarePageHeader.vue'
import RarePostMeta from './components/RarePostMeta.vue'

const { frontmatter } = useData()
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>

    <template #doc-before>
      <RarePageHeader />
    </template>

    <template
      v-if="frontmatter.category"
      #doc-after
    >
      <RarePostMeta />
      <RareBackToBlog />
    </template>
  </Layout>
</template>

<style>
/** -------------------------------------------------
  * Layout (GLOBAL)
  * START
 **/
.Layout {
  min-height: calc(100vh - 78px) !important; /* reduce copyright */

  .VPDoc {
    /* remove underline from links */
    .vp-doc a {
      text-decoration: none;
    }

    .vp-doc p {
      font-size: 0.9375rem;
    }

    /* inline code color - PURPLE, now we've got a HULK color scheme... cool */
    .vp-doc :not(pre) code {
      color: var(--vp-c-purple-1);
    }

    /* removes the horizontal line below the post excerpt */
    .vp-doc hr {
      display: none;
    }

    h1 {
      font-size: 2.5rem !important;
      line-height: 1.2 !important;
      font-weight: 700 !important;
      padding-top: 14px;
    }

    h2 {
      font-size: 1.5rem !important;
      font-weight: 700 !important;
      margin: inherit !important;
      border-top: 1px dashed var(--vp-c-default-2) !important;
    }

    /* figure */
    figure {
      padding-bottom: 1.5rem;
      text-align: right;
    }

    img {
      display: block;
      max-width: 100%;
      height: auto;
      margin: 0 auto;
    }

    figure img {
      text-align: center;
      margin: 16px 0;
      border-radius: 0.25rem;
      box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
    }

    figcaption {
      margin-top: 0.5rem;
      color: var(--vp-c-text-2);
      font-size: 0.875rem;
    }
  }
}
</style>
