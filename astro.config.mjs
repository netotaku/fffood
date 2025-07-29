import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import netlify from '@astrojs/netlify/functions';

export default defineConfig({
  	output: 'server',
  	adapter: netlify(),
	site: 'https://fffood.agency',
	integrations: [mdx(), sitemap()],
});
