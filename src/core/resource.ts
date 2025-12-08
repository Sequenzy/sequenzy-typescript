// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Sequenzy } from '../client';

export abstract class APIResource {
  protected _client: Sequenzy;

  constructor(client: Sequenzy) {
    this._client = client;
  }
}
