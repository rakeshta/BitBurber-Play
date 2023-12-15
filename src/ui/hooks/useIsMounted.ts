import { React } from '/ui/lib/react';

const { useCallback, useEffect, useRef } = React;

/**
 * React hook to test if the component is mounted.
 *
 * @returns A callback that can test if the component is mounted.
 */
export function useIsMounted(): () => boolean {
  // track mounted state
  const mounted = useRef(true);
  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  // wrap in a callback for a stable reference
  return useCallback(() => mounted.current, []);
}
