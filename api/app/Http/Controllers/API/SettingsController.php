<?php

declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\SettingsResource;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function index(): JsonResponse
    {
        $settings = Setting::all();

        return $this->successResponse(SettingsResource::collection($settings));
    }

    public function show(string $name): JsonResponse
    {
        $setting = Setting::whereName($name)->first();

        if (is_null($setting)) {
            return $this->notFoundResponse();
        }

        return $this->successResponse(new SettingsResource($setting));
    }

    public function update(Request $request, string $name): JsonResponse
    {
        if (!$this->currentUser->isAdmin()) {
            return $this->notAuthorisedResponse();
        }

        $validationRules = [
            Setting::VALUE => 'required'
        ];

        if (!$this->validateRequestData($request, $validationRules)) {
            return $this->errorResponse($this->validationErrors);
        }

        $setting = Setting::whereName($name)->first();

        if (is_null($setting)) {
            return $this->notFoundResponse();
        }

        $requestData = $request->all();

        $setting->fill($requestData);
        $setting->save();

        return $this->successResponse(new SettingsResource($setting));
    }
}
