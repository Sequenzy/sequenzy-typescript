// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TransactionalAPI from './transactional';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Send and manage transactional emails
 */
export class Transactional extends APIResource {
  /**
   * Lists transactional email templates with their linked subjects and all-time
   * delivery metrics. Search name, slug, or subject; filter active state; and sort
   * by engagement. Human engagement is used by default.
   *
   * @example
   * ```ts
   * const transactionals = await client.transactional.list();
   * ```
   */
  list(
    query: TransactionalListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TransactionalListResponse> {
    return this._client.get('/transactional', { query, ...options });
  }

  /**
   * Queues an email for sending. The default `emailType` is `transactional`. Set it
   * to `marketing` for a consented single-recipient lifecycle or promotional
   * message. Marketing mode creates or links a minimal subscriber, honors
   * unsubscribe suppression, adds the standard marketing footer, and emits RFC 8058
   * one-click-unsubscribe headers. The caller remains responsible for having consent
   * or another lawful basis.
   *
   * You can either:
   *
   * - Provide a canonical `slug` (or compatibility alias `templateId`) to use a
   *   saved template
   * - Provide `subject` and canonical `body` (or compatibility alias `html`) to send
   *   custom content directly
   *
   * If both a canonical field and its alias are provided, `slug` must match
   * `templateId` and `body` must match `html`.
   *
   * **Recipients:**
   *
   * - `to` can be a single email or an array of up to 50 emails
   * - Duplicate emails are automatically deduplicated
   * - Marketing mode requires exactly one `to` recipient and does not support `cc`
   *   or `bcc`
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
   * and treats the resolved reply destination as the forwarding destination for
   * captured replies. When `replyTo` is omitted, direct-content sends inherit the
   * company's default reply profile and saved-template sends prefer the template
   * reply profile before the company default. Both fall back to the first company
   * reply profile. The resolved destination is retained whether or not reply
   * tracking is enabled; it is sent as the Reply-To header only when reply tracking
   * is disabled. Variables can be passed to customize the email content. Nested
   * objects and arrays are supported for repeat blocks, such as `items`.
   * `{{viewInBrowserUrl}}` is generated automatically for a hosted copy link. For a
   * single recipient, Sequenzy matches an existing subscriber by
   * `subscriberExternalId` or email and backfills stored first and last names when
   * the corresponding request variables are omitted; explicit variables take
   * precedence. Returns immediately with a durable `emailSendId` and the accepted
   * `emailType`. If Sequenzy detects likely missing or unused variables before
   * queueing, the successful response includes a non-blocking `diagnostics` warning
   * object. Missing values do not block queueing or sending; a required variable
   * that is not provided and has no default renders as an empty string.
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

  transactional?: Array<TransactionalListResponse.Transactional>;
}

export namespace TransactionalListResponse {
  export interface Transactional extends TransactionalAPI.TransactionalEmail {
    stats?: Transactional.Stats;

    subject?: string | null;
  }

  export namespace Transactional {
    export interface Stats {
      bounces?: number;

      clickRate?: number;

      clicks?: number;

      deliveries?: number;

      openRate?: number;

      opens?: number;

      sends?: number;
    }
  }
}

export type TransactionalSendResponse =
  | TransactionalSendResponse.SlugBasedResponse
  | TransactionalSendResponse.DirectContentResponse;

export namespace TransactionalSendResponse {
  export interface SlugBasedResponse {
    /**
     * Non-blocking warnings about template variable issues. The send is still queued
     * when this object is present, and missing values without defaults render as empty
     * strings.
     */
    diagnostics?: SlugBasedResponse.Diagnostics;

    /**
     * Durable email delivery ID. Use this with GET /email-sends/{emailSendId}.
     */
    emailSendId?: string;

    /**
     * Delivery policy accepted for the queued email.
     */
    emailType?: 'marketing' | 'transactional';

    /**
     * @deprecated Legacy queue identifier retained for response compatibility.
     */
    jobId?: string;

    success?: boolean;

    to?: string | Array<string>;

    transactional?: SlugBasedResponse.Transactional;
  }

  export namespace SlugBasedResponse {
    /**
     * Non-blocking warnings about template variable issues. The send is still queued
     * when this object is present, and missing values without defaults render as empty
     * strings.
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
     * Non-blocking warnings about template variable issues. The send is still queued
     * when this object is present, and missing values without defaults render as empty
     * strings.
     */
    diagnostics?: DirectContentResponse.Diagnostics;

    /**
     * Durable email delivery ID. Use this with GET /email-sends/{emailSendId}.
     */
    emailSendId?: string;

    /**
     * Delivery policy accepted for the queued email.
     */
    emailType?: 'marketing' | 'transactional';

    /**
     * @deprecated Legacy queue identifier retained for response compatibility.
     */
    jobId?: string;

    success?: boolean;

    to?: string | Array<string>;
  }

  export namespace DirectContentResponse {
    /**
     * Non-blocking warnings about template variable issues. The send is still queued
     * when this object is present, and missing values without defaults render as empty
     * strings.
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

export interface TransactionalListParams {
  /**
   * Include detected bot, scanner, preview, and privacy-proxy engagement in open and
   * click metrics.
   */
  includeMachineEngagement?: boolean;

  /**
   * Sort direction.
   */
  order?: 'asc' | 'desc';

  /**
   * Case-insensitive search across template name, API slug, and linked email
   * subject/title.
   */
  search?: string;

  /**
   * Sort by creation date or all-time engagement metrics.
   */
  sort?: 'date' | 'sends' | 'opens' | 'open-rate' | 'clicks' | 'ctr';

  /**
   * Filter by template active state.
   */
  status?: 'all' | 'active' | 'disabled';
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
   * Canonical email body HTML content (required if not using a template slug).
   */
  body?: string;

  /**
   * Visible carbon-copy recipient email address(es). Duplicates already present in
   * `to` are removed.
   */
  cc?: string | Array<string>;

  /**
   * Delivery policy. Marketing mode requires one recipient, creates or links a
   * minimal subscriber, honors unsubscribe suppression, adds the standard footer,
   * and emits RFC 8058 List-Unsubscribe and List-Unsubscribe-Post headers.
   */
  emailType?: 'transactional' | 'marketing';

  /**
   * Custom from address. Format: "Name <email>" or just "email". The domain must be
   * verified for your account. If not verified, this field is silently ignored.
   */
  from?: string;

  /**
   * Compatibility alias for `body`. Accepted with `subject` for direct sends and
   * must match `body` when both are provided.
   */
  html?: string;

  /**
   * Preview text for the email (only used with direct content)
   */
  preview?: string;

  /**
   * Reply-to address. Format: "Name <email>" or just "email". Can be any valid email
   * address. When reply tracking is disabled, this value is sent as the email's
   * `Reply-To` header. When reply tracking is enabled, Sequenzy sends a unique
   * trackable `Reply-To` header and stores this value as the forwarding destination
   * for replies. When omitted, direct-content sends inherit the company default and
   * saved-template sends prefer the template reply profile before the company
   * default. Both fall back to the first company reply profile. The resolved
   * destination is retained whether or not reply tracking is enabled; it is sent
   * directly only when reply tracking is disabled.
   */
  replyTo?: string;

  /**
   * Canonical slug of the transactional email template to use (mutually exclusive
   * with direct content).
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
   * Compatibility alias for `slug`. Despite the field name, pass the saved
   * transactional email API slug, not its database ID. Must match `slug` when both
   * are provided.
   */
  templateId?: string;

  /**
   * Per-send tracking opt-outs. Each field defaults to `true`, meaning your
   * account's tracking settings apply; set a field to `false` to disable that
   * tracking for this send only. These fields can only opt out; they cannot enable
   * tracking that is disabled for your account.
   */
  trackingSettings?: TransactionalSendParams.TrackingSettings;

  /**
   * Variables for template replacement (works with both modes). Values can be
   * scalars, nested objects, or arrays used by repeat blocks. For a single
   * recipient, stored subscriber first and last names fill missing name variables;
   * explicit request variables take precedence. Raw HTML templates can use simple
   * subscriber/custom-attribute conditionals such as
   * `{{#if subscriber.plan}}...{{else}}...{{/if}}` and
   * `{{#unless subscriber.plan}}...{{/unless}}`. Variables are always HTML-escaped;
   * a template can prefix a tag with `html.` (`{{html.prerenderedHtml}}`) to insert
   * a trusted HTML value unescaped. Injected HTML is sanitized (scripts, event
   * handlers, and dangerous URLs are stripped), only applies in HTML text position,
   * and must not contain end-user input. Likely variable issues are returned as
   * non-blocking diagnostics when possible; missing required variables without
   * defaults render as empty strings and do not block sending.
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

  /**
   * Per-send tracking opt-outs. Each field defaults to `true`, meaning your
   * account's tracking settings apply; set a field to `false` to disable that
   * tracking for this send only. These fields can only opt out; they cannot enable
   * tracking that is disabled for your account.
   */
  export interface TrackingSettings {
    /**
     * Set `false` to skip link rewriting so the original URLs are delivered unchanged.
     * Useful when the click-tracking redirect domain breaks iOS/Android universal
     * links or deep links in transactional emails.
     */
    clickTracking?: boolean;

    /**
     * Set `false` to skip the open-tracking pixel for this send only.
     */
    openTracking?: boolean;
  }
}

export declare namespace Transactional {
  export {
    type TransactionalEmail as TransactionalEmail,
    type TransactionalListResponse as TransactionalListResponse,
    type TransactionalSendResponse as TransactionalSendResponse,
    type TransactionalListParams as TransactionalListParams,
    type TransactionalSendParams as TransactionalSendParams,
  };
}
