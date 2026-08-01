<#
    Generates both sets of project imagery from one mesh-gradient engine.

      1. the portfolio's three project panels  -> ../ashwin-rajan-portfolio/assets/img/
         gradient only, no text: the name, tagline and stack already sit in the
         left column of the same row on the page

      2. the three GitHub social previews      -> this folder
         the same gradient with the project name over it, 1280x640

    Four things stack up to make the gradient look designed rather than flat:

      mesh      six colour points blended by inverse-distance weighting
      core      a luminous bloom offset from centre, giving the image a subject
      vignette  radial falloff into the corners, widening the value range
      grain     fine film noise laid over the top at full resolution

    The first three are evaluated per pixel at low resolution and upscaled
    bicubically - GDI+ has no blur, and the upscale is the blur. Grain has to come
    after the upscale or it would be smeared away, so it is tiled on at 1:1.

    (ASCII only - Windows PowerShell 5.1 reads .ps1 as ANSI without a BOM.)
#>
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$site = Join-Path $here '..\ashwin-rajan-portfolio\assets\img'

function C([string]$hex) { [System.Drawing.ColorTranslator]::FromHtml($hex) }

function New-Field([int]$w, [int]$h, $p) {
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $core = $p.core; $coreC = $p.coreColor
    $sig2 = $p.coreSpread * $p.coreSpread
    foreach ($ignore in @(1)) { }
    for ($y = 0; $y -lt $h; $y++) {
        $fy = $y / [double]($h - 1)
        for ($x = 0; $x -lt $w; $x++) {
            $fx = $x / [double]($w - 1)

            # --- mesh ---
            $r = 0.0; $g = 0.0; $b = 0.0; $tw = 0.0
            foreach ($pt in $p.pts) {
                $dx = $fx - $pt.x; $dy = $fy - $pt.y
                $d2 = $dx*$dx + $dy*$dy
                if ($d2 -lt 1e-9) { $d2 = 1e-9 }
                $wt = [Math]::Pow($d2, -1.2)
                $r += $wt * $pt.c.R; $g += $wt * $pt.c.G; $b += $wt * $pt.c.B; $tw += $wt
            }
            $r = $r / $tw; $g = $g / $tw; $b = $b / $tw

            # --- luminous core: gaussian bloom toward a bright tint ---
            $dx = $fx - $core.x; $dy = $fy - $core.y
            $t = [Math]::Exp(-($dx*$dx + $dy*$dy) / $sig2) * $p.coreStrength
            $r = $r + ($coreC.R - $r) * $t
            $g = $g + ($coreC.G - $g) * $t
            $b = $b + ($coreC.B - $b) * $t

            # --- vignette: quadratic falloff from the core outward ---
            $vx = $fx - 0.5; $vy = $fy - 0.5
            $v = 1.0 - $p.vignette * (($vx*$vx + $vy*$vy) / 0.5)
            if ($v -lt 0) { $v = 0 }
            $r *= $v; $g *= $v; $b *= $v

            $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(
                [int][Math]::Max(0, [Math]::Min(255, $r)),
                [int][Math]::Max(0, [Math]::Min(255, $g)),
                [int][Math]::Max(0, [Math]::Min(255, $b))))
        }
    }
    return $bmp
}

# Upscales past the target then centre-crops: bicubic samples beyond the source
# edge and leaves a pale halo, so the border never survives into the output.
function Expand-Field($src, [int]$W, [int]$H) {
    $ovW = [int]($W * 1.14); $ovH = [int]($H * 1.14)
    $cur = $src
    foreach ($scale in @(5, 4)) {
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

# Speckle tile. Mid-grey stays fully transparent so the grain adds texture
# without desaturating the gradient underneath.
function New-GrainTile([int]$size, [int]$strength) {
    $rand = New-Object System.Random(20260801)
    $tile = New-Object System.Drawing.Bitmap($size, $size)
    for ($y = 0; $y -lt $size; $y++) {
        for ($x = 0; $x -lt $size; $x++) {
            $v = $rand.NextDouble() - 0.5
            $a = [int]([Math]::Abs($v) * 2 * $strength)
            if ($v -ge 0) { $tile.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($a, 255, 255, 255)) }
            else          { $tile.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($a, 0, 0, 0)) }
        }
    }
    return $tile
}

function Add-Grain($img, $tile) {
    $g = [System.Drawing.Graphics]::FromImage($img)
    $brush = New-Object System.Drawing.TextureBrush($tile)
    $brush.WrapMode = 'Tile'
    $g.FillRectangle($brush, 0, 0, $img.Width, $img.Height)
    $brush.Dispose(); $g.Dispose()
}

# Saturated readings of the portfolio triad - gold, olive, bronze - one leading each.
$projects = @(
  @{ repo='trustlens'; name='TrustLens'
     core=@{x=0.34; y=0.36}; coreColor=(C '#FFF3C4'); coreStrength=0.78; coreSpread=0.30; vignette=0.42
     pts = @(
      @{x=0.10; y=0.08; c=(C '#E8A317')}, @{x=0.80; y=0.05; c=(C '#B85C12')},
      @{x=0.50; y=0.46; c=(C '#FFC833')}, @{x=0.05; y=0.88; c=(C '#8A3A12')},
      @{x=0.95; y=0.66; c=(C '#5E2408')}, @{x=0.58; y=0.98; c=(C '#A34A10')} ) },

  @{ repo='fedlearn';  name='FedLearn'
     core=@{x=0.62; y=0.40}; coreColor=(C '#F2F7C8'); coreStrength=0.74; coreSpread=0.31; vignette=0.44
     pts = @(
      @{x=0.08; y=0.10; c=(C '#7E9440')}, @{x=0.82; y=0.08; c=(C '#3F5A22')},
      @{x=0.48; y=0.50; c=(C '#A9C24E')}, @{x=0.04; y=0.86; c=(C '#22381A')},
      @{x=0.92; y=0.74; c=(C '#C9A227')}, @{x=0.55; y=0.97; c=(C '#4A6626')} ) },

  @{ repo='flimo';     name='Flimo'
     core=@{x=0.44; y=0.62}; coreColor=(C '#FFE9B8'); coreStrength=0.80; coreSpread=0.29; vignette=0.46
     pts = @(
      @{x=0.12; y=0.06; c=(C '#C2761F')}, @{x=0.86; y=0.12; c=(C '#7A3C10')},
      @{x=0.46; y=0.48; c=(C '#E8A45C')}, @{x=0.06; y=0.84; c=(C '#4E2408')},
      @{x=0.90; y=0.72; c=(C '#C9A227')}, @{x=0.60; y=0.98; c=(C '#8A4A12')} ) }
)

$jpeg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
# Grain is incompressible noise, so it drives file size far more than the
# gradient does. 82 keeps the panels light; the cards get a little more room.
$prm = New-Object System.Drawing.Imaging.EncoderParameters(1)
$prm.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 82)
$prmCard = New-Object System.Drawing.Imaging.EncoderParameters(1)
$prmCard.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 86)

"building grain tile..."
$grain = New-GrainTile 220 30

foreach ($p in $projects) {
    # --- page panel: 4:3, no text at all ---
    $field = New-Field 60 45 $p
    $panel = Expand-Field $field 1200 900
    $field.Dispose()
    Add-Grain $panel $grain
    $dest = Join-Path $site "$($p.repo)-card.jpg"
    $panel.Save($dest, $jpeg, $prm)
    $panel.Dispose()
    "{0,-22} {1,7:N0} bytes   (page panel)" -f "$($p.repo)-card.jpg", (Get-Item $dest).Length

    # --- GitHub social preview: same field at 2:1, project name over it ---
    $field = New-Field 60 30 $p
    $card = Expand-Field $field 1280 640
    $field.Dispose()
    Add-Grain $card $grain
    $g = [System.Drawing.Graphics]::FromImage($card)
    $g.SmoothingMode = 'AntiAlias'; $g.TextRenderingHint = 'ClearTypeGridFit'
    $f  = New-Object System.Drawing.Font('Segoe UI', 76, [System.Drawing.FontStyle]::Bold)
    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = 'Center'; $sf.LineAlignment = 'Center'
    $g.DrawString($p.name, $f, (New-Object System.Drawing.SolidBrush(
        [System.Drawing.Color]::FromArgb(70, 0, 0, 0))),
        (New-Object System.Drawing.RectangleF(0, 6, 1280, 640)), $sf)
    $g.DrawString($p.name, $f, [System.Drawing.Brushes]::White,
        (New-Object System.Drawing.RectangleF(0, 0, 1280, 640)), $sf)
    $f.Dispose(); $sf.Dispose(); $g.Dispose()
    # JPEG, not PNG: GitHub rejects social previews over 1 MB, and grain makes a
    # PNG of this image about 2 MB.
    $dest = Join-Path $here "$($p.repo).jpg"
    $card.Save($dest, $jpeg, $prmCard)
    $card.Dispose()
    $kb = (Get-Item $dest).Length / 1KB
    $warn = if ($kb -gt 1000) { '  *** OVER GITHUB 1 MB LIMIT ***' } else { '' }
    "{0,-22} {1,7:N0} bytes   (GitHub social preview){2}" -f "$($p.repo).jpg", (Get-Item $dest).Length, $warn
}
$grain.Dispose()
