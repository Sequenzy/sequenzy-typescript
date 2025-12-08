// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Tags extends APIResource {
  /**
   * Adds a tag to a subscriber. Creates the subscriber if they don't exist. Creates
   * the tag definition if it doesn't exist.
   *
   * @example
   * ```ts
   * const response = await client.subscribers.tags.add({
   *   email: 'user@example.com',
   *   tag: 'premium',
   * });
   * ```
   */
  add(body: TagAddParams, options?: RequestOptions): APIPromise<TagAddResponse> {
    return this._client.post('/subscribers/tags', { body, ...options });
  }

  /**
   * Adds multiple tags to a subscriber. Creates the subscriber if they don't exist.
   * Creates tag definitions if they don't exist.
   *
   * @example
   * ```ts
   * const response = await client.subscribers.tags.addMultiple({
   *   email: 'user@example.com',
   *   tags: ['premium', 'newsletter', 'vip'],
   * });
   * ```
   */
  addMultiple(body: TagAddMultipleParams, options?: RequestOptions): APIPromise<TagAddMultipleResponse> {
    return this._client.post('/subscribers/tags/bulk', { body, ...options });
  }
}

export interface TagAddResponse {
  subscriber?: TagAddResponse.Subscriber;

  success?: boolean;

  tag?: TagAddResponse.Tag;
}

export namespace TagAddResponse {
  export interface Subscriber {
    id?: string;

    /**
     * Whether the subscriber was newly created
     */
    created?: boolean;

    email?: string;

    tags?: Array<string>;
  }

  export interface Tag {
    id?: string;

    /**
     * Whether the tag definition was newly created
     */
    created?: boolean;

    name?: string;
  }
}

export interface TagAddMultipleResponse {
  subscriber?: TagAddMultipleResponse.Subscriber;

  success?: boolean;

  tags?: TagAddMultipleResponse.Tags;
}

export namespace TagAddMultipleResponse {
  export interface Subscriber {
    id?: string;

    created?: boolean;

    email?: string;

    tags?: Array<string>;
  }

  export interface Tags {
    /**
     * Tag names that were added
     */
    added?: Array<string>;

    /**
     * Tag definitions that were newly created
     */
    created?: Array<string>;
  }
}

export interface TagAddParams {
  email: string;

  tag: string;

  /**
   * Optional attributes to set on the subscriber if created
   */
  customAttributes?: { [key: string]: unknown };
}

export interface TagAddMultipleParams {
  email: string;

  tags: Array<string>;

  customAttributes?: { [key: string]: unknown };
}

export declare namespace Tags {
  export {
    type TagAddResponse as TagAddResponse,
    type TagAddMultipleResponse as TagAddMultipleResponse,
    type TagAddParams as TagAddParams,
    type TagAddMultipleParams as TagAddMultipleParams,
  };
}
