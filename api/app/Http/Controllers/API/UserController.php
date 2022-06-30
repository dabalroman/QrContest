<?php
/** @noinspection PhpMultipleClassDeclarationsInspection */
declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\UserAvatar;
use App\Models\UserType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index(): JsonResponse
    {
        if (!$this->currentUser->isPrivilegesLevelHigherOrEqualTo(UserType::TYPE_STUDENT)) {
            return $this->notAuthorisedResponse();
        }

        $users = User::latest()->get();

        return $this->successResponse(UserResource::collection($users));
    }

    public function getCurrent(): JsonResponse
    {
        if (!$this->currentUser->isPrivilegesLevelHigherOrEqualTo(UserType::TYPE_STUDENT)) {
            return $this->notAuthorisedResponse();
        }

        return $this->successResponse(new UserResource($this->currentUser));
    }

    public function store(Request $request): JsonResponse
    {
        if (!$this->currentUser->isPrivilegesLevelHigherOrEqualTo(UserType::TYPE_TEACHER)) {
            return $this->notAuthorisedResponse();
        }

        $validator = Validator::make($request->all(), [
            User::PARENT_ID => 'numeric|exists:App\Models\User,id|required_if:user_type_id,3|nullable',
            User::USER_TYPE_ID => 'numeric|exists:App\Models\UserType,id|required',
            User::NAME => 'string|max:255|required',
            User::EMAIL => 'string|email|max:255|unique:users|required_unless:user_type_id,3',
            User::PATTERN => 'string|nullable',
            User::PASSWORD => 'string|min:8|required_unless:user_type_id,3',
            User::AVATAR => 'array'
        ]);

        if ($validator->fails()) {
            return $this->errorResponse($validator->errors());
        }

        $requestData = $request->all();

        if ($requestData[User::USER_TYPE_ID] !== UserType::TYPE_STUDENT && $this->currentUser->isTeacher()) {
            return $this->errorResponse('The Teacher can create only student accounts.', Response::HTTP_FORBIDDEN);
        }

        if ($requestData[User::PARENT_ID] !== $this->currentUser->id && $this->currentUser->isTeacher()) {
            return $this->errorResponse('Parent cannot be set to other teacher.', Response::HTTP_FORBIDDEN);
        }

        if (isset($requestData[User::PASSWORD])) {
            $requestData[User::PASSWORD] = Hash::make($requestData[User::PASSWORD]);
        }

        if (isset($requestData[User::PATTERN])) {
            $requestData[User::PATTERN] = Hash::make($requestData[User::PATTERN]);
        }

        $user = User::create($requestData);
        $user->updateExperience();
        $user->save();

        UserAvatar::create([
            UserAvatar::USER_ID => $user->id,
            UserAvatar::AVATAR => $requestData[User::AVATAR][UserAvatar::AVATAR] ?? null,
            UserAvatar::UNLOCKED => UserAvatar::START_ELEMENTS,
        ]);

        return $this->successResponse(new UserResource($user));
    }

    public function show(int $id): JsonResponse
    {
        if (!$this->currentUser->isPrivilegesLevelHigherOrEqualTo(UserType::TYPE_STUDENT)) {
            return $this->notAuthorisedResponse();
        }

        if ($this->currentUser->id !== $id && $this->currentUser->isStudent()) {
            return $this->notAuthorisedResponse();
        }

        $user = User::find($id);

        if ($this->currentUser->id !== $id && !$this->currentUser->isParentOfUser($user)) {
            return $this->errorResponse('Cannot show users that do not belong to you.', Response::HTTP_FORBIDDEN);
        }

        if (is_null($user)) {
            return $this->notFoundResponse();
        }

        return $this->successResponse(new UserResource($user));
    }

    public function update(Request $request, User $user): JsonResponse
    {
        if (!$this->currentUser->isPrivilegesLevelHigherOrEqualTo(UserType::TYPE_STUDENT)) {
            return $this->notAuthorisedResponse();
        }

        if ($this->currentUser->id !== $user->id && $this->currentUser->isStudent()) {
            return $this->errorResponse('Cannot update other users.', Response::HTTP_FORBIDDEN);
        }

        if ($this->currentUser->id !== $user->id && !$this->currentUser->isParentOfUser($user)) {
            return $this->errorResponse('Cannot update users that do not belong to you.', Response::HTTP_FORBIDDEN);
        }

        $validator = Validator::make($request->all(), [
            User::PARENT_ID => 'numeric|exists:App\Models\User,id|required_if:user_type_id,3|nullable',
            User::USER_TYPE_ID => 'numeric|exists:App\Models\UserType,id',
            User::NAME => 'string|max:255',
            User::EMAIL => "string|email|max:255|unique:users,email,$user->id|nullable",
            User::AVATAR => 'array'
        ]);

        if ($validator->fails()) {
            return $this->errorResponse($validator->errors());
        }

        $requestData = $request->all();

        if (isset($requestData[User::AVATAR])) {
            $avatar = UserAvatar::whereUserId($user->id)->first();

            if (isset($avatar, $requestData[User::AVATAR][UserAvatar::AVATAR])) {
                $avatar->avatar = $requestData[User::AVATAR][UserAvatar::AVATAR];
                $avatar->save();
            }
        }

        $user->fill($requestData);
        $user->updateExperience();
        $user->save();

        return $this->successResponse(new UserResource($user));
    }

    public function destroy(User $user): JsonResponse
    {
        if (!$user->isPrivilegesLevelHigherOrEqualTo(UserType::TYPE_TEACHER)) {
            return $this->notAuthorisedResponse();
        }

        $user->delete();

        return $this->successResponse();
    }
}
