# Online Safety Mission

A PSHE online safety training for Grade 8 at St. Nicholas School (Pinheiros, São Paulo): one school day, nine challenges, and a Capture the Flag bonus for students who pass with 70%.

It is plain HTML, CSS and JavaScript with no build step. It saves nothing: no names, no scores, no progress.

## Where it lives
- **Source:** the `pshe/online-safety/` folder of the private Student Portal repository. Change it there.
- **This repository** is a copy of that folder, published with GitHub Pages so the school has a link to share.

To publish a change, from the Student Portal folder:

```bash
git subtree split --prefix=pshe/online-safety -b pshe-pages
git push https://github.com/gsaldanha-dev/pshe-online-safety.git pshe-pages:main --force
git branch -D pshe-pages
```

## Testing
Add `?fase=N` (1–9) to the address to jump to a challenge, or `?fase=fim` for the end screen with the bonus unlocked.
