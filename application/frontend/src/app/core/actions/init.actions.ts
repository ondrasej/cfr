/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { createAction } from '@ngrx/store';

export const startInitialization = createAction('[Init] Start Initialization');

export const finishInitialization = createAction('[Init] Finish Initialization');
