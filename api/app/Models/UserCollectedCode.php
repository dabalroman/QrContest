<?php
declare(strict_types=1);

namespace App\Models;

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
