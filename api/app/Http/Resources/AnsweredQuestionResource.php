<?php
declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\UserAnsweredQuestion;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnsweredQuestionResource extends JsonResource
{
    /**
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        /** @var UserAnsweredQuestion $answeredQuestion */
        $answeredQuestion = $this;

        return [
            UserAnsweredQuestion::ID => $answeredQuestion->id,
            UserAnsweredQuestion::IS_CORRECT => $answeredQuestion->is_correct,
        ];
    }
}
