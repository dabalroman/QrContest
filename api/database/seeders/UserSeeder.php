<?php
declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table(User::TABLE_NAME)->insert(
            [
                User::ID => 1,
                User::USER_TYPE_ID => 2,
                User::NAME => 'admin',
                User::EMAIL => 'gajo2@poczta.onet.pl',
                User::PATTERN => Hash::make('1111'),
                User::PASSWORD => Hash::make('viewly_sosw'),
                User::EXPERIENCE => 0,
                User::LEVEL => 1
            ]
        );

        DB::table(User::TABLE_NAME)->insert(
            [
                User::ID => 2,
                User::PARENT_ID => 1,
                User::USER_TYPE_ID => 3,
                User::NAME => 'Emily',
                User::EXPERIENCE => 0,
                User::LEVEL => 1
            ]
        );

        DB::table(User::TABLE_NAME)->insert(
            [
                User::ID => 3,
                User::PARENT_ID => 1,
                User::USER_TYPE_ID => 3,
                User::NAME => 'Daniel',
                User::EXPERIENCE => 0,
                User::LEVEL => 1
            ]
        );
    }
}
