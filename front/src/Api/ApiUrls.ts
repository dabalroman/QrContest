import { getApiUrl } from '../env';

export const baseApiUrl: string = getApiUrl();

export enum ApiEndpoint {
    csrfCookie = 'sanctum/csrf-cookie',
    register = 'register',
    login = 'login',
    logout = 'logout',
    users = 'users',
    profile = 'profile',
    refresh = 'refresh',
    codes = 'codes',
    collectedCodes = 'collected_codes'
}
