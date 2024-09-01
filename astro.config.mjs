import { defineConfig } from 'astro/config';

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  // 等待 Netlify 配置完成后，在此处输入唯一的 Netlify URL
  site: "https://example.com",

  integrations: [preact()]
});