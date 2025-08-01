import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
	}),
});

const caseStudies = defineCollection({
	loader: glob({ base: './src/content/case-studies', pattern: '**/*.{md,mdx}' }),
	schema: () =>
		z.object({
			title: z.string(),
    		summary: z.string(),        
    		techStack: z.array(z.string()),
    		gallery: z.array(z.string()).optional()
		}),
});

export const collections = {
	blog,
	'case-studies': caseStudies
};

// export type CaseStudyEntry = CollectionEntry<'case-studies'>;