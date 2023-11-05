import { query } from '../src/query';
import { API_URL } from '../src/const';

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        id: 1,
        result: {
          texts: [
            {
              text: 'Translated text',
              alternatives: [{ text: 'Translated text' }],
            },
          ],
        },
      }),
  })
);

describe('query', () => {
  it('sends a post request and returns the response', async () => {
    const response = await query({
      text: '翻译文本',
      source_lang: 'zh',
      target_lang: 'en',
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      API_URL,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      })
    );
    expect(response.id).toEqual(1);
    expect(response.code).toEqual(200);
    expect(response.data).toEqual('Translated text');
    expect(response.alternatives).toEqual(['Translated text']);
    expect(response.source_lang).toBe('zh');
    expect(response.target_lang).toBe('en');
  });
});
