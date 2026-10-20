// localStorage that never throws (private mode, blocked site data): reads give null, writes are ignored.
export const read = (key: string): string | null => {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export const write = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* nothing to remember in this browser */
  }
}

export const clear = (key: string) => {
  try {
    localStorage.removeItem(key)
  } catch {
    /* nothing stored in this browser */
  }
}
