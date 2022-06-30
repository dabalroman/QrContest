<?php

declare(strict_types=1);

use App\Models\Question;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionsTable extends Migration
{
    public function up(): void
    {
        Schema::create(Question::TABLE_NAME, static function (Blueprint $table) {
            $table->id();
            $table->string(Question::QUESTION);
            $table->string(Question::ANSWER_A);
            $table->string(Question::ANSWER_B);
            $table->string(Question::ANSWER_C);
            $table->string(Question::ANSWER_D);
            $table->integer(Question::CORRECT_ANSWER);
            $table->integer(Question::POINTS);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(Question::TABLE_NAME);
    }
}
