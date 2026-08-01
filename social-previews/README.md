# Project imagery

`make-images.ps1` generates **two** sets of images from one mesh-gradient engine:

| output | goes to | contents |
| --- | --- | --- |
| `<repo>.png` (1280×640) | this folder → upload to GitHub | gradient + project name |
| `<repo>-card.jpg` (1200×900) | `../ashwin-rajan-portfolio/assets/img/` | gradient only, no text |

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
| `trustlens.png` | https://github.com/ashwinrajan-159/trustlens |
| `fedlearn.png` | https://github.com/ashwinrajan-159/fedlearn |
| `flimo.png` | https://github.com/ashwinrajan-159/flimo |

GitHub caches previews, so a card can take a few minutes to show up in link
unfurls. Check with `curl -s https://github.com/<owner>/<repo> | grep og:image`.

## How the gradients are made

GDI+ has no blur filter, so a mesh built from overlapping shapes comes out with
hard edges. Instead the script evaluates the mesh **per pixel at 40×30** using
inverse-distance weighting across six colour points, then upscales bicubically in
stages. The upscale is the blur, and because it is resampling real data rather
than smearing pixels it stays perfectly smooth.

It renders ~14% oversized and centre-crops: bicubic sampling runs past the source
edge and leaves a pale halo, which the crop removes.

## Regenerating

```powershell
.\make-images.ps1
```

Needs nothing but Windows PowerShell and `System.Drawing`. It overwrites both
sets, so the page and the GitHub cards never drift apart.
