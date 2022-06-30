<?php

declare(strict_types=1);

use App\Models\Code;
use App\Models\User;
use App\Models\UserAnsweredQuestion;
use App\Models\UserCollectedCode;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserCollectedCodesTable extends Migration
{
    public function up(): void
    {
        Schema::create(UserCollectedCode::TABLE_NAME, static function (Blueprint $table) {
            $table->id();
            $table->foreignId(UserCollectedCode::USER_ID)->references(User::ID)->on(User::TABLE_NAME);
            $table->foreignId(UserCollectedCode::CODE_ID)->references(Code::ID)->on(Code::TABLE_NAME);
            $table->foreignId(UserCollectedCode::USER_COLLECTED_QUESTION_ID)->nullable()
                ->references(UserAnsweredQuestion::ID)->on(UserAnsweredQuestion::TABLE_NAME);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(UserCollectedCode::TABLE_NAME);
    }
}
