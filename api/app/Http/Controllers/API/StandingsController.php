<?php

declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\PublicUserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class StandingsController extends Controller
{
    public function index(): JsonResponse
    {
        $users = User::whereIsPublic(true)
            ->whereIsSuspended(false)
            ->orderByDesc(User::SCORE)
            ->orderBy(User::CREATED_AT)
            ->get();

        return $this->successResponse(PublicUserResource::collection($users));
    }
}
