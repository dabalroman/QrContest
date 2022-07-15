<?php

declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CodeResource;
use App\Models\Code;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CodeController extends Controller
{
    public function index(): JsonResponse
    {
        if (!$this->currentUser->isAdmin()) {
            return $this->notAuthorisedResponse();
        }

        $codes = Code::orderBy(Code::DATA)->get();

        return $this->successResponse(CodeResource::collection($codes));
    }

    public function show(string $code): JsonResponse
    {
        if (!$this->currentUser->isAdmin()) {
            return $this->notAuthorisedResponse();
        }

        /** @noinspection CallableParameterUseCaseInTypeContextInspection */
        $code = Code::whereData($code)->first();

        if (is_null($code)) {
            return $this->notFoundResponse();
        }

        return $this->successResponse(new CodeResource($code));
    }

    public function store(Request $request): JsonResponse
    {
        if (!$this->currentUser->isAdmin()) {
            return $this->notAuthorisedResponse();
        }

        $validationRules = [
            Code::NAME => 'string|required',
            Code::DESCRIPTION => 'string|required',
            Code::IS_ACTIVE => 'bool|required',
            Code::WITH_QUESTION => 'bool|required',
            Code::DATA => 'string',
            Code::POINTS => 'int|required'
        ];

        if (!$this->validateRequestData($request, $validationRules)) {
            return $this->errorResponse($this->validationErrors);
        }

        $requestData = $request->all();

        if (!isset($requestData[Code::DATA])) {
            $requestData[Code::DATA] = Code::generateRandomData();
        }

        $code = (new Code())->fill($requestData);
        $code->save();

        return $this->successResponse(new CodeResource($code));
    }

    public function update(Request $request, int $id): JsonResponse
    {
        if (!$this->currentUser->isAdmin()) {
            return $this->notAuthorisedResponse();
        }

        $validationRules = [
            Code::NAME => 'string',
            Code::DESCRIPTION => 'string',
            Code::IS_ACTIVE => 'bool',
            Code::WITH_QUESTION => 'bool',
            Code::POINTS => 'int'
        ];

        if (!$this->validateRequestData($request, $validationRules)) {
            return $this->errorResponse($this->validationErrors);
        }

        $code = Code::find($id);

        if (is_null($code)) {
            return $this->notFoundResponse();
        }

        $requestData = $request->all();

        $code->fill($requestData);
        $code->save();

        return $this->successResponse(new CodeResource($code));
    }
}
