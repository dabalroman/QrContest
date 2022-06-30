<?php
declare(strict_types=1);

namespace App\Models;

final class UserAnsweredQuestion extends ApiModel
{
    public const TABLE_NAME = 'user_answered_questions';

    public const ID = 'id';
    public const USER_ID = 'user_id';
    public const QUESTION_ID = 'question_id';
    public const ANSWER = 'answer';
    public const CORRECT = 'correct';

    protected $fillable = [
        self::USER_ID,
        self::QUESTION_ID,
        self::ANSWER,
        self::CORRECT
    ];

    protected $casts = [
        self::UPDATED_AT => 'datetime',
        self::CREATED_AT => 'datetime'
    ];
}
