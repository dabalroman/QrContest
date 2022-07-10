<?php
declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuestionResource extends JsonResource
{
    /**
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        /** @var Question $question */
        $question = $this;

        return [
            Question::ID => $question->id,
            Question::QUESTION => $question->question,
            Question::ANSWER_RIGHT => $question->answer_right,
            Question::ANSWER_WRONG_X => $question->answer_wrong_x,
            Question::ANSWER_WRONG_Y => $question->answer_wrong_y,
            Question::ANSWER_WRONG_Z => $question->answer_wrong_z,
            Question::POINTS => $question->points,
            Question::CREATED_AT => $question->created_at,
            Question::UPDATED_AT => $question->updated_at
        ];
    }
}
