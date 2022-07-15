<?php
/** @noinspection PhpMultipleClassDeclarationsInspection */
declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(): JsonResponse
    {
        $users = User::latest()->get();

        return $this->successResponse(UserResource::collection($users));
    }

    public function getCurrent(): JsonResponse
    {
        return $this->successResponse(new UserResource($this->currentUser));
    }

    public function show(int $id): JsonResponse
    {
        $user = User::find($id);

        if (is_null($user)) {
            return $this->notFoundResponse();
        }

        return $this->successResponse(new UserResource($user));
    }

    public function update(Request $request, int $id): JsonResponse
    {
        if (!$this->currentUser->isAdmin()) {
            return $this->notAuthorisedResponse();
        }

        $validationRules = [
            User::NAME => 'string|min:3|max:16|unique:users',
            User::IS_PUBLIC => 'boolean',
            User::IS_SUSPENDED => 'boolean',
            User::BRACELET_ID => 'string'
        ];

        if (!$this->validateRequestData($request, $validationRules)) {
            return $this->errorResponse($this->validationErrors);
        }

        $user = User::find($id);

        if (is_null($user)) {
            return $this->notFoundResponse();
        }

        $requestData = $request->all();
        $user->fill($requestData);
        $user->save();

        return $this->successResponse(new UserResource($user));
    }
}
