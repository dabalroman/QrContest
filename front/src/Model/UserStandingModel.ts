import Model from './Model';
import { ApiEndpoint } from '../Api/ApiUrls';

type UserStandingType = {
    id?: number,
    name: string,
    score: number
};

export default class UserStandingModel extends Model {
    endpoint: ApiEndpoint = ApiEndpoint.standings;

    name: string = '';
    score: number = 0;

    protected hydrate (data: UserStandingType): this {
        this.id = data.id ?? 0;
        this.name = data.name;
        this.score = data.score;

        return this;
    }

    protected dehydrate (): Object {
        throw new Error('Cannot POST/PUT this object');
    }
}
