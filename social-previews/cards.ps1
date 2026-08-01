$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$out   = 'c:\Users\ashwin\Desktop\ash\social-previews'
$fonts = 'c:\Users\ashwin\Desktop\ash\ashwin-rajan-portfolio\assets\fonts'
if (-not (Test-Path $out)) { New-Item -ItemType Directory $out | Out-Null }

# Codex is the blueprint-construction face the portfolio sets its wordmark in;
# its caps carry the drafting geometry, which suits the watermark better than a
# figurative ornament would.
$pfc = New-Object System.Drawing.Text.PrivateFontCollection
$pfc.AddFontFile("$fonts\Codex.ttf")
$codexFam = $pfc.Families | Where-Object { $_.Name -like '*odex*' }

$dot = [char]0x00B7
$cream  = [System.Drawing.ColorTranslator]::FromHtml('#FAF7F0')
$ink    = [System.Drawing.ColorTranslator]::FromHtml('#2E2A26')
$bronze = [System.Drawing.ColorTranslator]::FromHtml('#8B6B3E')
$gold   = [System.Drawing.ColorTranslator]::FromHtml('#C9A227')
$muted  = [System.Drawing.ColorTranslator]::FromHtml('#5D564F')
$olive  = [System.Drawing.ColorTranslator]::FromHtml('#6B7D3D')

$W = 1280; $H = 640          # GitHub renders social previews at 1280x640

$cards = @(
  @{
    repo    = 'trustlens'; num = '01'; initial = 'T'
    name    = 'TrustLens'
    tagline = 'Explainable fraud detection platform'
    proof   = 'Idempotent OCR to risk-scoring pipeline, a WORM audit trail with a'
    proof2  = 'tamper-evident hash chain, every ML verdict explained with SHAP.'
    stack   = "FASTAPI $dot CELERY $dot REDIS $dot POSTGRESQL $dot KAFKA"
  },
  @{
    repo    = 'fedlearn'; num = '02'; initial = 'F'
    name    = 'FedLearn'
    tagline = 'Browser-native federated learning'
    proof   = 'Zero-copy binary transport cut tensor serialization 45ms to under 1ms;'
    proof2  = 'geometric-median aggregation tolerates 30-40% adversarial workers.'
    stack   = "WEBSOCKETS $dot BINARY TRANSPORT $dot FEDBUFF $dot DIFFERENTIAL PRIVACY"
  },
  @{
    repo    = 'flimo'; num = '03'; initial = 'F'
    name    = 'Flimo'
    tagline = 'Semantic search platform'
    proof   = 'FAISS search and a hybrid personalization engine on one EC2 instance:'
    proof2  = '68-second deploys, roughly $34 a month of infrastructure.'
    stack   = "FAISS $dot FASTAPI $dot NGINX $dot AWS EC2 $dot CLOUDFLARE"
  }
)

foreach ($c in $cards) {
    $bmp = New-Object System.Drawing.Bitmap($W, $H)
    $g   = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode     = 'AntiAlias'
    $g.TextRenderingHint = 'ClearTypeGridFit'
    $g.InterpolationMode = 'HighQualityBicubic'
    $g.Clear($cream)

    # luminous wash on the right, echoing the page's blurred gradient blobs
    foreach ($blob in @(
        @{ x = 660; y = -160; w = 780; h = 760; c = $gold;   a = 95 },
        @{ x = 900; y =  220; w = 640; h = 640; c = $olive;  a = 62 },
        @{ x = 560; y =  320; w = 620; h = 560; c = $bronze; a = 52 }
    )) {
        $rect = New-Object System.Drawing.Rectangle($blob.x, $blob.y, $blob.w, $blob.h)
        $path = New-Object System.Drawing.Drawing2D.GraphicsPath
        $path.AddEllipse($rect)
        $pb = New-Object System.Drawing.Drawing2D.PathGradientBrush($path)
        $pb.CenterColor    = [System.Drawing.Color]::FromArgb($blob.a, $blob.c)
        $pb.SurroundColors = @([System.Drawing.Color]::FromArgb(0, $blob.c))
        $g.FillEllipse($pb, $rect)
        $pb.Dispose(); $path.Dispose()
    }

    # project initial in Codex, watermark weight, sized to a target cap height
    # and nudged off the right edge so it reads as a mark rather than a letter
    $fOrn = New-Object System.Drawing.Font($codexFam, 330)
    $sz   = $g.MeasureString($c.initial, $fOrn)
    $g.DrawString($c.initial, $fOrn, (New-Object System.Drawing.SolidBrush(
        [System.Drawing.Color]::FromArgb(40, $ink))),
        ($W - $sz.Width + 26), (($H - $sz.Height) / 2))
    $fOrn.Dispose()

    $fOwner = New-Object System.Drawing.Font('Consolas', 15)
    $fNum   = New-Object System.Drawing.Font('Consolas', 15)
    $fName  = New-Object System.Drawing.Font('Segoe UI', 74, [System.Drawing.FontStyle]::Bold)
    $fTag   = New-Object System.Drawing.Font('Segoe UI Semibold', 30)
    $fProof = New-Object System.Drawing.Font('Segoe UI', 18)
    $fStack = New-Object System.Drawing.Font('Consolas', 14)

    $bInk    = New-Object System.Drawing.SolidBrush($ink)
    $bBronze = New-Object System.Drawing.SolidBrush($bronze)
    $bMuted  = New-Object System.Drawing.SolidBrush($muted)
    $bGold   = New-Object System.Drawing.SolidBrush($gold)

    $x = 92
    $g.DrawString("$($c.num)  $dot  ASHWINRAJAN-159 / $($c.repo.ToUpper())", $fOwner, $bBronze, $x, 74)
    $g.DrawString($c.name,    $fName,  $bInk,   ($x - 8), 118)
    $g.FillRectangle($bGold, $x, 268, 176, 6)
    $g.DrawString($c.tagline, $fTag,   $bInk,   ($x - 3), 314)
    $g.DrawString($c.proof,   $fProof, $bMuted, ($x - 2), 392)
    $g.DrawString($c.proof2,  $fProof, $bMuted, ($x - 2), 424)
    $g.DrawString($c.stack,   $fStack, $bMuted, $x, 522)

    # bronze -> gold rule along the bottom, matching the page's accent lines
    $barRect = New-Object System.Drawing.Rectangle(0, ($H - 9), $W, 9)
    $lg = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-Object System.Drawing.Rectangle(-2, ($H - 9), ($W + 4), 9)), $bronze, $gold, 0.0)
    $g.FillRectangle($lg, $barRect)
    $lg.Dispose()

    $p = Join-Path $out "$($c.repo).png"
    $bmp.Save($p, [System.Drawing.Imaging.ImageFormat]::Png)
    foreach ($d in @($fOwner, $fNum, $fName, $fTag, $fProof, $fStack, $bInk, $bBronze, $bMuted, $bGold, $g, $bmp)) { $d.Dispose() }
    "{0,-12} {1,8:N0} bytes" -f $c.repo, (Get-Item $p).Length
}
