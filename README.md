# Phetolo Tshukudu — Portfolio

Static, deployable developer portfolio built with plain HTML, CSS and JavaScript.

## Files

- `index.html` — portfolio content and structure
- `styles.css` — responsive design
- `script.js` — mobile navigation and scroll reveal
- `assets/Phetolo-Tshukudu-CV.pdf` — downloadable CV
- `404.html` — GitHub Pages fallback

## Deploy to GitHub Pages

### If this replaces `phetolo-tshukudu.github.io`
1. Copy all files in this folder into the root of the `phetolo-tshukudu.github.io` repository.
2. Commit and push to `main`.
3. In GitHub: **Settings → Pages → Build and deployment → Deploy from a branch**.
4. Select `main` and `/ (root)`.
5. The site should be available at `https://phetolo-tshukudu.github.io/`.

### Test locally

Run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Editing

Most text can be changed directly in `index.html`. Project URLs are hard-coded so the portfolio remains reliable without depending on the GitHub API at runtime.
