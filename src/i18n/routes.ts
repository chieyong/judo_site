/**
 * Centrale lijst van pagina-adressen per taal.
 * De taalknop en de hreflang-tags gebruiken deze lijst, zodat je altijd
 * op dezelfde pagina in de andere taal uitkomt.
 */
export const languages = { nl: 'Nederlands', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'nl';
export const langs = Object.keys(languages) as Lang[];

export const routes = {
  home: { nl: '/', en: '/en/' },
  parents: { nl: '/voor-ouders/', en: '/en/for-parents/' },
  whyJudo: { nl: '/waarom-judo/', en: '/en/why-judo/' },
  clubs: { nl: '/vind-een-club/', en: '/en/find-a-club/' },
  team: { nl: '/team/', en: '/en/team/' },
  news: { nl: '/nieuws/', en: '/en/news/' },
  members: { nl: '/leden/', en: '/en/members/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;
export type Alternates = Record<Lang, string>;

/** Adres van een pagina in een bepaalde taal. */
export function path(key: RouteKey, lang: Lang): string {
  return routes[key][lang];
}

/** Adres van een nieuwsbericht in een bepaalde taal. */
export function newsPath(slug: string, lang: Lang): string {
  return `${routes.news[lang]}${slug}/`;
}

export function newsAlternates(slug: string): Alternates {
  return { nl: newsPath(slug, 'nl'), en: newsPath(slug, 'en') };
}
