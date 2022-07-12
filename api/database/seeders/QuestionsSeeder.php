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
                    Question::ANSWER_RIGHT => 'Red',
                    Question::ANSWER_WRONG_X => 'Brown',
                    Question::ANSWER_WRONG_Y => 'Blue',
                    Question::ANSWER_WRONG_Z => 'Black',
                    Question::POINTS => 1,
                ],
                [
                    Question::ID => 2,
                    Question::QUESTION => 'What color is blue orange?',
                    Question::ANSWER_RIGHT => 'Blue',
                    Question::ANSWER_WRONG_X => 'Orange',
                    Question::ANSWER_WRONG_Y => 'Black',
                    Question::ANSWER_WRONG_Z => 'Red',
                    Question::POINTS => 2,
                ],
                [
                    Question::ID => 3,
                    Question::QUESTION => 'What color is black lorry?',
                    Question::ANSWER_RIGHT => 'Black',
                    Question::ANSWER_WRONG_X => 'Brown',
                    Question::ANSWER_WRONG_Y => 'Blue',
                    Question::ANSWER_WRONG_Z => 'Red',
                    Question::POINTS => 3,
                ],
                [
                    Question::ID => 4,
                    Question::QUESTION => 'What color is green grass?',
                    Question::ANSWER_RIGHT => 'Green',
                    Question::ANSWER_WRONG_X => 'Black',
                    Question::ANSWER_WRONG_Y => 'Blue',
                    Question::ANSWER_WRONG_Z => 'Dark',
                    Question::POINTS => 4,
                ],
            ]
        );
    }
}
