<?php
declare(strict_types=1);

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * App\Models\UserType
 *
 * @property int $id
 * @property string $type
 * @method static Builder|UserType newModelQuery()
 * @method static Builder|UserType newQuery()
 * @method static Builder|UserType query()
 * @method static Builder|UserType whereId($value)
 * @method static Builder|UserType whereType($value)
 * @mixin Eloquent
 */
final class UserType extends ApiModel
{
    use HasFactory;

    public const TABLE_NAME = 'user_types';

    public const TYPE = 'type';

    public const TYPE_ADMIN = 1;
    public const TYPE_TEACHER = 2;
    public const TYPE_STUDENT = 3;

    public $timestamps = false;

    protected $fillable = [
        self::TYPE
    ];
}
