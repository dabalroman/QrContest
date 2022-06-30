<?php

declare(strict_types=1);

use App\Models\Question;
use App\Models\User;
use App\Models\UserAnsweredQuestion;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserAnsweredQuestionsTable extends Migration
{
    public function up(): void
    {
        Schema::create(UserAnsweredQuestion::TABLE_NAME, static function (Blueprint $table) {
            $table->id();
            $table->foreignId(UserAnsweredQuestion::USER_ID)->references(User::ID)->on(User::TABLE_NAME);
            $table->foreignId(UserAnsweredQuestion::QUESTION_ID)->references(Question::ID)->on(Question::TABLE_NAME);
            $table->integer(UserAnsweredQuestion::ANSWER);
            $table->boolean(UserAnsweredQuestion::CORRECT);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(UserAnsweredQuestion::TABLE_NAME);
    }
}
