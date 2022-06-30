<?php
declare(strict_types=1);

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::group(
    ['middleware' => ['auth:sanctum']],
    static function () {
        Route::post('/refresh', [AuthController::class, 'refresh']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/profile', [UserController::class, 'getCurrent']);
        Route::put('/change_password/{id}', [AuthController::class, 'changePassword']);


        Route::resource('users', UserController::class);
    }
);
