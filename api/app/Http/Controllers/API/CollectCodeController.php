<?php

declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CollectedCodeResource;
use App\Models\Code;
use App\Models\UserCollectedCode;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CollectCodeController extends Controller
{
    public function index(): JsonResponse
    {
        $collectedCodes = UserCollectedCode::whereUserId($this->currentUser->id)
            ->latest()
            ->get();

        return $this->successResponse(CollectedCodeResource::collection($collectedCodes));
    }

    public function store(Request $request): JsonResponse
    {
        if (!$this->currentUser->isActive()) {
            return $this->notAuthorisedResponse();
        }

        $validationRules = [
            Code::DATA => 'required|string|min:3'
        ];

        if (!$this->validateRequestData($request, $validationRules)) {
            return $this->errorResponse($this->validationErrors);
        }

        $requestData = $request->all();
        $requestData[Code::DATA] = strtoupper($requestData[Code::DATA]);

        $code = Code::whereData($requestData[Code::DATA])->first();

        if ($code === null || !$code->is_active) {
            return $this->notFoundResponse();
        }

        $collectedCode = UserCollectedCode::whereUserId($this->currentUser->id)->whereCodeId($code->id)->first();

        if ($collectedCode !== null) {
            return $this->errorResponse('Already collected.');
        }

        $collectedCode = new UserCollectedCode();
        $collectedCode->user_id = $this->currentUser->id;
        $collectedCode->code_id = $code->id;

        if($code->with_question) {
            $collectedCode->prepareQuestion();
        }

        $collectedCode->save();

        $this->currentUser->updateScore();
        $this->currentUser->save();

        return $this->successResponse(new CollectedCodeResource($collectedCode));
    }

    public function update(Request $request, int $id): JsonResponse
    {
        if (!$this->currentUser->isActive()) {
            return $this->notAuthorisedResponse();
        }

        $validationRules = [
            UserCollectedCode::QUESTION_ANSWER => 'required|string|min:1|max:1'
        ];

        if (!$this->validateRequestData($request, $validationRules)) {
            return $this->errorResponse($this->validationErrors);
        }

        $collectedCode = UserCollectedCode::find($id);

        if (
            $collectedCode === null
            || $collectedCode->question_id === null
            || $collectedCode->question_answer !== null
        ) {
            return $this->notFoundResponse();
        }

        $requestData = $request->all();
        $answerId = UserCollectedCode::getAnswerIdFromMappedAnswerId(
            $requestData[UserCollectedCode::QUESTION_ANSWER],
            $collectedCode->question_answers_map
        );

        $collectedCode->question_answer = $answerId;
        $collectedCode->save();

        $this->currentUser->updateScore();
        $this->currentUser->save();

        return $this->successResponse(new CollectedCodeResource($collectedCode));
    }
}
