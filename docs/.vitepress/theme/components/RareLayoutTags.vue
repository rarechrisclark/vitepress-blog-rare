<script lang="ts" setup>
import { useData } from 'vitepress'
import { computed, ref } from 'vue'
import { initTags } from '../utils'
import RarePost from './RarePost.vue'

let url = location.href.split('?')[1]
let params = new URLSearchParams(url)

const { theme } = useData()
const data = computed(() => initTags(theme.value.posts))

let selectedTag = ref(params.get('tag') ? params.get('tag') : '')

const toggleTag = (tag: string) => {
  selectedTag.value = tag
  const newUrl = new URL(window.location.href)
  newUrl.searchParams.set('tag', tag)
  window.history.pushState({}, '', newUrl.toString())
}
</script>

<template>
  <div class="tags">
    <span
      @click="toggleTag(String(key))"
      v-for="(_, key) in data"
      class="tag">
      {{ key }} <strong>{{ data[key].length }}</strong>
    </span>
  </div>
  <div
    v-if="selectedTag"
    class="tag-list">
    <div class="tag-header">
      <h2>{{ selectedTag }}</h2>
    </div>
    <RarePost :posts="selectedTag ? data[selectedTag] : []" />
  </div>
</template>

<style scoped>
.tags {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .tag {
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

    &:hover {
      color: var(--vp-c-brand-1);
      background-color: var(--vp-c-brand-soft);
      border-color: var(--vp-c-brand-1);
    }

    strong {
      margin-left: 4px;
      color: var(--vp-c-text-1);
    }
  }
}

.tag-list {
  padding: 14px 0 14px 0;

  .tag-header {
    margin-top: 1rem;
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
