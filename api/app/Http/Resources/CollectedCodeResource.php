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
            UserCollectedCode::CODE => new PublicCodeResource($collectedCode->code),
            UserCollectedCode::ANSWERED_QUESTION => new AnsweredQuestionResource($collectedCode->answeredQuestion),
            UserCollectedCode::SCORE => $collectedCode->score,
            UserCollectedCode::COLLECTED_AT => $collectedCode->created_at
        ];
    }
}
