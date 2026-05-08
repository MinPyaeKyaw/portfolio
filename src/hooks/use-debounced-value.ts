import { useEffect, useState } from 'react'

/**
 * Returns `value` only after it has stayed unchanged for `delayMs`.
 * Useful for debouncing search inputs so API calls don't fire on every keystroke.
 */
export function useDebouncedValue<T>(value: T, delayMs = 300): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(id)
  }, [value, delayMs])

  return debounced
}
