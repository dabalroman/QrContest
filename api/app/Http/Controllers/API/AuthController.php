<?php
declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Auth;
use Cookie;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validationRules = [
            User::NAME => 'required|string|min:3|max:255|unique:users',
            User::PASSWORD => 'required|string|min:8|max:255',
            User::BRACELET_ID => 'string'
        ];

        if (!$this->validateRequestData($request, $validationRules)) {
            return $this->errorResponse($this->validationErrors);
        }

        $requestData = $request->all();
        $requestData[User::PASSWORD] = Hash::make($requestData[User::PASSWORD]);

        $user = User::create($requestData);
        $user->is_admin = false;
        $user->is_public = false;
        $user->is_suspended = false;
        $user->updateScore();
        $user->save();

        return $this->successResponse(new UserResource($user));
    }

    public function login(Request $request): JsonResponse
    {
        $validationRules = [
            User::NAME => 'required|string|min:5',
            User::PASSWORD => 'required|string|min:8'
        ];

        if (!$this->validateRequestData($request, $validationRules)) {
            return $this->errorResponse($this->validationErrors);
        }

        $requestData = $request->all();

        if (!Auth::attempt([User::NAME => $requestData[User::NAME], 'password' => $requestData[User::PASSWORD]])) {
            return $this->errorResponse(['Wrong password.'], Response::HTTP_UNAUTHORIZED);
        }

        $request->session()->regenerate();

        return $this->successResponse(new UserResource(Auth::getUser()));
    }

    public function changePassword(Request $request): JsonResponse
    {
        $validationRules = [
            User::PASSWORD => 'required|string|max:255|min:8',
            User::NEW_PASSWORD => 'required|string|max:255|min:8',
        ];

        if (!$this->validateRequestData($request, $validationRules)) {
            return $this->errorResponse($this->validationErrors);
        }

        $requestData = $request->all();

        if (!Hash::check($requestData[User::PASSWORD], $this->currentUser->password)) {
            return $this->errorResponse(['Wrong password.'], Response::HTTP_UNAUTHORIZED);
        }

        $this->currentUser->password = Hash::make($requestData[User::NEW_PASSWORD]);
        $this->currentUser->save();

        $request->session()->regenerate();

        return $this->successResponse();
    }

    public function logout(Request $request): JsonResponse
    {
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return $this->successResponse();
    }
}
