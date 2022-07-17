import Model from './Model';
import { ApiEndpoint } from '../Api/ApiUrls';
import Bridge, { BridgeRequestMethod } from '../Api/Bridge';

type UserDataType = {
    id: number,
    name: string,
    score: number,
    bracelet_id: string,
    is_admin: number,
    is_public: number,
    is_suspended: number,
    created_at: string
};

export default class UserModel extends Model {
    endpoint: ApiEndpoint = ApiEndpoint.users;

    name: string;
    password: string | null = null;
    score: number = 0;
    braceletId: string = '';
    isAdmin: number = 0;
    isPublic: number = 1;
    isSuspended: number = 0;
    createdAt: string = '';

    constructor (name: string = '') {
        super();

        this.name = name;
    }

    protected hydrate (data: UserDataType): this {
        this.id = data.id;
        this.name = data.name;
        this.score = data.score;
        this.braceletId = data.bracelet_id;
        this.isAdmin = data.is_admin;
        this.isPublic = data.is_public;
        this.isSuspended = data.is_suspended;
        this.createdAt = data.created_at;

        return this;
    }

    protected dehydrate (method: BridgeRequestMethod): Object {
        if (method !== BridgeRequestMethod.PUT) {
            throw new Error('Can\'t create user via model!');
        }

        return (
            {
                name: this.name,
                bracelet_id: this.braceletId,
                is_public: this.isPublic,
                is_suspended: this.isSuspended
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
