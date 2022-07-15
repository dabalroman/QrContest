<?php
declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            User::BRACELET_ID => $user->bracelet_id,
            User::IS_PUBLIC => (int)$user->is_public,
            User::IS_SUSPENDED => (int)$user->is_suspended,
            User::IS_ADMIN => (int)$user->is_admin,
            User::CREATED_AT => $user->created_at,
        ];
    }
}
