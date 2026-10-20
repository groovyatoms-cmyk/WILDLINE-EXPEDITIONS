import { deviceId, identify } from '@/lib/deviceId'

jest.mock('@fingerprintjs/fingerprintjs', () => ({ load: async () => ({ get: async () => ({ visitorId: 'abc123' }) }) }))

describe('device ID', () => {
  beforeEach(() => localStorage.clear())
  it('is not made without consent, and a stored one is deleted', async () => {
    localStorage.setItem('device-id', 'old')
    expect(await identify()).toBeNull()
    expect(localStorage.getItem('device-id')).toBeNull()
    localStorage.setItem('cookie-consent', 'declined')
    expect(await identify()).toBeNull()
    expect(deviceId()).toBeNull()
  })
  it('is made once after accept and then reused', async () => {
    localStorage.setItem('cookie-consent', 'accepted')
    expect(await identify()).toBe('abc123')
    expect(deviceId()).toBe('abc123')
    localStorage.setItem('device-id', 'kept')
    expect(await identify()).toBe('kept')
  })
  it('hides a stored ID once consent is gone', () => {
    localStorage.setItem('device-id', 'abc123')
    expect(deviceId()).toBeNull()
  })
})
