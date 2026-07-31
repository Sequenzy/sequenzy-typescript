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
  event?: EventTriggerResponse.Event;

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
   * Caller-owned event ID. Re-sending the same ID for a historical event writes
   * nothing new, so an interrupted import is safe to re-run.
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
     * Caller-owned event ID that makes a re-run idempotent.
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
