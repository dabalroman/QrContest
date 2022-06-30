<?php
declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\UserType;
use Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public const AUTH_TOKEN = 'auth_token';

    public function register(Request $request): JsonResponse
    {
        $validationRules = [
            User::NAME => 'required|string|max:255',
            User::EMAIL => 'required|string|email|max:255|unique:users',
            User::PASSWORD => 'required|string|min:8|max:255'
        ];

        if (!$this->validateRequestData($request, $validationRules)) {
            return $this->errorResponse($this->validationErrors);
        }

        $requestData = $request->all();
        $requestData[User::PASSWORD] = Hash::make($requestData[User::PASSWORD]);
        $requestData[User::USER_TYPE_ID] = UserType::TYPE_TEACHER;

        $user = User::create($requestData);

        return $this->successResponse($this->getResponseData($user, null));
    }

    public function login(Request $request): JsonResponse
    {
        $validationRules = [
            User::EMAIL => 'required|string|email|max:255|exists:App\Models\User,email',
            User::PASSWORD => 'required|string|min:8'
        ];

        if (!$this->validateRequestData($request, $validationRules)) {
            return $this->errorResponse($this->validationErrors);
        }

        $requestData = $request->all();

        if (!Auth::attempt(['email' => $requestData[User::EMAIL], 'password' => $requestData[User::PASSWORD]])) {
            return $this->errorResponse(['Wrong password.'], Response::HTTP_UNAUTHORIZED);
        }

        $user = User::where(User::EMAIL, $request[User::EMAIL])->firstOrFail();
//        $user->tokens()->delete();

        $token = $user->createToken(self::AUTH_TOKEN)->plainTextToken;

        return $this->successResponse($this->getResponseData($user, $token));
    }

    public function changePassword(Request $request, int $id): JsonResponse
    {
        if ($this->currentUser->id !== $id) {
            return $this->errorResponse('Cannot update other users.', Response::HTTP_FORBIDDEN);
        }

        $user = User::find($id);

        if (is_null($user)) {
            return $this->notFoundResponse();
        }

        $validationRules = [
            User::PASSWORD => 'required|string|max:255|min:8',
            User::NEW_PASSWORD => 'required|string|max:255|min:8',
        ];

        if (!$this->validateRequestData($request, $validationRules)) {
            return $this->errorResponse($this->validationErrors);
        }

        $requestData = $request->all();

        if (!Hash::check($requestData[User::PASSWORD], $user->password)) {
            return $this->errorResponse(['Wrong password.'], Response::HTTP_UNAUTHORIZED);
        }

        $user->password = Hash::make($requestData[User::NEW_PASSWORD]);
        $user->save();

        return $this->successResponse();
    }

    public function refresh(): JsonResponse
    {
        $this->currentUser->tokens()->delete();
        $token = $this->currentUser->createToken(self::AUTH_TOKEN)->plainTextToken;

        return $this->successResponse($this->getResponseData($this->currentUser, $token));
    }

    public function logout(): JsonResponse
    {
        $this->currentUser->tokens()->delete();

        return $this->successResponse();
    }

    private function getResponseData(User $user, ?string $token): array
    {
        if (!$token) {
            return ['user' => new UserResource($user)];
        }

        return [
            'user' => new UserResource($user),
            'access_token' => $token,
            'expires_in' => ((int)env('TOKEN_EXPIRE_DELAY_MINUTES')) * 60
        ];
    }

    public static function getAbilitiesRule(string ...$abilities): string
    {
        return 'abilities:' . implode(',', $abilities);
    }
}
