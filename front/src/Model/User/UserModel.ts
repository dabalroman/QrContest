import Model from '../Model';
import { ApiEndpoint } from '../../Api/ApiUrls';
import Bridge, { BridgeRequestMethod } from '../../Api/Bridge';

type UserDataType = {
    id: number,
    name: string,
    score: number,
    is_admin: boolean,
    created_at: string
};

export default class UserModel extends Model {
    endpoint: ApiEndpoint = ApiEndpoint.users;

    name: string;
    password: string | null = null;
    score: number = 0;
    isAdmin: boolean = false;
    createdAt: string = '';

    constructor (name: string = '') {
        super();

        this.name = name;
    }

    protected hydrate (data: UserDataType): this {
        this.id = data.id;
        this.name = data.name;
        this.score = data.score;
        this.isAdmin = data.is_admin;
        this.createdAt = data.created_at;

        return this;
    }

    protected dehydrate (method: BridgeRequestMethod): Object {
        return (
            method === BridgeRequestMethod.POST
                ? {
                    name: this.name,
                    password: this.password
                }
                : {
                    name: this.name,
                    password: this.password ?? undefined
                }
        );
    }

    public static getCurrent (): Promise<UserModel> {
        // @ts-ignore
        const model: UserModel = new this();

        return Bridge.getData(ApiEndpoint.profile)
            .then((response: any) => {
                if (response.message !== undefined) {
                    throw new Error(`GET failed with message ${response.message}`);
                }

                model.hydrate(response.data);

                return model;
            });
    }
}
