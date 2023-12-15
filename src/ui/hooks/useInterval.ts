import { React } from '/ui/lib/react';

const { useEffect, useRef } = React;

/**
 * Repetitively calls the given callback at the given interval.
 *
 * @param callback The callback function
 * @param delay The delay between calls
 */
export function useInterval(callback: () => void, delay: number | undefined): void {
  // save the callback
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // schedule a timeout
  useEffect(() => {
    // abort if no delay specified
    if (delay === undefined) {
      return;
    }

    // schedule timeout to invoke the callback
    const id = setInterval(() => savedCallback.current(), delay);

    // cleanup
    return () => clearInterval(id);
  }, [delay]);
}
