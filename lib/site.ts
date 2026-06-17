// Base URL used for SEO metadata, sitemap and robots.
// Set NEXT_PUBLIC_SITE_URL in your project env to your production domain.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mohamed-khaled.vercel.app"
).replace(/\/$/, "")
