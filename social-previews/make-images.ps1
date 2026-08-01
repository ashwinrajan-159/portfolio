<#
    Generates both sets of project imagery from one mesh-gradient engine.

      1. the portfolio's three project panels  -> ../ashwin-rajan-portfolio/assets/img/
         pure gradient, no text: the name, tagline and stack already sit in the
         left column of the same row on the page

      2. the three GitHub social previews      -> this folder
         the same gradient with the project name over it, 1280x640

    GDI+ has no blur, so the mesh is evaluated per pixel at low resolution using
    inverse-distance weighting and then upscaled bicubically. The upscale is the
    blur, and because it resamples real data it stays perfectly smooth.

    (ASCII only - Windows PowerShell 5.1 reads .ps1 as ANSI without a BOM.)
#>
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$site = Join-Path $here '..\ashwin-rajan-portfolio\assets\img'

function C([string]$hex) { [System.Drawing.ColorTranslator]::FromHtml($hex) }

function New-Mesh([int]$w, [int]$h, $points, [double]$power) {
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    for ($y = 0; $y -lt $h; $y++) {
        $fy = $y / [double]($h - 1)
        for ($x = 0; $x -lt $w; $x++) {
            $fx = $x / [double]($w - 1)
            $wr = 0.0; $wg = 0.0; $wb = 0.0; $tw = 0.0
            foreach ($p in $points) {
                $dx = $fx - $p.x; $dy = $fy - $p.y
                $d2 = $dx*$dx + $dy*$dy
                if ($d2 -lt 1e-9) { $d2 = 1e-9 }
                $wt = [Math]::Pow($d2, -$power / 2.0)
                $wr += $wt * $p.c.R; $wg += $wt * $p.c.G; $wb += $wt * $p.c.B; $tw += $wt
            }
            $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(
                [int][Math]::Min(255, $wr / $tw),
                [int][Math]::Min(255, $wg / $tw),
                [int][Math]::Min(255, $wb / $tw)))
        }
    }
    return $bmp
}

# Upscales past the target then centre-crops: bicubic samples beyond the source
# edge and leaves a pale halo, so the border never survives into the output.
function Expand-Mesh($src, [int]$W, [int]$H) {
    $ovW = [int]($W * 1.14); $ovH = [int]($H * 1.14)
    $cur = $src
    foreach ($scale in @(6, 4)) {
        $tw = [Math]::Min($ovW, [int]($cur.Width * $scale))
        $th = [Math]::Min($ovH, [int]($cur.Height * $scale))
        $next = New-Object System.Drawing.Bitmap($tw, $th)
        $g = [System.Drawing.Graphics]::FromImage($next)
        $g.InterpolationMode = 'HighQualityBicubic'; $g.PixelOffsetMode = 'HighQuality'
        $g.DrawImage($cur, 0, 0, $tw, $th); $g.Dispose()
        if ($cur -ne $src) { $cur.Dispose() }
        $cur = $next
    }
    $over = New-Object System.Drawing.Bitmap($ovW, $ovH)
    $g = [System.Drawing.Graphics]::FromImage($over)
    $g.InterpolationMode = 'HighQualityBicubic'; $g.PixelOffsetMode = 'HighQuality'
    $g.DrawImage($cur, 0, 0, $ovW, $ovH); $g.Dispose()
    if ($cur -ne $src) { $cur.Dispose() }

    $final = New-Object System.Drawing.Bitmap($W, $H)
    $g = [System.Drawing.Graphics]::FromImage($final)
    $g.InterpolationMode = 'HighQualityBicubic'; $g.PixelOffsetMode = 'HighQuality'
    $g.DrawImage($over, (New-Object System.Drawing.Rectangle(0, 0, $W, $H)),
                 [int](($ovW - $W) / 2), [int](($ovH - $H) / 2), $W, $H,
                 [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose(); $over.Dispose()
    return $final
}

# Saturated readings of the portfolio triad - gold, olive, bronze - one leading each.
$projects = @(
  @{ repo='trustlens'; name='TrustLens'; pts = @(
      @{x=0.12; y=0.10; c=(C '#FFE07A')}, @{x=0.78; y=0.06; c=(C '#E8A317')},
      @{x=0.50; y=0.48; c=(C '#FFD24A')}, @{x=0.08; y=0.86; c=(C '#C2621A')},
      @{x=0.92; y=0.72; c=(C '#8A3A12')}, @{x=0.62; y=0.96; c=(C '#D98324')} ) },
  @{ repo='fedlearn';  name='FedLearn';  pts = @(
      @{x=0.10; y=0.12; c=(C '#C6DA6E')}, @{x=0.80; y=0.10; c=(C '#6E8F2E')},
      @{x=0.46; y=0.52; c=(C '#A9C24E')}, @{x=0.06; y=0.84; c=(C '#3F5A22')},
      @{x=0.90; y=0.78; c=(C '#C9A227')}, @{x=0.56; y=0.98; c=(C '#7E9440')} ) },
  @{ repo='flimo';     name='Flimo';     pts = @(
      @{x=0.14; y=0.08; c=(C '#FFD9A0')}, @{x=0.82; y=0.14; c=(C '#C2761F')},
      @{x=0.48; y=0.50; c=(C '#E8A45C')}, @{x=0.10; y=0.88; c=(C '#8A4A12')},
      @{x=0.88; y=0.70; c=(C '#C9A227')}, @{x=0.58; y=0.96; c=(C '#B5722E')} ) }
)

$jpeg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$prm = New-Object System.Drawing.Imaging.EncoderParameters(1)
$prm.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 88)

foreach ($p in $projects) {
    # --- page panel: 4:3, no text at all ---
    $mesh  = New-Mesh 40 30 $p.pts 2.4
    $panel = Expand-Mesh $mesh 1200 900
    $mesh.Dispose()
    $dest = Join-Path $site "$($p.repo)-card.jpg"
    $panel.Save($dest, $jpeg, $prm)
    $panel.Dispose()
    "{0,-22} {1,7:N0} bytes   (page panel)" -f "$($p.repo)-card.jpg", (Get-Item $dest).Length

    # --- GitHub social preview: same mesh at 2:1, project name over it ---
    $mesh = New-Mesh 40 20 $p.pts 2.4
    $card = Expand-Mesh $mesh 1280 640
    $mesh.Dispose()
    $g = [System.Drawing.Graphics]::FromImage($card)
    $g.SmoothingMode = 'AntiAlias'; $g.TextRenderingHint = 'ClearTypeGridFit'
    $f  = New-Object System.Drawing.Font('Segoe UI', 76, [System.Drawing.FontStyle]::Bold)
    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = 'Center'; $sf.LineAlignment = 'Center'
    $box = New-Object System.Drawing.RectangleF(0, 0, 1280, 640)
    $shadow = New-Object System.Drawing.RectangleF(0, 5, 1280, 640)
    $g.DrawString($p.name, $f, (New-Object System.Drawing.SolidBrush(
        [System.Drawing.Color]::FromArgb(55, 0, 0, 0))), $shadow, $sf)
    $g.DrawString($p.name, $f, [System.Drawing.Brushes]::White, $box, $sf)
    $f.Dispose(); $sf.Dispose(); $g.Dispose()
    $dest = Join-Path $here "$($p.repo).png"
    $card.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
    $card.Dispose()
    "{0,-22} {1,7:N0} bytes   (GitHub social preview)" -f "$($p.repo).png", (Get-Item $dest).Length
}
