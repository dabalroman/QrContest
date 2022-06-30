<?php
declare(strict_types=1);

namespace App\Models;

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
