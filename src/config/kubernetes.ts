import * as fs from 'fs/promises';
import * as yaml from 'js-yaml';
import { KubeConfig, AppsV1Api } from '@kubernetes/client-node';
import { S3Config } from './types';


function mandatory(value: string | undefined): string {
    if (value === null || value === undefined) {
      throw new Error(`Environment variable "${value}" is missing`);
    }
    return value;
}

export  async function getS3Config(deploymentName: string = "apps-backend") {
    const kubeConfigPath = process.env.KUBECONFIG;
    console.log(kubeConfigPath)
    if (!kubeConfigPath) {
        throw new Error('KUBECONFIG environment variable not set');
    }
    try {
        const fileContents = await fs.readFile(kubeConfigPath, 'utf8');
        const config = yaml.load(fileContents);

        // Initialize the Kubernetes client
        const kubeConfig = new KubeConfig();
        kubeConfig.loadFromString(JSON.stringify(config));
        const k8sAppsApi = kubeConfig.makeApiClient(AppsV1Api);

        // get the current context
        const currentContextName = kubeConfig.getCurrentContext();
        if (!currentContextName) {
            throw new Error('No current context set in KubeConfig');
        }
        const currentContext = kubeConfig.getContextObject(currentContextName);
        if (!currentContext) {
            throw new Error(`Context ${currentContextName} not found in KubeConfig`);
        }
        const namespace = currentContext.namespace || 'sprint';

        // Get the deployment details
        const deployment = await k8sAppsApi.readNamespacedDeployment(deploymentName, namespace);
        const containers = deployment.body.spec?.template.spec?.containers;

        let s3Env : { [key: string]: string | undefined } = {};
        if (containers && containers.length > 0) {
            containers.forEach(container => {
                console.log(`Container: ${container.name}`);
                container.env?.forEach(envVar => {
                    if (envVar.name.startsWith('S3')) {
                        console.log(`${envVar.name}: ${envVar.value}`);
                        s3Env[envVar.name] = envVar.value;
                    }
                });
            });
        }

         const s3Config: S3Config = {
            region: mandatory(s3Env["S3_REGION"]),
            endpoint: mandatory(s3Env["S3_ENDPOINT"]),
            credentials: {
                accessKeyId: mandatory(s3Env["S3_KEY"]),
                secretAccessKey: mandatory(s3Env["S3_SECRET"])
            }
        };
        return s3Config;
    } catch (err) {
        console.error('Error reading or parsing Kubernetes config:', err);
        throw err; 
    }
}
