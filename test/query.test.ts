import fetch from 'jest-fetch-mock';
import { query } from '../src/query';
import { ResponseParams } from '../src/types';

jest.setMock('node-fetch', fetch);

describe('query', () => {
  it('should respond with 404', async () => {
    const result = {
      code: 404,
      message: 'No Translate Text Found',
      data: null,
    };
    // @ts-ignore
    const response1 = await query();
    expect(response1).toEqual(result);

    // @ts-ignore
    const response2 = await query({});
    expect(response2).toEqual(result);

    // @ts-ignore
    const response3 = await query({ text: '' });
    expect(response3).toEqual(result);
  });

  it('should be a correct return result (zh -> en)', async () => {
    let response: ResponseParams | undefined;
    try {
      response = await query({
        text: '翻译文本',
        source_lang: 'zh',
        target_lang: 'en',
      });
      expect(response.code).toEqual(200);
      expect(response.message).toEqual('success');
      expect(response.data).toEqual('Translated text');
      expect(response.source_lang).toEqual('zh');
      expect(response.target_lang).toEqual('en');
      expect(response.alternatives).toBeInstanceOf(Array);
      if (!!response.alternatives?.length) {
        expect(
          response.alternatives.every(
            (text: string) => typeof text === 'string'
          )
        ).toBe(true);
      }
    } catch (error) {
      console.log('>> response', response);
      throw error;
    }
  });

  it('should be a correct return result (en -> zh)', async () => {
    let response: ResponseParams | undefined;
    try {
      response = await query({
        text: 'Translated text',
        source_lang: 'en',
        target_lang: 'zh',
      });
      expect(response.code).toEqual(200);
      expect(response.message).toEqual('success');
      expect(response.data).toEqual('翻译文本');
      expect(response.source_lang).toEqual('en');
      expect(response.target_lang).toEqual('zh');
      expect(response.alternatives).toBeInstanceOf(Array);
      if (!!response.alternatives?.length) {
        expect(
          response.alternatives.every(
            (text: string) => typeof text === 'string'
          )
        ).toBe(true);
      }
    } catch (error) {
      console.log('>> response', response);
      throw error;
    }
  });
});
