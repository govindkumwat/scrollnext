/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
    images: {
        domains: ['i.redd.it', 'www.api.reddit.com', 'preview.redd.it', 'files.catbox.moe','i.redgifs.com'],
      },
};

export default nextConfig;
