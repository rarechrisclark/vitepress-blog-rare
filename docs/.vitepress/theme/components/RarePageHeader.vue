<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <div
    v-if="frontmatter.title"
    class="page-header">
    <h1>{{ frontmatter.title }}</h1>
    <p v-if="frontmatter.description">{{ frontmatter.description }}</p>
  </div>
</template>

<style scoped>
.page-header {
  padding: 1rem 0;
  margin-bottom: 1rem;
  text-align: center;
}

.page-header p {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}
</style>
