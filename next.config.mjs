/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mint.club',
      },
      {
        protocol: 'https',
        hostname: 'cf-ipfs.com',
      },
    ],
  },

  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   },
  // },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
    });

    return config;
  },
};

export default nextConfig;
