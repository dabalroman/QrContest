<?php
declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    public function run(): void
    {
        DB::table(User::TABLE_NAME)->insert(
            [
                [
                    User::ID => 1,
                    User::NAME => 'admin',
                    User::PASSWORD => Hash::make('qwerty123'),
                    User::SCORE => 0,
                    User::BRACELET_ID => '4B795D',
                    User::IS_PUBLIC => true,
                    User::IS_SUSPENDED => false,
                    User::IS_ADMIN => true
                ],
                [
                    User::ID => 2,
                    User::NAME => 'Alice',
                    User::PASSWORD => Hash::make('qwerty123'),
                    User::SCORE => 0,
                    User::BRACELET_ID => 'ASD2W234',
                    User::IS_PUBLIC => true,
                    User::IS_SUSPENDED => true,
                    User::IS_ADMIN => false
                ]
            ]
        );
    }
}
