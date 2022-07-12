import Model from './Model';
import { ApiEndpoint } from '../Api/ApiUrls';
import { BridgeRequestMethod } from '../Api/Bridge';

type CollectedCodeType = {
    id?: number,
    code_name: string,
    code_points: number,
    question_current: object | null,
    question_answer: string | null,
    question_points: number | null
    score: number,
    data: string,
    collected_at: string
};

export type Question = {
    id: number,
    question: string,
    answer_a: string,
    answer_b: string,
    answer_c: string,
    answer_d: string,
    points: number
};

export default class CollectedCodeModel extends Model {
    endpoint: ApiEndpoint = ApiEndpoint.collectedCodes;

    codeName: string = '';
    codePoints: number = 0;
    questionCurrent: Question | null = null;
    questionAnswer: string | null = null;
    questionPoints: number | null = null;
    score: number = 0;
    data: string = '';
    collectedAt: Date = new Date();

    protected hydrate (data: CollectedCodeType): this {
        this.id = data.id ?? 0;
        this.codeName = data.code_name;
        this.codePoints = data.code_points;
        this.questionCurrent = data.question_current as Question;
        this.questionPoints = data.question_points;
        this.score = data.score;
        this.collectedAt = new Date(data.collected_at);

        return this;
    }

    protected dehydrate (method: BridgeRequestMethod): Object {
        return method === BridgeRequestMethod.POST
            ? {
                data: this.data
            }
            : {
                question_answer: this.questionAnswer
            };
    }
}
