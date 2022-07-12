<?php

declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Code;
use App\QrGenerator\QrGenerator;

class TestController extends Controller
{
    public function index(): void
    {
//        $code = new Code();
//        $code->data = Code::generateRandomData();
//        $code->name = '';
//        $code->points = 0;
//        $code->is_active = false;

//        try {
//            $code->points = random_int(5, 15);
//        } catch (\Exception $e) {
//        }
//            $code->save();

        $qrGenerator = new QrGenerator();

        $codes = Code::wherePoints(0)->get();

        foreach ($codes as $code) {
            $image = $qrGenerator->generate($code);

            header('Content-type: image/jpeg');

            imagepng($image, storage_path('app/codes/') . "$code->data.png", 5);
            imagedestroy($image);
        }
    }
}
