<?php
declare(strict_types=1);

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;

/**
 * App\Models\UserCollectedCode
 *
 * @property int $id
 * @property int $user_id
 * @property int $code_id
 * @property int|null $question_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @method static Builder|UserCollectedCode newModelQuery()
 * @method static Builder|UserCollectedCode newQuery()
 * @method static Builder|UserCollectedCode query()
 * @method static Builder|UserCollectedCode whereCodeId($value)
 * @method static Builder|UserCollectedCode whereCreatedAt($value)
 * @method static Builder|UserCollectedCode whereId($value)
 * @method static Builder|UserCollectedCode whereQuestionId($value)
 * @method static Builder|UserCollectedCode whereUpdatedAt($value)
 * @method static Builder|UserCollectedCode whereUserId($value)
 * @mixin Eloquent
 */
final class UserCollectedCode extends ApiModel
{
    public const TABLE_NAME = 'user_collected_codes';

    public const ID = 'id';
    public const USER_ID = 'user_id';
    public const CODE_ID = 'code_id';
    public const USER_COLLECTED_QUESTION_ID = 'question_id';

    protected $fillable = [
        self::USER_ID,
        self::CODE_ID,
        self::USER_COLLECTED_QUESTION_ID
    ];

    protected $casts = [
        self::UPDATED_AT => 'datetime',
        self::CREATED_AT => 'datetime'
    ];
}
