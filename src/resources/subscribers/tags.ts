// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Manage subscribers, tags, and events
 */
export class Tags extends APIResource {
  /**
   * Adds a tag to a subscriber. Creates the subscriber if they don't exist. Creates
   * the tag definition if it doesn't exist. When the workspace has double opt-in
   * enabled, a brand-new subscriber is created pending confirmation, the
   * confirmation email is queued, and tag automations wait at their trigger until
   * the subscriber confirms.
   *
   * @example
   * ```ts
   * const response = await client.subscribers.tags.add({
   *   tag: 'premium',
   * });
   * ```
   */
  add(body: TagAddParams, options?: RequestOptions): APIPromise<TagAddResponse> {
    return this._client.post('/subscribers/tags', { body, ...options });
  }

  /**
   * Adds multiple tags to a subscriber. Creates the subscriber if they don't exist.
   * Creates tag definitions if they don't exist. When the workspace has double
   * opt-in enabled, a brand-new subscriber is created pending confirmation, the
   * confirmation email is queued, and tag automations wait at their trigger until
   * the subscriber confirms.
   *
   * @example
   * ```ts
   * const response = await client.subscribers.tags.addMultiple({
   *   tags: ['premium', 'newsletter', 'vip'],
   * });
   * ```
   */
  addMultiple(body: TagAddMultipleParams, options?: RequestOptions): APIPromise<TagAddMultipleResponse> {
    return this._client.post('/subscribers/tags/bulk', { body, ...options });
  }
}

export interface TagAddResponse {
  /**
   * Present when this request created a brand-new subscriber while workspace double
   * opt-in is enabled. The tag is applied, but the subscriber stays pending and tag
   * automations wait until they confirm.
   */
  optIn?: TagAddResponse.OptIn;

  subscriber?: TagAddResponse.Subscriber;

  success?: boolean;

  tag?: TagAddResponse.Tag;
}

export namespace TagAddResponse {
  /**
   * Present when this request created a brand-new subscriber while workspace double
   * opt-in is enabled. The tag is applied, but the subscriber stays pending and tag
   * automations wait until they confirm.
   */
  export interface OptIn {
    emailQueued?: boolean;

    required?: boolean;
  }

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
  /**
   * Present when this request created a brand-new subscriber while workspace double
   * opt-in is enabled. The tags are applied, but the subscriber stays pending and
   * tag automations wait until they confirm.
   */
  optIn?: TagAddMultipleResponse.OptIn;

  subscriber?: TagAddMultipleResponse.Subscriber;

  success?: boolean;

  tags?: TagAddMultipleResponse.Tags;
}

export namespace TagAddMultipleResponse {
  /**
   * Present when this request created a brand-new subscriber while workspace double
   * opt-in is enabled. The tags are applied, but the subscriber stays pending and
   * tag automations wait until they confirm.
   */
  export interface OptIn {
    emailQueued?: boolean;

    required?: boolean;
  }

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
  tag: string;

  /**
   * Optional attributes to set on the subscriber if created
   */
  customAttributes?: { [key: string]: unknown };

  /**
   * Required when creating a new subscriber. Optional when externalId identifies an
   * existing subscriber.
   */
  email?: string;

  /**
   * Customer-owned app/customer/user ID
   */
  externalId?: string;

  /**
   * First name to set if creating the subscriber.
   */
  firstName?: string;

  /**
   * Last name to set if creating the subscriber.
   */
  lastName?: string;
}

export interface TagAddMultipleParams {
  tags: Array<string>;

  customAttributes?: { [key: string]: unknown };

  /**
   * Required when creating a new subscriber. Optional when externalId identifies an
   * existing subscriber.
   */
  email?: string;

  /**
   * Customer-owned app/customer/user ID
   */
  externalId?: string;

  /**
   * First name to set if creating the subscriber.
   */
  firstName?: string;

  /**
   * Last name to set if creating the subscriber.
   */
  lastName?: string;
}

export declare namespace Tags {
  export {
    type TagAddResponse as TagAddResponse,
    type TagAddMultipleResponse as TagAddMultipleResponse,
    type TagAddParams as TagAddParams,
    type TagAddMultipleParams as TagAddMultipleParams,
  };
}
