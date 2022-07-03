<?php
/** @noinspection PhpMultipleClassDeclarationsInspection */
declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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

    public function update(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            User::NAME => 'string|max:255',
        ]);

        if ($validator->fails()) {
            return $this->errorResponse($validator->errors());
        }

        $requestData = $request->all();

        $this->currentUser->fill($requestData);
        $this->currentUser->save();

        return $this->successResponse(new UserResource($this->currentUser));
    }
}
