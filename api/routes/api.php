<?php
declare(strict_types=1);

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CodeController;
use App\Http\Controllers\API\CollectCodeController;
use App\Http\Controllers\API\TestController;
use App\Http\Controllers\API\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::resource('test', TestController::class);

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
    }
);
