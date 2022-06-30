<?php

declare(strict_types=1);

use App\Models\User;
use App\Models\UserType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up(): void
    {
        Schema::create(User::TABLE_NAME, static function (Blueprint $table) {
            $table->id();
            $table->foreignId(User::USER_TYPE_ID)->references(UserType::ID)->on(UserType::TABLE_NAME);
            $table->foreignId(User::PARENT_ID)->nullable()->references(User::ID)->on(User::TABLE_NAME);
            $table->string(User::NAME);
            $table->string(User::EMAIL)->nullable()->unique();
            $table->string(User::PASSWORD)->nullable();
            $table->string(User::PATTERN)->nullable();
            $table->integer(User::LEVEL)->default(1);
            $table->integer(User::EXPERIENCE)->default(0);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(User::TABLE_NAME);
    }
}
