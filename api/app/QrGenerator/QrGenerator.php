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

    private function generateQrCode(string $data): string
    {
        $options = new QROptions([
            'version' => 5,
            'outputType' => QRCode::OUTPUT_IMAGE_JPG,
            'eccLevel' => QRCode::ECC_M,
            'cssClass' => 'qrcode',
            'scale' => 24,
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

    private function drawCenteredText(string $text, int $size, int $y, int $color): void
    {
        $textWidth = imagettfbbox($size, 0, $this->font, $text)[2];
        imagettftext(
            $this->canvas,
            $size,
            0,
            $this->getCenter($this->width, $textWidth),
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
    public function convertToTransparentImage($image)
    {
        $width = imagesx($image);
        $height = imagesy($image);

        $imageProxy = imagecreate($width, $height);
        imagesavealpha($imageProxy, true);

        imagecopy($imageProxy, $image, 0, 0, 0, 0, $width, $height);
        imagecolortransparent($imageProxy, imagecolorexact($imageProxy, 255, 255, 255));

        imagedestroy($image);

        return $imageProxy;
    }

    protected function drawBackgroundText(Code $code): void {
        $bgTextColor = imagecolorallocate($this->canvas, 230, 230, 240);
        $text = 'qrcontest   2022   fantasmagoria   2022   ';

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

    /**
     * @param Code $code
     * @return resource
     */
    public function generate(Code $code)
    {
        $this->createCanvas();
        $this->drawBackgroundText($code);

        $textColor = imagecolorallocate($this->canvas, 18, 49, 84);

        $qrCodeAsBase64 = $this->generateQrCode($code->collectUrl);
        $qrCodeAsString = base64_decode(substr($qrCodeAsBase64, strpos($qrCodeAsBase64, ',') + 1));

        [$qrWidth, $qrHeight] = getimagesizefromstring($qrCodeAsString);

        $qrImage = $this->convertToTransparentImage(imagecreatefromstring($qrCodeAsString));
        imagecolorset($qrImage, imagecolorexact($qrImage, 0, 0, 0), 18, 49, 84);
        imagecopy($this->canvas, $qrImage, $this->getCenter($this->width, $qrWidth), 350, 0, 0, $qrWidth, $qrHeight);

        $logoImage = $this->convertToTransparentImage(imagecreatefrompng(resource_path('images/fantasmagoria.png')));
        imagecopy($this->canvas, $logoImage, $this->getCenter($this->width, 1054), 100, 0, 0, 1054, 175);

        $this->drawCenteredText($code->data, 80, 1410, $textColor);
        $this->drawCenteredText('Zeskanuj kod i weź udział w konkursie!', 40, 1510, $textColor);
        $this->drawCenteredText('Skanować możesz nie? Problem żaden to!', 25, 1595, $textColor);
        $this->drawCenteredText('Na ' . env('FRONTEND_URL') . ' wejdź i kod powyższy wpisz.', 25, 1640, $textColor);

        imagedestroy($logoImage);
        imagedestroy($qrImage);

        return $this->canvas;
    }

    private function getCenter(int $size, int $resourceSize): int
    {
        return (int)floor(($size / 2) - ($resourceSize / 2));
    }
}