// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Manage subscribers, tags, and events
 */
export class Events extends APIResource {
  /**
   * Triggers an event for a subscriber. Creates the subscriber if they don't exist.
   * Creates the event definition if it doesn't exist.
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
   * exist. Creates event definitions if they don't exist. Events are processed
   * independently, so an error response may still include events that were already
   * triggered.
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

  export interface Subscriber {
    id?: string;

    created?: boolean;

    email?: string;
  }
}

export interface EventTriggerMultipleResponse {
  events?: Array<EventTriggerMultipleResponse.Event>;

  subscriber?: EventTriggerMultipleResponse.Subscriber;

  success?: boolean;
}

export namespace EventTriggerMultipleResponse {
  export interface Event {
    id?: string;

    definitionCreated?: boolean;

    name?: string;
  }

  export interface Subscriber {
    id?: string;

    created?: boolean;

    email?: string;
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
   * Customer-owned app/customer/user ID
   */
  externalId?: string;

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
}

export namespace EventTriggerMultipleParams {
  export interface Event {
    name: string;

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
