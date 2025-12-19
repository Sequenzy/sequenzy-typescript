// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TransactionalAPI from './transactional';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Transactional extends APIResource {
  /**
   * Gets details of a transactional email template including available template
   * variables.
   *
   * @example
   * ```ts
   * const transactional = await client.transactional.retrieve(
   *   'welcome-email',
   * );
   * ```
   */
  retrieve(slug: string, options?: RequestOptions): APIPromise<TransactionalRetrieveResponse> {
    return this._client.get(path`/transactional/${slug}`, options);
  }

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
   * Optionally set `from` (domain must be verified) and `replyTo` addresses.
   * Variables can be passed to customize the email content. Returns immediately with
   * a job ID.
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

  enabled?: boolean;

  name?: string;

  slug?: string;

  updatedAt?: string;
}

export interface TransactionalRetrieveResponse {
  success?: boolean;

  transactional?: TransactionalRetrieveResponse.Transactional;
}

export namespace TransactionalRetrieveResponse {
  export interface Transactional extends TransactionalAPI.TransactionalEmail {
    variables?: Array<string>;
  }
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

    to?: string;

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

    to?: string;
  }
}

export interface TransactionalSendParams {
  /**
   * Recipient email address
   */
  to: string;

  /**
   * Email body HTML content (required if not using slug)
   */
  body?: string;

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
   * Variables for template replacement (works with both modes)
   */
  variables?: { [key: string]: unknown };
}

export declare namespace Transactional {
  export {
    type TransactionalEmail as TransactionalEmail,
    type TransactionalRetrieveResponse as TransactionalRetrieveResponse,
    type TransactionalListResponse as TransactionalListResponse,
    type TransactionalSendResponse as TransactionalSendResponse,
    type TransactionalSendParams as TransactionalSendParams,
  };
}
