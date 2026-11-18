import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/*
 * Elke collectie heeft een map per taal: nl/ en en/.
 * Decap CMS schrijft daar naartoe (i18n structure: multiple_folders).
 * De velden hier moeten overeenkomen met public/admin/config.yml.
 */

const nieuws = defineCollection({
  loader: glob({ pattern: '{nl,en}/**/*.md', base: './src/content/nieuws' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
    imageAlt: z.string().optional().default(''),
    summary: z.string().optional(),
  }),
});

const clubs = defineCollection({
  loader: glob({ pattern: '{nl,en}/**/*.json', base: './src/content/clubs' }),
  schema: z.object({
    name: z.string(),
    place: z.string(),
    website: z.string().url().optional().or(z.literal('')),
    description: z.string(),
    cofounder: z.boolean().default(false),
  }),
});

const trainingen = defineCollection({
  loader: glob({ pattern: '{nl,en}/**/*.json', base: './src/content/trainingen' }),
  schema: z.object({
    ageGroup: z.string(),
    day: z.enum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']),
    time: z.string(),
    location: z.string(),
  }),
});

const lidmaatschappen = defineCollection({
  loader: glob({ pattern: '{nl,en}/**/*.json', base: './src/content/lidmaatschappen' }),
  schema: z.object({
    name: z.string(),
    order: z.number().default(0),
    includes: z.array(z.string()),
    pricePerYear: z.number().optional(),
    // Standaard verborgen: bedragen alleen in de (demo) ledenomgeving.
    showPrice: z.boolean().default(false),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '{nl,en}/**/*.json', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    // staff = technische staf, support = begeleiding, board = bestuur
    group: z.enum(['staff', 'support', 'board']),
    order: z.number().default(0),
    credentials: z.string().optional().default(''),
    bio: z.string().optional().default(''),
    // Alleen gebruiken met toestemming. Zonder foto tonen we initialen.
    photo: z.string().optional(),
  }),
});

export const collections = { nieuws, clubs, trainingen, lidmaatschappen, team };
