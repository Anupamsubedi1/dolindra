/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'flagcdn.com' },
    ],
  },
  // Skip webpack's filesystem cache in dev. On Windows/OneDrive-synced
  // folders the .pack.gz rename step can race with file watchers and
  // throw ENOENT. Memory cache avoids the on-disk writes entirely.
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = { type: 'memory' }
    }
    return config
  },
}

export default nextConfig