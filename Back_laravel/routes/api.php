<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\FavoriteController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']],function () {
    Route::get('user-perfile', [UserController::class, 'userProfile']);
    Route::put('update-user-perfile', [UserController::class, 'UpdateUserProfile']);
    Route::get('logout', [UserController::class, 'logout']);

    Route::get('my-favorites', [FavoriteController::class, 'myFavorites']);
    Route::post('add-favorite', [FavoriteController::class, 'addFavorite']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
