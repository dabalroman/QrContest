<?php

declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Code;
use App\QrGenerator\QrGenerator;

class TestController extends Controller
{
    public function index()
    {
        $code = new Code();
        $code->data = Code::generateRandomData();
        $code->name = 'Test code';

        $qrGenerator = new QrGenerator();
        $image = $qrGenerator->generate($code);

        header('Content-type: image/jpeg');

        imagejpeg($image, null, 95);
        imagedestroy($image);
    }
}
