import path from 'tjs:path';

import {
  assertEq,
  fail,
  flushReact,
  getBridge,
  getCompMapSize,
  HARNESS_CODES_PATH,
  runGc,
} from '../lib/probe';

export async function runBindingLeakTest(): Promise<void> {
  const { TEST_EXIT_OK, HARNESS_EXIT_ERROR } = await import(
    path.join(import.meta.dirname, HARNESS_CODES_PATH)
  );

  const bridge = getBridge();
  const View = bridge.NativeRender.NativeComponents.View;
  const LV_EVENT_CLICKED = bridge.NativeRender.lv_conf.LV_EVENT_CLICKED;

  try {
    assertEq(getCompMapSize(), 0, 'baseline comp_map');

    const closeViews = [];
    for (let i = 0; i < 8; i++) {
      closeViews.push(new View({ uid: `close-${i}` }));
    }
    assertEq(getCompMapSize(), 8, 'close path: live after create');
    for (const view of closeViews) {
      view.close();
    }
    assertEq(getCompMapSize(), 0, 'close path: empty after close');
    closeViews.length = 0;
    runGc();
    assertEq(getCompMapSize(), 0, 'close path: empty after gc');

    const gcViews = [];
    for (let i = 0; i < 8; i++) {
      gcViews.push(new View({ uid: `gc-${i}` }));
    }
    assertEq(getCompMapSize(), 8, 'gc path: live with refs');
    gcViews.length = 0;
    runGc();
    assertEq(getCompMapSize(), 0, 'gc path: empty after drop+gc');

    const parent = new View({ uid: 'parent' });
    const child = new View({ uid: 'child' });
    parent.appendChild(child);
    assertEq(getCompMapSize(), 2, 'parent/child: two live');
    child.close();
    parent.close();
    assertEq(getCompMapSize(), 0, 'parent/child: empty after teardown');
    runGc();
    assertEq(getCompMapSize(), 0, 'parent/child: empty after gc');

    const eventView = new View({ uid: 'event-view' });
    eventView.addEventListener(LV_EVENT_CLICKED);
    assertEq(getCompMapSize(), 1, 'event path: one live');
    eventView.close();
    assertEq(getCompMapSize(), 0, 'event path: empty after close');
    runGc();
    assertEq(getCompMapSize(), 0, 'event path: empty after gc');

    flushReact();
    console.log('binding leak probe: PASS');
    tjs.exit(TEST_EXIT_OK);
  } catch (error) {
    console.error('binding leak probe error:', error);
    fail(String(error));
    tjs.exit(HARNESS_EXIT_ERROR);
  }
}
