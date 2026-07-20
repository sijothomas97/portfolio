import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    featured: z.boolean().default(false),
    featuredOrder: z.number().optional(),
    thumbnail: z.string().optional(),
    tags: z.array(z.string()),
    techStack: z.array(z.string()),
    github: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    date: z.coerce.date(),
    ogImage: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
    readingTime: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

export const collections = { projects, blog };
