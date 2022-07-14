<?php
declare(strict_types=1);

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Carbon;

/**
 * App\Models\UserCollectedCode
 *
 * @property int $id
 * @property int $user_id
 * @property int $code_id
 * @property int|null $question_id
 * @property int|null $question_answer 0 - correct, 1 - wrong_x, 2 - wrong_y, 3 - wrong_z
 * @property string|null $question_answers_map Maps randomized answers order to 0123 c-wx-wy-wz format
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Code|null $code
 * @property-read int $score
 * @property-read Question|null $question
 * @method static Builder|UserCollectedCode newModelQuery()
 * @method static Builder|UserCollectedCode newQuery()
 * @method static Builder|UserCollectedCode query()
 * @method static Builder|UserCollectedCode whereCodeId($value)
 * @method static Builder|UserCollectedCode whereCreatedAt($value)
 * @method static Builder|UserCollectedCode whereId($value)
 * @method static Builder|UserCollectedCode whereQuestionAnswer($value)
 * @method static Builder|UserCollectedCode whereQuestionAnswersMap($value)
 * @method static Builder|UserCollectedCode whereQuestionId($value)
 * @method static Builder|UserCollectedCode whereUpdatedAt($value)
 * @method static Builder|UserCollectedCode whereUserId($value)
 * @mixin Eloquent
 * @property-read string|null $correct_answer
 */
final class UserCollectedCode extends ApiModel
{
    public const TABLE_NAME = 'user_collected_codes';

    public const ID = 'id';
    public const USER_ID = 'user_id';
    public const CODE_ID = 'code_id';
    public const QUESTION_ID = 'question_id';
    public const QUESTION_ANSWER = 'question_answer';
    public const QUESTION_ANSWERS_MAP = 'question_answers_map';

    public const V_COLLECTED_AT = 'collected_at';
    public const V_SCORE = 'score';
    public const V_CODE_NAME = 'code_name';
    public const V_CODE_POINTS = 'code_points';
    public const V_QUESTION_POINTS = 'question_points';
    public const V_QUESTION_CURRENT = 'question_current';
    public const V_QUESTION_CORRECT_ANSWER = 'question_correct_answer';

    protected $fillable = [
        self::USER_ID,
        self::CODE_ID,
        self::QUESTION_ID
    ];

    protected $casts = [
        self::UPDATED_AT => 'datetime',
        self::CREATED_AT => 'datetime'
    ];

    public function getScoreAttribute(): int
    {
        return $this->code->points
            + (($this->question_id !== null && $this->question_answer === 0) ? $this->question->points : 0);
    }

    public function getCorrectAnswerAttribute(): ?string
    {
        if (isset($this->question_answers_map)) {
            return str_split($this->question_answers_map)[0];
        }

        return null;
    }

    public function code(): HasOne
    {
        return $this->hasOne(Code::class, Code::ID, self::CODE_ID);
    }

    public function question(): HasOne
    {
        return $this->hasOne(Question::class, Question::ID, self::QUESTION_ID);
    }

    /**
     * @param string[] $answers
     * @return string[]
     */
    public static function orderQuestionsArrayAccordingToAnswersMap(array $answers, string $answersMap): array
    {
        $orderedQuestions = [];

        for ($i = 0, $iMax = strlen($answersMap); $i < $iMax; $i++) {
            $orderedQuestions[] = $answers[stripos($answersMap, chr(ord('a') + $i))];
        }

        return $orderedQuestions;
    }

    public static function getAnswerIdFromMappedAnswerId(string $answerId, string $answersMap): int
    {
        if ($answerId === 'x') {
            return -1;
        }

        return stripos($answersMap, $answerId);
    }

    public function prepareQuestion(): void
    {
        if ($this->question_answer !== null) {
            return;
        }

        $question = $this->getRandomNotYetAnsweredQuestion();

        if ($question === null) {
            return;
        }

        $this->question_id = $question->id;
        $this->question_answers_map = $this->getRandomizedAnswersOrder();
    }

    private function getRandomizedAnswersOrder(): string
    {
        $map = ['a', 'b', 'c', 'd'];
        shuffle($map);

        return implode('', $map);
    }

    private function getRandomNotYetAnsweredQuestion(): ?Question
    {
        /** @noinspection PhpIncompatibleReturnTypeInspection */
        return Question::whereNotIn(Question::ID, function (Builder $query) {
            $query->select(self::QUESTION_ID)
                ->from(self::TABLE_NAME)
                ->where(self::USER_ID, '=', $this->user_id)
                ->whereNotNull(self::QUESTION_ID);
        })->inRandomOrder()->first();
    }
}
