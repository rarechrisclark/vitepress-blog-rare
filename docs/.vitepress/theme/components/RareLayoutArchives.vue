<script lang="ts" setup>
import { useData } from 'vitepress'
import { computed } from 'vue'
import { useYearSort } from '../utils'
import RarePost from './RarePost.vue'

const { theme } = useData()
const data = computed(() => useYearSort(theme.value.posts))
</script>

<template>
  <div
    v-for="yearList in data"
    class="archive-list">
    <div class="year-header">
      <h2 :id="yearList[0].frontMatter.date.split('-')[0]">
        {{ yearList[0].frontMatter.date.split('-')[0] }}
      </h2>
    </div>
    <RarePost :posts="yearList" />
  </div>
</template>

<style scoped>
.archive-list {
  padding: 14px 0 14px 0;

  .year-header {
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
