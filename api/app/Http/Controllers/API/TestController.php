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
        $code = new Code();
        $code->data = Code::generateRandomData();
        $code->name = 'Test code';
        try {
            $code->points = random_int(5, 15);
        } catch (\Exception $e) {
        }
        $code->save();

        $qrGenerator = new QrGenerator();
        $image = $qrGenerator->generate($code);

        header('Content-type: image/jpeg');

        imagejpeg($image, null, 95);
        imagedestroy($image);
    }
}
