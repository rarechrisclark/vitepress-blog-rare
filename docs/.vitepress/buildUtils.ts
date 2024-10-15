import fs from 'fs-extra'
import { globby } from 'globby'
import matter from 'gray-matter'
import { resolve } from 'path'

/**
 * Get posts
 * @param pageSize
 */
export async function getPosts(pageSize: number) {
  let paths = await globby(['docs/posts/*.md'])

  let posts = await Promise.all(
    paths.map(async (item) => {
      const content = await fs.readFile(item, 'utf-8')
      const { data } = matter(content)

      // filter out draft posts
      if (!data.published) return null

      data.date = _convertDate(data.date)

      return {
        frontMatter: data,
        regularPath: `/${item.replace('docs', '').replace('.md', '')}`
      }
    })
  )

  // filter out draft posts
  posts = posts.filter((post) => post !== null)

  // sort posts by date
  posts.sort(_compareDate as any)

  // generate pagination pages with filtered posts
  await generatePaginationPages(posts.length, pageSize)

  return posts
}

/**
 * Generate pagination pages
 * @param total
 * @param pageSize
 */
async function generatePaginationPages(total: number, pageSize: number) {
  //  pagesNum
  let pagesNum =
    total % pageSize === 0 ? total / pageSize : Math.floor(total / pageSize) + 1
  const paths = resolve('./docs')
  if (total > 0) {
    for (let i = 1; i < pagesNum + 1; i++) {
      const page = `
---
home: true
index: ${i}
title: Vitepress Blog Rare
description: Have a look around, you might find something interesting.
---
<script setup>
import RareLayoutHome from ".vitepress/theme/components/RareLayoutHome.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts.slice(${pageSize * (i - 1)},${pageSize * i})
</script>
<RareLayoutHome :posts="posts" :pageCurrent="${i}" :pagesNum="${pagesNum}" />
`.trim()
      const file = paths + `/page_${i}.md`
      await fs.writeFile(file, page)
    }
  }
  // rename page_1 to index for homepage
  await fs.move(paths + '/page_1.md', paths + '/index.md', { overwrite: true })
}

/**
 * Convert date to JSON format
 * @param date
 */
function _convertDate(date = new Date().toString()) {
  const json_date = new Date(date).toJSON()

  return json_date.split('T')[0]
}

/**
 * Compare date
 * @param obj1
 * @param obj2
 */
function _compareDate(
  obj1: { frontMatter: { date: number } },
  obj2: { frontMatter: { date: number } }
) {
  return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1
}
