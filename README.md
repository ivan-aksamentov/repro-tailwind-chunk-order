# repro-tailwind-chunk-order

Demonstrates situation when webpacks emits CSS selectors in wrong order, such that Preflights' resets go after
Tailwind's own styles and override them.

## Run locally

```
git clone https://github.com/ivan-aksamentov/repro-tailwind-chunk-order
cd repro-tailwind-chunk-order
yarn install && yarn dev:watch

```

## Alternatively, run with docker (requires recent `docker` and `docker-compose` installed):

```bash
git clone https://github.com/ivan-aksamentov/repro-tailwind-chunk-order
cd repro-tailwind-chunk-order
UID=$(id -u) docker-compose up

```

## Inspect CSS

Open CSS bundle (`dist/development/content/main.css`) in text editor. Observe, for example:

```css
/* dist/development/content/main.css, line 14 */
h1{
  font-size:2em;
  margin:.67em 0;
}

```

```css
/* dist/development/content/main.css, line 218 */
h1,h2,h3,h4,h5,h6{
  font-size:inherit;
  font-weight:inherit;
}

```

Open [`http://localhost:3000`](http://localhost:3000) in browser. Observe, for example that heading ("Lorem ipsum") have
the same font size as paragraphs.
