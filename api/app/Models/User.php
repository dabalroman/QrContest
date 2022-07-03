<?php
declare(strict_types=1);

namespace App\Models;

use Database\Factories\UserFactory;
use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
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
 */
final class User extends Authenticable
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;

    public const TABLE_NAME = 'users';

    public const ID = 'id';
    public const NAME = 'name';
    public const PASSWORD = 'password';
    public const SCORE = 'score';
    public const IS_ADMIN = 'is_admin';

    public const NEW_PASSWORD = 'new_password';

    protected $fillable = [
        self::NAME,
        self::PASSWORD,
        self::SCORE
    ];

    protected $hidden = [
        self::PASSWORD,
    ];

    protected $casts = [
        self::UPDATED_AT => 'datetime',
        self::CREATED_AT => 'datetime',
        self::IS_ADMIN => 'bool'
    ];

//    public function parent(): HasOne
//    {
//        return $this->hasOne(__CLASS__, self::ID, self::PARENT_ID);
//    }
//
//    public function students(): HasMany
//    {
//        return $this->hasMany(__CLASS__, self::PARENT_ID, self::ID);
//    }
//
//    public function avatar(): HasOne
//    {
//        return $this->hasOne(UserAvatar::class, UserAvatar::USER_ID, self::ID);
//    }

    public function isAdmin(): bool
    {
        return $this->is_admin;
    }
}
