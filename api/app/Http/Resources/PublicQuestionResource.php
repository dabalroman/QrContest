<?php
declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicQuestionResource extends JsonResource
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
            Question::ANSWER_A => $question->answer_a,
            Question::ANSWER_B => $question->answer_b,
            Question::ANSWER_C => $question->answer_c,
            Question::ANSWER_D => $question->answer_d,
            Question::POINTS => $question->points,
        ];
    }
}
