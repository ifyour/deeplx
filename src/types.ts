export type RawResponseParams = {
  jsonrpc: string;
  id: number;
  result: {
    texts: {
      alternatives: {
        text: string;
      }[];
      text: string;
    }[];
    lang: string;
    lang_is_confident: boolean;
    detectedLanguages: { unsupported: number } & Record<string, number>;
  };
};

export type RequestParams = {
  text: string;
  source_lang: string;
  target_lang: string;
};

export type ResponseParams = {
  code: number;
  message: string;
  data: string | null;
  source_lang?: string;
  target_lang?: string;
  alternatives?: string[];
};

export type Config = {
  proxyEndpoint?: string;
};
