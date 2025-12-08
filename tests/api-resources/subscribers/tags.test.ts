// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Sequenzy from 'sequenzy';

const client = new Sequenzy({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tags', () => {
  // Prism tests are disabled
  test.skip('add: only required params', async () => {
    const responsePromise = client.subscribers.tags.add({ email: 'user@example.com', tag: 'premium' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('add: required and optional params', async () => {
    const response = await client.subscribers.tags.add({
      email: 'user@example.com',
      tag: 'premium',
      customAttributes: { foo: 'bar' },
    });
  });

  // Prism tests are disabled
  test.skip('addMultiple: only required params', async () => {
    const responsePromise = client.subscribers.tags.addMultiple({
      email: 'user@example.com',
      tags: ['premium', 'newsletter', 'vip'],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('addMultiple: required and optional params', async () => {
    const response = await client.subscribers.tags.addMultiple({
      email: 'user@example.com',
      tags: ['premium', 'newsletter', 'vip'],
      customAttributes: { foo: 'bar' },
    });
  });
});
