<#
    Substitutes the live domain into every absolute URL on the site.

    Vercel only tells you the final hostname after the first deploy, so deploy
    once, then run this with whatever it gave you and redeploy:

        .\set-site-url.ps1 ashwin-rajan-portfolio.vercel.app

    Re-runnable: it rewrites whatever host is currently in place, so pointing a
    custom domain at the project later is the same one-liner.

    (ASCII only on purpose - Windows PowerShell 5.1 reads .ps1 files as ANSI
    unless they carry a BOM, and mangles anything outside it.)
#>
param(
    [Parameter(Mandatory = $true)]
    [string]$Domain
)
$ErrorActionPreference = 'Stop'

$Domain = $Domain -replace '^https?://', '' -replace '/+$', ''
if ($Domain -notmatch '^[A-Za-z0-9.-]+\.[A-Za-z]{2,}$') {
    throw "That does not look like a hostname: '$Domain'. Pass it bare, e.g. ashwin-rajan-portfolio.vercel.app"
}

$here  = Split-Path -Parent $MyInvocation.MyCommand.Path
$files = 'index.html', 'robots.txt', 'sitemap.xml'
# matches the SITE_URL placeholder and any host written by a previous run
$rx = [regex]'https://(SITE_URL|[A-Za-z0-9.-]+\.[A-Za-z]{2,})(?=[/"<\s])'
$skip = 'github\.com|linkedin\.com|sitemaps\.org|openapi\.vercel\.sh|unpkg\.com|w3\.org'

foreach ($f in $files) {
    $path = Join-Path $here $f
    $text = [System.IO.File]::ReadAllText($path)
    $script:hits = 0
    $new = $rx.Replace($text, {
        param($m)
        # leave third-party links alone
        if ($m.Groups[1].Value -match $skip) { return $m.Value }
        $script:hits++
        return "https://$Domain"
    })
    [System.IO.File]::WriteAllText($path, $new, [System.Text.UTF8Encoding]::new($false))
    "{0,-14} {1} URL(s) updated" -f $f, $script:hits
}

""
"Now pointing at https://$Domain - redeploy for the social card to resolve."
