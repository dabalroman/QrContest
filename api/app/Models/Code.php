<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticable;

final class Code extends Authenticable
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
        self::CREATED_AT => 'datetime'
    ];
}
