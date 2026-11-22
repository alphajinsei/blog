// SNS のカード用の共通の画像（public/og.png、1200×630）を作る。サイト名やテーマの色を変えたときに実行し直す。
//   node scripts/make-og.mjs
import sharp from 'sharp';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f1f3f5"/>
  <rect x="0" y="0" width="1200" height="10" fill="#2c4f86"/>
  <text x="96" y="345" font-family="DejaVu Sans, Helvetica, Arial, sans-serif" font-size="76" font-weight="700" fill="#2c4f86">blog.alphajinsei.com</text>
  <line x1="96" y1="400" x2="1104" y2="400" stroke="#dde1e6" stroke-width="2"/>
  <text x="96" y="460" font-family="DejaVu Sans, Helvetica, Arial, sans-serif" font-size="34" fill="#586069">alphajinsei</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(new URL('../public/og.png', import.meta.url).pathname);
console.log('wrote public/og.png');
