# minimon

A minimal Node.js restarter based on [zx](https://github.com/google/zx).

A modest [`nodemon`](https://github.com/remy/nodemon) replacement.

Check out [the blog post covering how it was written](https://hire.jonasgalvez.com.br/2022/mar/20/building-your-own-nodemon).

## Install

```bash
npm i minimon -g
```

## Usage

```bash
minimon app.js
```

## Configuration

Just create `minimon.conf` and override the defaults. JSON5 is accepted.

```js
{
  watch: ['**/*.mjs', '**/*.js'],
  ignored: ['**/node_modules/**'],
}
```