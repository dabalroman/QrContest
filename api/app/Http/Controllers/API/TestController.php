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
        $codes = [];

        for ($i = 0; $i < 1; $i++) {
            $code = new Code();
            $code->data = Code::generateRandomData();
//            $code->name = '';
//            $code->points = 0;
//            $code->is_active = false;
            $codes[] = $code;
        }

//        try {
//            $code->points = random_int(5, 15);
//        } catch (\Exception $e) {
//        }
//            $code->save();

        $qrGenerator = new QrGenerator();
//        $qrGenerator->run("Nagroda za zajęcie 1 miejsca w konkursie QrContest\nFantasmagoria 2022");


        echo array_reduce($codes, static fn(string $carry, Code $code) => $carry . "'" . $code->data . "', ", '');
//
        foreach ($codes as $code) {
            $image = $qrGenerator->generate($code);

            header('Content-type: image/jpeg');

            imagepng($image, storage_path('app/codes/2024/') . "$code->data.png", 5);
//            imagepng($image, storage_path('app/codes/2024/') . "x.png", 5);
            imagedestroy($image);
        }
    }
}
