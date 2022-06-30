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
            User::PARENT_ID => $user->parent_id,
            User::USER_TYPE_ID => $user->user_type_id,
            User::NAME => $user->name,
            User::EMAIL => $user->email,
            User::LEVEL => $user->level,
            User::EXPERIENCE => $user->experience,
            User::EXPERIENCE_TO_NEXT_LEVEL => $user->experience_to_next_level,
            User::IS_PATTERN_SET => $user->is_pattern_set,
            User::STUDENTS => self::collection($user->students),
            User::CREATED_AT => $user->created_at,
            User::UPDATED_AT => $user->updated_at
        ];
    }
}
