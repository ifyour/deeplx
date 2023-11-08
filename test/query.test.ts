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
  it('should have a correct return format', async () => {
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
    expect(response).toEqual({
      code: 200,
      message: 'success',
      data: 'Translated text',
      alternatives: ['Translated text'],
      source_lang: 'zh',
      target_lang: 'en',
    });
  });
});
