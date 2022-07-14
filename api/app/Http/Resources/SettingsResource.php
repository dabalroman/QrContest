<?php
declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Code;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SettingsResource extends JsonResource
{
    /**
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        /** @var Setting $setting */
        $setting = $this;

        return [
            Setting::ID => $setting->id,
            Setting::NAME => $setting->name,
            Setting::VALUE => $setting->value,
        ];
    }
}
