<?php

declare(strict_types=1);

use App\Models\Code;
use App\Models\Question;
use App\Models\User;
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
            $table->foreignId(UserCollectedCode::QUESTION_ID)->nullable()->default(null)
                ->references(Question::ID)->on(Question::TABLE_NAME);
            $table->integer(UserCollectedCode::QUESTION_ANSWER)->nullable()->default(null)
                ->comment('0 - correct, 1 - wrong_x, 2 - wrong_y, 3 - wrong_z');
            $table->string(UserCollectedCode::QUESTION_ANSWERS_MAP)->nullable()->default(null)
                ->comment('Maps randomized answers order to 0123 c-wx-wy-wz format');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(UserCollectedCode::TABLE_NAME);
    }
}
