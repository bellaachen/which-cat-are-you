export const DIMS = ['S', 'A', 'E', 'R', 'B', 'T'] as const;
export type Dim = (typeof DIMS)[number];

export type Locale = 'zh-TW' | 'en';
export type L10n = Record<Locale, string>;

export type Weight = -2 | -1 | 1 | 2;
export type Weights = Partial<Record<Dim, Weight>>;

export type OptionId = 'A' | 'B' | 'C' | 'D';

export interface QuizOption {
  id: OptionId;
  text: L10n;
  weights: Weights;
}

export interface Question {
  id: string;
  prompt: L10n;
  primaryDim: Dim;
  options: [QuizOption, QuizOption, QuizOption, QuizOption];
}

export const CAT_IDS = [
  'british', 'orange', 'siamese', 'black', 'ragdoll', 'bengal', 'maine', 'russian',
  'calico', 'tabby', 'white', 'norwegian', 'sphynx', 'abyssinian', 'persian', 'tuxedo',
] as const;
export type CatId = (typeof CAT_IDS)[number];

export type Vector = Record<Dim, number>;

export interface Cat {
  id: CatId;
  /** breed = 品種靈感；coat = 毛色／花紋或米克斯類型 */
  kind: 'breed' | 'coat';
  name: L10n;
  title: L10n;
  description: L10n;
  strengths: [L10n, L10n, L10n];
  quirks: [L10n, L10n];
  relationship: L10n;
  quote: L10n;
  traits: [L10n, L10n, L10n];
  vector: Vector;
  /** src 為不含副檔名的路徑，實際檔案是 public/<src>.webp 與 <src>-480.webp。 */
  image: { src: string; alt: L10n };
  color: string;
}

export interface PairingNote {
  id: CatId;
  reason: L10n;
}

export interface PairingSet {
  best: [PairingNote, PairingNote];
  rival: [PairingNote, PairingNote];
}
