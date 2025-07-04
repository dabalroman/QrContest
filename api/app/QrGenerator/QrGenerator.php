<?php

declare(strict_types=1);

namespace App\QrGenerator;

use App\Models\Code;
use chillerlan\QRCode\QRCode;
use chillerlan\QRCode\QROptions;


class QrGenerator
{
    private string $font;

    private int $width = 1240;
    private int $height = 1748;

    /** @var resource|null $canvas */
    private $canvas;

    public function __construct()
    {
        $this->font = resource_path('fonts/font.ttf');
    }

    public function run($data) {
        $options = new QROptions([
            'version' => 5,
            'outputType' => QRCode::OUTPUT_MARKUP_SVG,
            'eccLevel' => QRCode::ECC_M,
            'cssClass' => 'qrcode',
            'scale' => 27,
            'addQuietzone' => false,
        ]);

        echo (new QRCode($options))->render($data);
    }

    private function generateQrCode(string $data): string
    {
        $options = new QROptions([
            'version' => 4,
            'outputType' => QRCode::OUTPUT_IMAGE_JPG,
            'eccLevel' => QRCode::ECC_M,
            'cssClass' => 'qrcode',
            'scale' => 27,
            'addQuietzone' => false,
        ]);

        return (new QRCode($options))->render($data);
    }

    private function createCanvas(): void
    {
        $this->canvas = imagecreatetruecolor($this->width, $this->height);
        $bgColor = imagecolorallocate($this->canvas, 255, 255, 255);
        imagefill($this->canvas, 0, 0, $bgColor);
    }

    private function drawCenteredText(string $text, int $size, int $y, int $color, int $xOverride = 0): void
    {
        $textWidth = imagettfbbox($size, 0, $this->font, $text)[2];
        imagettftext(
            $this->canvas,
            $size,
            0,
            $xOverride ?: $this->getCenter($this->width, $textWidth),
            $y,
            $color,
            $this->font,
            $text
        );
    }

    /**
     * @param resource $image
     * @return resource
     */
    public function convertToTransparentImage($image, bool $denoise = false)
    {
        $width = imagesx($image);
        $height = imagesy($image);

        $imageProxy = imagecreate($width, $height);
        imagesavealpha($imageProxy, true);

        imagecopy($imageProxy, $image, 0, 0, 0, 0, $width, $height);
        imagecolortransparent($imageProxy, imagecolorexact($imageProxy, 255, 255, 255));

        // Denoising. Because PHP. Don't ask why, don't know either.
        if ($denoise) {
            for ($i = 0; $i < imagecolorstotal($imageProxy); $i++) {
                ['red' => $brightness] = imagecolorsforindex($imageProxy, $i);

                $brightness = $brightness >= 127 ? 255 : 0;

                imagecolorset($imageProxy, $i, $brightness, $brightness, $brightness, $brightness ? 127 : 0);
            }
        }

        imagedestroy($image);

        return $imageProxy;
    }

    protected function drawBackgroundText(Code $code, Color $color): void
    {
        $bgTextColor = imagecolorallocate($this->canvas, $color->red, $color->green, $color->blue);
        $text = 'QrContest   2025   Fantasmagoria   2025   ';

        $offset = array_reduce(
                str_split($code->data),
                static fn(int $carry, string $char) => $carry + ord($char),
                0
            ) % 20 + 1;

        for ($i = 1; $i <= 8; $i++) {
            $text = substr($text, strlen($text) - $offset) . substr($text, 0, -$offset);

            imagettftext(
                $this->canvas,
                80,
                30,
                $offset * -5,
                310 * $i - 150,
                $bgTextColor,
                $this->font,
                $text
            );
        }
    }

    public function generate(Code $code, bool $withBackground = true)
    {
        $baseColor = (new Color(175, 134, 16))->multiply(0.8);
        $bgColor = (new Color(255, 217, 171))->multiply(1.05);
        
        $qrCodeXPosition = 570;
        $textXPosition = 400;
        $logoPositon = 40;
        
        $this->createCanvas();

        if($withBackground) {
            $this->drawBackgroundText($code, $bgColor);
        }

        $textColor = imagecolorallocate($this->canvas, $baseColor->red, $baseColor->green, $baseColor->blue);

        $qrCodeAsBase64 = $this->generateQrCode($code->collectUrl);
        $qrCodeAsString = base64_decode(substr($qrCodeAsBase64, strpos($qrCodeAsBase64, ',') + 1));

        [$qrWidth, $qrHeight] = getimagesizefromstring($qrCodeAsString);

        $qrImage = $this->convertToTransparentImage(imagecreatefromstring($qrCodeAsString), true);

        // Denoising. Because PHP. Don't ask why, don't know either.
        for ($i = 0; $i < imagecolorstotal($qrImage); $i++) {
            ['red' => $brightness] = imagecolorsforindex($qrImage, $i);

            if ($brightness < 127) {
                imagecolorset($qrImage, $i, $baseColor->red, $baseColor->green, $baseColor->blue);
            }
        }

        imagecopy($this->canvas, $qrImage, 180, $qrCodeXPosition, 0, 0, $qrWidth, $qrHeight);

        
        
        
//        $fantasmagoriaLogo = $this->convertToTransparentImage(imagecreatefrompng(resource_path('images/15-fantasmagoria.png')));
//
//        // Denoising. Because PHP. Don't ask why, don't know either.
//        for ($i = 0; $i < imagecolorstotal($fantasmagoriaLogo); $i++) {
//            ['green' => $brightness] = imagecolorsforindex($fantasmagoriaLogo, $i);
//
//            if ($brightness > 10) {
//                imagecolorset($fantasmagoriaLogo, $i, $baseColor->red, $baseColor->green, $baseColor->blue);
//            }
//        }
//
//        imagescale($this->canvas, $qrWidth, $qrHeight);
//        imagecopy($this->canvas, $fantasmagoriaLogo, $this->getCenter($this->width, 390), $qrCodeXPosition - 10, 0, 0, 1200, 390);

        
        
        
        $qrContextLogo = $this->convertToTransparentImage(imagecreatefrompng(resource_path('images/Logo.png')));

        // Denoising. Because PHP. Don't ask why, don't know either.
        for ($i = 0; $i < imagecolorstotal($qrContextLogo); $i++) {
            ['green' => $brightness] = imagecolorsforindex($qrContextLogo, $i);

            if ($brightness > 10) {
                imagecolorset($qrContextLogo, $i, $baseColor->red, $baseColor->green, $baseColor->blue);
            }
        }

        imagecopy($this->canvas, $qrContextLogo, $this->getCenter($this->width, 1054), $logoPositon, 0, 0, 1054, 240);

        
        
        
        $this->drawCenteredText($code->data, 90, $qrCodeXPosition + 1030, $textColor);
        $this->drawCenteredText('Zeskanuj kod i weź udział w konkursie!', 46, $textXPosition, $textColor);
        $this->drawCenteredText('Lub dołącz do zabawy na stronie ' . env('FRONTEND_URL'), 32, $textXPosition + 60, $textColor);
        imagefilledrectangle($this->canvas, 800, $textXPosition + 72, 1120, $textXPosition + 78, $textColor);

//        imagedestroy($fantasmagoriaLogo);
        imagedestroy($qrImage);

        return $this->canvas;
    }

    private function getCenter(int $size, int $resourceSize): int
    {
        return (int)floor(($size / 2) - ($resourceSize / 2));
    }
}
