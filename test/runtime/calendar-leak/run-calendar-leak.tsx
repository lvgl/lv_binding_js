import path from 'tjs:path';

import React from 'react';
import { updateTestTree } from 'lvgljs-ui';

import {
  assertEq,
  fail,
  getCompMapSize,
  HARNESS_CODES_PATH,
  runGc,
} from '../lib/probe';
import { CalendarOpenCloseScenario } from './scenario';

const ITERATIONS = 20;

function renderCalendarOpen(showCalendar: boolean): void {
  updateTestTree(<CalendarOpenCloseScenario showCalendar={showCalendar} />);
}

export async function runCalendarLeakTest(): Promise<void> {
  const { TEST_EXIT_OK, HARNESS_EXIT_ERROR } = await import(
    path.join(import.meta.dirname, HARNESS_CODES_PATH)
  );

  try {
    renderCalendarOpen(false);

    const baseline = getCompMapSize();
    assertEq(baseline, 1, 'baseline (root View only)');

    for (let i = 0; i < ITERATIONS; i++) {
      renderCalendarOpen(true);
      renderCalendarOpen(false);

      const size = getCompMapSize();
      if (size !== baseline) {
        fail(`iteration ${i + 1}/${ITERATIONS}: comp_map ${size}, expected ${baseline}`);
      }

      if ((i + 1) % 100 === 0) {
        console.log(`progress: ${i + 1}/${ITERATIONS}, comp_map=${size}`);
      }
    }

    runGc();
    assertEq(getCompMapSize(), baseline, 'after gc');

    console.log(`calendar open/close x${ITERATIONS}: PASS`);
    tjs.exit(TEST_EXIT_OK);
  } catch (error) {
    console.error('calendar leak probe error:', error);
    tjs.exit(HARNESS_EXIT_ERROR);
  }
}
