// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Sequenzy from 'sequenzy';

const client = new Sequenzy({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource events', () => {
  // Mock server tests are disabled
  test.skip('trigger: only required params', async () => {
    const responsePromise = client.subscribers.events.trigger({ event: 'purchase.completed' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('trigger: required and optional params', async () => {
    const response = await client.subscribers.events.trigger({
      event: 'purchase.completed',
      customAttributes: { foo: 'bar' },
      email: 'user@example.com',
      eventId: 'inv_9182',
      externalId: 'user_123',
      firstName: 'John',
      lastName: 'Doe',
      occurredAt: '2024-11-02T10:00:00Z',
      properties: {
        amount: 'bar',
        currency: 'bar',
        productId: 'bar',
      },
    });
  });

  // Mock server tests are disabled
  test.skip('triggerMultiple: only required params', async () => {
    const responsePromise = client.subscribers.events.triggerMultiple({ events: [{ name: 'page.viewed' }] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('triggerMultiple: required and optional params', async () => {
    const response = await client.subscribers.events.triggerMultiple({
      events: [
        {
          name: 'page.viewed',
          eventId: 'inv_9182',
          occurredAt: '2024-11-02T10:00:00Z',
          properties: { page: 'bar' },
        },
      ],
      customAttributes: { foo: 'bar' },
      email: 'user@example.com',
      externalId: 'user_123',
      firstName: 'John',
      lastName: 'Doe',
    });
  });
});
