/** @type {import('next').NextConfig} */
const nextConfig = {
      images: { unoptimized: true },
      env: {
        NETLIFY_NEXT_PLUGIN_SKIP: process.env.NETLIFY_NEXT_PLUGIN_SKIP_VALUE,
      }
}

module.exports = nextConfig
