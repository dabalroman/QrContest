<?php

declare(strict_types=1);

use App\Models\Setting;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSettingsTable extends Migration
{
    public function up(): void
    {
        Schema::create(Setting::TABLE_NAME, static function (Blueprint $table) {
            $table->id();
            $table->string(Setting::NAME)->unique();
            $table->string(Setting::VALUE);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(Setting::TABLE_NAME);
    }
}
