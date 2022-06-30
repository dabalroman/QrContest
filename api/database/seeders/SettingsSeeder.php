<?php
declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        DB::table(Setting::TABLE_NAME)->insert(
            [
                [
                    Setting::ID => 1,
                    Setting::NAME => 'active',
                    Setting::VALUE => '1'
                ],
            ]
        );
    }
}
