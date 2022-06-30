<?php
declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Question;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QuestionsSeeder extends Seeder
{
    public function run(): void
    {
        DB::table(Question::TABLE_NAME)->insert(
            [
                [
                    Question::ID => 1,
                    Question::QUESTION => 'What color is red car?',
                    Question::ANSWER_A => 'Brown',
                    Question::ANSWER_B => 'Blue',
                    Question::ANSWER_C => 'Red',
                    Question::ANSWER_D => 'Black',
                    Question::CORRECT_ANSWER => 3,
                    Question::POINTS => 10,
                ],
                [
                    Question::ID => 2,
                    Question::QUESTION => 'What color is blue orange?',
                    Question::ANSWER_A => 'Orange',
                    Question::ANSWER_B => 'Blue',
                    Question::ANSWER_C => 'Red',
                    Question::ANSWER_D => 'Black',
                    Question::CORRECT_ANSWER => 2,
                    Question::POINTS => 15,
                ],
                [
                    Question::ID => 3,
                    Question::QUESTION => 'What color is black lorry?',
                    Question::ANSWER_A => 'Brown',
                    Question::ANSWER_B => 'Blue',
                    Question::ANSWER_C => 'Red',
                    Question::ANSWER_D => 'Black',
                    Question::CORRECT_ANSWER => 4,
                    Question::POINTS => 10,
                ],
                [
                    Question::ID => 4,
                    Question::QUESTION => 'What color is green grass?',
                    Question::ANSWER_A => 'Black',
                    Question::ANSWER_B => 'Black',
                    Question::ANSWER_C => 'Green',
                    Question::ANSWER_D => 'Black',
                    Question::CORRECT_ANSWER => 3,
                    Question::POINTS => 5,
                ],
            ]
        );
    }
}
