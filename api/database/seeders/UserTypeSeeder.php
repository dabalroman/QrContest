<?php
declare(strict_types=1);

namespace Database\Seeders;

use App\Models\UserType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserTypeSeeder extends Seeder
{
    public function run(): void
    {
        DB::table(UserType::TABLE_NAME)->insert([
            [UserType::ID => 1, UserType::TYPE => 'admin'],
            [UserType::ID => 2, UserType::TYPE => 'teacher'],
            [UserType::ID => 3, UserType::TYPE => 'student']
        ]);
    }
}
