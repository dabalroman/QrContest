import Model from './Model';
import { ApiEndpoint } from '../Api/ApiUrls';
import { BridgeRequestMethod } from '../Api/Bridge';

export enum SettingName {
    active = 'active',
    awardsInfo = 'awards_info'
}

type UserStandingType = {
    id?: number,
    name: string,
    value: string
};

export default class SettingsModel extends Model {
    endpoint: ApiEndpoint = ApiEndpoint.settings;

    name: string = '';
    value: string = '';

    protected hydrate (data: UserStandingType): this {
        this.id = data.id ?? 0;
        this.name = data.name;
        this.value = data.value;

        return this;
    }

    protected dehydrate (method: BridgeRequestMethod): Object {
        if (method !== BridgeRequestMethod.PUT) {
            throw new Error('Can\'t create new setting!');
        }

        return (
            {
                name: this.name,
                value: this.value
            }
        );
    }
}
