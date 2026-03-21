/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://awscommunityday.com.br/norte',
    generateRobotsTxt: false,
    changefreq: 'weekly',
    transform: async(config, path) => {
        let priority = 0.7;
        let changefreq = config.changefreq;

        if (path === '/') {
            priority = 0.8;
        } else if (path === '/speakers' || path === '/talks') {
            priority = 0.8;
            changefreq = 'weekly';
        } else if (path === '/contato') {
            priority = 0.7;
            changefreq = 'monthly';
        } else if (path.startsWith('/speakers/')) {
            priority = 0.6;
            changefreq = 'monthly';
        } else if (path.startsWith('/talks/')) {
            priority = 0.5;
            changefreq = 'monthly';
        } else {
            priority = 0.4;
            changefreq = 'monthly';
        }

        return {
            loc: path,
            changefreq: changefreq,
            priority: priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        };
    },
};