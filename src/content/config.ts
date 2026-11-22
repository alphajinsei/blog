import { defineCollection, z } from 'astro:content';

// 記事＝ src/content/posts/<スラッグ>.md。ファイル名がそのまま URL（/posts/<スラッグ>/）になる。
const posts = defineCollection({
  type: 'content',
  schema: z.object({
    // 表題。トップの索引ではタイトルとタグしか出ないので、中身が分かる短文にするとよい。
    title: z.string(),
    // 書いた日（YYYY-MM-DD）。
    date: z.coerce.date(),
    // 書き直した日（任意）。書くと記事の頭に「更新」として出る。
    updated: z.coerce.date().optional(),
    // タグ。分野（色）との対応は src/lib/tags.ts。
    tags: z.array(z.string()).default([]),
    // SNS のカードと RSS に出す説明（任意）。省くと本文の冒頭から自動で取る。
    description: z.string().optional(),
  }),
});

export const collections = { posts };
