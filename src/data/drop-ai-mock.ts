/* Drop AI — mock data (no backend).
   Ported from the design handoff's drop-ai-mock.js. Swap each export for a real API call. */

export type Intent = 'recipe' | 'stores' | 'deals' | 'orders';

export type BasketItem = { id: string; label: string; store: string; price: string };

export type Product = {
  id: string;
  label: string;
  price: string;
  unit?: string;
  was?: string;
  badge?: string;
};

export type Store = {
  id: string;
  name: string;
  initials: string;
  deal: string;
  rating: string;
  reviews: string;
  cuisine: string;
  eta: string;
  dist: string;
  delivery: string;
  min: string;
  products: Product[];
};

export type Order = {
  id: string;
  store: string;
  initials: string;
  date: string;
  total: string;
  items: string;
};

export type Chat = {
  id: string;
  title: string;
  preview: string;
  time: string;
  count: string;
};

export const user = { firstName: 'Rudolf', basketCount: 1, address: '14 Peckham Rye, London' };

export const assistant = { name: 'Drop AI' };

export const greeting = (name: string) => `Hungry, ${name}? Let’s sort it.`;

export const starterPrompts: { id: string; label: string; intent: Intent }[] = [
  { id: 'p1', label: 'Ingredients for egusi soup', intent: 'recipe' },
  { id: 'p2', label: 'Deals near me', intent: 'deals' },
  { id: 'p3', label: 'Reorder my last shop', intent: 'orders' },
  { id: 'p4', label: 'Jollof rice under £15', intent: 'stores' },
  { id: 'p5', label: 'What’s open now?', intent: 'stores' },
  { id: 'p6', label: 'Cheapest palm oil', intent: 'stores' },
];

/* Typeahead shown while the composer has focus + text */
export const querySuggestions = [
  'egusi soup',
  'egusi seeds',
  'palm oil',
  'plantain',
  'jollof rice kit',
  'goat meat',
  'stockfish',
  'ogbono',
];

/* intent: 'recipe' — text answer + suggested basket + follow-ups */
export const recipeAnswer = {
  text: 'For a pot of egusi soup you’ll need ground melon seeds, palm oil, spinach or ugu, stockfish and assorted meat. I found everything across two nearby shops — here’s a basket to get you started.',
  basket: [
    { id: 'b1', label: 'Ground Egusi 500g', store: 'Vicro Divine Stores', price: '£5.99' },
    { id: 'b2', label: 'Zomi Palm Oil 1L', store: 'Vicro Divine Stores', price: '£3.75' },
    { id: 'b3', label: 'Stockfish Fillet', store: 'Vinse African & Caribbean', price: '£4.50' },
  ] as BasketItem[],
  basketTotal: '£14.24',
  followUps: ['Add all to basket', 'Cheaper alternatives', 'What else do I need?'],
};

/* intent: 'stores' — horizontally swipeable store results, each with a product rail */
export const storeResults = {
  reply:
    'Here are three shops near you with jollof essentials in stock. Vicro Divine has the lowest delivery fee and a 20% deal running.',
  followUps: ['Compare delivery fees', 'Only open now', 'Add cheapest to basket'],
  stores: [
    {
      id: 's1',
      name: 'Vicro Divine Stores',
      initials: 'VD',
      deal: '20% OFF £20+',
      rating: '4.8',
      reviews: '1,240',
      cuisine: 'African groceries',
      eta: '25–35 min',
      dist: '1.2 mi',
      delivery: '£0.99 delivery',
      min: '£10 min',
      products: [
        { id: 'v1', label: 'African Harvest Beans Flour', price: '£11.49', unit: '/3.5kg' },
        { id: 'v2', label: 'Zomi Palm Oil 1L', price: '£3.75', unit: '/1L' },
        { id: 'v3', label: 'Ground Egusi 500g', price: '£5.99', unit: '/500g' },
      ],
    },
    {
      id: 's2',
      name: 'Neephi Foods Store',
      initials: 'NF',
      deal: 'FREE DELIVERY £30+',
      rating: '4.6',
      reviews: '2,015',
      cuisine: 'African & Caribbean',
      eta: '30–40 min',
      dist: '1.8 mi',
      delivery: '£1.49 delivery',
      min: '£12 min',
      products: [
        { id: 'n1', label: 'Long Grain Rice 5kg', price: '£8.49', unit: '/5kg' },
        { id: 'n2', label: 'Tin Tomato Puree', price: '£1.20', unit: '/400g' },
        { id: 'n3', label: 'Scotch Bonnet 250g', price: '£2.10', unit: '/250g' },
      ],
    },
    {
      id: 's3',
      name: 'Vinse African & Caribbean',
      initials: 'VA',
      deal: 'BUY 2 GET 1',
      rating: '4.7',
      reviews: '870',
      cuisine: 'Frozen & fresh',
      eta: '35–45 min',
      dist: '2.4 mi',
      delivery: '£1.99 delivery',
      min: '£15 min',
      products: [
        { id: 'x1', label: 'Stockfish Fillet 100g', price: '£4.50', unit: '/100g' },
        { id: 'x2', label: 'Assorted Goat Meat', price: '£15.30', unit: '/1kg' },
        { id: 'x3', label: 'Tasty Ewa Agoyin', price: '£7.50', unit: '/400g' },
      ],
    },
  ] as Store[],
};

/* intent: 'deals' */
export const dealResults = {
  reply:
    'These shops have the deepest discounts near you right now. Swipe through to see what’s on promotion.',
  followUps: ['Deals ending today', 'Free delivery only'],
  stores: [
    {
      id: 'd1',
      name: 'Vicro Divine Stores',
      initials: 'VD',
      deal: '20% OFF',
      rating: '4.8',
      reviews: '1,240',
      cuisine: 'African groceries',
      eta: '25 min',
      dist: '1.2 mi',
      delivery: '£0.99 delivery',
      min: '£10 min',
      products: [
        {
          id: 'dp1',
          label: 'African Harvest Beans Flour',
          price: '£11.49',
          was: '£12.99',
          badge: '-12%',
        },
        { id: 'dp2', label: 'Island Best Peeled Beans', price: '£9.99', was: '£11.49', badge: '-10%' },
        { id: 'dp3', label: 'Ground Egusi 500g', price: '£4.69', was: '£6.29', badge: 'B1G1' },
      ],
    },
    {
      id: 'd2',
      name: 'Neephi Foods Store',
      initials: 'NF',
      deal: '15% OFF',
      rating: '4.6',
      reviews: '2,015',
      cuisine: 'African & Caribbean',
      eta: '31 min',
      dist: '1.8 mi',
      delivery: '£1.49 delivery',
      min: '£12 min',
      products: [
        { id: 'dp4', label: 'Black Eyed Beans 1kg', price: '£3.29', was: '£3.79', badge: '-15%' },
        { id: 'dp5', label: 'Bold All in 1 Pods', price: '£4.79', was: '£5.49', badge: '-13%' },
      ],
    },
  ] as Store[],
};

/* intent: 'orders' */
export const pastOrders = {
  reply:
    'Here are your last 3 orders. Tap one to reorder it, or I can rebuild just the items still in stock.',
  followUps: ['Only in-stock items', 'Repeat weekly'],
  orders: [
    {
      id: 'o1',
      store: 'Vicro Divine Stores',
      initials: 'VD',
      date: 'Sat 6 Sep · 08:12',
      total: '£26.78',
      items: 'Fresh Goat Meat, Zomi Palm Oil 2L, Ground Egusi 500g',
    },
    {
      id: 'o2',
      store: 'Neephi Foods Store',
      initials: 'NF',
      date: 'Tue 2 Sep · 18:40',
      total: '£19.20',
      items: 'White Garri 5kg, Ogbono Soup Mix, Garlic 4pack',
    },
    {
      id: 'o3',
      store: 'Vinse African & Caribbean',
      initials: 'VA',
      date: 'Thu 28 Aug · 12:05',
      total: '£33.45',
      items: 'Indomie Chicken 1box, Tasty Ewa Agoyin, Stockfish Fillet',
    },
  ] as Order[],
};

export const historyGroups: { when: string; chats: Chat[] }[] = [
  {
    when: 'Today',
    chats: [
      {
        id: 'h1',
        title: 'Ingredients for egusi soup',
        preview: 'You’ll need ground melon seeds, palm oil, spinach…',
        time: '08:47',
        count: '6 messages',
      },
      {
        id: 'h2',
        title: 'Deals near me',
        preview: 'Vicro Divine Stores has 20% off orders over £20',
        time: '08:12',
        count: '3 messages',
      },
    ],
  },
  {
    when: 'Yesterday',
    chats: [
      {
        id: 'h3',
        title: 'Cheapest palm oil',
        preview: 'Zomi Palm Oil 1L is £3.75 at Vicro Divine Stores',
        time: '19:20',
        count: '4 messages',
      },
      {
        id: 'h4',
        title: 'What can I cook with beans?',
        preview: 'Try moi moi, ewa agoyin or beans porridge…',
        time: '13:05',
        count: '9 messages',
      },
    ],
  },
  {
    when: 'Last 7 days',
    chats: [
      {
        id: 'h5',
        title: 'Reorder from Neephi Foods',
        preview: 'Added White Garri and Ogbono Soup Mix to basket',
        time: 'Tue',
        count: '5 messages',
      },
      {
        id: 'h6',
        title: 'Gluten-free flours',
        preview: 'Plantain flour and cassava flour are both gluten-free',
        time: 'Mon',
        count: '7 messages',
      },
    ],
  },
];

export const voice = {
  listeningLabel: 'Listening…',
  hint: 'Say something like “add palm oil to my basket”',
  transcript: 'Add a litre of palm oil and some egusi',
};

export const errorState = {
  title: 'Drop AI couldn’t answer',
  body: 'Your connection dropped mid-request. Nothing was added to your basket.',
  retry: 'Try again',
};

export const thinkingLabel = 'Checking 4 shops near you';

/* Fake latency so the thinking state is visible */
export const LATENCY_MS = 1100;

/* Naive intent router — replace with the real classifier/LLM call */
export function routeIntent(text: string): Intent {
  const q = (text || '').toLowerCase();
  if (/deal|discount|offer|cheap|sale/.test(q)) return 'deals';
  if (/reorder|last order|previous|again/.test(q)) return 'orders';
  if (/recipe|ingredient|cook|soup|make /.test(q)) return 'recipe';
  return 'stores';
}

/* Demo hook so the error turn is reachable without a backend. When the real
   POST /ai/messages lands, drop this and push the error turn from the catch. */
const FAILING_QUERY = /^cheapest palm oil near me$/i;

export function requestFails(text: string) {
  return FAILING_QUERY.test(text.trim());
}
