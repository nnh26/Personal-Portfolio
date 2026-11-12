# Nowshin Hoque — portfolio

Live site: https://nnh26.github.io/Personal-Portfolio/

Static HTML, CSS, and a little JavaScript, deployed with GitHub Pages. No build step.

| File | What it is |
|---|---|
| `index.html` | The whole portfolio: work, experience, what I'm building next, about, contact |
| `assets/site.js` | Light/dark toggle and sidebar highlighting |
| `Resume.html` | Resume page, with a download link to `Nowshin-Hoque-Resume.pdf` |
| `Nowshin-Hoque-Resume.pdf` | The resume PDF. Replace this file to update the download |
| `Calculator.html` | Standalone calculator |
| `assets/site.css` | All styles and design tokens |
| `assets/calc.js` | Calculator logic |
| `assets/fonts/` | Bricolage Grotesque, self-hosted (SIL Open Font License) |
| `GetStarted.html`, `Projects.html`, `Contact.html` | Redirects from the old site's pages |

To preview locally: `python3 -m http.server` in this folder, then open http://localhost:8000.

To add a project, copy one of the `<li class="card">` blocks in `index.html`. Add `wide` to the class to make it span both columns.
