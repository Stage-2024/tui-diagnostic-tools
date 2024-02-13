export interface ProcessEnv {
    S3_ACCESS_KEY_ID?: string;
    S3_SECRET_ACCESS_KEY?: string;
    S3_AWS_REGION?: string;
    S3_AWS_ENDPOINT?: string;
    DEBUG?: boolean
    [key: string]: string | boolean | undefined;
}

declare var process: {
    env: ProcessEnv
};

export interface S3Config {
    region?: string;
    endpoint: string;
    credentials: {
        accessKeyId: string;
        secretAccessKey: string;
    };
} 