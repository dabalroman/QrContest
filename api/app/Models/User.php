<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

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

    protected $fillable = [
        self::NAME,
        self::PASSWORD,
        self::SCORE,
        self::IS_ADMIN
    ];

    protected $hidden = [
        self::PASSWORD,
    ];

    protected $casts = [
        self::UPDATED_AT => 'datetime',
        self::CREATED_AT => 'datetime'
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
