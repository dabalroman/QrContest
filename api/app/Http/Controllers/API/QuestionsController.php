<?php
/** @noinspection PhpMultipleClassDeclarationsInspection */
declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\PublicQuestionResource;
use App\Http\Resources\QuestionResource;
use App\Models\Question;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class QuestionsController extends Controller
{
    public function index(): JsonResponse
    {
        if(!$this->currentUser->isAdmin()){
            return $this->notAuthorisedResponse();
        }

        $questions = Question::latest()->get();

        return $this->successResponse(QuestionResource::collection($questions));
    }

    public function show(int $id): JsonResponse
    {
        if(!$this->currentUser->isAdmin()){
            return $this->notAuthorisedResponse();
        }

        $question = Question::find($id);

        if (is_null($question)) {
            return $this->notFoundResponse();
        }

        return $this->successResponse(new QuestionResource($question));
    }

    public function update(Request $request): JsonResponse
    {
        if(!$this->currentUser->isAdmin()){
            return $this->notAuthorisedResponse();
        }

        $validationRules = [
            Question::NAME => 'string|max:255',
        ];

        if (!$this->validateRequestData($request, $validationRules)) {
            return $this->errorResponse($this->validationErrors);
        }

        $requestData = $request->all();

        $this->currentQuestion->fill($requestData);
        $this->currentQuestion->save();

        return $this->successResponse(new QuestionResource($this->currentQuestion));
    }
}
