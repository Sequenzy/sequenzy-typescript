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
   * A successful response means the email was accepted for background processing.
   * Transactional emails are not blocked by subscriber unsubscribe or double opt-in
   * status. If a recipient is suppressed because of a hard bounce or spam complaint,
   * the worker records the send as `suppressed` instead of delivering it.
   *
   * Optionally set `from` (domain must be verified) and `replyTo` addresses. When
   * reply tracking is enabled, Sequenzy uses a unique trackable `Reply-To` header
   * and treats the provided `replyTo` as the forwarding destination for captured
   * replies. For direct-content sends with reply tracking and reply forwarding
   * enabled, omitting `replyTo` forwards replies to the company's default reply
   * profile, then falls back to the first reply profile in the company. If no reply
   * profile exists, replies are captured in Sequenzy but are not forwarded
   * externally. Variables can be passed to customize the email content. Nested
   * objects and arrays are supported for repeat blocks, such as `items`. Returns
   * immediately with a job ID. If Sequenzy detects likely missing or unused
   * variables before queueing, the successful response includes a non-blocking
   * `diagnostics` warning object. Missing values do not block queueing; if a queued
   * send references a required variable that is not provided and has no default, the
   * worker may record the send as failed during background rendering.
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
    /**
     * Non-blocking warnings about likely template variable issues. The send is still
     * queued when this object is present.
     */
    diagnostics?: SlugBasedResponse.Diagnostics;

    jobId?: string;

    success?: boolean;

    to?: string | Array<string>;

    transactional?: SlugBasedResponse.Transactional;
  }

  export namespace SlugBasedResponse {
    /**
     * Non-blocking warnings about likely template variable issues. The send is still
     * queued when this object is present.
     */
    export interface Diagnostics {
      message: string;

      missingRequiredVariables: Array<Diagnostics.MissingRequiredVariable>;

      status: 'warning';

      unusedVariables: Array<Diagnostics.UnusedVariable>;
    }

    export namespace Diagnostics {
      export interface MissingRequiredVariable {
        lookupName?: string;

        message?: string;

        name?: string;

        suggestions?: Array<string>;

        usedIn?: Array<MissingRequiredVariable.UsedIn>;
      }

      export namespace MissingRequiredVariable {
        export interface UsedIn {
          blockId?: string;

          blockType?: string;

          field?: string;

          surface?: 'subject' | 'previewText' | 'body' | 'block';
        }
      }

      export interface UnusedVariable {
        message?: string;

        name?: string;

        suggestions?: Array<string>;
      }
    }

    export interface Transactional {
      id?: string;

      name?: string;

      slug?: string;
    }
  }

  export interface DirectContentResponse {
    /**
     * Non-blocking warnings about likely template variable issues. The send is still
     * queued when this object is present.
     */
    diagnostics?: DirectContentResponse.Diagnostics;

    jobId?: string;

    success?: boolean;

    to?: string | Array<string>;
  }

  export namespace DirectContentResponse {
    /**
     * Non-blocking warnings about likely template variable issues. The send is still
     * queued when this object is present.
     */
    export interface Diagnostics {
      message: string;

      missingRequiredVariables: Array<Diagnostics.MissingRequiredVariable>;

      status: 'warning';

      unusedVariables: Array<Diagnostics.UnusedVariable>;
    }

    export namespace Diagnostics {
      export interface MissingRequiredVariable {
        lookupName?: string;

        message?: string;

        name?: string;

        suggestions?: Array<string>;

        usedIn?: Array<MissingRequiredVariable.UsedIn>;
      }

      export namespace MissingRequiredVariable {
        export interface UsedIn {
          blockId?: string;

          blockType?: string;

          field?: string;

          surface?: 'subject' | 'previewText' | 'body' | 'block';
        }
      }

      export interface UnusedVariable {
        message?: string;

        name?: string;

        suggestions?: Array<string>;
      }
    }
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
   * address. When reply tracking is disabled, this value is sent as the email's
   * `Reply-To` header. When reply tracking is enabled, Sequenzy sends a unique
   * trackable `Reply-To` header and stores this value as the forwarding destination
   * for replies. For direct-content sends with reply tracking and reply forwarding
   * enabled, omitting this field forwards replies to the company's default reply
   * profile, then falls back to the first reply profile in the company. If no reply
   * profile exists, replies are captured in Sequenzy but are not forwarded
   * externally.
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
   * Customer-owned subscriber ID for single-recipient sends. If it matches an
   * existing subscriber, analytics and localization use that subscriber; the value
   * is also stored on the send and emitted as external_id in outbound email webhooks
   * even when no subscriber exists. Maximum length is 255 characters.
   */
  subscriberExternalId?: string;

  /**
   * Variables for template replacement (works with both modes). Values can be
   * scalars, nested objects, or arrays used by repeat blocks. Raw HTML templates can
   * use simple subscriber/custom-attribute conditionals such as
   * `{{#if subscriber.plan}}...{{else}}...{{/if}}` and
   * `{{#unless subscriber.plan}}...{{/unless}}`. Likely variable issues are returned
   * as non-blocking diagnostics when possible; missing required variables may still
   * be recorded as failed sends during background rendering after the request is
   * accepted.
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
