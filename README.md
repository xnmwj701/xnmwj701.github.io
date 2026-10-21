# METRIC Lab website

This is the Jekyll source for the METRIC Lab website. The site uses the Academic Pages theme; its license is in `LICENSE`.

## Edit content

| Content | File |
| --- | --- |
| Home page | `_pages/about.md` |
| Campus carousel images and captions | `_data/home.yml`, `images/campus1.png` through `images/campus3.png` |
| Latest news | `_data/news.yml` |
| Biography and teaching | `_pages/biography.md` |
| Publications and selected publications | `_data/publications.yml` |
| Research projects and funding | `_data/projects.yml` |
| Laboratory hardware | `_pages/lab.md` |
| Contact | `_pages/contact.md` |
| Navigation | `_data/navigation.yml` |
| Site title, lab description and sidebar profile | `_config.yml` |
| Layout and styling | `_sass/layout/_modern.scss`, `assets/css/main.scss` |

Publication figures live in `images/`. BibTeX downloads live in `files/`. Keep file paths in the data files consistent with the actual filenames.

## Preview locally

With Docker Desktop running:

```powershell
docker compose up --build -d
```

Open <http://localhost:4002/>. Edits to site content normally trigger a rebuild; refresh the browser. After changing `_config.yml`, restart the preview:

```powershell
docker compose restart
```

Stop the preview with `docker compose down`. To change the host port, set `JEKYLL_PORT` before starting Compose.

Alternatively, with Ruby and Bundler installed, run `bundle install` and `bundle exec jekyll serve --livereload`.

## Check changes

```powershell
git diff --check
bundle exec jekyll build
```

`_site/` and `.sass-cache/` are generated locally and are ignored by Git. The redirect pages for `/teaching/`, `/research/`, and `/projects/` are intentional; keep them so existing links continue to work.
