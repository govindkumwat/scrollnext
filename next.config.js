module.exports = {
  experimental: {
    taint: true,
  },
    images: {
        domains: ['i.redd.it', 'www.api.reddit.com', 'preview.redd.it', 'external-preview.redd.it', 'files.catbox.moe', 'i.redgifs.com'],
        remotePatterns: [
            {
              protocol: "https",
              hostname: "**",
            },
          ],
    },
  }