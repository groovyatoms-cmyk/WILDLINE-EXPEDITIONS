import { crew, faq, join } from '@/data/site'

// Preparation guides. The permits copy reuses the site's own answers so the pages never disagree with the FAQ and the crew specs.
export type Guide = { path: string; title: string; description: string; intro: string; groups: [string, string[]][] }

const answer = (q: string) => faq.groups.flatMap((g) => g.items).find(([x]) => x === q)?.[1] ?? ''

export const packing: Guide = {
  path: '/packing',
  title: 'Packing list',
  description:
    'What to pack for a WILDLINE 4x4 convoy: layers, sun and altitude care, medicines, documents and what the crew already carries.',
  intro: `${answer('What should I pack?')} Mountain weather changes fast, so pack for cold and sun on the same day.`,
  groups: [
    [
      'Clothing',
      [
        'Warm jacket (down or fleece)',
        'Thermal base layers',
        'Light layers you can add or remove',
        'Waterproof shell',
        'Warm hat, gloves and socks',
        'Comfortable, grippy shoes or boots',
      ],
    ],
    [
      'Sun and altitude',
      [
        'Sunglasses (UV-rated)',
        'Sunscreen and lip balm with SPF',
        'Cap or brimmed hat',
        'Reusable water bottle',
        'Personal medicines, including anything you take for altitude',
      ],
    ],
    ['Gadgets', ['Power bank', 'Phone and car charger', 'Camera and spare memory cards', 'Headlamp or small torch']],
    [
      'Documents',
      [
        'Government photo ID (the one you sent us for permits)',
        'Printed copies of the permits we send',
        'Travel and medical insurance papers',
        'Emergency contact details',
      ],
    ],
    [
      'Already with the crew',
      [join.includes[3], join.includes[4], 'A sat phone and VHF radios on every convoy', 'Permits, stays and meals'],
    ],
  ],
}

export const permits: Guide = {
  path: '/permits',
  title: 'Permits and documents',
  description: 'How Inner Line and protected-area permits work on a WILDLINE convoy: what we arrange, what we need from you and when.',
  intro: answer('Who arranges permits?'),
  groups: [
    [
      'What we need from you',
      [
        join.steps[2][1],
        'A clear copy of a valid government photo ID',
        'Your name exactly as on your ID, so the permit is accepted at checkpoints',
      ],
    ],
    [
      'What we take care of',
      [
        `${crew.specs.find(([n]) => n === 'Permits')?.[1] ?? ''}.`,
        'Applications to the authorities, in good time before departure',
        'The permit set you carry on the road',
      ],
    ],
    [
      'On the road',
      [
        'Carry your original ID and the permit copies',
        'Keep them where you can reach them at checkpoints',
        'The lead handles stops and registration for the convoy',
      ],
    ],
    [
      'If a permit is delayed or refused',
      ['Permits depend on the authorities, so timing can shift', 'We offer a changed route or date first, as set out in the Terms'],
    ],
  ],
}
