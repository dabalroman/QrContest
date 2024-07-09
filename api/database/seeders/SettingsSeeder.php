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
                [
                    Setting::ID => 2,
                    Setting::NAME => 'awards_info',
                    Setting::VALUE => '<b>W puli nagród jest ponad 200 fantów</b><br/>To tutaj pojawi się informacja o zwycięzcach.<br/>Tura pierwsza trwa do godziny 14:00 w sobotę.<br/>Tura druga trwa do godziny 12:00 w niedzielę.'
                ],
            ]
        );
    }
}
