export const isDeploy: boolean = false;

export const localApiUrl: string = 'http://192.168.0.16:8000/api';
export const deploymentApiUrl: string = 'https://api.qrcontest.gniezno.pl/api';

export const getApiUrl = () => (isDeploy ? deploymentApiUrl : localApiUrl);

export const localRoutingBase: string = '/';
export const deploymentRoutingBase: string = '/';

export const getRoutingBase = () => (isDeploy ? deploymentRoutingBase : localRoutingBase);
