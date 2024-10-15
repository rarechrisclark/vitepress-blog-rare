# vitepress-blog-rare

A blogging platform using VitePress.

---

## Features

- Markdown-based posts
- Code syntax highlighting
- Customizable theme
- Tags and Categories
- Posts Archives
- Cloudflare Pages deployment

## Requirements

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

## Installation

1. Clone the repository.
2. Run `pnpm install` to install the dependencies.
3. Run `cp .env.example .env` to create a `.env` file and set the environment variables.

---

## Development

1. Run `pnpm dev` to start the development server.

### Writing a New Post

There is a `scripts/new_post.sh` script that can be used to create a new post. 

1. Run `chmod +x ./scripts/new_post.sh` to make the script executable.
2. Run `pnpm new:post <post title>` to create a new post. (e.g. `pnpm new:post test post`)
3. Edit the newly created markdown file in the `docs/posts` directory.

> Note: Only posts that have `published: true` in the front matter will be displayed on the site.

### Building the Site

1. Run `pnpm build` to build the site.
2. The built site will be in the `dist` directory.
3. You can preview the built site by running `pnpm preview`.

---

## Deployment (Cloudflare Pages)

This template is designed to be deployed to Cloudfare Pages. You can deploy it to other platforms, but you may need to adjust the configuration.

### Deploying Cloudflare Pages Project

There is a `scripts/wr_pages-build.mjs` script that generates the `wrangler.toml` file for the Cloudflare Pages project.

1. Run `pnpm pages:deploy` to deploy the site to Cloudflare Pages.

### Creating a New Cloudflare Pages Project

1. Run `wrangler whoami` to ensure you are logged in to Cloudflare locally.
2. Run `pnpm pages:toml` to create the `wrangler.toml` file for the Cloudflare Pages project.
3. Run `pnpm pages:create` and follow the prompts to create a new Cloudflare Pages project.

---

## Resources

### Documentation

- [Wrangler Commands | Cloudflare Docs](https://developers.cloudflare.com/workers/wrangler/commands)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Add a new domain for the pages project | Cloudflare API Docs](https://developers.cloudflare.com/api/operations/pages-domains-add-domain)

## License

In the spirit of open source, this project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
