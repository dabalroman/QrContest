<?php
declare(strict_types=1);

namespace App\Models;

use Database\Factories\UserFactory;
use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
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
 * @property int $user_type_id
 * @property int|null $parent_id
 * @property string $name
 * @property string|null $email
 * @property string|null $password
 * @property string|null $pattern JSON
 * @property int $level
 * @property int $experience
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read UserAvatar|null $avatar
 * @property-read int $experience_to_next_level
 * @property-read DatabaseNotificationCollection|DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read Collection|User[] $students
 * @property-read int|null $students_count
 * @property-read Collection|PersonalAccessToken[] $tokens
 * @property-read int|null $tokens_count
 * @method static UserFactory factory(...$parameters)
 * @method static Builder|User newModelQuery()
 * @method static Builder|User newQuery()
 * @method static Builder|User query()
 * @method static Builder|User whereCreatedAt($value)
 * @method static Builder|User whereEmail($value)
 * @method static Builder|User whereExperience($value)
 * @method static Builder|User whereId($value)
 * @method static Builder|User whereLevel($value)
 * @method static Builder|User whereName($value)
 * @method static Builder|User whereParentId($value)
 * @method static Builder|User wherePassword($value)
 * @method static Builder|User wherePattern($value)
 * @method static Builder|User whereRememberToken($value)
 * @method static Builder|User whereUpdatedAt($value)
 * @method static Builder|User whereUserTypeId($value)
 * @mixin Eloquent
 * @property-read bool $is_pattern_set
 * @property-read User|null $parent
 */
final class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;

    public const TABLE_NAME = 'users';

    public const ID = 'id';
    public const USER_TYPE_ID = 'user_type_id';
    public const PARENT_ID = 'parent_id';
    public const NAME = 'name';
    public const EMAIL = 'email';
    public const PASSWORD = 'password';
    public const NEW_PASSWORD = 'new_password';
    public const PATTERN = 'pattern';
    public const NEW_PATTERN = 'new_pattern';
    public const LEVEL = 'level';
    public const EXPERIENCE = 'experience';
    public const EXPERIENCE_TO_NEXT_LEVEL = 'experience_to_next_level';
    public const IS_PATTERN_SET = 'is_pattern_set';
    public const REMEMBER_TOKEN = 'remember_token';
    public const STUDENTS = 'students';
    public const AVATAR = 'avatar';

    protected $fillable = [
        self::USER_TYPE_ID,
        self::PARENT_ID,
        self::NAME,
        self::EMAIL,
        self::PASSWORD,
        self::PATTERN
    ];

    protected $hidden = [
        self::PASSWORD,
        self::PATTERN,
        self::REMEMBER_TOKEN
    ];

    protected $casts = [
        self::UPDATED_AT => 'datetime',
        self::CREATED_AT => 'datetime'
    ];

    public function parent(): HasOne
    {
        return $this->hasOne(__CLASS__, self::ID, self::PARENT_ID);
    }

    public function students(): HasMany
    {
        return $this->hasMany(__CLASS__, self::PARENT_ID, self::ID);
    }

    public function avatar(): HasOne
    {
        return $this->hasOne(UserAvatar::class, UserAvatar::USER_ID, self::ID);
    }

    public function getIsPatternSetAttribute(): bool
    {
        return isset($this->pattern);
    }

    public function getExperienceToNextLevelAttribute(): int
    {
        return self::getExperienceByLevel($this->level + 1) - $this->experience;
    }

    public static function getExperienceByLevel(int $level): int
    {
        if ($level <= 1) {
            return 0;
        }

        if ($level === 2) {
            return 1000;
        }

        $kExperience = (int)ceil(($level - 1) ** (1 / 0.8) - 1);
        return $kExperience * 1000;
    }

    public static function getLevelByExperience(int $experience): int
    {
        $kExperience = floor($experience / 1000);
        return (int)ceil(($kExperience + 1) ** 0.8);
    }

    public function updateExperience(): void
    {
        $this->experience =
            (int)ExerciseResult::where(ExerciseResult::USER_ID, $this->id)->sum(ExerciseResult::EXPERIENCE);
        $this->level = self::getLevelByExperience($this->experience);
    }

    public function isParentOfUser(User $user): bool
    {
        return (
            $this->id !== $user->id
            && !$this->isStudent()
            && $this->students->contains($user)
        );
    }

    public function isStudent(): bool
    {
        return $this->user_type_id === UserType::TYPE_STUDENT;
    }

    public function isTeacher(): bool
    {
        return $this->user_type_id === UserType::TYPE_TEACHER;
    }

    public function isAdmin(): bool
    {
        return $this->user_type_id === UserType::TYPE_ADMIN;
    }

    public function isPrivilegesLevelHigherOrEqualTo(int $requiredUserTypeId): bool
    {
        if ($requiredUserTypeId === UserType::TYPE_STUDENT) {
            return true;
        }

        if ($requiredUserTypeId === UserType::TYPE_TEACHER && ($this->isTeacher() || $this->isAdmin())) {
            return true;
        }

        if ($requiredUserTypeId === UserType::TYPE_ADMIN && $this->isAdmin()) {
            return true;
        }

        return false;
    }
}
