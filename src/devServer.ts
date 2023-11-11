import { Hono } from 'hono';
import { query } from './query';
import { RequestParams } from './types';

const app = new Hono();

app.get('/', c => {
  return c.redirect('/translate');
});

app.get('/translate', c => {
  return c.text('Please use post method to request');
});

app.post('/translate', async c => {
  let params: RequestParams;
  try {
    params = await c.req.json();
  } catch (error) {}
  // @ts-ignore
  return c.json(await query(params));
});

export default { port: 3000, fetch: app.fetch };
