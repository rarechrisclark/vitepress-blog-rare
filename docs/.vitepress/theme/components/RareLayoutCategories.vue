<script lang="ts" setup>
import { useData } from 'vitepress'
import { computed } from 'vue'
import { initCategory } from '../utils'
import RarePost from './RarePost.vue'

const { theme } = useData()
const data = computed(() => initCategory(theme.value.posts))

const anchorId = (key: string) => key.toLowerCase().replace(/\s/g, '-')
</script>

<template>
  <div
    v-for="(posts, key) in data"
    class="category-list">
    <div class="category-header">
      <h2 :id="`${anchorId(key)}`">
        {{ key }}
      </h2>
    </div>
    <RarePost :posts="posts" />
  </div>
</template>

<style scoped>
.category-list {
  padding: 14px 0 14px 0;

  .category-header {
    padding: 14px 0 8px 0;
    text-align: left;
    color: var(--vp-c-text-1);
    font-size: 1.25rem;
    font-weight: 500;

    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }
  }
}
</style>
