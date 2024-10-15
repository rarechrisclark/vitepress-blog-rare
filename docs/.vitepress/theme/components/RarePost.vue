<script setup lang="ts">
import type { Post } from '../types'
import { withBase } from 'vitepress'

const props = defineProps<{
  posts: Post[]
  showDescription?: boolean
  showTags?: boolean
}>()
</script>

<template>
  <div
    v-for="(post, index) in posts"
    :key="index"
    :class="['post', { 'post-card': showDescription || showTags }]">
    <a
      v-if="post.regularPath"
      :href="withBase(post.regularPath).replace('/', '')"
      class="post-link"
    >
      <div class="post-header">
        <div class="post-title">
          <h3>{{ post.frontMatter.title }}</h3>
        </div>
        <div class="post-date">{{ post.frontMatter.date }}</div>
      </div>
      <p
        v-if="showDescription && post.frontMatter.description"
        class="post-description">
        {{ post.frontMatter.description }}
      </p>
      <div
        v-if="showTags && post.frontMatter.tags"
        class="post-tags">
        <span
          v-for="tag in post.frontMatter.tags"
          :key="tag"
          class="post-tag">
          <a :href="withBase(`/tags?tag=${tag}`)">{{ tag }}</a>
        </span>
      </div>
    </a>
  </div>
</template>

<style scoped>
.post {
  margin-top: 0.5rem;
  align-items: center;
  border: 1px solid var(--vp-c-default-2); /* Add border */
  border-radius: 8px; /* Optional for rounded corners */
  transition:
    color 0.3s ease,
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.post:hover {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1); /* Update border color on hover */
}

.post-date {
  margin: 0 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}

@media screen and (max-width: 768px) {
  .post-date {
    font-size: 0.75rem;
  }
}

.post-card {
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-default-2);
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.post-card:hover {
  border-color: var(--vp-c-brand-1);
}

.post-title h3 {
  font-size: 1.125rem !important;
}

.post-link {
  padding: 8px 12px;
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  height: 100%;
}

.post-link .post-title h3 {
  font-size: 1rem;
  margin: 0;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.post-description {
  font-size: 0.9375rem;
  color: var(--vp-c-text-1);
  margin: 8px 0;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.post-tag a {
  background-color: var(--vp-c-default-soft);
  border: 1px solid var(--vp-c-default-2);
  padding: 4px 8px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 4px;
}

.post-tag a:hover {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
}

@media screen and (max-width: 768px) {
  .post-title {
    font-size: 1rem;
  }

  .post-description {
    font-size: 0.875rem;
  }

  .post-tag a {
    font-size: 0.75rem;
  }
}
</style>
