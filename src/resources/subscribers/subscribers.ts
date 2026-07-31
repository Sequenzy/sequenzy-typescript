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
   * Retrieves a subscriber by their email address, including notes, list
   * memberships, sequence enrollments, email stats, and recent activity.
   *
   * @example
   * ```ts
   * const subscriber = await client.subscribers.retrieve(
   *   'email',
   * );
   * ```
   */
  retrieve(
    email: string,
    query: SubscriberRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SubscriberRetrieveResponse> {
    return this._client.get(path`/subscribers/${email}`, { query, ...options });
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
   * Lists subscribers with stable pagination and optional filtering by status,
   * free-text query, tags, list, segment, attribute, or email. Non-attribute results
   * are ordered by createdAt descending with subscriber ID as a deterministic
   * tie-breaker. Attribute-filtered results use ClickHouse-first cursor pagination
   * ordered by subscriber ID ascending and do not include a total count.
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

  /**
   * Phone number in E.164 format
   */
  phone?: string | null;

  /**
   * SMS marketing consent status, independent of the email status
   */
  smsStatus?: 'not_subscribed' | 'pending' | 'subscribed' | 'unsubscribed';

  status?: 'active' | 'unsubscribed' | 'bounced';

  tags?: Array<string>;

  updatedAt?: string;
}

export interface SubscriberCreateResponse {
  /**
   * Present when the subscriber is awaiting double opt-in confirmation.
   */
  optIn?: SubscriberCreateResponse.OptIn;

  subscriber?: SubscriberCreateResponse.Subscriber;

  success?: boolean;
}

export namespace SubscriberCreateResponse {
  /**
   * Present when the subscriber is awaiting double opt-in confirmation.
   */
  export interface OptIn {
    emailQueued?: boolean;

    required?: boolean;
  }

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

    notes?: Array<Subscriber.Note>;

    sequenceEnrollments?: Array<Subscriber.SequenceEnrollment>;
  }

  export namespace Subscriber {
    export interface Activity {
      id?: string;

      bounceType?: string | null;

      campaignId?: string | null;

      /**
       * Classification reason codes for open/click events.
       */
      classificationReasons?: Array<string>;

      clickedUrl?: string | null;

      emailSendId?: string | null;

      /**
       * Engagement classification for open/click events.
       */
      engagementQuality?: 'human' | 'machine' | 'asset' | null;

      eventName?: string | null;

      eventTime?: string;

      eventType?: string;

      /**
       * Whether this open/click event is classified as bot/scanner activity.
       */
      machine?: boolean;

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

      /**
       * Whether the list is private. Private lists are omitted from the hosted
       * subscriber email preferences/unsubscribe page and cannot be subscribed to or
       * unsubscribed from individually there. List privacy does not override a
       * subscriber's global unsubscribe.
       */
      isPrivate?: boolean | null;

      name?: string;

      subscribedAt?: string;

      unsubscribedAt?: string | null;
    }

    export interface Note {
      id?: string;

      author?: Note.Author | null;

      authorId?: string;

      body?: string;

      companyId?: string;

      createdAt?: string;

      subscriberId?: string;

      updatedAt?: string;
    }

    export namespace Note {
      export interface Author {
        id?: string;

        email?: string | null;

        name?: string | null;
      }
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
  /**
   * Original signup date, for importing history from another platform. Preserves the
   * real date so date-relative segments are correct immediately. An existing
   * contact's date only ever moves earlier, regardless of duplicateStrategy.
   * Supplying this defaults enrollInSequences to false, and updatedAt is never
   * backdated.
   */
  createdAt?: string;

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
   * calls, or to false when createdAt is supplied.
   */
  enrollInSequences?: boolean;

  /**
   * Customer-owned app/customer/user ID. Unique per company when provided.
   */
  externalId?: string;

  firstName?: string;

  lastName?: string;

  /**
   * List IDs to add subscriber to. If not provided, subscriber follows the workspace
   * default lists setting. If empty array, subscriber is added to NO lists.
   */
  lists?: Array<string>;

  /**
   * Consent handling for this request:
   *
   * - `default`: obey the company double opt-in setting for new active subscribers;
   *   existing unsubscribed contacts are not sent confirmation email
   * - `confirmed`: create or keep active immediately when you have verified consent
   * - `double_opt_in`: send a confirmation email and keep the contact unsubscribed
   *   until they confirm
   */
  optInMode?: 'default' | 'confirmed' | 'double_opt_in';

  /**
   * Phone number in E.164 format or US national format. Stored normalized to E.164.
   * Invalid values fail with a 400 validation error. Does not affect SMS consent.
   */
  phone?: string | null;

  /**
   * SMS marketing consent. true sets smsStatus to subscribed with consent source
   * api, false sets unsubscribed, omitted leaves SMS status unchanged. Never
   * inferred from phone presence.
   */
  smsConsent?: boolean;

  /**
   * Initial subscriber status.
   */
  status?: 'active' | 'unsubscribed' | 'bounced';

  tags?: Array<string>;
}

export interface SubscriberRetrieveParams {
  /**
   * Include detected scanner, preview, and tracked asset open/click events in
   * subscriber email stats and recent activity.
   */
  includeMachineEngagement?: boolean;
}

export interface SubscriberUpdateParams {
  /**
   * Custom attributes to update. Defaults to replacing the existing public
   * custom-attribute map.
   */
  customAttributes?: { [key: string]: unknown };

  /**
   * How to apply customAttributes. replace replaces the existing public
   * custom-attribute map. merge overwrites only provided keys and retains
   * unspecified existing keys.
   */
  customAttributesStrategy?: 'replace' | 'merge';

  /**
   * New delivery email. Fails with 409 if another subscriber owns it.
   */
  email?: string;

  /**
   * New customer-owned external ID. Fails with 409 if another subscriber owns it.
   */
  externalId?: string;

  firstName?: string;

  lastName?: string;

  /**
   * Phone number in E.164 format or US national format. Stored normalized to E.164.
   * Invalid values fail with a 400 validation error. Does not affect SMS consent.
   */
  phone?: string | null;

  /**
   * SMS marketing consent. true sets smsStatus to subscribed with consent source
   * api, false sets unsubscribed, omitted leaves SMS status unchanged. Never
   * inferred from phone presence.
   */
  smsConsent?: boolean;

  /**
   * Setting `unsubscribed` performs a full global unsubscribe.
   */
  status?: 'active' | 'unsubscribed' | 'bounced';

  tags?: Array<string>;
}

export interface SubscriberListParams {
  /**
   * Custom attribute filter using attributeName:value syntax, such as plan:pro or
   * mrr:50.
   */
  attribute?: string;

  /**
   * Attribute filter operator for direct cursor pagination. Use saved segments for
   * exclusion operators such as is_not, not_contains, or is_empty.
   */
  attributeOperator?: 'is' | 'contains' | 'gt' | 'gte' | 'lt' | 'lte' | 'is_not_empty';

  /**
   * Opaque cursor returned as pagination.nextCursor. Only used with attribute
   * filters.
   */
  cursor?: string;

  /**
   * Legacy alias for a partial email search
   */
  email?: string;

  /**
   * Number of items per page (max 100)
   */
  limit?: number;

  /**
   * Subscriber list ID or exact list name. The API tries ID first, then exact name.
   */
  list?: string;

  /**
   * Filter by subscriber list ID.
   */
  listId?: string;

  /**
   * Filter by exact subscriber list name when the list ID is not known.
   */
  listName?: string;

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
   * Filter by subscriber status. Use all to disable status filtering.
   */
  status?: 'active' | 'unsubscribed' | 'bounced' | 'all';

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
    type SubscriberRetrieveParams as SubscriberRetrieveParams,
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
