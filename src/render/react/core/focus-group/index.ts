import { useEffect, useRef } from 'react';

const bridge = globalThis[Symbol.for('lvgljs')] as any;
const FocusGroup = bridge?.NativeRender?.FocusGroup;

export type EdgeDirection = 'next' | 'prev';

export interface UseFocusGroupEdgeOptions {
  /**
   * Callback when focus reaches the edge.
   * @param direction 'next' means bottom/right edge, 'prev' means top/left edge
   */
  onEdge: (direction: EdgeDirection) => void;
  
  /**
   * Whether to enable wrap (focus wraps to the other end when reaching edge).
   * Default false so that the edge callback can be triggered.
   */
  wrap?: boolean;
}

/**
 * Listen for focus group edge events
 * 
 * @example
 * ```tsx
 * useFocusGroupEdge({
 *   onEdge: (direction) => {
 *     if (direction === 'next' && !isLastPage) {
 *       setCurrentPage(p => p + 1);
 *     } else if (direction === 'prev' && !isFirstPage) {
 *       setCurrentPage(p => p - 1);
 *     }
 *   }
 * });
 * ```
 */
export function useFocusGroupEdge(options: UseFocusGroupEdgeOptions) {
  const { onEdge, wrap = false } = options;
  const callbackRef = useRef(onEdge);
  
  useEffect(() => {
    callbackRef.current = onEdge;
  }, [onEdge]);

  useEffect(() => {
    if (!FocusGroup) {
      console.warn('FocusGroup API not available');
      return;
    }

    FocusGroup.setWrap(wrap);

    const handler = (isNext: boolean) => {
      const direction: EdgeDirection = isNext ? 'next' : 'prev';
      callbackRef.current(direction);
    };

    FocusGroup.setEdgeCallback(handler);

    return () => {
      FocusGroup.setWrap(true);
      FocusGroup.setEdgeCallback(null);
    };
  }, [wrap]);
}

export function setFocusGroupWrap(wrap: boolean) {
  if (!FocusGroup) {
    console.warn('FocusGroup API not available');
    return;
  }
  FocusGroup.setWrap(wrap);
}
