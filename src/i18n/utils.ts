import { getCollection, type CollectionEntry, type DataEntryMap, type ContentEntryMap } from 'astro:content';
import { ui, type UIKey } from './ui';
import { defaultLang, type Lang } from './routes';

export function useTranslations(lang: Lang) {
  return (key: UIKey): string => ui[lang][key] ?? ui[defaultLang][key];
}

type AnyCollection = keyof DataEntryMap | keyof ContentEntryMap;

export type Localized<C extends AnyCollection> = CollectionEntry<C> & {
  /** Bestandsnaam zonder taalmap, gelijk in NL en EN. */
  slug: string;
  /** Taal van de getoonde tekst (kan NL zijn op een Engelse pagina). */
  contentLang: Lang;
  /** True als er geen vertaling was en de Nederlandse tekst getoond wordt. */
  isFallback: boolean;
};

/**
 * Haalt een collectie op in de gevraagde taal.
 * Ontbreekt een vertaling, dan wordt de Nederlandse versie gebruikt.
 * De Nederlandse versie is leidend: wat niet in NL bestaat, wordt niet getoond.
 */
export async function getLocalized<C extends AnyCollection>(collection: C, lang: Lang): Promise<Localized<C>[]> {
  const entries = (await getCollection(collection)) as CollectionEntry<C>[];
  const bySlug = new Map<string, Partial<Record<Lang, CollectionEntry<C>>>>();

  for (const entry of entries) {
    const [entryLang, ...rest] = entry.id.split('/');
    const slug = rest.join('/');
    if (!slug || (entryLang !== 'nl' && entryLang !== 'en')) continue;
    const group = bySlug.get(slug) ?? {};
    group[entryLang as Lang] = entry;
    bySlug.set(slug, group);
  }

  const result: Localized<C>[] = [];
  for (const [slug, group] of bySlug) {
    const base = group[defaultLang];
    if (!base) continue;
    const chosen = group[lang] ?? base;
    const contentLang: Lang = group[lang] ? lang : defaultLang;
    result.push({ ...chosen, slug, contentLang, isFallback: contentLang !== lang });
  }
  return result;
}

export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'nl' ? 'nl-NL' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export const dayOrder = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
export type Day = (typeof dayOrder)[number];
