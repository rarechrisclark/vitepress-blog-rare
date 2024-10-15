import fs from 'fs/promises'
import dotenv from 'dotenv-flow'

dotenv.config()

const pagesTemplatePath = `wrangler.template.toml`
const pagesOutputPath = `wrangler.toml`

async function generatePagesToml() {
  try {
    const template = await fs.readFile(pagesTemplatePath, 'utf8')
    const output = template
      .replace(
        /\${CLOUDFLARE_PROJECT_NAME}/g,
        process.env.CLOUDFLARE_PROJECT_NAME
      )

    await fs.writeFile(pagesOutputPath, output)

    console.log(
      `Generated wrangler.toml for ${process.env.CLOUDFLARE_PROJECT_NAME}`
    )
  } catch (error) {
    console.error('Error generating wrangler.toml:', error)
    process.exit(1)
  }
}

generatePagesToml().then(() => process.exit(0))
