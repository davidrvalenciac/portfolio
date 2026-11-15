/* ------------------------------------------------------------------
   PORTFOLIO CONTENT
   Edit this file to add, remove or reorder work. No other file needs
   to change.

   Item fields
     type   "video" | "image" | "carousel" (use the carousel() helper)
     src    file path (videos: .mp4, images: .webp/.jpg)
     poster video only: still frame shown before playback
     ar     aspect ratio as width / height (4:5 = 0.8, 9:16 = 0.5625, 16:9 = 1.7778)
     label  caption under the piece
     dur    video only: duration text
   ------------------------------------------------------------------ */

const V = 'assets/video/';
const I = 'assets/img/';
// A carousel shows only its cover in the gallery; clicking it opens every slide in a pop-up.
const carousel = (prefix, n, label, ar = 0.8) => ({
  type: 'carousel', ar, label,
  slides: Array.from({ length: n }, (_, i) => `${I}${prefix}-${i + 1}.webp`),
});

window.PORTFOLIO = {

  /* 00 · AI VIDEO ADS — add new ads to this list.
     To add one: drop the .mp4 and a poster .webp in assets/video/ and copy a line. */
  aiAds: [
    { type: 'video', src: V + 'ai-timeforge-ad01.mp4', poster: V + 'ai-timeforge-ad01.webp', ar: 0.8, label: 'TimeForge · AD01', tag: 'AI ad', dur: '0:26' },
    { type: 'video', src: V + 'ai-frothy-carwash.mp4', poster: V + 'ai-frothy-carwash.webp', ar: 0.5625, label: 'Frothy Car Wash', tag: 'AI ad', dur: '0:14' },
    { type: 'video', src: V + 'ai-interactive-gates.mp4', poster: V + 'ai-interactive-gates.webp', ar: 0.5625, label: 'Interactive Gates', tag: 'AI ad', dur: '0:31' },
  ],
  aiPlaceholders: 0, // "coming soon" slots shown after the ads. Set to 0 to hide.

  /* 01–05 · CLIENT GALLERIES
     A group can carry a `panel` (text + numbers) instead of media items. */
  clients: [
    {
      idx: '01',
      name: 'Rocío Navarro',
      sub: 'Water Healing · Submerge in Silence',
      desc: 'A storytelling carousel and a landing page rebuilt to convert, for Rocío’s four-day silent retreat. My role: strategy, copywriting, and design.',
      tags: ['Storytelling Carousel', 'Landing Page', 'Copywriting'],
      groups: [
        { label: 'Carousel', items: [
          carousel('rocio-carousel', 9, 'Carousel · Submerge in Silence'),
        ] },
        { label: 'Landing page', items: [
          { type: 'image', src: I + 'rocio-landing.webp', ar: 2.2756, label: 'Landing page · submerge.rocionavarro.org' },
        ] },
        { label: 'Result', items: [], panel: {
          title: 'Three new clients at $3,500 each.',
          text: 'I started by listening to what Rocío needed: her story, her value proposition, and the ideas she already had in mind. I put them in order, researched the market, and turned them into a nine-slide carousel that got four times her usual engagement. Then I redesigned her landing page to convert, with copy that speaks to her audience’s pain points using the PAS and SPIN methods.',
          stats: [['4×', 'Engagement'], ['425', 'Likes in about three days'], ['18', 'Comments'], ['3', 'New clients at $3,500']],
          link: { url: 'https://submerge.rocionavarro.org', text: 'submerge.rocionavarro.org' },
        } },
      ],
    },
    {
      idx: '02',
      name: 'Mary Marcantonio',
      sub: 'Parent leadership coach',
      desc: 'For parent leadership coach Mary Marcantonio. I cut reels from her long-form recordings, edited a brand video, and designed carousels and quote posts on her brand guidelines. My role: video editing, motion graphics, and design.',
      tags: ['Video Editing', 'Motion Graphics', 'Carousel Design'],
      groups: [
        { label: 'Brand video', items: [
          { type: 'video', src: V + 'ccb-mary-vsl.mp4', poster: V + 'ccb-mary-vsl.webp', ar: 1.7778, label: 'Mary Marcantonio · Brand video', dur: '1:05' },
        ] },
        { label: 'Reels & motion', items: [
          { type: 'video', src: V + 'ccb-reel-intervention.mp4', poster: V + 'ccb-reel-intervention.webp', ar: 0.5625, label: 'Reel · Early Intervention', dur: '1:37' },
          { type: 'video', src: V + 'ccb-guide-mockup.mp4', poster: V + 'ccb-guide-mockup.webp', ar: 0.8, label: 'Guide mockup · Motion', dur: '0:07' },
          { type: 'video', src: V + 'ccb-reel-leadership.mp4', poster: V + 'ccb-reel-leadership.webp', ar: 0.5625, label: 'Reel · Parent Leadership Model', dur: '0:41' },
        ] },
        { label: 'Carousels & posts', items: [
          carousel('ccb-carousel-a', 4, 'Carousel · School refusal'),
          carousel('ccb-carousel-b', 5, 'Carousel · Healthy Tech Blueprint'),
          { type: 'image', src: I + 'ccb-quote-focus.webp', ar: 0.8, label: 'Quote · Focus' },
          { type: 'image', src: I + 'ccb-quote-understood.webp', ar: 0.8, label: 'Quote · Understood' },
        ] },
      ],
    },
    {
      idx: '03',
      name: 'MyFedTrainer',
      sub: 'Federal grant training',
      desc: 'Short educational clips and LinkedIn carousels for MyFedTrainer, a federal grant training company. I turned dense compliance topics into 5 to 7 slide carousels and clips of about two minutes. My role: video editing, motion graphics, and graphic design.',
      tags: ['Video Editing', 'Motion Graphics', 'LinkedIn Carousels'],
      groups: [
        { label: 'Clips & LinkedIn carousels', items: [
          { type: 'video', src: V + 'mft-common-reports.mp4', poster: V + 'mft-common-reports.webp', ar: 0.5625, label: 'Clip · Common Reports', dur: '2:30' },
          carousel('mft-risk', 5, 'Carousel · Risk assessment'),
          { type: 'video', src: V + 'mft-cash-flow.mp4', poster: V + 'mft-cash-flow.webp', ar: 0.5625, label: 'Clip · Cash Flow Planning', dur: '1:44' },
          carousel('mft-carousel-b', 7, 'Carousel · Correcting a grant report'),
        ] },
      ],
    },
    {
      idx: '04',
      name: 'KeelPoint',
      sub: 'Gisle Sørli · Family office',
      desc: 'A reel, quote graphics, and a banner for KeelPoint, a family office, and for Gisle Sørli. I adapted every piece to the brand guide.',
      tags: ['Reel', 'Social Graphics', 'Banner'],
      groups: [
        { label: 'Reel', items: [
          { type: 'video', src: V + 'keelpoint-reel.mp4', poster: V + 'keelpoint-reel.webp', ar: 0.5625, label: 'Reel · What’s Yours', dur: '0:11' },
        ] },
        { label: 'Social graphics', items: [
          { type: 'image', src: I + 'keelpoint-quote.webp', ar: 0.8, label: 'Quote · Gisle Sørli' },
          { type: 'image', src: I + 'keelpoint-slide.webp', ar: 0.8, label: 'Carousel slide' },
        ] },
        { label: 'Banner', items: [
          { type: 'image', src: I + 'keelpoint-banner.webp', ar: 4, label: 'Banner · Trollstigen' },
        ] },
      ],
    },
    {
      idx: '05',
      name: 'William F. Stiles',
      sub: 'Live event campaign',
      desc: 'Campaign graphics for William F. Stiles promoting a 2.5-day live event and a three-part video series: social announcements, promo posts, and slides.',
      tags: ['Campaign Visuals', 'Social Graphics', 'Slides'],
      groups: [
        { label: 'Event social', items: [
          { type: 'image', src: I + 'stile-golden-age.webp', ar: 0.8, label: 'Event announcement' },
          { type: 'image', src: I + 'stile-more-to-life.webp', ar: 0.8, label: 'Event promo' },
        ] },
        { label: 'Slide', items: [
          { type: 'image', src: I + 'stile-slide.webp', ar: 1.7778, label: 'Video series slide' },
        ] },
      ],
    },
  ],

  /* LEAD MAGNETS — every PDF page is an image in assets/img/lm/ and opens in the pop-up viewer */
  leadMagnets: [
    { label: 'The Operator’s Guide to Labor Management', prefix: I + 'lm/lm-labor', pages: 20, ar: 0.773 },
    { label: 'Manage for Employee Retention', prefix: I + 'lm/lm-retention', pages: 12, ar: 0.773 },
  ],

  /* 06 · WEBSITES */
  websites: [
    { name: 'Submerge', kind: 'Retreat landing page · Rocío Navarro', year: '2026', url: 'https://submerge.rocionavarro.org', img: I + 'rocio-landing.webp', built: '',
      did: 'Redesigned the landing page to convert, with copy that speaks to the audience’s pain points using the PAS and SPIN methods. Result: three new clients at $3,500 each.' },
    { name: 'TimeForge', kind: 'SaaS · Labor management', year: '2025–2026', url: 'https://timeforge.com/', img: I + 'web-timeforge.webp', built: 'WordPress',
      did: 'Redesigned key sections of the site and built new landing pages. I reworked the visual assets so every page looks consistent and follows the brand guidelines.' },
    { name: 'Course Creation Boutique', kind: 'Agency · Course creators', year: '2023–2026', url: 'https://coursecreationboutique.com/', img: I + 'web-ccb.webp', built: 'WordPress',
      did: 'Designed and built the entire website and moved it to a single platform, which removed 95% of the agency’s third-party tool costs within three months.' },
    { name: 'Pawbook', kind: 'Marketplace · Pet care', year: '2025', url: 'https://officialpawbook.com/', img: I + 'web-pawbooks.webp', built: 'WordPress',
      did: 'Built a two-sided marketplace for dog care, similar to Airbnb: vendors create their own listings, and buyers book and pay on the platform. Three developers had tried before me without finishing it.' },
    { name: 'Max J. Miller', kind: 'Personal blog · Newsletter', year: '2025', url: 'https://maxjmillerblog.com/', img: I + 'web-maxjmiller.webp', built: 'WordPress',
      did: 'Built a personal blog with ACF custom fields, made easy to use so the client can edit everything himself. Anyone can subscribe, and each subscriber is added to his GoHighLevel email newsletter list.' },
    { name: 'Comtel', kind: 'Telecom · El Salvador', year: '2024', url: 'http://comtel.com.sv', img: I + 'web-comtel.webp', built: 'WordPress',
      did: 'Designed and built the entire website for Comtel, a telecom company in El Salvador: a catalog of 300+ products where shopper roles decide the prices each buyer sees.' },
    { name: 'BlueCode Studios', kind: 'Web studio', year: '2025', url: 'https://bluecodestudios.com/', img: I + 'web-bluecode.webp', built: 'Claude',
      did: 'My own studio’s website. I designed it and built it with Claude.' },
  ],

  /* EXPERIENCE */
  experience: [
    { role: 'Marketing Specialist', org: 'TimeForge', note: 'US software company · Remote', date: 'Jun 2025 – Present' },
    { role: 'Founder & Growth Partner', org: 'BlueCode Studios', note: 'Web studio · Remote', date: 'May 2025 – Present' },
    { role: 'Marketing Specialist', org: 'Course Creation Boutique', note: 'US agency · Part-time, remote', date: 'Oct 2023 – Oct 2026' },
    { role: 'Marketing Specialist', org: 'Uassist.ME', note: 'Multiple client accounts · Remote', date: 'Nov 2023 – May 2025' },
    { role: 'Website Designer & Marketing Specialist', org: 'Freelance', note: 'Shopify, WordPress', date: 'Oct 2019 – Sep 2023' },
  ],

  /* 11 · CERTIFICATIONS — `img` is the certificate image opened by "View Certificate". */
  certs: [
    { name: 'Paid Campaigns for Marketing', by: 'Platzi', date: 'October 2026', img: I + 'certs/paid-campaigns.webp' },
    { name: 'Meta Ads', by: 'Platzi', date: 'August 2026', img: I + 'certs/meta-ads.webp' },
    { name: 'Essential Business Metrics', by: 'Platzi', date: 'August 2026', img: I + 'certs/business-metrics.webp' },
    { name: 'OpenAI Codex', by: 'Platzi', date: 'July 2026', img: I + 'certs/codex.webp' },
    { name: 'Website Creation with v0', by: 'Platzi', date: 'April 2026', img: I + 'certs/v0.webp' },
    { name: 'Adobe Photoshop', by: 'Udemy', date: '2023' },
    { name: 'Adobe Illustrator', by: 'Udemy', date: '2023' },
  ],
};
