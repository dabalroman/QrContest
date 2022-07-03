<?php
declare(strict_types=1);

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;

/**
 * App\Models\Question
 *
 * @property int $id
 * @property string $question
 * @property string $answer_a
 * @property string $answer_b
 * @property string $answer_c
 * @property string $answer_d
 * @property int $correct_answer
 * @property int $points
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @method static Builder|Question newModelQuery()
 * @method static Builder|Question newQuery()
 * @method static Builder|Question query()
 * @method static Builder|Question whereAnswerA($value)
 * @method static Builder|Question whereAnswerB($value)
 * @method static Builder|Question whereAnswerC($value)
 * @method static Builder|Question whereAnswerD($value)
 * @method static Builder|Question whereCorrectAnswer($value)
 * @method static Builder|Question whereCreatedAt($value)
 * @method static Builder|Question whereId($value)
 * @method static Builder|Question wherePoints($value)
 * @method static Builder|Question whereQuestion($value)
 * @method static Builder|Question whereUpdatedAt($value)
 * @mixin Eloquent
 */
final class Question extends ApiModel
{
    public const TABLE_NAME = 'questions';

    public const ID = 'id';
    public const QUESTION = 'question';
    public const ANSWER_A = 'answer_a';
    public const ANSWER_B = 'answer_b';
    public const ANSWER_C = 'answer_c';
    public const ANSWER_D = 'answer_d';
    public const CORRECT_ANSWER = 'correct_answer';
    public const POINTS = 'points';

    protected $fillable = [
        self::QUESTION,
        self::ANSWER_A,
        self::ANSWER_B,
        self::ANSWER_C,
        self::ANSWER_D,
        self::CORRECT_ANSWER,
        self::POINTS,
    ];

    protected $casts = [
        self::UPDATED_AT => 'datetime',
        self::CREATED_AT => 'datetime'
    ];
}
