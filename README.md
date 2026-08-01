# Portfolio

Personal portfolio of Ashwin Rajan — backend and cloud infrastructure engineer.
Live site: **[ashwin-rajan-portfolio/](ashwin-rajan-portfolio/)** (static HTML, no
build step).

```
ashwin-rajan-portfolio/       the deployable site  <- Vercel serves this
social-previews/              1280x640 GitHub social preview cards + generator
Ashwin Rajan Portfolio.html   original single-file bundle (source of record)
Ashwin_Rajan_Resume*.pdf      résumé, current + previous
```

## Deploying

The site is a **subdirectory**, so when importing this repo on Vercel set:

> **Root Directory** = `ashwin-rajan-portfolio`

Framework Preset *Other*; leave the build and output commands blank. Full notes,
including the post-deploy step that stamps the real domain into the canonical URL
and `og:image`, are in
[ashwin-rajan-portfolio/README.md](ashwin-rajan-portfolio/README.md).

## History

`main` previously held a Create React App + Tailwind portfolio (31 commits, last
touched 2026-05-18). It was replaced by the static site in this tree, but nothing
was discarded: those commits are still in `main`'s history and the tip is also
kept on the **`react-portfolio`** branch.

```bash
git switch react-portfolio    # the React version, intact
```
