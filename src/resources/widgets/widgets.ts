// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as PreferencesAPI from './preferences';
import { PreferenceGenerateTokenParams, PreferenceGenerateTokenResponse, Preferences } from './preferences';

export class Widgets extends APIResource {
  preferences: PreferencesAPI.Preferences = new PreferencesAPI.Preferences(this._client);
}

Widgets.Preferences = Preferences;

export declare namespace Widgets {
  export {
    Preferences as Preferences,
    type PreferenceGenerateTokenResponse as PreferenceGenerateTokenResponse,
    type PreferenceGenerateTokenParams as PreferenceGenerateTokenParams,
  };
}
