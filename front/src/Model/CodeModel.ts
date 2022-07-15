import Model from './Model';
import { ApiEndpoint } from '../Api/ApiUrls';
import { BridgeRequestMethod } from '../Api/Bridge';

type CodeModelType = {
    id?: number,
    name: string,
    description?: string,
    data?: string | null,
    is_active?: number,
    with_question?: number,
    points: number
};

export default class CodeModel extends Model {
    endpoint: ApiEndpoint = ApiEndpoint.codes;

    name: string;
    description: string = '';
    data: string = '';
    isActive: number = 1;
    withQuestion: number = 0;
    points: number = 0;

    public static dataRegex: RegExp = /^[\w\d]{3,}$/;

    constructor (name: string = '') {
        super();

        this.name = name;
    }

    protected hydrate (data: CodeModelType): this {
        this.id = data.id ?? 0;
        this.name = data.name;
        this.description = data.description ?? '';
        this.data = data.data ?? '';
        this.isActive = data.is_active ?? 1;
        this.withQuestion = data.with_question ?? 0;
        this.points = data.points;

        return this;
    }

    protected dehydrate (method: BridgeRequestMethod): CodeModelType {
        return (
            method === BridgeRequestMethod.POST
                ? {
                    name: this.name,
                    description: this.description,
                    data: this.data,
                    is_active: this.isActive,
                    with_question: this.withQuestion,
                    points: this.points
                }
                : {
                    name: this.name,
                    description: this.description,
                    is_active: this.isActive,
                    with_question: this.withQuestion,
                    points: this.points
                }
        );
    }
}
