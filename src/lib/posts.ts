import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE } from './site';

export type Post = CollectionEntry<'posts'>;

// 新しい順。
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts');
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// 日付は日本時間で出す（front matter の日付は UTC の 0 時として読まれる）。
const parts = (d: Date) => {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('ja-JP', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit' })
      .formatToParts(d)
      .map((x) => [x.type, x.value]),
  );
  return { y: p.year as string, m: p.month as string, d: p.day as string };
};
export const ymd = (d: Date) => { const p = parts(d); return `${p.y}-${p.m}-${p.d}`; };
export const md = (d: Date) => { const p = parts(d); return `${p.m}.${p.d}`; };
export const year = (d: Date) => parts(d).y;
export const ym = (d: Date) => { const p = parts(d); return `${p.y}-${p.m}`; };
export const ymLabel = (key: string) => { const [y, m] = key.split('-'); return `${y}年${Number(m)}月`; };

// 並びを保ったまま、キーごとにまとめる（新しい順の記事を年や月でまとめる）。
export function groupBy<T>(items: T[], key: (x: T) => string): [string, T[]][] {
  const map = new Map<string, T[]>();
  for (const x of items) {
    const k = key(x);
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(x);
  }
  return [...map.entries()];
}

// 説明文：front matter の description、なければ本文の最初の段落から。
export function describe(post: Post, max = 120): string {
  if (post.data.description) return post.data.description;
  const para = post.body
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .find((s) => s && !/^(#|```|\$\$|<|!\[|---|\||>)/.test(s));
  if (!para) return SITE.description;
  const text = para
    .replace(/^[-*+]\s+|^\d+\.\s+/gm, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`~]/g, '')
    .replace(/\s*\n\s*/g, ' ')
    .trim();
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

// 関連する記事：共通のタグが多い順、同じなら新しい順。共通のタグがない記事は出さない。
export function related(post: Post, all: Post[], n = 3): Post[] {
  const mine = new Set(post.data.tags);
  return all
    .filter((p) => p.id !== post.id)
    .map((p) => ({ p, score: p.data.tags.filter((t) => mine.has(t)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.p.data.date.valueOf() - a.p.data.date.valueOf())
    .slice(0, n)
    .map((x) => x.p);
}

// タグごとの記事数。多い順、同じなら最近使った順。
export function tagCounts(posts: Post[]): { tag: string; count: number }[] {
  const m = new Map<string, { count: number; last: number }>();
  for (const p of posts) {
    for (const t of p.data.tags) {
      const cur = m.get(t) ?? { count: 0, last: 0 };
      cur.count += 1;
      cur.last = Math.max(cur.last, p.data.date.valueOf());
      m.set(t, cur);
    }
  }
  return [...m.entries()]
    .sort((a, b) => b[1].count - a[1].count || b[1].last - a[1].last)
    .map(([tag, v]) => ({ tag, count: v.count }));
}

export const postUrl = (post: Post) => `/posts/${post.slug}/`;
export const tagUrl = (tag: string) => `/tags/${encodeURIComponent(tag)}/`;
export const historyUrl = (post: Post) => `${SITE.repo}/commits/main/src/content/posts/${post.id}`;
