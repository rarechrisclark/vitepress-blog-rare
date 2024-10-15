<script lang="ts" setup>
import type { Post } from '../types'
import { withBase } from 'vitepress'
import { PropType } from 'vue'
import RarePost from './RarePost.vue'

defineProps({
  posts: {
    type: Array as PropType<Post[]>,
    required: true
  },
  pageCurrent: {
    type: Number as PropType<number>,
    required: true
  },
  pagesNum: {
    type: Number as PropType<number>,
    required: true
  }
})
</script>

<template>
  <div class="home-posts-header">
    <h2 id="latest-posts">Latest Posts</h2>
  </div>
  <RarePost
    :posts="posts"
    :showDescription="true"
    :showTags="true" />

  <div class="pagination">
    <a
      class="pagination-link"
      :class="{ active: pageCurrent === i }"
      v-for="i in pagesNum"
      :key="i"
      :href="withBase(i === 1 ? '/' : `/page_${i}`)">
      {{ i }}
    </a>
  </div>
</template>

<style scoped>
.home-posts-header {
  padding: 14px 0 8px 0;
  text-align: left;
  color: var(--vp-c-text-1);
  font-size: 1.25rem;
  font-weight: 500;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
}

.pagination {
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;

  .pagination-link {
    display: inline-block;
    padding: 4px 8px;
    margin: 6px 8px;
    font-size: 0.875rem;
    line-height: 25px;
    background-color: var(--vp-c-default-soft);
    border: 1px solid var(--vp-c-default-2);
    transition: 0.4s;
    border-radius: 4px;
    color: var(--vp-c-text-1);
    cursor: pointer;
    font-weight: 500;

    &.active {
      background: var(--vp-c-text-1);
      color: var(--vp-c-neutral-inverse);
      border: 1px solid var(--vp-c-text-1) !important;
      pointer-events: none; /* Disable pointer events */
    }

    &:hover {
      color: var(--vp-c-brand-1);
      background-color: var(--vp-c-brand-soft);
      border-color: var(--vp-c-brand-1);
    }

    &:first-child {
      border-bottom-left-radius: 4px;
      border-top-left-radius: 4px;
    }

    &:last-child {
      border-bottom-right-radius: 4px;
      border-top-right-radius: 4px;
    }
  }
}
</style>
