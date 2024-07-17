import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import 'dotenv/config'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  env: {
    PROJECT_ID: process.env.PROJECT_ID,
    API_KEY: process.env.API_KEY,
    DATABASE_ID: process.env.DATABASE_ID,
    CONSUMER_COLLECTION_ID: process.env.CONSUMER_COLLECTION_ID,
    SERVICEPROVIDER_COLLECTION_ID: process.env.SERVICEPROVIDER_COLLECTION_ID,
    ADMIN_COLLECTION_ID: process.env.ADMIN_COLLECTION_ID,
    SERVICE_COLLECTION_ID: process.env.SERVICE_COLLECTION_ID,
    BOOKING_COLLECTION_ID: process.env.BOOKING_COLLECTION_ID,
    REVIEW_COLLECTION_ID: process.env.REVIEW_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID: process.env.BUCKET_ID,
  },
};

export default nextConfig;
