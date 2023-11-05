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
git clone https://github.com/ifyour/deeplx.git

cd deeplx

yarn && yarn start

yarn test

yarn lint --fix
```
