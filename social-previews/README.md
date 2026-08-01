# Project imagery

`make-images.ps1` generates **two** sets of images from one mesh-gradient engine:

| output | goes to | contents |
| --- | --- | --- |
| `<repo>.jpg` (1280×640) | this folder → upload to GitHub | gradient + project name |
| `<repo>-card.jpg` (1200×900) | `../ashwin-rajan-portfolio/assets/img/` | gradient only, no text |

JPEG, not PNG: GitHub rejects social previews over 1 MB and the grain makes a PNG
of these about 2 MB. The script prints a warning if any card crosses that line.

The page panels carry no text because the project name, tagline and stack are
already beside them in the layout. The GitHub cards keep the name, because on a
repo page nothing else identifies them.

Each project leads with one colour of the portfolio triad at full saturation —
gold for TrustLens, olive for FedLearn, bronze for Flimo — so the three read as a
family without being interchangeable.

## Uploading the social previews

There is no API for the social preview; it is web-UI only. Per repo:

1. Open the repo → **Settings** (repo settings, not account settings)
2. **General**, scroll to **Social preview**
3. **Edit → Upload an image**, pick the matching PNG
4. While you are there, set the repo **description** — without one, GitHub's link
   previews elsewhere still fall back to a bare `owner/repo` stats card:
   - **trustlens** — Explainable fraud detection backend: OCR to risk-scoring
     pipeline, WORM audit trail with a tamper-evident hash chain, SHAP-explained
     verdicts.
   - **fedlearn** — Browser-native federated learning: zero-copy binary transport,
     Top-K sparsification, INT8 quantization, differential privacy with a Rényi
     accountant.
   - **flimo** — FAISS semantic search with a hybrid personalization engine on a
     single EC2 instance; 68-second deploys.

| file | repo |
| --- | --- |
| `trustlens.jpg` | https://github.com/ashwinrajan-159/trustlens |
| `fedlearn.jpg` | https://github.com/ashwinrajan-159/fedlearn |
| `flimo.jpg` | https://github.com/ashwinrajan-159/flimo |

GitHub caches previews, so a card can take a few minutes to show up in link
unfurls. Check with `curl -s https://github.com/<owner>/<repo> | grep og:image`.

## How the gradients are made

Four layers stack up, tunable per project in the `$projects` table:

| layer | what it does |
| --- | --- |
| **mesh** | six colour points blended by inverse-distance weighting |
| **core** | a gaussian bloom toward a bright tint, offset from centre so the image has a subject rather than being uniformly lit |
| **vignette** | quadratic falloff into the corners, widening the value range |
| **grain** | fine film noise over the top |

GDI+ has no blur filter, so a mesh built from overlapping shapes comes out with
hard edges. Instead the first three layers are evaluated **per pixel at 60×45**
and upscaled bicubically in stages — the upscale *is* the blur, and because it
resamples real data rather than smearing pixels it stays perfectly smooth. It
renders ~14% oversized and centre-crops, since bicubic sampling runs past the
source edge and leaves a pale halo.

Grain has to be applied *after* the upscale or it would be blurred away, so it is
tiled on at 1:1 from a 220×220 speckle tile. Mid-grey in that tile is fully
transparent, so the noise adds texture without desaturating the gradient. The
tile uses a fixed seed, so re-running the script reproduces the same images.

Grain is incompressible, and it — not the gradient — dominates file size. That is
why quality sits at 82 for the panels and 86 for the cards; raising the grain
strength raises every file substantially.

## Regenerating

```powershell
.\make-images.ps1
```

Needs nothing but Windows PowerShell and `System.Drawing`. It overwrites both
sets, so the page and the GitHub cards never drift apart.
