// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Sequenzy from 'sequenzy';

const client = new Sequenzy({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource transactional', () => {
  // Mock server tests are disabled
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

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.transactional.list(
        {
          includeMachineEngagement: true,
          order: 'asc',
          search: 'search',
          sort: 'date',
          status: 'all',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Sequenzy.NotFoundError);
  });

  // Mock server tests are disabled
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

  // Mock server tests are disabled
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
      bcc: 'archive@example.com',
      body: '<h1>Welcome!</h1><p>Thanks for signing up.</p>',
      cc: 'manager@example.com',
      emailType: 'marketing',
      from: 'Notifications <notifications@example.com>',
      html: '<h1>Welcome!</h1><p>Thanks for signing up.</p>',
      preview: 'Welcome to our platform',
      replyTo: 'Support <support@example.com>',
      slug: 'welcome-email',
      subject: 'Welcome to our platform!',
      subscriberExternalId: 'user_123',
      templateId: 'welcome-email',
      variables: { NAME: 'bar' },
    });
  });
});
