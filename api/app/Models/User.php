<?php
declare(strict_types=1);

namespace App\Models;

use Database\Factories\UserFactory;
use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticable;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Notifications\DatabaseNotificationCollection;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Sanctum\PersonalAccessToken;

/**
 * App\Models\User
 *
 * @property int $id
 * @property string $name
 * @property string $password
 * @property int $score
 * @property bool $is_admin
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read DatabaseNotificationCollection|DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read Collection|PersonalAccessToken[] $tokens
 * @property-read int|null $tokens_count
 * @method static UserFactory factory(...$parameters)
 * @method static Builder|User newModelQuery()
 * @method static Builder|User newQuery()
 * @method static Builder|User query()
 * @method static Builder|User whereCreatedAt($value)
 * @method static Builder|User whereId($value)
 * @method static Builder|User whereIsAdmin($value)
 * @method static Builder|User whereName($value)
 * @method static Builder|User wherePassword($value)
 * @method static Builder|User whereRememberToken($value)
 * @method static Builder|User whereScore($value)
 * @method static Builder|User whereUpdatedAt($value)
 * @mixin Eloquent
 * @property-read Collection|UserCollectedCode[] $collectedCodes
 * @property-read int|null $collected_codes_count
 * @property string|null $bracelet_id
 * @property bool $is_public
 * @property bool $is_suspended
 * @method static Builder|User whereBraceletId($value)
 * @method static Builder|User whereIsPublic($value)
 * @method static Builder|User whereIsSuspended($value)
 */
final class User extends Authenticable
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;

    public const TABLE_NAME = 'users';

    public const ID = 'id';
    public const NAME = 'name';
    public const BRACELET_ID = 'bracelet_id';
    public const PASSWORD = 'password';
    public const SCORE = 'score';
    public const IS_PUBLIC = 'is_public';
    public const IS_SUSPENDED = 'is_suspended';
    public const IS_ADMIN = 'is_admin';

    public const NEW_PASSWORD = 'new_password';
    public const PASSWORD_CONFIRM = 'password_confirm';

    protected $fillable = [
        self::NAME,
        self::PASSWORD,
        self::BRACELET_ID,
        self::IS_PUBLIC,
        self::IS_SUSPENDED
    ];

    protected $hidden = [
        self::PASSWORD,
    ];

    protected $casts = [
        self::UPDATED_AT => 'datetime',
        self::CREATED_AT => 'datetime',
        self::IS_PUBLIC => 'bool',
        self::IS_SUSPENDED => 'bool',
        self::IS_ADMIN => 'bool'
    ];

    public function collectedCodes(): HasMany
    {
        return $this->hasMany(UserCollectedCode::class, UserCollectedCode::USER_ID, self::ID);
    }

    public function updateScore(): void
    {
        $this->score =
            $this->collectedCodes->sum(static fn(UserCollectedCode $userCollectedCode) => $userCollectedCode->score);
    }

    public function isAdmin(): bool
    {
        return $this->is_admin;
    }

    public function isActive(): bool
    {
        return !$this->is_suspended;
    }
}
