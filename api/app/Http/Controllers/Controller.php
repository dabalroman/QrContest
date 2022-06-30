<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\ApiResponser;
use App\Traits\DataValidator;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests;
    use DispatchesJobs;
    use ValidatesRequests;
    use ApiResponser;
    use DataValidator;

    protected ?User $currentUser = null;

    public function __construct() {

        $this->middleware(function ($request, $next) {
            $this->currentUser = auth()->user();

            return $next($request);
        });
    }
}
