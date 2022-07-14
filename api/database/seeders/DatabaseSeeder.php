<?php
declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UsersSeeder::class,
            CodesSeeder::class,
            QuestionsSeeder::class,
            SettingsSeeder::class,
            UserCollectedCodesSeeder::class
        ]);
    }
}
