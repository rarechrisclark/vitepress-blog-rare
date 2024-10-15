import type { Post } from '../types'

/**
 * Initialize tags
 * @param post
 */
export function initTags(post: Post[]) {
  const data: any = {}

  for (let index = 0; index < post.length; index++) {
    const element = post[index]

    // Filter out draft posts
    if (!element.frontMatter.published) continue

    const tags = element.frontMatter.tags

    if (tags) {
      tags.forEach((item) => {
        if (data[item]) {
          data[item].push(element)
        } else {
          data[item] = []
          data[item].push(element)
        }
      })
    }
  }
  return data
}

/**
 * Initialize categories
 * @param post
 */
export function initCategory(post: Post[]) {
  const data: any = {}

  for (let index = 0; index < post.length; index++) {
    const element = post[index]

    // Filter out draft posts
    if (!element.frontMatter.published) continue

    const category = element.frontMatter.category

    if (category) {
      if (data[category]) {
        data[category].push(element)
      } else {
        data[category] = []
        data[category].push(element)
      }
    }
  }
  return data
}

/**
 * Sort posts by year
 * @param post
 */
export function useYearSort(post: Post[]) {
  const data = []

  let year = '0'
  let num = -1

  for (let index = 0; index < post.length; index++) {
    const element = post[index]

    // Filter out draft posts
    if (!element.frontMatter.published) continue

    if (element.frontMatter.date) {
      const y = element.frontMatter.date.split('-')[0]

      if (y === year) {
        data[num].push(element)
      } else {
        num++
        data[num] = [] as any
        data[num].push(element)
        year = y
      }
    }
  }
  return data
}
