<script setup lang="ts">
import { withBase } from 'vitepress'
</script>

<template>
  <div class="post-meta-wrapper">
    <div class="post-meta">
      <div
        v-if="$frontmatter.date"
        class="post-date">
        <span class="descriptor">Published on: </span>
        <a
          :href="`/archives#${$frontmatter.date?.substring(0, 4)}`"
          class="date-link">
          {{ $frontmatter.date?.substring(0, 10) }}
        </a>
      </div>
      <div
        class="post-category"
        v-if="$frontmatter.category">
        <span class="descriptor">Category: </span>
        <a
          :href="`/categories#${$frontmatter.category}`"
          class="category-link">
          {{ $frontmatter.category }}
        </a>
      </div>
      <div
        v-if="$frontmatter.tags"
        class="post-tags">
        <span class="descriptor">Tags: </span>
        <div class="tags-list">
          <a
            v-for="item in $frontmatter.tags"
            :key="item"
            :href="withBase(`/tags?tag=${item}`)"
            class="tag-link">
            {{ item }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-meta-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* Ensure the wrapper takes full width */
}

.post-meta {
  width: 100%; /* Ensure the meta content takes full width */
  padding: 1.5rem 2rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  margin-top: 3rem;
  margin-bottom: 2rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-decoration: none;
  font-weight: 500;

  .post-date,
  .post-category,
  .post-tags {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }

  .descriptor {
    font-weight: 600;
    color: var(--vp-c-text-1);
    margin-bottom: 0.25rem;
  }

  .date-link,
  .category-link {
    &:hover {
      color: var(--vp-c-brand-1);
    }
  }

  .tags-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;

    .tag-link {
      background-color: var(--vp-c-default-soft);
      border: 1px solid var(--vp-c-default-2);
      border-radius: 4px;
      padding: 0 8px;
      text-decoration: none;
      color: var(--vp-c-text-1);
      transition:
        background-color 0.3s,
        color 0.3s,
        border-color 0.3s;

      &:hover {
        background-color: var(--vp-c-brand-soft);
        border-color: var(--vp-c-brand-1);
        color: var(--vp-c-brand-1);
      }
    }
  }
}
</style>
