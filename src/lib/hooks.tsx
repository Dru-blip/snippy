import { useCallback, useRef } from 'react';

export const useDebounce = (callback: (...args: any[]) => void, delay: number = 300) => {
  // Store the timeout ID in a ref so it persists between renders
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Create a memoized debounced functions
  const debouncedCallback = useCallback(
    (...args: any[]) => {
      // Clear the previous timeout if it exists
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedCallback;
};
