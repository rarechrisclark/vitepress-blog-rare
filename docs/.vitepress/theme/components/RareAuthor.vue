<script setup lang="ts">
import { useData } from 'vitepress'
import VPSocialLinks from 'vitepress/dist/client/theme-default/components/VPSocialLinks.vue'

const { theme } = useData()
</script>

<template>
  <div class="RareAuthor">
    <div class="avatar-wrapper">
      <img
        class="avatar-image"
        :src="theme.author.avatar"
        :alt="theme.author.name"
        width="64"
        height="64" />
    </div>
    <div class="author-details">
      <span class="visually-hidden">{{ theme.author.name }}</span>
      <div class="author-name">
        {{ theme.author.name }}
      </div>
      <span class="visually-hidden">{{ theme.author.link }}</span>
      <div class="author-link">
        <a
          :href="theme.author.link.url"
          target="_blank"
          rel="noopener noreferrer">
          {{ theme.author.link.text }}
        </a>
      </div>
      <VPSocialLinks
        v-if="theme.socialLinks"
        :links="theme.socialLinks" />
      <span class="visually-hidden">{{ theme.author.bio }}</span>
      <div class="author-bio">
        {{ theme.author.bio }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/*
 * Component: RareAuthor
 * ------------------------------------------- */
.RareAuthor {
  display: flex;
  flex-direction: column;
  align-items: center; /* Align content horizontally */
  gap: 0.5rem;
  margin: 1rem 0;
  padding: 1rem; /* Add padding to give space around content */
  border-radius: 0.5rem; /* Add rounded corners */
  background-color: var(--vp-c-bg-soft); /* Set background color */
}

/* Avatar */
.avatar-wrapper {
  display: flex;
  justify-content: center;

  .avatar-image {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    object-fit: cover;
    background-color: var(--vp-c-brand-2);
  }
}

/* Author details */
.author-details {
  font-size: 14px;
  text-align: center;

  dl {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .author-name {
    font-weight: 700;
  }

  .author-link {
    font-weight: 500;
    margin-bottom: 0.25rem;

    a {
      text-decoration: none;
      text-underline-offset: 2px;
      transition: color 0.25s;
      color: var(--vp-c-brand-1);
    }

    a:hover {
      color: var(--vp-c-brand-2);
    }
  }

  .author-bio {
    margin-top: 0.5rem;
    font-weight: 400;
    line-height: 1.25rem;
    color: var(--vp-c-text-2);
  }
}
</style>
