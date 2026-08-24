/**
 * All site copy lives here so it can be edited in one place.
 *
 * VOICE: written without personal pronouns — no "I", no "she". Describe the
 * work, not the person. Keep new copy in the same register.
 *
 * NOTE FOR MANVI / EDITOR:
 *  - `profile.title` and `profile.institution` are best guesses. Replace with
 *    the exact designation and college name.
 *  - `testimonials` are PLACEHOLDER text. Replace with real student feedback.
 *  - `publications` are PLACEHOLDER entries. Replace with real papers.
 *  - The VPN Lawyers association is PAST. End date is a guess — correct it.
 */

export const PROFILE = {
  name: 'Manvi Badyal',
  title: 'Assistant Professor of Law',
  secondTitle: 'Advocate, Bar Council of Punjab & Haryana',
  formerRole: 'Formerly Legal Associate, VPN Lawyers (Australia), Chandigarh',
  institution: 'Faculty of Law',           // ← replace with real institution
  enrolment: 'PH/8438/2022',
  email: 'manvibadyal07@gmail.com',
  phone: '+91 82647 83139',
  phoneHref: 'tel:+918264783139',
  linkedin: 'https://www.linkedin.com/in/manvi-badyal-71673630b',
  linkedinLabel: 'manvi-badyal',
  location: 'Punjab, India',
};

export const HERO = {
  pill: 'Teaching full time · open to research briefs',
  headlineA: 'Teaching law the way',
  headlineAccent: "it's actually argued.",
  sub:
    'Assistant Professor of Law and enrolled advocate. Three years of independent practice before ' +
    'the move into full-time teaching — and that difference shows up in every class on procedure.',
  chips: [
    { v: '3', suffix: '+', k: 'Years in practice' },
    { v: 'NET', k: 'Qualified' },
  ],
};

export const ABOUT = {
  heading: 'From the courtroom',
  headingAccent: 'to the classroom.',
  /** Rendered with the typewriter animation. */
  typed:
    'Three years of independent practice before the District & Sessions Courts — civil, criminal, ' +
    'recovery, consumer and family matters — is where the instinct came from. What reaches the ' +
    'lecture hall now is not only what a section says, but how it is argued, where it gives way, and ' +
    'what a judge will actually ask.',
  closing:
    'Teaching sits alongside a continuing research and drafting practice, so the academic side and ' +
    'the working side keep feeding each other.',
  facts: [
    { v: '3', suffix: '+', k: 'Years in independent practice' },
    { decimal: '8.27', k: 'LL.M. CGPA, Criminal Law' },
  ],
  cards: [
    { icon: 'cap', t: 'Ph.D. in Criminal Law', d: 'Guru Nanak Dev University — in progress since 2025' },
    { icon: 'globe', t: 'Cross-border drafting', d: 'Two years drafting to Australian standards' },
  ],
};

export const TEACHING = {
  heading: 'In the lecture hall.',
  sub: 'Criminal law and procedure, taught from files that were actually carried.',
  nowTitle: 'Assistant Professor of Law',
  nowMeta: 'LL.B. & LL.M. · Criminal Law & Procedure',
  /** Rendered word-by-word with the split-text animation. */
  nowBody:
    'The subjects taught here are the subjects practised. In a class on bail or cross-examination the ' +
    'examples come from matters argued first-hand — so students meet the law as it is used, not only ' +
    'as it is printed.',
  stats: [
    { v: '3', k: 'Moot courts convened' },
    { v: '100', suffix: '+', k: 'Students taught' },
    { v: 'NET', k: 'Qualified' },
  ],
  courses: [
    { n: '01', t: 'Criminal Procedure', d: 'Bail, evidence and cross-examination, taught against real case files.' },
    { n: '02', t: 'Constitutional & Administrative Law', d: 'Anchored in the service and recovery disputes where these questions actually surface.' },
    { n: '03', t: 'Legal Research & Drafting', d: 'Drafting-first — every exercise ends in a usable pleading, notice or opinion.' },
    { n: '04', t: 'Moot Court & Oral Advocacy', d: 'Coached from the convener\'s chair: three national moots organised, one international final placed 2nd.' },
  ],
};

/** Freelance / consulting offer — the section that should win research briefs. */
export const SERVICES = {
  heading: 'Research and drafting,',
  headingAccent: 'on brief.',
  sub:
    'Research and drafting work for firms, counsel and individuals — remote and to deadline. ' +
    'Two years as associate to an Australian practice, drafting to Australian standards.',
  proof: [
    { v: '20', suffix: '+', k: 'Matters researched & analysed' },
    { v: '50', suffix: '+', k: 'Cases filed & managed' },
    { v: '3', k: 'Increments in seven months' },
  ],
  items: [
    { icon: 'search', t: 'Legal Research & Judgment Analysis', d: 'Precedent research, ratio extraction and written case notes.' },
    { icon: 'doc', t: 'Pleadings & Drafting', d: 'Plaints, written statements, petitions, replies and legal notices.' },
    { icon: 'check', t: 'Contract Drafting & Vetting', d: 'Agreements and deeds drafted, reviewed and negotiated.' },
    { icon: 'scale', t: 'Legal Opinions', d: 'Reasoned written opinions on questions of law and procedure.' },
    { icon: 'home', t: 'Title & Property Due Diligence', d: 'Title investigation for loan, mortgage and recovery matters.' },
    { icon: 'globe', t: 'Cross-Border Support', d: 'Research and drafting support for firms outside India.' },
  ],
};

export const PRACTICE = {
  heading: 'Matters argued.',
  sub: 'Carried before the District & Sessions Courts and allied forums.',
  items: [
    { icon: 'scale', t: 'Civil Litigation', d: 'Suits, recovery actions and property disputes — filing to final decree.' },
    { icon: 'shield', t: 'Criminal Defence', d: 'Bail, trial strategy and cross-examination.' },
    { icon: 'home', t: 'Family Law', d: 'Matrimonial, custody and maintenance matters, handled quietly.' },
    { icon: 'bank', t: 'Banking & Recovery', d: 'Loan recovery, mortgage disputes and title due diligence.' },
    { icon: 'doc', t: 'Consumer Complaints', d: 'Complaints and appeals before consumer forums.' },
    { icon: 'car', t: 'Motor Accident Claims', d: 'Claims before motor accident claims tribunals.' },
  ],
};

export const PUBLICATIONS = {
  heading: 'Papers &',
  headingAccent: 'journals.',
  sub: 'Writing that sits between the classroom and the courtroom.',
  /** PLACEHOLDER — replace with real publications. */
  items: [
    {
      year: '2025',
      type: 'Journal Article',
      title: 'Anticipatory Bail and the Limits of Judicial Discretion',
      venue: 'Placeholder — journal name & volume',
      abstract: 'Examines how discretion under anticipatory bail provisions is exercised across trial courts, and argues for clearer articulation of reasons at the district level.',
    },
    {
      year: '2024',
      type: 'Conference Paper',
      title: 'Procedural Delay in Recovery Proceedings: A District Court Study',
      venue: 'Placeholder — conference name',
      abstract: 'A study of adjournment patterns in money recovery suits and their effect on realisation timelines for institutional creditors.',
    },
    {
      year: '2024',
      type: 'Journal Article',
      title: 'Evidence and the Digital Record in Criminal Trials',
      venue: 'Placeholder — journal name & volume',
      abstract: 'Considers the treatment of electronic evidence at the trial stage and the practical burden certification requirements place on prosecution and defence alike.',
    },
  ],
};

export const STUDENTS = {
  heading: 'Ask the back bench.',
  sub: 'What students say once the attendance register is closed.',
  formTitle: 'Add yours',
  formSub: 'Taught a semester here? Leave a line.',
  /** PLACEHOLDER — replace with real student feedback. */
  quotes: [
    { q: 'She explained the bail provisions with a matter she had argued herself. I have never taken notes that fast.', who: 'LL.B. · Fifth semester' },
    { q: 'Ma\'am makes procedure feel like strategy instead of a list to memorise. Her classes fill up first.', who: 'LL.B. · Third year' },
    { q: 'She sat with our moot team past nine rewriting our arguments. We placed — because she cared more than we did.', who: 'Moot court participant' },
    { q: 'The only teacher who says "here is what actually happens in court" and then proves it.', who: 'LL.M. · Criminal Law' },
    { q: 'I came to law school unsure. One semester with her and I want to litigate.', who: 'LL.B. · Second year' },
  ],
};

export const JOURNEY = {
  heading: 'Two tracks, run at the same time.',
  items: [
    { when: '2015 — 2017', tag: 'academe', t: 'Schooling, CBSE', org: '', nt: 'KCM Memorial Sr. Sec. School, Pathankot · 10 CGPA' },
    { when: '2020', tag: 'academe', t: 'Bachelor of Arts — 70%', org: '', nt: 'St. Soldier Law College, Jalandhar' },
    { when: '2022', tag: 'academe', t: 'LL.B. — 76%', org: '', nt: 'Top 3 of the programme, every semester' },
    { when: 'Jul 2022 — Aug 2023', tag: 'practice', t: 'Legal Advocate & Scholar', org: 'District & Sessions Court, Jalandhar', nt: '50+ cases filed and managed end to end' },
    { when: 'Feb 2023 — 2025', tag: 'practice', t: 'Advocate, independent practice', org: 'District Bar Association, Pathankot', nt: 'Civil, criminal, recovery, consumer and family matters' },
    { when: '2024', tag: 'academe', t: 'LL.M. Criminal Law — 8.27 CGPA', org: 'Guru Nanak Dev University, Amritsar', nt: 'NET qualified' },
    { when: 'Jun 2024 — 2025', tag: 'practice', t: 'Legal Associate, Chandigarh', org: 'VPN Lawyers — Australian practice', nt: 'Drafting to Australian standards · three increments in seven months' },
    { when: 'Feb 2025 — Present', tag: 'academe', t: 'Ph.D. (Law), Criminal Law', org: 'Guru Nanak Dev University', nt: 'Pursued alongside teaching' },
    { when: 'Present', tag: 'academe', t: 'Assistant Professor of Law', org: 'Full-time faculty', nt: 'Criminal law and procedure, LL.B. & LL.M.' },
  ],
};

export const HONOURS = {
  heading: 'The short list.',
  items: [
    { icon: 'star', t: 'NET Qualified', d: 'National Eligibility Test' },
    { icon: 'trophy', t: '2nd — International Moot Court', d: 'Banasthali University, Jaipur' },
    { icon: 'book', t: 'Top 3, every semester', d: 'LL.B. programme' },
    { icon: 'flag', t: 'Convener — 3 national moots', d: 'During LL.B. & LL.M.' },
    { icon: 'users', t: 'President, Student Council', d: '& Disciplinary Committee' },
    { icon: 'mic', t: 'Seminar papers presented', d: 'Academic conferences' },
  ],
};

/**
 * Subject options are derived from the real service and practice names so that
 * every "Enquire" button has an exactly matching option to select.
 */
export const CONTACT = {
  heading: 'Tell us what you need.',
  sub: 'A research brief, a drafting job, a guest lecture, or a question about a matter. Replies within a day.',
  groups: [
    { label: 'Research & drafting', options: SERVICES.items.map((i) => i.t) },
    { label: 'Litigation', options: PRACTICE.items.map((i) => i.t) },
    { label: 'Other', options: ['Guest lecture / academic', 'Something else'] },
  ],
};

/** Flat list of every selectable subject, in display order. */
export const CONTACT_SUBJECTS: string[] = CONTACT.groups.flatMap((g) => g.options);

/**
 * Set this to a URL to POST contact + feedback submissions to a real backend
 * (Formspree, a Cloud Function, your own API). While it is empty the site falls
 * back to local behaviour and says so plainly in the UI.
 */
export const SUBMIT_ENDPOINT = '';

export const RIBBON_A = [
  'Criminal Law', 'Legal Drafting', 'Judgment Analysis', 'Moot Court Coaching',
  'Constitutional Law', 'Legal Research', 'Contract Vetting',
];

export const RIBBON_B = [
  'Pathankot', 'Jalandhar', 'Amritsar', 'Chandigarh',
  'District & Sessions Courts', 'Consumer Forums', 'Claims Tribunals',
];

export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'teaching', label: 'Teaching' },
  { id: 'services', label: 'Research' },
  { id: 'publications', label: 'Papers' },
  { id: 'students', label: 'Students' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];
