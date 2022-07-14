<?php
declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicUserResource extends JsonResource
{
    /**
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        /** @var User $user */
        $user = $this;

        return [
            User::ID => $user->id,
            User::NAME => $user->name,
            User::SCORE => $user->score,
        ];
    }
}
