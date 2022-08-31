/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { detectTimeWindowOverlap, ValidationTimeWindow } from './validation-time-window';

describe('form', () => {
  it('should return true if time Windows overlap - detectTimeWindowOverlap', () => {
    const timeWindow1 = { startTime: -9007199254740991, endTime: 1563098400 };
    const timeWindow2 = { startTime: -9007199254740991, endTime: 1563098400 };
    expect(detectTimeWindowOverlap([timeWindow1, timeWindow2])).toBe(true);
  });

  it('should return false if time Windows do not overlap - detectTimeWindowOverlap', () => {
    const timeWindow1 = { startTime: 1655215200, endTime: 1655218800 };
    const timeWindow2 = { startTime: 1657807200, endTime: 1657893600 };
    expect(detectTimeWindowOverlap([timeWindow1, timeWindow2])).toBeFalsy();
  });

  it('should return true if time Window contains another time window', () => {
    const timeWindow1 = new ValidationTimeWindow({ startTime: 1655215200, endTime: 1655388000 });
    const timeWindow2 = new ValidationTimeWindow({ startTime: 1655301600, endTime: 1655305200 });
    expect(timeWindow1.contains(timeWindow2)).toBe(true);
  });

  it('should return false if time Window does not contain another time window', () => {
    const timeWindow1 = new ValidationTimeWindow({ startTime: 1655215200, endTime: 1655388000 });
    const timeWindow2 = new ValidationTimeWindow({ startTime: 1655301600, endTime: 1655478000 });
    expect(timeWindow1.contains(timeWindow2)).toBe(false);
  });

  it('should return false if time Window is invalid - contains', () => {
    const timeWindow1 = new ValidationTimeWindow({ startTime: null, endTime: 1655388000 });
    const timeWindow2 = new ValidationTimeWindow({ startTime: 1655301600, endTime: 1655478000 });
    expect(timeWindow1.contains(timeWindow2)).toBe(false);
  });

  it('should return true if time Window contains time', () => {
    const timeWindow1 = new ValidationTimeWindow({ startTime: 1655215200, endTime: 1655388000 });
    expect(timeWindow1.containsTime(1655215200)).toBe(true);
  });

  it('should return false if time Window does not contain time', () => {
    const timeWindow1 = new ValidationTimeWindow({ startTime: 1655215200, endTime: 1655388000 });
    expect(timeWindow1.containsTime(1655478000)).toBe(false);
  });

  it('should return false if time Window is invalid - containsTime', () => {
    const timeWindow1 = new ValidationTimeWindow({ startTime: 1655215200, endTime: null });
    expect(timeWindow1.containsTime(1655478000)).toBe(false);
  });

  it('should return true if time Window overlaps timeWindow', () => {
    const timeWindow1 = new ValidationTimeWindow({ startTime: 1655215200, endTime: 1655388000 });
    const timeWindow2 = new ValidationTimeWindow({ startTime: 1655301600, endTime: 1655305200 });
    expect(timeWindow1.overlaps(timeWindow2)).toBe(true);
  });

  it('should return false if time Window does not overlap Time Window', () => {
    const timeWindow1 = new ValidationTimeWindow({ startTime: 1655215200, endTime: 1655388000 });
    const timeWindow2 = new ValidationTimeWindow({ startTime: 1655647200, endTime: 1655650800 });
    expect(timeWindow1.overlaps(timeWindow2)).toBe(false);
  });

  it('should return false if time Window is invalid - overlap Time Window', () => {
    const timeWindow1 = new ValidationTimeWindow({ startTime: 1655215200, endTime: 1655388000 });
    const timeWindow2 = new ValidationTimeWindow({ startTime: null, endTime: null });
    expect(timeWindow1.overlaps(timeWindow2)).toBe(false);
  });
});
