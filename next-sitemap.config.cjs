/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://learnearnzone.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  // Exclude private/admin routes that shouldn't be indexed
  exclude: [
    '/auth/*',
    '/dashboard/*',
    '/admin/*',
    '/api/*',
    '/withdraw',
    '/referral/*',
    '/site-pages/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/auth/', '/dashboard/', '/admin/', '/api/', '/withdraw'],
      },
    ],
  },
}
