/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoutesChartComponent } from './containers';

const routes: Routes = [{ path: '', component: RoutesChartComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutesChartRoutingModule {}
