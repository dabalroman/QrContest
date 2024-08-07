<?php
declare(strict_types=1);

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CodeController;
use App\Http\Controllers\API\CollectCodeController;
use App\Http\Controllers\API\SettingsController;
use App\Http\Controllers\API\StandingsController;
use App\Http\Controllers\API\QrGeneratorController;
use App\Http\Controllers\API\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/qr_generator', [QrGeneratorController::class, 'index']);
Route::post('/qr_generator', [QrGeneratorController::class, 'store']);
Route::delete('/qr_generator', [QrGeneratorController::class, 'destroy']);

Route::resource('settings', SettingsController::class)->except('update');

Route::group(
    ['middleware' => ['auth:sanctum']],
    static function () {
        Route::post('/refresh', [AuthController::class, 'refresh']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/profile', [UserController::class, 'getCurrent']);
        Route::put('/change_password', [AuthController::class, 'changePassword']);

        Route::resource('users', UserController::class);
        Route::resource('codes', CodeController::class);
        Route::resource('collected_codes', CollectCodeController::class);
        Route::resource('standings', StandingsController::class);
        Route::resource('settings', SettingsController::class)->only('update');
    }
);
