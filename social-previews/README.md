# GitHub social previews

1280×640 PNG masters for the three project repos, in the portfolio's palette
(cream `#FAF7F0`, ink `#2E2A26`, bronze `#8B6B3E`, gold `#C9A227`). The watermark
on each is the project's initial set in Codex — the blueprint-construction face
the portfolio uses for its "Ashwin Rajan" wordmark — so the cards and the page
share their most distinctive typography.

Note that FedLearn and Flimo both take an `F`. They are never seen side by side
on GitHub, but they do follow one another down the portfolio page; change
`initial` in `cards.ps1` if that bothers you.

| file            | repo                                              |
| --------------- | ------------------------------------------------- |
| `trustlens.png` | https://github.com/ashwinrajan-159/trustlens      |
| `fedlearn.png`  | https://github.com/ashwinrajan-159/fedlearn       |
| `flimo.png`     | https://github.com/ashwinrajan-159/flimo          |

## Uploading

There is no API for the social preview — it is web-UI only. Per repo:

1. Open the repo → **Settings** (repo settings, not account settings)
2. **General**, scroll to **Social preview**
3. **Edit → Upload an image**, pick the matching PNG
4. While you are on that page, set the repo **description** — without one,
   GitHub's link previews elsewhere still fall back to the bare `owner/repo`
   stats card. Suggested:
   - **trustlens** — Explainable fraud detection backend: OCR to risk-scoring
     pipeline, WORM audit trail with a tamper-evident hash chain, SHAP-explained
     verdicts.
   - **fedlearn** — Browser-native federated learning: zero-copy binary
     transport, Top-K sparsification, INT8 quantization, differential privacy
     with a Rényi accountant.
   - **flimo** — FAISS semantic search with a hybrid personalization engine on a
     single EC2 instance; 68-second deploys.

GitHub caches previews, so a card can take a few minutes to appear in link
unfurls. Check with `curl -s https://github.com/<owner>/<repo> | grep og:image`.

## Regenerating

Built by `cards.ps1` (kept alongside these files). It needs
`../ashwin-rajan-portfolio/assets/fonts/MythologV2.ttf` for the ornament. Edit the
`$cards` table to change copy, then re-run:

```powershell
.\cards.ps1
```

The portfolio uses JPEG re-encodes of these same images at
`../ashwin-rajan-portfolio/assets/img/<repo>-card.jpg`; regenerate those too if
you change the masters.
