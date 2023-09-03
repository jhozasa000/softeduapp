/** @type {import('next').NextConfig} */
const nextConfig = {
      images: { unoptimized: true },
      env: {
        NETLIFY_NEXT_PLUGIN_SKIP: process.env.NETLIFY_NEXT_PLUGIN_SKIP_VALUE,
        REACT_APP_BACKEND: process.env.REACT_APP_BACKEND,
        REACT_APP_FOLDER_IMAGE : process.env.REACT_APP_FOLDER_IMAGE
      }
}

module.exports = nextConfig
