/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.txt$/, // Adjust the file extension as needed
      use: 'raw-loader',
    })
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default config;
