import { SUPPORTED_LANGUAGES } from './const';

type Lang = typeof SUPPORTED_LANGUAGES[number];
export type SourceLang = Lang | 'auto';
export type TargetLang = Lang;

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
  source_lang: SourceLang;
  target_lang: TargetLang;
};

export type ResponseParams = {
  code: number;
  message: string;
  data: string | null;
  source_lang?: SourceLang;
  target_lang?: TargetLang;
  alternatives?: string[];
};

export type Config = {
  proxyEndpoint?: string;
  customHeader?: Record<string, string>;
};
