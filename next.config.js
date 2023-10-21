/** @type {import('next').NextConfig} */
// variables globales se exportan al proyecto
const nextConfig = {
      images: { unoptimized: true },
      env: {
        REACT_APP_BACKEND: process.env.REACT_APP_BACKEND,
        BLOB_READ_WRITE_TOKEN : process.env.BLOB_READ_WRITE_TOKEN
      }
}

module.exports = nextConfig
