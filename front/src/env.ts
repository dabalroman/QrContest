export const isDeploy: boolean = false;

export const localApiUrl: string = 'http://localhost:8000/api';
export const deploymentApiUrl: string = '---';

export const getApiUrl = () => (isDeploy ? deploymentApiUrl : localApiUrl);

export const localRoutingBase: string = '/';
export const deploymentRoutingBase: string = '/app';

export const getRoutingBase = () => (isDeploy ? deploymentRoutingBase : localRoutingBase);
