export type Post = {
  frontMatter: {
    published: string
    title: string
    description: string
    date: string
    category: string
    tags: string[]
  }
  regularPath: string
}
