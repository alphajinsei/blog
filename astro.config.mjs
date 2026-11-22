import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://blog.alphajinsei.com',
  markdown: {
    // 本人が書いた文章をそのまま出す。引用符の自動変換（" → ” など）を止める。
    smartypants: false,
    // 数式を書いたときだけ KaTeX で描画する（$...$、$$...$$）。
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    // コードは明るい地に合う配色で。
    shikiConfig: { theme: 'github-light' },
  },
});
