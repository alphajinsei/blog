# blog

https://blog.alphajinsei.com ― 自分の手で書いた文章を置くブログ。Astro（静的サイト）で作り、Cloudflare Pages が GitHub の main を拾って公開する。

## 記事を書いて公開する

1. `src/content/posts/` に Markdown のファイルを作る。ファイル名がそのまま URL になる（`2026-11-22-hand-written.md` → `/posts/2026-11-22-hand-written/`）。英小文字・数字・ハイフンにしておくと無難。

   ```markdown
   ---
   title: 自分の手で書くということ
   date: 2026-11-22
   tags: [AI, 発信]
   # updated: 2026-12-01      書き直したら足す。記事の頭に「更新」と出る
   # description: ...         SNS のカードと RSS の説明。省くと本文の最初の段落から取る
   ---

   ここから本文。
   ```

2. 手元で見る：`npm run dev` → http://localhost:4321
3. 公開する：`git add` → `git commit` → `git push`。数分で反映される。

- トップの索引にはタイトルとタグしか出ないので、タイトルは中身が分かる短文にするとよい。
- 数式は `$...$`（行内）と `$$...$$`（別行）で書ける。
- 画像は `public/images/` に置いて `![説明](/images/xxx.png)` で参照する。
- 書きかけは push しない（push ＝ 公開。下書きの機能はない）。

## タグの色（分野）

タグと分野の対応は [src/lib/tags.ts](src/lib/tags.ts) の `TAG_DOMAIN` に書く。書いていないタグは「その他」（灰色）になる。分野は AI／システム／数理／社会（仮）。

## ページ

| URL | 中身 |
|---|---|
| `/` | 最近のタグ、年ごとの記事の索引 |
| `/posts/<スラッグ>/` | 記事。関連する記事（共通のタグが多い順）と、GitHub の変更の履歴へのリンク |
| `/tags/` `/tags/<タグ>/` | 分野ごとのタグの一覧、タグごとの記事 |
| `/archive/` | 月別 |
| `/random/` | ランダムに1本へ移動 |
| `/rss.xml` | RSS |

## 構成と主なファイル

```
src/content/posts/   記事（Markdown）
src/content/config.ts  front matter の定義
src/lib/site.ts      サイト名・説明・リポジトリの URL
src/lib/tags.ts      タグ → 分野（色）
src/lib/posts.ts     並び替え・日付・関連記事などの共通処理
src/styles/global.css  見た目（テーマ「鉛」）
public/og.png        SNS のカードの画像（scripts/make-og.mjs で作る）
```

## 公開の仕組み（Cloudflare Pages + GitHub 連携）

main に push すると、Cloudflare Pages がリポジトリを取りに行き、`npm run build` して `dist/` を公開する。手元から `wrangler` でデプロイしない（経路は push の1本）。

最初の1回だけ、ダッシュボードで設定する：

1. Workers & Pages → Create → Pages → Connect to Git → リポジトリ `alphajinsei/blog`
2. Framework preset：Astro（Build command `npm run build`、Build output directory `dist`）、Production branch `main`
3. デプロイが終わったら、Custom domains で `blog.alphajinsei.com` を足す（DNS は Cloudflare なので CNAME が自動で入る）
4. Metrics → Web Analytics を有効にする（コードは要らない）

## バックアップ

記事は Markdown として git に入っていて、GitHub に全履歴がある。サーバーには生成した HTML しかないので、Pages が消えても push し直せば作り直せる。
