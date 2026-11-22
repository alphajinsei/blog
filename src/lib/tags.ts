// タグ → 分野（色）の対応。ここに書いていないタグは「その他」（灰色）になる。
// 分野の分け方は仮。記事がたまってきたら見直す。

// 使う色はこの6色に限る（色相を約60°ずつ離し、明るさをそろえてある）。
// タグごとではなく分野ごとに色を付けるので、タグが増えても色は増えない。
// 分野を足すときは、残りの色（rose、teal）から選ぶ。7つ目が要るほど分野が増えたら、分け方を見直す合図。
export const PALETTE = {
  blue: '#3a72d8',
  green: '#23955f',
  amber: '#d08a0b',
  purple: '#8455d6',
  rose: '#d4507a',
  teal: '#1593a6',
  gray: '#9aa1ab', // 分野に入れていないタグ
} as const;

export const DOMAINS = {
  ai: { label: 'AI', color: PALETTE.blue },
  sys: { label: 'システム', color: PALETTE.green },
  math: { label: '数理', color: PALETTE.purple },
  soc: { label: '社会', color: PALETTE.amber },
  other: { label: 'その他', color: PALETTE.gray },
} as const;

export type Domain = keyof typeof DOMAINS;

const TAG_DOMAIN: Record<string, Domain> = {
  AI: 'ai',
  skill: 'ai',
  LLM: 'ai',
  インフラ: 'sys',
  設計: 'sys',
  部品化: 'sys',
  テスト: 'sys',
  CLI: 'sys',
  数学: 'math',
  物理: 'math',
  暗号: 'math',
  ドメイン知識: 'soc',
  社会: 'soc',
  経済: 'soc',
};

export function domainOf(tag: string): Domain {
  return TAG_DOMAIN[tag] ?? 'other';
}

// 分野の並び順（タグ一覧で使う）。
export const DOMAIN_ORDER: Domain[] = ['ai', 'sys', 'math', 'soc', 'other'];
