<?php
declare(strict_types=1);

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;

/**
 * App\Models\Code
 *
 * @property int $id
 * @property string $name
 * @property string $data
 * @property int $points
 * @property string|null $description
 * @property bool $is_active
 * @property bool $with_question
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @method static Builder|Code newModelQuery()
 * @method static Builder|Code newQuery()
 * @method static Builder|Code query()
 * @method static Builder|Code whereCreatedAt($value)
 * @method static Builder|Code whereData($value)
 * @method static Builder|Code whereDescription($value)
 * @method static Builder|Code whereId($value)
 * @method static Builder|Code whereIsActive($value)
 * @method static Builder|Code whereName($value)
 * @method static Builder|Code wherePoints($value)
 * @method static Builder|Code whereUpdatedAt($value)
 * @method static Builder|Code whereWithQuestion($value)
 * @mixin Eloquent
 */
final class Code extends ApiModel
{
    public const TABLE_NAME = 'codes';

    public const ID = 'id';
    public const NAME = 'name';
    public const DATA = 'data';
    public const POINTS = 'points';
    public const DESCRIPTION = 'description';
    public const IS_ACTIVE = 'is_active';
    public const WITH_QUESTION = 'with_question';

    protected $fillable = [
        self::NAME,
        self::DATA,
        self::POINTS,
        self::DESCRIPTION,
        self::IS_ACTIVE,
        self::WITH_QUESTION
    ];

    protected $casts = [
        self::UPDATED_AT => 'datetime',
        self::CREATED_AT => 'datetime',
        self::IS_ACTIVE => 'bool',
        self::WITH_QUESTION => 'bool',
    ];
}
