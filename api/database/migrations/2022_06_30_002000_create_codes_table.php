<?php

declare(strict_types=1);

use App\Models\Code;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCodesTable extends Migration
{
    public function up(): void
    {
        Schema::create(Code::TABLE_NAME, static function (Blueprint $table) {
            $table->id();
            $table->string(Code::NAME);
            $table->string(Code::DATA);
            $table->integer(Code::POINTS)->default(0);
            $table->string(Code::DESCRIPTION)->nullable();
            $table->boolean(Code::IS_ACTIVE)->default(true);
            $table->boolean(Code::WITH_QUESTION)->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(Code::TABLE_NAME);
    }
}
