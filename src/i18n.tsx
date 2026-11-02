import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Dim, L10n, Locale } from './data/types';
import { loadLocale, saveLocale } from './lib/storage';

const zh = {
  brand: '你是哪一種貓咪？',
  navCats: '貓咪圖鑑',
  switchLang: 'EN',
  switchLangLabel: 'Switch to English',
  skip: '跳到主要內容',
  heroTitle: '你是哪一種貓咪？',
  heroBody: '12 道情境題，大約 3–5 分鐘。沒有好壞答案，選你平常真的會做的那個就好。',
  start: '開始測驗',
  resume: '繼續作答（第 {n} 題）',
  restart: '重新開始',
  clearRecord: '清除紀錄',
  lastResult: '看上次的結果',
  browseCats: '看全部 16 種貓咪',
  rosterTitle: '16 種貓咪類型',
  rosterNote: '品種和花色只是角色的靈感來源，不代表真實貓咪的個性。',
  questionOf: '第 {n} 題，共 {total} 題',
  prev: '上一題',
  next: '下一題',
  seeResult: '看結果',
  answerFirst: '選一個答案後就能繼續',
  transition: '正在翻你的貓咪手帳',
  skipTransition: '略過',
  youAre: '你是',
  dimensions: '你的六維人格',
  dimensionsNote: '娛樂性人格傾向，不是心理測量。',
  strengths: '優點',
  quirks: '可愛的小缺點',
  relationship: '戀愛與友情',
  bestFriends: '最佳貓友',
  rivals: '歡喜冤家',
  rivalsNote: '需要磨合，不代表不能當朋友。',
  compatIndex: '速配指數',
  rhythm: '共同節奏',
  complement: '互補空間',
  downloadPng: '下載 PNG',
  copyLink: '複製連結',
  copied: '已複製連結',
  retake: '重新測驗',
  viewCats: '查看圖鑑',
  invalidTitle: '這個結果連結無法開啟',
  invalidBody: '連結內容不完整或已經失效。重新測驗一次，就能得到新的結果。',
  noResultTitle: '還沒有測驗結果',
  noResultBody: '回答 12 道題目後，結果會顯示在這裡。',
  shareTitle: '你的分享圖',
  shareMaking: '正在產生圖片',
  shareFail: '圖片沒有產生成功，請重新按一次下載。',
  saveImage: '儲存圖片',
  shareHint: 'iPhone 也可以長按圖片儲存。',
  close: '關閉',
  searchLabel: '搜尋貓咪',
  searchPlaceholder: '輸入名稱或稱號',
  filterAll: '全部',
  filterBreed: '品種靈感',
  filterCoat: '毛色花紋',
  noMatch: '找不到符合的貓咪，換個關鍵字試試。',
  catsTitle: '貓咪圖鑑',
  catsIntro: '16 種貓咪類型，點進去看個性、相處方式和速配對象。橘貓、黑貓、白貓、三花、虎斑和賓士是毛色、花紋或米克斯類型，不是品種。',
  backToCats: '回到圖鑑',
  takeQuiz: '回到測驗',
  allCompat: '和其他貓的速配指數',
  notFound: '找不到這個頁面',
  home: '回到首頁',
  footer: '© Bella Chen. All rights reserved.',
  shareUrlLabel: '測測你是哪一種貓',
};

const en: typeof zh = {
  brand: 'Which Cat Are You?',
  navCats: 'Cat guide',
  switchLang: '中文',
  switchLangLabel: '切換為繁體中文',
  skip: 'Skip to main content',
  heroTitle: 'Which cat are you?',
  heroBody: '12 everyday situations, about 3–5 minutes. There are no good or bad answers, so pick what you would really do.',
  start: 'Start the quiz',
  resume: 'Continue from question {n}',
  restart: 'Start over',
  clearRecord: 'Clear my record',
  lastResult: 'See my last result',
  browseCats: 'Browse all 16 cats',
  rosterTitle: '16 cat types',
  rosterNote: 'Breeds and coats only inspire these characters. They do not describe how real cats behave.',
  questionOf: 'Question {n} of {total}',
  prev: 'Back',
  next: 'Next',
  seeResult: 'See my result',
  answerFirst: 'Choose an answer to continue',
  transition: 'Flipping through your cat journal',
  skipTransition: 'Skip',
  youAre: 'You are the',
  dimensions: 'Your six traits',
  dimensionsNote: 'Just-for-fun personality leanings, not a psychological measure.',
  strengths: 'Strengths',
  quirks: 'Lovable flaws',
  relationship: 'Love and friendship',
  bestFriends: 'Best cat friends',
  rivals: 'Frenemies',
  rivalsNote: 'These take some adjusting, and can still be good friends.',
  compatIndex: 'Compatibility',
  rhythm: 'Shared rhythm',
  complement: 'Complement',
  downloadPng: 'Download PNG',
  copyLink: 'Copy link',
  copied: 'Link copied',
  retake: 'Retake the quiz',
  viewCats: 'Browse the cat guide',
  invalidTitle: 'This result link can’t be opened',
  invalidBody: 'The link is incomplete or no longer valid. Retake the quiz to get a new result.',
  noResultTitle: 'No result yet',
  noResultBody: 'Answer the 12 questions and your result will appear here.',
  shareTitle: 'Your share image',
  shareMaking: 'Creating your image',
  shareFail: 'The image could not be created. Select Download PNG to try again.',
  saveImage: 'Save image',
  shareHint: 'On iPhone, you can also press and hold the image to save it.',
  close: 'Close',
  searchLabel: 'Search cats',
  searchPlaceholder: 'Type a name or title',
  filterAll: 'All',
  filterBreed: 'Breed-inspired',
  filterCoat: 'Coat and mix',
  noMatch: 'No cats match. Try another word.',
  catsTitle: 'Cat guide',
  catsIntro: 'Sixteen cat types, with their personalities, how to get along, and who they click with. Orange, Black, White, Calico, Tabby and Tuxedo are coats or mixes, not breeds.',
  backToCats: 'Back to the guide',
  takeQuiz: 'Back to the quiz',
  allCompat: 'Compatibility with every other cat',
  notFound: 'This page doesn’t exist',
  home: 'Back to home',
  footer: '© Bella Chen. All rights reserved.',
  shareUrlLabel: 'Find out which cat you are',
};

export const UI: Record<Locale, typeof zh> = { 'zh-TW': zh, en };

export const DIM_LABELS: Record<Dim, { name: L10n; low: L10n; high: L10n }> = {
  S: { name: { 'zh-TW': '社交能量', en: 'Social energy' }, low: { 'zh-TW': '獨處', en: 'Solitary' }, high: { 'zh-TW': '社交', en: 'Social' } },
  A: { name: { 'zh-TW': '行動風格', en: 'Action style' }, low: { 'zh-TW': '謹慎', en: 'Cautious' }, high: { 'zh-TW': '冒險', en: 'Adventurous' } },
  E: { name: { 'zh-TW': '情緒表達', en: 'Expression' }, low: { 'zh-TW': '內斂', en: 'Reserved' }, high: { 'zh-TW': '外放', en: 'Open' } },
  R: { name: { 'zh-TW': '生活節奏', en: 'Life rhythm' }, low: { 'zh-TW': '隨性', en: 'Spontaneous' }, high: { 'zh-TW': '規律', en: 'Routine' } },
  B: { name: { 'zh-TW': '關係需求', en: 'Closeness' }, low: { 'zh-TW': '獨立', en: 'Independent' }, high: { 'zh-TW': '親密', en: 'Close' } },
  T: { name: { 'zh-TW': '思考方式', en: 'Thinking' }, low: { 'zh-TW': '感性', en: 'Feeling' }, high: { 'zh-TW': '理性', en: 'Logic' } },
};

type UIKey = keyof typeof zh;

interface LocaleContextValue {
  locale: Locale;
  toggle: () => void;
  t: (key: UIKey, vars?: Record<string, string | number>) => string;
  l: (text: L10n) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const initialLocale = (): Locale =>
  loadLocale() ?? (typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('zh') ? 'zh-TW' : 'en');

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    document.documentElement.lang = locale === 'zh-TW' ? 'zh-Hant' : 'en';
    document.title = locale === 'zh-TW' ? '你是哪一種貓咪？｜Which Cat Are You?' : 'Which Cat Are You?｜你是哪一種貓咪？';
  }, [locale]);

  const value = useMemo<LocaleContextValue>(() => ({
    locale,
    toggle: () => {
      const next = locale === 'zh-TW' ? 'en' : 'zh-TW';
      setLocale(next);
      saveLocale(next);
    },
    t: (key, vars) =>
      Object.entries(vars ?? {}).reduce(
        (text, [k, v]) => text.replace(`{${k}}`, String(v)),
        UI[locale][key],
      ),
    l: (text) => text[locale],
  }), [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used inside LocaleProvider');
  return ctx;
}
