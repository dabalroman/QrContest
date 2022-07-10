<?php
declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Question;
use App\Models\UserCollectedCode;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicQuestionResource extends JsonResource
{
    private string $answersMap;

    public function __construct(Question $resource, string $answersMap)
    {
        $this->answersMap = $answersMap;

        parent::__construct($resource);
    }

    /**
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        /** @var Question $question */
        $question = $this;

        $orderedAnswers = UserCollectedCode::orderQuestionsArrayAccordingToAnswersMap(
            [$question->answer_right, $question->answer_wrong_x, $question->answer_wrong_y, $question->answer_wrong_z],
            $this->answersMap
        );

        return [
            Question::ID => $question->id,
            Question::QUESTION => $question->question,
            Question::ANSWER_QUESTION_A => $orderedAnswers[0],
            Question::ANSWER_QUESTION_B => $orderedAnswers[1],
            Question::ANSWER_QUESTION_C => $orderedAnswers[2],
            Question::ANSWER_QUESTION_D => $orderedAnswers[3],
            Question::POINTS => $question->points,
        ];
    }
}
