<?php
declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Code;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicCodeResource extends JsonResource
{
    /**
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        /** @var Code $code */
        $code = $this;

        return [
            Code::ID => $code->id,
            Code::NAME => $code->name,
            Code::POINTS => $code->points,
        ];
    }
}
