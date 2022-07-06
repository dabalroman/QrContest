import { ApiEndpoint, baseApiUrl } from './ApiUrls';

export enum BridgeRequestMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete'
}

export type UrlArgument = [string, number | string];

export type SuccessCallbackOrNull = ((responseObject: Object) => void) | null;
export type ErrorCallbackOrNull = ((errorCode: number) => void) | null;

export default class Bridge {
    static authorizationToken: string = '';

    private static getHeaders (): HeadersInit {
        return {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization: this.authorizationToken
        };
    }

    private static makeRequest (
        method: BridgeRequestMethod,
        url: string,
        headers: HeadersInit,
        body: Object | null = null
    ): Promise<Object | null> {
        // noinspection TypeScriptValidateTypes
        const params: RequestInit = {
            method,
            headers,
            body: null,
            credentials: 'include'
        };

        if (body !== null) {
            params.body = JSON.stringify(body);
        }

        const request: Request = new Request(url, params);

        // eslint-disable-next-line no-console
        console.log('[Bridge] Fetching', url);

        return fetch(request)
            .then((response: Response): Response => this.handleErrors(response))
            .then((response: Response): Promise<string> => response.text())
            .then((responseString: string): Object => (responseString ? JSON.parse(responseString) : {}))
            // eslint-disable-next-line arrow-body-style
            .then((responseObject: Object) => {
                // eslint-disable-next-line no-console
                console.log('[Bridge] Success', responseObject);

                return responseObject;
            });
    }

    public static getData (
        endpoint: ApiEndpoint,
        id: number | null = null,
        args: UrlArgument[] | null = null
    ): Promise<Object | null> {
        let url: string = this.getUrl(endpoint);

        if (id !== null) {
            url += `/${id}`;
        }

        if (args) {
            const argsAsString: string =
                args.map(([key, value]: UrlArgument) => `${key}=${value}`)
                    .join('&');

            url += `?${argsAsString}`;
        }

        return this.makeRequest(BridgeRequestMethod.GET, url, this.getHeaders(), null);
    }

    public static postData (
        endpoint: ApiEndpoint,
        data: Object
    ): Promise<Object | null> {
        const url: string = this.getUrl(endpoint);

        return this.makeRequest(BridgeRequestMethod.POST, url, this.getHeaders(), data);
    }

    public static putData (
        endpoint: ApiEndpoint,
        id: number,
        data: Object
    ): Promise<Object | null> {
        let url: string = this.getUrl(endpoint);
        url += `/${id}`;

        return this.makeRequest(BridgeRequestMethod.PUT, url, this.getHeaders(), data);
    }

    public static deleteData (
        endpoint: ApiEndpoint,
        id: number
    ): Promise<Object | null> {
        let url: string = this.getUrl(endpoint);
        url += `/${id}`;

        return this.makeRequest(BridgeRequestMethod.DELETE, url, this.getHeaders(), null);
    }

    public static setBearerToken (authorizationToken: string = ''): void {
        this.authorizationToken = `Bearer ${authorizationToken}`;
    }

    private static getUrl (endpoint: ApiEndpoint): string {
        return `${baseApiUrl}/${endpoint}`;
    }

    private static handleErrors (response: Response): Response {
        if (!response.ok) {
            throw Error(`${response.status}: Request failed with ${response.statusText}`);
        }

        return response;
    }
}
