export default class ApiResponseError extends Error {
    public response: Response;

    constructor (response: Response) {
        super(`${response.status}: Request failed with ${response.statusText}`);
        this.response = response;
    }
}
