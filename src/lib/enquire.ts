import { site } from '@/data/site'

export const wa = (text = ''): string => `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`

// The enquiry panel is mounted once in the layout; anything can open it with this.
export const openEnquire = () => dispatchEvent(new Event('open-enquire'))
