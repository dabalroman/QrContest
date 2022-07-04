<?php

declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CollectedCodeResource;
use App\Models\UserCollectedCode;
use Illuminate\Http\JsonResponse;

class CollectedCodeController extends Controller
{
    public function index(): JsonResponse
    {
        $collectedCodes = UserCollectedCode::whereUserId($this->currentUser->id)
            ->latest()
            ->get();

        return $this->successResponse(CollectedCodeResource::collection($collectedCodes));
    }
}
