import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as dotenv from 'dotenv';
import { getS3Config } from './kubernetes.js';
import { S3Config } from './types.js';


let config: S3Config | undefined;

try {
  config = await getS3Config();
}catch(err) {
  console.error('Error reading or parsing Kubernetes config:', err);
}

if(!config) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  
  dotenv.config({ path: path.join(__dirname, '../../', '.env') });
  if (!process.env.S3_AWS_REGION || !process.env.S3_AWS_ENDPOINT || !process.env.S3_ACCESS_KEY_ID || !process.env.S3_SECRET_ACCESS_KEY) {
    throw new Error('Required environment variables are missing');
  }
  
  config = {
      region: process.env.S3_AWS_REGION,
      endpoint: process.env.S3_AWS_ENDPOINT,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
      }
    }
}

  const s3Config: S3Config = config;

export { s3Config };