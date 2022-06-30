<?php
declare(strict_types=1);

namespace Database\Seeders;

use App\Models\UserAnsweredQuestion;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserAnsweredQuestionsSeeder extends Seeder
{
    public function run(): void
    {
        DB::table(UserAnsweredQuestion::TABLE_NAME)->insert(
            [
                [
                    UserAnsweredQuestion::ID => 1,
                    UserAnsweredQuestion::USER_ID => 1,
                    UserAnsweredQuestion::QUESTION_ID => 1,
                    UserAnsweredQuestion::CORRECT => true,
                    UserAnsweredQuestion::ANSWER => 3
                ],
            ]
        );
    }
}
