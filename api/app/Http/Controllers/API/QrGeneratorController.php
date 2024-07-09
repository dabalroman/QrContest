<?php

declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Code;
use App\QrGenerator\QrGenerator;

class QrGeneratorController extends Controller
{
    public function index(): void
    {
        $codes = [];

        for ($i = 0; $i < 4; $i++) {
            $code = new Code();
            $code->data = Code::generateRandomData();
            $codes[] = $code;
        }

        $qrGenerator = new QrGenerator();

        // Create standard QR codes.
        foreach ($codes as $code) {
            $image = $qrGenerator->generate($code);

            imagepng($image, storage_path('app/codes/standard/') . "$code->data.png", 5);
            imagedestroy($image);
        }

        // Create clean QR codes.
        foreach ($codes as $code) {
            $image = $qrGenerator->generate($code, false);

            imagepng($image, storage_path('app/codes/clean/') . "$code->data.png", 5);
            imagedestroy($image);
        }

        echo array_reduce($codes, static fn(string $carry, Code $code) => $carry . "'" . $code->data . "', ", '');
    }

    public function store(): void
    {
        $files = scandir(storage_path('app/codes/standard/'));
        $pngFiles = array_filter($files, static fn(string $file) => strpos($file, '.png') !== false);

        $page = imagecreatetruecolor(2480, 3496);
        $white = imagecolorallocate($page, 255, 255, 255);

        $index = 0;

        foreach ($pngFiles as $file) {
            if (is_file(storage_path('app/codes/standard/') . $file) === false) {
                continue;
            }

            $image = imagecreatefrompng(storage_path('app/codes/standard/') . $file);

            // Convert $index into $x and $y
            $x = $index % 2 * 1240;
            $y = (((int)($index / 2)) % 2) * 1748;

            imagecopy($page, $image, $x, $y, 0, 0, 1240, 1748);
            imagedestroy($image);

            if ($index % 4 === 3) {
                $name = sprintf("%02d-%02d", $index - 2, $index + 1);
                imagepng($page, storage_path('app/codes/printable/') . "qr-codes-$name.png", 5);

                // Draw a white rectangle to clear the page.
                imagefilledrectangle($page, 0, 0, 2480, 3496, $white);
            }

            $index++;
        }

        if($index % 4 !== 0) {
            $name = sprintf("%02d-%02d", $index - ($index % 4) + 1, $index);
            imagepng($page, storage_path('app/codes/printable/') . "qr-codes-$name.png", 5);
        }

        imagedestroy($page);

        $codes = array_map(static fn(string $file) => str_replace('.png', '', $file), $pngFiles);
        echo array_reduce($codes, static fn(string $carry, string $file) => $carry . "'" . $file . "', ", '');
    }

    public function destroy(): void
    {
        $directories = ['standard', 'clean', 'printable'];

        foreach ($directories as $directory) {
            $files = scandir(storage_path('app/codes/' . $directory . '/'));
            foreach ($files as $file) {
                if (strpos($file, '.png') === false) {
                    continue;
                }

                if (is_file(storage_path('app/codes/' . $directory . '/') . $file) === false) {
                    continue;
                }

                unlink(storage_path('app/codes/' . $directory . '/') . $file);
            }
        }
    }
}
