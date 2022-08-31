/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import * as Long from 'long';
import { IDuration, ITimestamp } from 'src/app/core/models';
import {
  BooleanFilterOperation,
  BooleanFilterParams,
  DateFilterOperation,
  DateFilterParams,
  NumberFilterOperation,
  NumberFilterParams,
  StringFilterOperation,
  StringFilterParams,
} from 'src/app/shared/models';
import { durationSeconds } from './duration';

export function applyBooleanFilter(value: boolean, params: BooleanFilterParams): boolean {
  switch (params.operation) {
    case BooleanFilterOperation.True:
      return !!value;
    case BooleanFilterOperation.False:
      return !value;
    default:
      return false;
  }
}

export function applyLongValueFilter(
  longValue: string | number | Long,
  params: NumberFilterParams
): boolean {
  if (params.operation === NumberFilterOperation.Empty) {
    return longValue == null;
  }

  return applyLongFilter(longValue, params);
}

export function applyNumberValueFilter(numberValue: number, params: NumberFilterParams): boolean {
  if (params.operation === NumberFilterOperation.Empty) {
    return numberValue == null;
  }
  return applyNumberFilter(numberValue, params);
}

export function applyDurationFilter(
  value: IDuration | ITimestamp,
  params: NumberFilterParams
): boolean {
  if (params.operation === NumberFilterOperation.Empty) {
    return value == null;
  }
  const seconds = durationSeconds(value).toNumber();
  return applyNumberFilter(seconds, params);
}

export function applyLongFilter(
  value: string | number | Long,
  params: NumberFilterParams
): boolean {
  const effectiveValue = Long.fromValue(value || 0);
  switch (params.operation) {
    case NumberFilterOperation.Equal:
      return effectiveValue.equals(params.value);
    case NumberFilterOperation.GreaterThan:
      return effectiveValue.greaterThan(params.value);
    case NumberFilterOperation.GreaterThanOrEqual:
      return effectiveValue.greaterThanOrEqual(params.value);
    case NumberFilterOperation.LessThan:
      return effectiveValue.lessThan(params.value);
    case NumberFilterOperation.LessThanOrEqual:
      return effectiveValue.lessThanOrEqual(params.value);
    case NumberFilterOperation.Between:
      return (
        effectiveValue.greaterThanOrEqual(params.value) &&
        effectiveValue.lessThanOrEqual(params.value2)
      );
    default:
      return false;
  }
}

export function applyNumberFilter(value: number, params: NumberFilterParams): boolean {
  const effectiveValue = value || 0;
  switch (params.operation) {
    case NumberFilterOperation.Equal:
      return effectiveValue === params.value;
    case NumberFilterOperation.GreaterThan:
      return effectiveValue > params.value;
    case NumberFilterOperation.GreaterThanOrEqual:
      return effectiveValue >= params.value;
    case NumberFilterOperation.LessThan:
      return effectiveValue < params.value;
    case NumberFilterOperation.LessThanOrEqual:
      return effectiveValue <= params.value;
    case NumberFilterOperation.Between:
      return effectiveValue >= params.value && effectiveValue <= params.value2;
    default:
      return false;
  }
}

export function applyStringFilter(value: string, params: StringFilterParams): boolean {
  switch (params.operation) {
    case StringFilterOperation.Contains:
      return value?.includes(params.value) ?? false;
    case StringFilterOperation.Is:
      return value === params.value;
    case StringFilterOperation.StartsWith:
      return value?.startsWith(params.value) ?? false;
    case StringFilterOperation.Empty:
      return value == null || !value.trim().length;
    default:
      return false;
  }
}

export function applyDateFilter(start: number, end: number, params: DateFilterParams): boolean {
  const { value: filterStart, value2: filterEnd } = params;
  switch (params.operation) {
    case DateFilterOperation.GreaterThan:
      return start > filterEnd;
    case DateFilterOperation.GreaterThanOrEqual:
      return start >= filterEnd;
    case DateFilterOperation.LessThan:
      return end < filterStart;
    case DateFilterOperation.LessThanOrEqual:
      return end <= filterStart;
    case DateFilterOperation.Equal:
    case DateFilterOperation.Between:
      return start <= filterEnd && end >= filterStart;
    default:
      return false;
  }
}
