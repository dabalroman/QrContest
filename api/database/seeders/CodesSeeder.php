<?php
declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Code;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CodesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table(Code::TABLE_NAME)->insert(
            [
                [
                    Code::ID => 1,
                    Code::NAME => 'The first one',
                    Code::DATA => 'CODE_01',
                    Code::POINTS => 10,
                    Code::DESCRIPTION => 'First code in the app!',
                    Code::IS_ACTIVE => true,
                    Code::WITH_QUESTION => true
                ],
                [
                    Code::ID => 2,
                    Code::NAME => 'Plain sight',
                    Code::DATA => 'CODE_SIGHT',
                    Code::POINTS => 20,
                    Code::DESCRIPTION => 'Easy one, right?',
                    Code::IS_ACTIVE => true,
                    Code::WITH_QUESTION => false
                ],
                [
                    Code::ID => 3,
                    Code::NAME => 'Hidden one',
                    Code::DATA => 'Eg894jD94F',
                    Code::POINTS => 30,
                    Code::DESCRIPTION => 'Nice one!',
                    Code::IS_ACTIVE => true,
                    Code::WITH_QUESTION => true
                ],
                [
                    Code::ID => 4,
                    Code::NAME => 'Deactivated',
                    Code::DATA => 'AFojf0AEGG',
                    Code::POINTS => 40,
                    Code::DESCRIPTION => 'Sorry!',
                    Code::IS_ACTIVE => false,
                    Code::WITH_QUESTION => false
                ]
            ]
        );
    }
}
