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

        return [
            UserCollectedCode::ID => $collectedCode->id,
            UserCollectedCode::V_CODE_NAME => $collectedCode->code->name,
            UserCollectedCode::V_CODE_POINTS => $collectedCode->code->points,
            UserCollectedCode::V_QUESTION_CURRENT =>
                isset($collectedCode->question) && $collectedCode->question_answer === null
                    ? new PublicQuestionResource($collectedCode->question, $collectedCode->question_answers_map)
                    : null,
            UserCollectedCode::V_QUESTION_POINTS =>
                isset($collectedCode->question) ? $collectedCode->question->points : null,
            UserCollectedCode::V_SCORE => $collectedCode->score,
            UserCollectedCode::V_COLLECTED_AT => $collectedCode->created_at
        ];
    }
}
