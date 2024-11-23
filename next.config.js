/** @type {import('next').NextConfig} */
// variables globales se exportan al proyecto
const nextConfig = {
      images: { unoptimized: true },
      env: {
        REACT_APP_BACKEND: process.env.REACT_APP_BACKEND,
        BLOB_READ_WRITE_TOKEN : process.env.BLOB_READ_WRITE_TOKEN,
        REACT_APP_KEY_SECRET : process.env.REACT_APP_KEY_SECRET
      }
}

module.exports = nextConfig
