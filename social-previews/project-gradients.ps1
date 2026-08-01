<#
    Generates the gradient panels used for the three project image slots on the
    portfolio page. These are deliberately text-free: the project name, tagline
    and stack already sit in the left column of the same row, so anything written
    here would just repeat it.

    Output goes straight to the site at ../ashwin-rajan-portfolio/assets/img/.
    The full text-bearing cards in this folder are a separate thing - those are
    the GitHub social previews.

    (ASCII only - Windows PowerShell 5.1 reads .ps1 as ANSI without a BOM.)
#>
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$here  = Split-Path -Parent $MyInvocation.MyCommand.Path
$out   = Join-Path $here '..\ashwin-rajan-portfolio\assets\img'
$fonts = Join-Path $here '..\ashwin-rajan-portfolio\assets\fonts'

$pfc = New-Object System.Drawing.Text.PrivateFontCollection
$pfc.AddFontFile((Join-Path $fonts 'Codex.ttf'))
$codexFam = $pfc.Families | Where-Object { $_.Name -like '*odex*' }

$cream  = [System.Drawing.ColorTranslator]::FromHtml('#FAF7F0')
$ink    = [System.Drawing.ColorTranslator]::FromHtml('#2E2A26')
$bronze = [System.Drawing.ColorTranslator]::FromHtml('#8B6B3E')
$gold   = [System.Drawing.ColorTranslator]::FromHtml('#C9A227')
$olive  = [System.Drawing.ColorTranslator]::FromHtml('#6B7D3D')

# 4:3, close to the panels' aspect so object-fit:cover crops very little
$W = 1200; $H = 900

# One dominant hue each, so the three read as a family without being identical.
$panels = @(
  @{
    file = 'trustlens-card.jpg'; initial = 'T'
    blobs = @(
      @{ x = -140; y = -220; w = 900; h = 880; c = $gold;   a = 150 },
      @{ x =  520; y =  260; w = 860; h = 800; c = $bronze; a = 120 },
      @{ x =  240; y =  480; w = 720; h = 640; c = $olive;  a =  70 }
    )
  },
  @{
    file = 'fedlearn-card.jpg'; initial = 'F'
    blobs = @(
      @{ x =  420; y = -200; w = 900; h = 860; c = $olive;  a = 140 },
      @{ x = -180; y =  180; w = 880; h = 820; c = $gold;   a = 130 },
      @{ x =  380; y =  460; w = 760; h = 660; c = $bronze; a =  85 }
    )
  },
  @{
    file = 'flimo-card.jpg'; initial = 'F'
    blobs = @(
      @{ x =  260; y = -260; w = 940; h = 900; c = $bronze; a = 135 },
      @{ x = -220; y =  300; w = 900; h = 800; c = $gold;   a = 140 },
      @{ x =  560; y =  420; w = 720; h = 680; c = $olive;  a =  80 }
    )
  }
)

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$prm = New-Object System.Drawing.Imaging.EncoderParameters(1)
$prm.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 86)

foreach ($p in $panels) {
    $bmp = New-Object System.Drawing.Bitmap($W, $H)
    $g   = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = 'AntiAlias'; $g.TextRenderingHint = 'AntiAliasGridFit'
    $g.Clear($cream)

    foreach ($b in $p.blobs) {
        $rect = New-Object System.Drawing.Rectangle($b.x, $b.y, $b.w, $b.h)
        $path = New-Object System.Drawing.Drawing2D.GraphicsPath
        $path.AddEllipse($rect)
        $pb = New-Object System.Drawing.Drawing2D.PathGradientBrush($path)
        $pb.CenterColor    = [System.Drawing.Color]::FromArgb($b.a, $b.c)
        $pb.SurroundColors = @([System.Drawing.Color]::FromArgb(0, $b.c))
        $g.FillEllipse($pb, $rect)
        $pb.Dispose(); $path.Dispose()
    }

    # centred so object-fit:cover cannot clip it
    $fOrn = New-Object System.Drawing.Font($codexFam, 300)
    $sz   = $g.MeasureString($p.initial, $fOrn)
    $g.DrawString($p.initial, $fOrn,
        (New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(30, $ink))),
        (($W - $sz.Width) / 2), (($H - $sz.Height) / 2))
    $fOrn.Dispose()

    $dest = Join-Path $out $p.file
    $bmp.Save($dest, $codec, $prm)
    $g.Dispose(); $bmp.Dispose()
    "{0,-22} {1,7:N0} bytes" -f $p.file, (Get-Item $dest).Length
}
