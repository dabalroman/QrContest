<?php
declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Code;
use App\Models\UserCollectedCode;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CodeResource extends JsonResource
{
    /**
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        /** @var Code $code */
        $code = $this;

        $usersThatCollectedCodes = [];

        foreach ($code->collects as $collect) {
            $usersThatCollectedCodes[] = $collect->user;
        }

        return [
            Code::ID => $code->id,
            Code::NAME => $code->name,
            Code::DESCRIPTION => $code->description,
            Code::DATA => $code->data,
            Code::IS_ACTIVE => (int)$code->is_active,
            Code::WITH_QUESTION => (int)$code->with_question,
            Code::POINTS => $code->points,
            Code::V_COLLECTED_BY => PublicUserResource::collection($usersThatCollectedCodes)
        ];
    }
}
