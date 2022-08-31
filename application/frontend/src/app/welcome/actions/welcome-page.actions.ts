/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { createAction } from '@ngrx/store';

export const initialize = createAction('[Welcome Page] Initialize');

export const openUploadDialog = createAction('[Welcome Page] Open Upload Dialog');

export const newScenario = createAction('[Welcome Page] New Scenario');
