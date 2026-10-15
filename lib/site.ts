// Set NEXT_PUBLIC_SITE_URL to the canonical production URL (e.g. your custom domain).
// Falls back to the Vercel production URL, then localhost for local development.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const siteName = "Dimitris Maleas | Front-End Developer";
export const siteDescription =
  "Portfolio of Dimitris Maleas, a front-end developer building modern sites and apps with React and Next.js.";
