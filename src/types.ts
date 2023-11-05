
export type RequestParams = {
  text: string;
  source_lang: string;
  target_lang: string
}

export type ResponseParams = {
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
}
