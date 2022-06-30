<?php
declare(strict_types=1);

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\MessageBag;
use Symfony\Component\HttpFoundation\Response;

trait ApiResponser
{
    /**
     * @param string|array|JsonResource|null $data
     * @param int $code
     * @return JsonResponse
     */
    public function successResponse($data = null, int $code = Response::HTTP_OK): JsonResponse
    {
        return response()->json(['data' => $data], $code, [], JSON_UNESCAPED_SLASHES);
    }

    public function notFoundResponse(): JsonResponse
    {
        return $this->errorResponse('Not found', Response::HTTP_NOT_FOUND);
    }

    /**
     * @param string|array|MessageBag|null $data
     * @param int $code
     * @return JsonResponse
     */
    public function errorResponse($data = null, int $code = Response::HTTP_BAD_REQUEST): JsonResponse
    {
        return response()->json(['message' => ['error' => $data]], $code);
    }

    public function notAuthorisedResponse(): JsonResponse
    {
        return $this->errorResponse('Not authorised', Response::HTTP_NOT_FOUND);
    }
}
