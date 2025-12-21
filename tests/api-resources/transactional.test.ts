// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Sequenzy from 'sequenzy';

const client = new Sequenzy({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource transactional', () => {
  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.transactional.retrieve('welcome-email');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.transactional.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('send: only required params', async () => {
    const responsePromise = client.transactional.send({ to: 'recipient@example.com' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('send: required and optional params', async () => {
    const response = await client.transactional.send({
      to: 'recipient@example.com',
      attachments: [
        {
          filename: 'invoice.pdf',
          content: 'JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC...',
          contentType: 'application/pdf',
          path: 'https://example.com/invoices/123.pdf',
        },
      ],
      bcc: ['audit@example.com'],
      body: '<h1>Welcome!</h1><p>Thanks for signing up.</p>',
      cc: ['manager@example.com'],
      from: 'Notifications <notifications@example.com>',
      preview: 'Welcome to our platform',
      replyTo: 'Support <support@example.com>',
      slug: 'welcome-email',
      subject: 'Welcome to our platform!',
      variables: { NAME: 'bar' },
    });
  });
});
