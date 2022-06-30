<?php

declare(strict_types=1);

use App\Models\UserType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserTypesTable extends Migration
{
    public function up(): void
    {
        Schema::create(UserType::TABLE_NAME, static function (Blueprint $table) {
            $table->id();
            $table->string(UserType::TYPE);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(UserType::TABLE_NAME);
    }
}
