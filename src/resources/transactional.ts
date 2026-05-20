// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Send and manage transactional emails
 */
export class Transactional extends APIResource {
  /**
   * Lists all transactional email templates for your company.
   *
   * @example
   * ```ts
   * const transactionals = await client.transactional.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<TransactionalListResponse> {
    return this._client.get('/transactional', options);
  }

  /**
   * Queues a transactional email for sending. You can either:
   *
   * - Provide a `slug` to use a saved template
   * - Provide `subject` and `body` to send custom content directly
   *
   * **Recipients:**
   *
   * - `to` can be a single email or an array of up to 50 emails
   * - Duplicate emails are automatically deduplicated
   *
   * **Attachments:**
   *
   * - Attachments can be provided as Base64-encoded content or URLs
   * - Maximum total attachment size: 40MB per email
   * - Any file type supported (PDFs, images, documents, etc.)
   *
   * A successful response means the email was accepted for background processing. If
   * a recipient is suppressed because of a bounce, complaint, or unsubscribe, the
   * worker records the send as `suppressed` instead of delivering it.
   *
   * Optionally set `from` (domain must be verified) and `replyTo` addresses.
   * Variables can be passed to customize the email content. Nested objects and
   * arrays are supported for repeat blocks, such as `items`. Returns immediately
   * with a job ID.
   *
   * @example
   * ```ts
   * const response = await client.transactional.send({
   *   to: 'recipient@example.com',
   *   slug: 'welcome-email',
   *   variables: { NAME: 'John' },
   * });
   * ```
   */
  send(body: TransactionalSendParams, options?: RequestOptions): APIPromise<TransactionalSendResponse> {
    return this._client.post('/transactional/send', { body, ...options });
  }
}

export interface TransactionalEmail {
  id?: string;

  createdAt?: string;

  emailId?: string;

  enabled?: boolean;

  name?: string;

  slug?: string;

  updatedAt?: string;
}

export interface TransactionalListResponse {
  success?: boolean;

  transactional?: Array<TransactionalEmail>;
}

export type TransactionalSendResponse =
  | TransactionalSendResponse.SlugBasedResponse
  | TransactionalSendResponse.DirectContentResponse;

export namespace TransactionalSendResponse {
  export interface SlugBasedResponse {
    jobId?: string;

    success?: boolean;

    to?: string | Array<string>;

    transactional?: SlugBasedResponse.Transactional;
  }

  export namespace SlugBasedResponse {
    export interface Transactional {
      id?: string;

      name?: string;

      slug?: string;
    }
  }

  export interface DirectContentResponse {
    jobId?: string;

    success?: boolean;

    to?: string | Array<string>;
  }
}

export interface TransactionalSendParams {
  /**
   * Recipient email address(es). Can be a single email string or an array of up to
   * 50 emails.
   */
  to: string | Array<string>;

  /**
   * File attachments for the email. Each attachment must have a filename and either:
   *
   * - `content`: Base64-encoded file content
   * - `path`: URL to fetch the file from
   *
   * Maximum total size: 40MB per email.
   */
  attachments?: Array<TransactionalSendParams.Attachment>;

  /**
   * Blind-carbon-copy recipient email address(es). Duplicates already present in
   * `to` or `cc` are removed.
   */
  bcc?: string | Array<string>;

  /**
   * Email body HTML content (required if not using slug)
   */
  body?: string;

  /**
   * Visible carbon-copy recipient email address(es). Duplicates already present in
   * `to` are removed.
   */
  cc?: string | Array<string>;

  /**
   * Custom from address. Format: "Name <email>" or just "email". The domain must be
   * verified for your account. If not verified, this field is silently ignored.
   */
  from?: string;

  /**
   * Preview text for the email (only used with direct content)
   */
  preview?: string;

  /**
   * Reply-to address. Format: "Name <email>" or just "email". Can be any valid email
   * address.
   */
  replyTo?: string;

  /**
   * Slug of the transactional email template to use (mutually exclusive with
   * subject/body)
   */
  slug?: string;

  /**
   * Email subject (required if not using slug)
   */
  subject?: string;

  /**
   * Customer-owned subscriber ID for attaching analytics and localization on
   * single-recipient sends. Only valid when sending to exactly one recipient.
   */
  subscriberExternalId?: string;

  /**
   * Variables for template replacement (works with both modes). Values can be
   * scalars, nested objects, or arrays used by repeat blocks. Raw HTML templates can
   * use simple subscriber/custom-attribute conditionals such as
   * `{{#if subscriber.plan}}...{{else}}...{{/if}}` and
   * `{{#unless subscriber.plan}}...{{/unless}}`.
   */
  variables?: { [key: string]: unknown };
}

export namespace TransactionalSendParams {
  export interface Attachment {
    /**
     * The filename for the attachment (including extension)
     */
    filename: string;

    /**
     * Base64-encoded file content (mutually exclusive with path)
     */
    content?: string;

    /**
     * MIME type of the attachment (optional, auto-detected if not provided)
     */
    contentType?: string;

    /**
     * URL to fetch the file from (mutually exclusive with content)
     */
    path?: string;
  }
}

export declare namespace Transactional {
  export {
    type TransactionalEmail as TransactionalEmail,
    type TransactionalListResponse as TransactionalListResponse,
    type TransactionalSendResponse as TransactionalSendResponse,
    type TransactionalSendParams as TransactionalSendParams,
  };
}
