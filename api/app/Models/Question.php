<?php
declare(strict_types=1);

namespace App\Models;

final class Question extends ApiModel
{
    public const TABLE_NAME = 'questions';

    public const ID = 'id';
    public const QUESTION = 'question';
    public const ANSWER_A = 'answer_a';
    public const ANSWER_B = 'answer_b';
    public const ANSWER_C = 'answer_c';
    public const ANSWER_D = 'answer_d';
    public const CORRECT_ANSWER = 'correct_answer';
    public const POINTS = 'points';

    protected $fillable = [
        self::QUESTION,
        self::ANSWER_A,
        self::ANSWER_B,
        self::ANSWER_C,
        self::ANSWER_D,
        self::CORRECT_ANSWER,
        self::POINTS,
    ];

    protected $casts = [
        self::UPDATED_AT => 'datetime',
        self::CREATED_AT => 'datetime'
    ];
}
