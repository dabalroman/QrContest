<?php
declare(strict_types=1);

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

trait DataValidator
{
    /**
     * @var string|string[]|null
     */
    public $validationErrors;

    protected function validateRequestData(Request $request, array $validationRules): bool
    {
        $requestData = $request->all();

        if (!$this->areProvidedDataKeysSafe($requestData, $validationRules)) {
            $this->validationErrors = 'Bad request';
            return false;
        }

        $validator = Validator::make($requestData, $validationRules);

        if ($validator->fails()) {
            $this->validationErrors = $validator->errors()->toArray();
            return false;
        }

        return true;
    }

    protected function areProvidedDataKeysSafe(array $requestData, array $validationRules): bool
    {
        $validKeys = array_keys($validationRules);
        $requestKeys = array_keys($requestData);

        return empty(array_diff($requestKeys, $validKeys));
    }
}
