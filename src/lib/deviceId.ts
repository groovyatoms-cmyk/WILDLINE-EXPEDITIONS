import { clear, read, write } from '@/lib/storage'

const ID = 'device-id'
const CONSENT = 'cookie-consent'

// The stored device ID, or null before consent or if it has not been made yet.
export const deviceId = (): string | null => (read(CONSENT) === 'accepted' ? read(ID) : null)

// Makes (or reuses) the device ID, but only for a visitor who accepted cookies. The library loads on demand so it is never
// downloaded by a visitor who declines. Resolves to null on decline or if the browser blocks the signals.
export async function identify(): Promise<string | null> {
  if (read(CONSENT) !== 'accepted') {
    clear(ID)
    return null
  }
  const cached = read(ID)
  if (cached) return cached
  try {
    const FP = await import('@fingerprintjs/fingerprintjs')
    const { visitorId } = await (await FP.load()).get()
    write(ID, visitorId)
    return visitorId
  } catch {
    return null
  }
}
