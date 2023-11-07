# DeepLx

DeepLx API npm package.

## Usage

```bash
npm i @ifyour/deeplx
```

```js
const { query } = require('@ifyour/deeplx');

module.exports = async function(params) {
  return await query(params);
};
```

![demo](https://images.mingming.dev/file/2c28df4c563c697f3763d.png)

## Dev

```bash
yarn install

# You need to install bun, please refer to https://bun.sh
yarn run dev

yarn run test

yarn run lint --fix

yarn run publish
```

## Known issues

Based on current testing, Cloudflare and Cloudflare-based edge function runtimes (Vercel) are not able to correctly request the DeepL server, and a 525 error occurs, a detailed description of the issue can be found [here](https://github.com/cloudflare/workerd/issues/776).
