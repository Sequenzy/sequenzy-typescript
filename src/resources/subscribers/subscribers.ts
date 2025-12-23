// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as EventsAPI from './events';
import {
  EventTriggerMultipleParams,
  EventTriggerMultipleResponse,
  EventTriggerParams,
  EventTriggerResponse,
  Events,
} from './events';
import * as TagsAPI from './tags';
import { TagAddMultipleParams, TagAddMultipleResponse, TagAddParams, TagAddResponse, Tags } from './tags';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Subscribers extends APIResource {
  tags: TagsAPI.Tags = new TagsAPI.Tags(this._client);
  events: EventsAPI.Events = new EventsAPI.Events(this._client);

  /**
   * Creates a new subscriber. Returns 409 if subscriber already exists.
   *
   * @example
   * ```ts
   * const subscriber = await client.subscribers.create({
   *   email: 'user@example.com',
   * });
   * ```
   */
  create(body: SubscriberCreateParams, options?: RequestOptions): APIPromise<SubscriberCreateResponse> {
    return this._client.post('/subscribers', { body, ...options });
  }

  /**
   * Retrieves a subscriber by their email address.
   *
   * @example
   * ```ts
   * const subscriber = await client.subscribers.retrieve(
   *   'email',
   * );
   * ```
   */
  retrieve(email: string, options?: RequestOptions): APIPromise<SubscriberRetrieveResponse> {
    return this._client.get(path`/subscribers/${email}`, options);
  }

  /**
   * Updates a subscriber's first name, last name, status, tags, or custom
   * attributes.
   *
   * @example
   * ```ts
   * const subscriber = await client.subscribers.update('email');
   * ```
   */
  update(
    email: string,
    body: SubscriberUpdateParams,
    options?: RequestOptions,
  ): APIPromise<SubscriberUpdateResponse> {
    return this._client.patch(path`/subscribers/${email}`, { body, ...options });
  }

  /**
   * Lists subscribers with pagination and optional filtering by status or email.
   *
   * @example
   * ```ts
   * const subscribers = await client.subscribers.list();
   * ```
   */
  list(
    query: SubscriberListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SubscriberListResponse> {
    return this._client.get('/subscribers', { query, ...options });
  }

  /**
   * Deletes a subscriber by their email address.
   *
   * @example
   * ```ts
   * const subscriber = await client.subscribers.delete('email');
   * ```
   */
  delete(email: string, options?: RequestOptions): APIPromise<SubscriberDeleteResponse> {
    return this._client.delete(path`/subscribers/${email}`, options);
  }
}

export interface Subscriber {
  id?: string;

  createdAt?: string;

  customAttributes?: { [key: string]: unknown };

  email?: string;

  firstName?: string | null;

  lastName?: string | null;

  status?: 'active' | 'unsubscribed';

  tags?: Array<string>;

  updatedAt?: string;
}

export interface SubscriberCreateResponse {
  subscriber?: Subscriber;

  success?: boolean;
}

export interface SubscriberRetrieveResponse {
  subscriber?: Subscriber;

  success?: boolean;
}

export interface SubscriberUpdateResponse {
  subscriber?: Subscriber;

  success?: boolean;
}

export interface SubscriberListResponse {
  pagination?: SubscriberListResponse.Pagination;

  subscribers?: Array<Subscriber>;

  success?: boolean;
}

export namespace SubscriberListResponse {
  export interface Pagination {
    limit?: number;

    page?: number;

    total?: number;

    totalPages?: number;
  }
}

export interface SubscriberDeleteResponse {
  deleted?: boolean;

  success?: boolean;
}

export interface SubscriberCreateParams {
  email: string;

  customAttributes?: { [key: string]: unknown };

  firstName?: string;

  lastName?: string;

  /**
   * List IDs to add subscriber to. If not provided, subscriber is added to ALL
   * company lists. If empty array, subscriber is added to NO lists.
   */
  lists?: Array<string>;

  status?: 'active' | 'unsubscribed';

  tags?: Array<string>;
}

export interface SubscriberUpdateParams {
  customAttributes?: { [key: string]: unknown };

  firstName?: string;

  lastName?: string;

  status?: 'active' | 'unsubscribed';

  tags?: Array<string>;
}

export interface SubscriberListParams {
  /**
   * Filter by email (partial match)
   */
  email?: string;

  /**
   * Number of items per page (max 100)
   */
  limit?: number;

  /**
   * Page number
   */
  page?: number;

  /**
   * Filter by subscriber status
   */
  status?: 'active' | 'unsubscribed';
}

Subscribers.Tags = Tags;
Subscribers.Events = Events;

export declare namespace Subscribers {
  export {
    type Subscriber as Subscriber,
    type SubscriberCreateResponse as SubscriberCreateResponse,
    type SubscriberRetrieveResponse as SubscriberRetrieveResponse,
    type SubscriberUpdateResponse as SubscriberUpdateResponse,
    type SubscriberListResponse as SubscriberListResponse,
    type SubscriberDeleteResponse as SubscriberDeleteResponse,
    type SubscriberCreateParams as SubscriberCreateParams,
    type SubscriberUpdateParams as SubscriberUpdateParams,
    type SubscriberListParams as SubscriberListParams,
  };

  export {
    Tags as Tags,
    type TagAddResponse as TagAddResponse,
    type TagAddMultipleResponse as TagAddMultipleResponse,
    type TagAddParams as TagAddParams,
    type TagAddMultipleParams as TagAddMultipleParams,
  };

  export {
    Events as Events,
    type EventTriggerResponse as EventTriggerResponse,
    type EventTriggerMultipleResponse as EventTriggerMultipleResponse,
    type EventTriggerParams as EventTriggerParams,
    type EventTriggerMultipleParams as EventTriggerMultipleParams,
  };
}
