declare namespace NodeJS {
    interface ProcessEnv {
      S3_ACCESS_KEY_ID?: string;
      S3_SECRET_ACCESS_KEY?: string;
      S3_AWS_REGION?: string;
      S3_AWS_ENDPOINT?: string;
      [key: string]: string | undefined;
      KUBECONFIG?: string;
    }
  }