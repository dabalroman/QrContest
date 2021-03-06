<?php
declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\UserCollectedCode;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CollectedCodeResource extends JsonResource
{
    /**
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        /** @var UserCollectedCode $collectedCode */
        $collectedCode = $this;

        $questionAnswerPoints = ($collectedCode->question_answer === 0 ? $collectedCode->question->points : 0);

        return [
            UserCollectedCode::ID => $collectedCode->id,
            UserCollectedCode::V_CODE_NAME => $collectedCode->code->name,
            UserCollectedCode::V_CODE_POINTS => $collectedCode->code->points,
            UserCollectedCode::V_QUESTION_CURRENT =>
                isset($collectedCode->question) && $collectedCode->question_answer === null
                    ? new PublicQuestionResource($collectedCode->question, $collectedCode->question_answers_map)
                    : null,
            UserCollectedCode::V_QUESTION_POINTS =>
                isset($collectedCode->question) && $collectedCode->question_answer !== null
                    ? $questionAnswerPoints
                    : null,
            UserCollectedCode::V_QUESTION_CORRECT_ANSWER =>
                isset($collectedCode->question) && $collectedCode->question_answer !== null
                    ? $collectedCode->correct_answer
                    : null,
            UserCollectedCode::V_SCORE => $collectedCode->score,
            UserCollectedCode::V_COLLECTED_AT => $collectedCode->created_at
        ];
    }
}
