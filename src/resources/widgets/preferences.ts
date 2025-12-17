// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Preferences extends APIResource {
  /**
   * Generate a signed token to embed the subscription preferences widget for a
   * subscriber. This token allows users to manage their email subscription
   * preferences directly from your website.
   *
   * **Important:** Call this endpoint from your backend only. Never expose your API
   * key to the frontend.
   *
   * @example
   * ```ts
   * const response =
   *   await client.widgets.preferences.generateToken({
   *     email: 'user@example.com',
   *   });
   * ```
   */
  generateToken(
    body: PreferenceGenerateTokenParams,
    options?: RequestOptions,
  ): APIPromise<PreferenceGenerateTokenResponse> {
    return this._client.post('/widgets/preferences/token', { body, ...options });
  }
}

export interface PreferenceGenerateTokenResponse {
  /**
   * Signed JWT token (valid for 1 hour)
   */
  token?: string;

  success?: boolean;
}

export interface PreferenceGenerateTokenParams {
  /**
   * The subscriber's email address
   */
  email: string;
}

export declare namespace Preferences {
  export {
    type PreferenceGenerateTokenResponse as PreferenceGenerateTokenResponse,
    type PreferenceGenerateTokenParams as PreferenceGenerateTokenParams,
  };
}
