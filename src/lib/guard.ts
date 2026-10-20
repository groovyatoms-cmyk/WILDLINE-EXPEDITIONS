// Small null, undefined and empty checks, so callers do not repeat `!= null && !== ''` and TypeScript still narrows the type.
export const isPresent = <T>(value: T | null | undefined): value is T => value !== null && value !== undefined

// A string with something in it (not null, undefined, empty or only spaces).
export const isFilled = (value: string | null | undefined): value is string => typeof value === 'string' && value.trim() !== ''

// A list that exists and has at least one item.
export const hasItems = <T>(list: readonly T[] | null | undefined): list is readonly T[] => Array.isArray(list) && list.length > 0
