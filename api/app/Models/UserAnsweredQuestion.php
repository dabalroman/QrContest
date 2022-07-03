<?php
declare(strict_types=1);

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;

/**
 * App\Models\UserAnsweredQuestion
 *
 * @property int $id
 * @property int $user_id
 * @property int $question_id
 * @property int $answer
 * @property bool $is_correct
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @method static Builder|UserAnsweredQuestion newModelQuery()
 * @method static Builder|UserAnsweredQuestion newQuery()
 * @method static Builder|UserAnsweredQuestion query()
 * @method static Builder|UserAnsweredQuestion whereAnswer($value)
 * @method static Builder|UserAnsweredQuestion whereCreatedAt($value)
 * @method static Builder|UserAnsweredQuestion whereId($value)
 * @method static Builder|UserAnsweredQuestion whereIsCorrect($value)
 * @method static Builder|UserAnsweredQuestion whereQuestionId($value)
 * @method static Builder|UserAnsweredQuestion whereUpdatedAt($value)
 * @method static Builder|UserAnsweredQuestion whereUserId($value)
 * @mixin Eloquent
 */
final class UserAnsweredQuestion extends ApiModel
{
    public const TABLE_NAME = 'user_answered_questions';

    public const ID = 'id';
    public const USER_ID = 'user_id';
    public const QUESTION_ID = 'question_id';
    public const ANSWER = 'answer';
    public const IS_CORRECT = 'is_correct';

    protected $fillable = [
        self::USER_ID,
        self::QUESTION_ID,
        self::ANSWER,
        self::IS_CORRECT
    ];

    protected $casts = [
        self::UPDATED_AT => 'datetime',
        self::CREATED_AT => 'datetime',
        self::IS_CORRECT => 'bool'
    ];
}
