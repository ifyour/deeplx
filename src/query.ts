import { RequestParams, ResponseParams } from './types';
import {
  API_URL,
  DEFAULT_LANGUAGE,
  REQUEST_ALTERNATIVES,
  DEFAULT_REQUEST_PARAMS,
} from './const';

function buildRequestParams(sourceLang: string, targetLang: string) {
  return {
    jsonrpc: '2.0',
    method: 'LMT_handle_texts',
    id: Math.floor(Math.random() * 100000 + 100000) * 1000,
    params: {
      texts: [{ text: '', requestAlternatives: REQUEST_ALTERNATIVES }],
      timestamp: 0,
      splitting: 'newlines',
      lang: {
        source_lang_user_selected: sourceLang,
        target_lang: targetLang,
      },
    },
  };
}

function countLetterI(translateText: string) {
  return translateText.split('i').length - 1;
}

function getTimestamp(letterCount: number) {
  const timestamp = new Date().getTime();
  return letterCount !== 0
    ? timestamp - (timestamp % (letterCount + 1)) + (letterCount + 1)
    : timestamp;
}

function buildRequestBody(data: RequestParams) {
  const requestData = buildRequestParams(
    data.source_lang || DEFAULT_LANGUAGE,
    data.target_lang || DEFAULT_LANGUAGE
  );
  requestData.params.texts = [
    { text: data.text, requestAlternatives: REQUEST_ALTERNATIVES },
  ];
  requestData.params.timestamp = getTimestamp(countLetterI(data.text));

  let requestString = JSON.stringify(requestData);
  if (
    [0, 3].includes((requestData['id'] + 5) % 29) ||
    (requestData['id'] + 3) % 13 === 0
  ) {
    requestString = requestString.replace('"method":"', '"method" : "');
  } else {
    requestString = requestString.replace('"method":"', '"method": "');
  }

  return requestString;
}

async function query(params: RequestParams) {
  const response = await fetch(API_URL, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    method: 'POST',
    body: buildRequestBody(Object.assign({}, DEFAULT_REQUEST_PARAMS, params)),
  });

  if (response.ok) {
    const { id, result } = (await response.json()) as ResponseParams;
    return {
      id,
      code: 200,
      data: result?.texts?.[0]?.text,
      source_lang: params?.source_lang,
      target_lang: params?.target_lang,
      alternatives: result.texts?.[0]?.alternatives?.map?.(item => item.text),
    };
  }

  return {
    id: 42,
    code: response.status,
    data:
      response.status === 429
        ? 'Too many requests, please try again later.'
        : response.statusText || 'Unknown error.',
  };
}

export { query };
