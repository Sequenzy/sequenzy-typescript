// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Manage subscribers, tags, and events
 */
export class Events extends APIResource {
  /**
   * Triggers an event for a subscriber. Creates the subscriber if they don't exist
   * and applies the workspace default lists setting. Creates the event definition if
   * it doesn't exist. When the workspace has double opt-in enabled, a brand-new
   * subscriber is created pending confirmation, the confirmation email is queued,
   * and matching sequences wait at their trigger until the subscriber confirms.
   *
   * @example
   * ```ts
   * const response = await client.subscribers.events.trigger({
   *   event: 'purchase.completed',
   * });
   * ```
   */
  trigger(body: EventTriggerParams, options?: RequestOptions): APIPromise<EventTriggerResponse> {
    return this._client.post('/subscribers/events', { body, ...options });
  }

  /**
   * Triggers multiple events for a subscriber. Creates the subscriber if they don't
   * exist and applies the workspace default lists setting. Creates event definitions
   * if they don't exist. Events are processed independently, so an error response
   * may still include events that were already triggered. When the workspace has
   * double opt-in enabled, a brand-new subscriber is created pending confirmation, a
   * single confirmation email is queued for the request, and matching sequences wait
   * at their trigger until the subscriber confirms.
   *
   * @example
   * ```ts
   * const response =
   *   await client.subscribers.events.triggerMultiple({
   *     events: [{ name: 'page.viewed' }],
   *   });
   * ```
   */
  triggerMultiple(
    body: EventTriggerMultipleParams,
    options?: RequestOptions,
  ): APIPromise<EventTriggerMultipleResponse> {
    return this._client.post('/subscribers/events/bulk', { body, ...options });
  }
}

export interface EventTriggerResponse {
  /**
   * Present and true when a live event's supplied eventId was already recorded for
   * this contact and event name. Nothing was written and no side effects ran; event
   * holds the existing event. Historical responses use duplicates instead.
   */
  duplicate?: boolean;

  /**
   * Historical event rows skipped because their idempotency receipt already existed.
   */
  duplicates?: number;

  event?: EventTriggerResponse.Event;

  /**
   * Historical event results. Present instead of event on the historical path.
   */
  events?: Array<EventTriggerResponse.Event>;

  /**
   * Present and true when occurredAt selected the historical import path.
   */
  historical?: boolean;

  /**
   * Historical event rows inserted by this request.
   */
  inserted?: number;

  /**
   * Present when this event created a brand-new subscriber while workspace double
   * opt-in is enabled. The subscriber stays pending and matching sequences wait
   * until they confirm.
   */
  optIn?: EventTriggerResponse.OptIn;

  /**
   * Present when the event was recorded but one or more side-effect stages (e.g.
   * apply-sync-rules, trigger-event-automations) failed. Retry-sensitive callers
   * should treat these as partial failures.
   */
  sideEffectFailures?: Array<string>;

  subscriber?: EventTriggerResponse.Subscriber;

  success?: boolean;
}

export namespace EventTriggerResponse {
  export interface Event {
    /**
     * The created event record ID
     */
    id?: string;

    /**
     * Whether the event definition was newly created
     */
    definitionCreated?: boolean;

    name?: string;
  }

  export interface Event {
    id?: string;

    name?: string;

    occurredAt?: string;
  }

  /**
   * Present when this event created a brand-new subscriber while workspace double
   * opt-in is enabled. The subscriber stays pending and matching sequences wait
   * until they confirm.
   */
  export interface OptIn {
    emailQueued?: boolean;

    required?: boolean;
  }

  export interface Subscriber {
    id?: string;

    created?: boolean;

    /**
     * Null for phone-only (SMS) contacts.
     */
    email?: string | null;
  }
}

export interface EventTriggerMultipleResponse {
  events?: Array<EventTriggerMultipleResponse.Event>;

  /**
   * Present when this request created a brand-new subscriber while workspace double
   * opt-in is enabled. The subscriber stays pending and matching sequences wait
   * until they confirm.
   */
  optIn?: EventTriggerMultipleResponse.OptIn;

  subscriber?: EventTriggerMultipleResponse.Subscriber;

  success?: boolean;
}

export namespace EventTriggerMultipleResponse {
  export interface Event {
    id?: string;

    definitionCreated?: boolean;

    /**
     * Present and true when this event's eventId was already recorded for the contact
     * and event name, so nothing was written and no side effects ran.
     */
    duplicate?: boolean;

    name?: string;

    /**
     * Present when this event was recorded but one or more side-effect stages (e.g.
     * apply-sync-rules, trigger-event-automations) failed.
     */
    sideEffectFailures?: Array<string>;
  }

  /**
   * Present when this request created a brand-new subscriber while workspace double
   * opt-in is enabled. The subscriber stays pending and matching sequences wait
   * until they confirm.
   */
  export interface OptIn {
    emailQueued?: boolean;

    required?: boolean;
  }

  export interface Subscriber {
    id?: string;

    created?: boolean;

    /**
     * Null for phone-only (SMS) contacts.
     */
    email?: string | null;
  }
}

export interface EventTriggerParams {
  event: string;

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
   * Caller-owned event ID used as an idempotency key on both paths. A repeated live
   * event returns the existing event with duplicate=true. A repeated historical
   * event remains a historical response and increments duplicates instead.
   * Best-effort for live events sent within about a second of each other, so a
   * producer needing a strict guarantee should keep its own ledger.
   */
  eventId?: string;

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

  /**
   * When the event actually happened. Defaults to now. More than an hour in the past
   * records it as history - stored with the real timestamp and counted by segments,
   * but running no sequences, sync rules, waiting steps, goal conversions or
   * webhooks, and the response carries historical=true. Older than the 5-year event
   * retention window is rejected with 400.
   */
  occurredAt?: string;

  /**
   * Event properties/metadata
   */
  properties?: { [key: string]: unknown };
}

export interface EventTriggerMultipleParams {
  events: Array<EventTriggerMultipleParams.Event>;

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

export namespace EventTriggerMultipleParams {
  export interface Event {
    name: string;

    /**
     * Caller-owned event ID that makes a re-run idempotent on both the live and
     * historical paths. On the live path a repeated ID is skipped and its response
     * entry carries duplicate=true.
     */
    eventId?: string;

    /**
     * When this event actually happened. Defaults to now. When every event in the
     * batch is more than an hour old the batch is imported as history in one
     * idempotent write, running no sequences, sync rules, waiting steps, goal
     * conversions or webhooks.
     */
    occurredAt?: string;

    properties?: { [key: string]: unknown };
  }
}

export declare namespace Events {
  export {
    type EventTriggerResponse as EventTriggerResponse,
    type EventTriggerMultipleResponse as EventTriggerMultipleResponse,
    type EventTriggerParams as EventTriggerParams,
    type EventTriggerMultipleParams as EventTriggerMultipleParams,
  };
}
