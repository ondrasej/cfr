/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material';
import { SharedModule } from '../shared/shared.module';
import { BaseRoutesMetadataTableComponent } from './components';
import { RoutesMetadataTableComponent } from './containers';
import { RoutesMetadataRoutingModule } from './routes-metadata-routing.module';

export const COMPONENTS = [BaseRoutesMetadataTableComponent];

export const CONTAINERS = [RoutesMetadataTableComponent];

@NgModule({
  declarations: [COMPONENTS, CONTAINERS],
  imports: [CommonModule, MaterialModule, RoutesMetadataRoutingModule, SharedModule],
})
export class RoutesMetadataModule {}
