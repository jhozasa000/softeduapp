/** @type {import('next').NextConfig} */
// variables globales se exportan al proyecto
const nextConfig = {
      images: { unoptimized: true },
      env: {
        REACT_APP_BACKEND: process.env.REACT_APP_BACKEND,
        REACT_APP_FOLDER_IMAGE : process.env.REACT_APP_FOLDER_IMAGE,
        REACT_APP_FOLDER_REPORT : process.env.REACT_APP_FOLDER_REPORT
      }
}

module.exports = nextConfig
