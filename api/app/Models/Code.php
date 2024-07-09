<?php
declare(strict_types=1);

namespace App\Models;

use Eloquent;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
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
 * @property-read Collection|UserCollectedCode[] $collects
 * @property-read int|null $collects_count
 * @property-read string $collectUrl
 * @property-read string $collect_url
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
    public const V_COLLECTED_BY = 'collected_by';


    public const CHARSET = 'ABCDEFGHJKLMNPQRSTUWVXYZ123456789';

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

    public static function generateRandomData(int $length = 10): string
    {
        $output = '';

        try {
            for ($i = 0; $i < $length; $i++) {
                $output .= self::CHARSET[random_int(0, strlen(self::CHARSET) - 1)];
            }
        } catch (Exception $e) {
            $output = 'ERROR';
        }

        return $output;
    }

    public function collects(): HasMany
    {
        return $this->hasMany(UserCollectedCode::class, UserCollectedCode::CODE_ID, self::ID)
            ->orderByDesc(UserCollectedCode::ID);
    }

    public function getCollectUrlAttribute(): string
    {
        return sprintf(env('CODE_COLLECT_URL'), $this->data);
    }
}
