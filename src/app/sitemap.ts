import { MetadataRoute } from 'next';
import { posts } from '@/data/writing';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.abhijeetpachpute.com';

  const writingPages = posts
    .filter((post) => post.status === 'published')
    .map((post) => ({
      url: `${siteUrl}/writing/${post.slug}`,
      lastModified: new Date(`${post.date}T00:00:00`),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/writing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...writingPages,
  ];
}
