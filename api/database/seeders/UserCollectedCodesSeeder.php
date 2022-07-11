<?php
declare(strict_types=1);

namespace Database\Seeders;

use App\Models\UserCollectedCode;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserCollectedCodesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table(UserCollectedCode::TABLE_NAME)->insert(
            [
                [
                    UserCollectedCode::ID => 1,
                    UserCollectedCode::USER_ID => 1,
                    UserCollectedCode::CODE_ID => 1,
                    UserCollectedCode::QUESTION_ID => 1,
                    UserCollectedCode::QUESTION_ANSWER => 0,
                    UserCollectedCode::QUESTION_ANSWERS_MAP => 'CBAD'
                ],
                [
                    UserCollectedCode::ID => 2,
                    UserCollectedCode::USER_ID => 1,
                    UserCollectedCode::CODE_ID => 2,
                    UserCollectedCode::QUESTION_ID => null,
                    UserCollectedCode::QUESTION_ANSWER => null,
                    UserCollectedCode::QUESTION_ANSWERS_MAP => null
                ],
                [
                    UserCollectedCode::ID => 4,
                    UserCollectedCode::USER_ID => 2,
                    UserCollectedCode::CODE_ID => 3,
                    UserCollectedCode::QUESTION_ID => 2,
                    UserCollectedCode::QUESTION_ANSWER => 1,
                    UserCollectedCode::QUESTION_ANSWERS_MAP => 'BCDA'
                ],
                [
                    UserCollectedCode::ID => 5,
                    UserCollectedCode::USER_ID => 2,
                    UserCollectedCode::CODE_ID => 1,
                    UserCollectedCode::QUESTION_ID => 2,
                    UserCollectedCode::QUESTION_ANSWER => 0,
                    UserCollectedCode::QUESTION_ANSWERS_MAP => 'ADCB'
                ]
            ]
        );
    }
}
