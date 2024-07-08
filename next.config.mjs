import { resolve } from 'path';

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@app'] = resolve(__dirname, 'app');
    config.resolve.alias['@components'] = resolve(__dirname, 'app/components');
    config.resolve.alias['@lib'] = resolve(__dirname, 'app/lib');
    config.resolve.alias['@pages'] = resolve(__dirname, 'pages');
    config.resolve.alias['@services'] = resolve(__dirname, 'services');
    config.resolve.alias['@tests'] = resolve(__dirname, 'tests');
    return config;
  },
};

export default nextConfig;
