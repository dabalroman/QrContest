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
                    UserCollectedCode::USER_COLLECTED_QUESTION_ID => 1,
                ],
                [
                    UserCollectedCode::ID => 2,
                    UserCollectedCode::USER_ID => 1,
                    UserCollectedCode::CODE_ID => 2,
                    UserCollectedCode::USER_COLLECTED_QUESTION_ID => null,
                ],
                [
                    UserCollectedCode::ID => 3,
                    UserCollectedCode::USER_ID => 1,
                    UserCollectedCode::CODE_ID => 3,
                    UserCollectedCode::USER_COLLECTED_QUESTION_ID => null,
                ]
            ]
        );
    }
}
