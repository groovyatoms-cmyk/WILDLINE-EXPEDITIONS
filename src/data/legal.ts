import { site } from '@/data/site'

// Draft policy copy. Placeholder terms: have them reviewed by a lawyer before launch.
const UPDATED = '20 October 2026'
const contact: [string, string] = [
  'Contact us',
  `Questions about this policy: email ${site.email} or message us on WhatsApp. We reply within two working days.`,
]

export const legal = {
  privacy: {
    path: '/privacy',
    updated: UPDATED,
    title: 'Privacy policy',
    sections: [
      [
        'What we collect',
        'Name, phone number, email, trip choice and group size when you enquire or book. Medical or dietary details only if you choose to share them for trip safety.',
      ],
      [
        'How we use it',
        'To reply to enquiries, confirm bookings, arrange permits, stays and vehicles, and keep you safe on the road. We do not sell your data.',
      ],
      [
        'Who sees it',
        'Our crew and trusted partners (permit agents, stays, payment providers) only as needed to run your trip, and authorities where permits or the law require it.',
      ],
      [
        'WhatsApp enquiries',
        'Enquiries are sent through WhatsApp and are handled under WhatsApp’s own privacy terms. This website has no backend and stores no form data.',
      ],
      [
        'Retention and your rights',
        'We keep booking records for as long as needed for safety, accounting and legal reasons. Ask us to access, correct or delete your data by email.',
      ],
      [
        'Identity documents',
        'We ask for a copy of your ID only to arrange Inner Line and protected-area permits. We use it for that and nothing else, share it only with the permit authority or agent, and delete our copy after the trip unless the law requires us to keep it.',
      ],
      [
        'Children',
        'Guests under 18 travel with a guardian, who gives us the child’s details. We do not knowingly collect data from children through this website.',
      ],
      [
        'Keeping it safe',
        'Booking details live in our crew’s accounts and are shared only with the people who need them for your trip. Please do not send card numbers or passwords over WhatsApp or email.',
      ],
      [
        'Changes to this policy',
        `We update this page when what we do with your data changes. The date at the top shows the latest version.`,
      ],
      contact,
    ],
  },
  terms: {
    path: '/terms',
    updated: UPDATED,
    title: 'Terms and conditions',
    sections: [
      [
        'Booking',
        'A seat is confirmed once the deposit is received and acknowledged in writing. Prices are per person and exclude flights, personal insurance and items not listed as included.',
      ],
      [
        'Fitness and risk',
        'Expeditions cross remote, high-altitude terrain. You confirm you are fit to travel, have disclosed relevant medical conditions and accept the risks of mountain and desert travel.',
      ],
      [
        'Crew authority',
        'The lead driver-guide may change the route, halt, turn back or remove a guest for safety, weather, road closures, permits or conduct, without refund for unused services.',
      ],
      [
        'Convoy rules',
        'Follow crew instructions, keep convoy order and spacing, and respect local people, wildlife and the environment. Carry your own valid ID and permit documents.',
      ],
      [
        'Payments',
        'The deposit and the balance are due on the dates we confirm in writing. Prices are quoted in Indian rupees. A seat that is not paid for by its due date can be released to another guest.',
      ],
      [
        'Permits and documents',
        'We arrange Inner Line and protected-area permits once you send valid ID. Permits depend on the authorities: if one is refused or delayed for reasons outside our control, we will offer a changed route or date first.',
      ],
      [
        'Vehicles and stays',
        'We may swap a vehicle, stay or meal stop for an equivalent one when roads, weather or availability require it.',
      ],
      ['Insurance', 'Travel and medical insurance, including evacuation cover for altitude, is the guest’s responsibility.'],
      [
        'Liability',
        'We take every reasonable precaution but are not liable for loss, injury or delay caused by weather, landslides, closures, strikes, force majeure or guest negligence, to the extent allowed by law.',
      ],
      ['Governing law', 'These terms are governed by the laws of India.'],
      contact,
    ],
  },
  refund: {
    path: '/refund',
    updated: UPDATED,
    title: 'Refund policy',
    sections: [
      ['Cancelled by you', '30 days or more before departure: 90% refund. 15–29 days: 50% refund. Under 15 days or no-show: no refund.'],
      [
        'How to cancel',
        `Tell us in writing by email or WhatsApp. The days before departure are counted from the day we receive your message, so cancel as early as you can.`,
      ],
      ['Date change', 'Free once, up to 30 days before departure, subject to seat availability on the new date.'],
      ['Cancelled by us', 'If we cancel a departure, you get a full refund or a seat on another date of your choice.'],
      [
        'Safety and force majeure',
        'If the trip is shortened or altered by weather, closures or safety calls on the road, unused services are not refundable, but we will try to offer a reasonable alternative.',
      ],
      [
        'How refunds are paid',
        'To the original payment method within 7–10 working days of approval. Payment gateway fees are non-refundable.',
      ],
      [
        'Insurance',
        'Travel insurance can cover costs we do not refund. Check that your policy covers cancellation and keep the receipt we send you for a claim.',
      ],
      contact,
    ],
  },
  cookies: {
    path: '/cookies',
    updated: UPDATED,
    title: 'Cookies policy',
    sections: [
      ['What are cookies', 'Small files a website stores in your browser. Similar technologies, such as local storage, work the same way.'],
      [
        'What we use today',
        'Only what the site needs to work: your cookie choice and your light or dark theme, both kept in your browser. They are not sent to us or to any third party.',
      ],
      [
        'Analytics and marketing',
        'We do not run analytics or advertising cookies today. If we add them later, they will only load after you accept them in the cookie banner.',
      ],
      [
        'Third-party content',
        'Fonts load from Google Fonts. Links to Facebook, Instagram, YouTube and WhatsApp open on those services, which set their own cookies under their own policies.',
      ],
      [
        'Your choices',
        'Accept or decline in the cookie banner. You can also clear site data in your browser settings at any time, and the banner will ask again.',
      ],
      contact,
    ],
  },
}
