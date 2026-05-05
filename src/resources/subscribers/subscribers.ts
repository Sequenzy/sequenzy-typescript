// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SubscribersAPI from './subscribers';
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

/**
 * Manage subscribers, tags, and events
 */
export class Subscribers extends APIResource {
  tags: TagsAPI.Tags = new TagsAPI.Tags(this._client);
  events: EventsAPI.Events = new EventsAPI.Events(this._client);

  /**
   * Creates a new subscriber or handles existing ones based on the
   * `duplicateStrategy` parameter.
   *
   * **Duplicate Strategies:**
   *
   * - `skip` (default): Don't update existing subscribers
   * - `merge`: Only fill in missing fields, never overwrite existing values
   * - `overwrite`: Replace all fields (but never reactivate unsubscribed users)
   *
   * @example
   * ```ts
   * const subscriber = await client.subscribers.create();
   * ```
   */
  create(body: SubscriberCreateParams, options?: RequestOptions): APIPromise<SubscriberCreateResponse> {
    return this._client.post('/subscribers', { body, ...options });
  }

  /**
   * Retrieves a subscriber by their email address, including list memberships,
   * sequence enrollments, email stats, and recent activity.
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
   * attributes. Setting `status` to `unsubscribed` performs the full unsubscribe
   * workflow, including list unsubscription and sequence cancellation.
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
   * Lists subscribers with pagination and optional filtering by status, free-text
   * query, tags, segment, or email.
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

  emailProvider?: string | null;

  /**
   * Customer-owned app/customer/user ID for this subscriber
   */
  externalId?: string | null;

  firstName?: string | null;

  lastName?: string | null;

  status?: 'active' | 'unsubscribed' | 'bounced';

  tags?: Array<string>;

  updatedAt?: string;
}

export interface SubscriberCreateResponse {
  subscriber?: SubscriberCreateResponse.Subscriber;

  success?: boolean;
}

export namespace SubscriberCreateResponse {
  export interface Subscriber extends SubscribersAPI.Subscriber {
    /**
     * Whether the subscriber was newly created
     */
    created?: boolean;

    /**
     * Whether the subscriber was skipped (skip strategy on existing)
     */
    skipped?: boolean;

    /**
     * Whether the subscriber was updated (merge/overwrite strategies)
     */
    updated?: boolean;
  }
}

export interface SubscriberRetrieveResponse {
  subscriber?: SubscriberRetrieveResponse.Subscriber;

  success?: boolean;
}

export namespace SubscriberRetrieveResponse {
  export interface Subscriber extends SubscribersAPI.Subscriber {
    activity?: Array<Subscriber.Activity>;

    emailStats?: Subscriber.EmailStats | null;

    lists?: Array<Subscriber.List>;

    sequenceEnrollments?: Array<Subscriber.SequenceEnrollment>;
  }

  export namespace Subscriber {
    export interface Activity {
      id?: string;

      bounceType?: string | null;

      campaignId?: string | null;

      clickedUrl?: string | null;

      emailSendId?: string | null;

      eventName?: string | null;

      eventTime?: string;

      eventType?: string;

      properties?: { [key: string]: unknown } | null;
    }

    export interface EmailStats {
      bounced?: number;

      clicked?: number;

      complained?: number;

      delivered?: number;

      opened?: number;

      sent?: number;

      unsubscribed?: number;
    }

    export interface List {
      id?: string;

      description?: string | null;

      isPrivate?: boolean | null;

      name?: string;

      subscribedAt?: string;

      unsubscribedAt?: string | null;
    }

    export interface SequenceEnrollment {
      currentNodeId?: string;

      currentNodeLabel?: string | null;

      currentNodeType?: string | null;

      enrollmentStatus?: string;

      enteredAt?: string;

      scheduledFor?: string | null;

      sequenceId?: string;

      sequenceName?: string;

      sequenceStatus?: string;

      tokenId?: string;

      updatedAt?: string;
    }
  }
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
  customAttributes?: { [key: string]: unknown };

  /**
   * How to handle existing subscribers:
   *
   * - `skip`: Don't update existing subscribers (default)
   * - `merge`: Only fill in missing fields, never overwrite existing values
   * - `overwrite`: Replace all fields (but never reactivate unsubscribed users)
   */
  duplicateStrategy?: 'skip' | 'merge' | 'overwrite';

  /**
   * Required when creating a new subscriber. Optional when externalId identifies an
   * existing subscriber.
   */
  email?: string;

  /**
   * Whether to enroll the subscriber in matching sequences. Defaults to true for API
   * calls.
   */
  enrollInSequences?: boolean;

  /**
   * Customer-owned app/customer/user ID. Unique per company when provided.
   */
  externalId?: string;

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

  /**
   * Setting `unsubscribed` performs a full global unsubscribe.
   */
  status?: 'active' | 'unsubscribed';

  tags?: Array<string>;
}

export interface SubscriberListParams {
  /**
   * Legacy alias for a partial email search
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
   * Free-text search across email, first name, last name, and tags
   */
  query?: string;

  /**
   * Filter by an existing segment ID
   */
  segmentId?: string;

  /**
   * Filter by subscriber status
   */
  status?: 'active' | 'unsubscribed' | 'bounced';

  /**
   * Comma-separated tag names. Subscribers must have all provided tags.
   */
  tags?: string;
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
