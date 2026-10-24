# Aldrin Jaison — Interactive Portfolio v2

## Included
- `index.html` — improved hero, photo slot, project gallery, skills, education/experience, certificate cards and contact form
- `style.css` — dark/light theme styles, responsive layout, animated background, orbit effects, card hover, scroll reveals
- `script.js` — theme toggle, typing text, mobile menu, filters, scroll progress, contact mail draft, profile link configuration
- `assets/` — put your real profile photo, project screenshots and resume here

## Personalize before publishing
1. In `script.js`, update the `PROFILE` object:
   - `email`
   - `githubUsername`
   - `linkedinUsername` (username only, not the full URL)
2. In `index.html`, update the social links and each project repository URL.
3. Add your photo as `assets/profile.jpg`. If absent, initials `AJ` display instead.
4. Add real screenshots using these optional filenames:
   - `assets/alzheimers-project.png`
   - `assets/resume-analyzer.png`
   - `assets/telecalling-crm.png`
   The CSS artwork stays visible if a screenshot file is missing.
5. Add your own PDF as `assets/resume.pdf` for the resume button.
6. Replace certificate placeholder text and links with real certificates, or remove the section/cards.
7. Update experience/course dates and details. Remove any entry that isn't accurate.
8. Review skill bars; they are illustrative and should not be presented as objective scores.

## Run locally
Open `index.html` in a browser. No package install or build step is needed.

## GitHub Pages
Upload `index.html`, `style.css`, `script.js`, `README.md`, and the `assets` folder to the root of a public repository. In Settings → Pages, choose Deploy from a branch, select `main` and `/(root)`, then Save.

## Contact form
The form opens the visitor's email app with a prefilled draft using `mailto:`. It does not submit to a server or store messages.
