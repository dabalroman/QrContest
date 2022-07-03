<?php
declare(strict_types=1);

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;

/**
 * App\Models\Setting
 *
 * @property int $id
 * @property string $name
 * @property string $value
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @method static Builder|Setting newModelQuery()
 * @method static Builder|Setting newQuery()
 * @method static Builder|Setting query()
 * @method static Builder|Setting whereCreatedAt($value)
 * @method static Builder|Setting whereId($value)
 * @method static Builder|Setting whereName($value)
 * @method static Builder|Setting whereUpdatedAt($value)
 * @method static Builder|Setting whereValue($value)
 * @mixin Eloquent
 */
final class Setting extends ApiModel
{
    public const TABLE_NAME = 'settings';

    public const ID = 'id';
    public const NAME = 'name';
    public const VALUE = 'value';

    protected $fillable = [
        self::VALUE
    ];

    protected $casts = [
        self::UPDATED_AT => 'datetime',
        self::CREATED_AT => 'datetime'
    ];
}
