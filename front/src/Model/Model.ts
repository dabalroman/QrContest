import { ApiEndpoint } from '../Api/ApiUrls';
import Bridge, { BridgeRequestMethod, UrlArgument } from '../Api/Bridge';

export default abstract class Model {
    endpoint: ApiEndpoint = ApiEndpoint.users;
    id: number = 0;

    public static fromData (data: Object): Model {
        // @ts-ignore
        return (new this()).hydrate(data);
    }

    public refresh (): Promise<Model> {
        return Bridge.getData(this.endpoint, this.id)
            .then((response: any) => {
                if (response.message !== undefined) {
                    throw new Error(`GET failed with message ${response.message}`);
                }

                this.hydrate(response.data);

                /** @var Model this */
                return this;
            });
    }

    public static get (id: number): Promise<Model> {
        // @ts-ignore
        const model: Model = new this();

        return Bridge.getData(model.endpoint, id)
            .then((response: any) => {
                if (response.message !== undefined) {
                    throw new Error(`GET failed with message ${response.message}`);
                }

                model.hydrate(response.data);

                return model;
            });
    }

    public static getAll (args: UrlArgument[] | null = null): Promise<Model[]> {
        // @ts-ignore
        const model: Model = new this();

        return Bridge.getData(model.endpoint, null, args)
            .then((response: any) => {
                if (response.message !== undefined) {
                    throw new Error(`GET failed with message ${response.message}`);
                }

                // @ts-ignore
                return response.data.map((data: object) => (new this()).hydrate(data));
            });
    }

    public post (): Promise<Model> {
        if (this.id !== 0) {
            throw new Error('Can\'t POST already created object.');
        }

        return Bridge.postData(this.endpoint, this.dehydrate(BridgeRequestMethod.POST))
            .then((response: any) => {
                if (response.message !== undefined) {
                    throw new Error(`POST failed with message ${response.message}`);
                }

                this.hydrate(response.data);

                /** @var Model this */
                return this;
            });
    }

    public put (): Promise<Model> {
        if (this.id === 0) {
            throw new Error('Can\'t PUT non-existing object.');
        }

        return Bridge.putData(this.endpoint, this.id, this.dehydrate(BridgeRequestMethod.PUT))
            .then((response: any) => {
                if (response.message !== undefined) {
                    throw new Error(`PUT failed with message ${response.message}`);
                }

                this.hydrate(response.data);

                /** @var Model this */
                return this;
            });
    }

    public save (): Promise<Model> {
        return (this.id === 0) ? this.post() : this.put();
    }

    public delete (): Promise<Model> {
        if (this.id === 0) {
            throw new Error('Can\'t DELETE non-existing object.');
        }

        return Bridge.deleteData(this.endpoint, this.id)
            .then((response: any) => {
                if (response.data !== null) {
                    throw new Error(`DELETE failed with message ${response.message}`);
                }

                /** @var Model this */
                return this;
            });
    }

    protected abstract hydrate (data: Object): this;

    protected abstract dehydrate (method: BridgeRequestMethod): Object;
}
