<?php

namespace App\QrGenerator;

class Color
{
    public int $red;
    public int $green;
    public int $blue;

    public function __construct(int $red, int $green, int $blue)
    {
        $this->red = $red;
        $this->green = $green;
        $this->blue = $blue;
    }
    
    private function clamp(int $min, int $value, int $max): int
    {
        return min(max($value, $min), $max);
    }
    
    public function multiply(float $intensity): self
    {
        $this->red = round($this->clamp(0, $this->red * $intensity, 255));
        $this->green = round($this->clamp(0, $this->green * $intensity, 255));
        $this->blue = round($this->clamp(0, $this->blue * $intensity, 255));
        
        return $this;
    }
}