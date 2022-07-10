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
 * @property string $answer_right
 * @property string $answer_wrong_x
 * @property string $answer_wrong_y
 * @property string $answer_wrong_z
 * @property int $points
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @method static Builder|Question newModelQuery()
 * @method static Builder|Question newQuery()
 * @method static Builder|Question query()
 * @method static Builder|Question whereAnswerRight($value)
 * @method static Builder|Question whereAnswerWrongX($value)
 * @method static Builder|Question whereAnswerWrongY($value)
 * @method static Builder|Question whereAnswerWrongZ($value)
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
    public const ANSWER_RIGHT = 'answer_right';
    public const ANSWER_WRONG_X = 'answer_wrong_x';
    public const ANSWER_WRONG_Y = 'answer_wrong_y';
    public const ANSWER_WRONG_Z = 'answer_wrong_z';
    public const POINTS = 'points';

    public const ANSWER_QUESTION_A = 'answer_a';
    public const ANSWER_QUESTION_B = 'answer_b';
    public const ANSWER_QUESTION_C = 'answer_c';
    public const ANSWER_QUESTION_D = 'answer_d';

    protected $fillable = [
        self::QUESTION,
        self::ANSWER_RIGHT,
        self::ANSWER_WRONG_X,
        self::ANSWER_WRONG_Y,
        self::ANSWER_WRONG_Z,
        self::POINTS,
    ];

    protected $casts = [
        self::UPDATED_AT => 'datetime',
        self::CREATED_AT => 'datetime'
    ];
}
