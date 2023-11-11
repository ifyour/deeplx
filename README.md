# DeepLx

⚡️ DeepLx API npm package.

[![test](https://badgen.net/github/checks/ifyour/deeplx/main?label=CI)](https://github.com/ifyour/deeplx/actions/workflows/main.yml)
[![dw](https://badgen.net/npm/dt/@ifyour/deeplx?label=Downloads)](https://www.npmjs.com/package/@ifyour/deeplx)

## Usage

```bash
npm i @ifyour/deeplx
```

In your backend service, install and use this package, you can use any backend framework you like. Here's a demo of my deployment on [AirCode](https://aircode.io), you can [click here](https://github.com/ifyour/deeplx-js) to deploy one of your own.

```js
import { query } from '@ifyour/deeplx';

export default async function(params, context) {
  return await query(params);
}
```

```curl
curl --location 'https://nw6usm5uha.us.aircode.run/demo' \
--header 'Content-Type: application/json' \
--data '{
    "text": "你好，世界",
    "source_lang": "zh",
    "target_lang": "en"
}'
```

```json
{
  "code": 200,
  "message": "success",
  "data": "Hello, world.",
  "source_lang": "zh",
  "target_lang": "en",
  "alternatives": ["Hello, World.", "Hello, world!", "Hi, world."]
}
```

![demo](https://images.mingming.dev/file/d1c6fd89334f18b34d9ac.png)

## Dev

```bash
yarn install

# You need to install bun, please refer to https://bun.sh
yarn run dev

yarn run test

yarn run lint --fix
```

## Known issues

Based on current testing, Cloudflare and Cloudflare-based edge function runtimes (Vercel) are not able to correctly request the DeepL server, and a 525 error occurs, a detailed description of the issue can be found [here](https://github.com/cloudflare/workerd/issues/776).

## License

DeepLx is available under the MIT license.
