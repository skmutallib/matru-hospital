export type BlogBlock =
  | { type: "para"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] };

export type Post = {
  id: string;
  category: string;
  title: string;
  /** Standfirst / dek shown under the title. */
  excerpt: string;
  author: string;
  role: string;
  date: string;
  readMins: number;
  tags: string[];
  /** Gradient art used as the cover (no external images required). */
  art: string;
  body: BlogBlock[];
};

export const POSTS: Post[] = [
  {
    id: "spine-health-desk",
    category: "Orthopaedics",
    title: "The modern spine: protecting your back in a desk-bound world",
    excerpt:
      "Our spine surgeons break down the everyday habits that quietly compress the lumbar column — and the ten-minute routine that undoes the damage.",
    author: "Dr. A. Ramesh",
    role: "Senior Spine Surgeon",
    date: "Aug 12, 2026",
    readMins: 6,
    tags: ["Spine health", "Posture", "Prevention", "Physiotherapy"],
    art: "linear-gradient(135deg,#f58325 0%,#e2660f 42%,#953e14 100%)",
    body: [
      {
        type: "para",
        text: "For most of human history, the spine was built for movement — walking, lifting, reaching, resting on the ground. The modern working day asks it to do the opposite: hold a single, slightly slumped shape for eight, ten, sometimes twelve hours. The column adapts, but rarely in ways we want.",
      },
      {
        type: "para",
        text: "In our orthopaedic clinics, the most common story we hear is not a dramatic injury. It is a slow, quiet ache that arrives in the late twenties and settles in by the mid-thirties. Understanding why it happens is the first step to reversing it.",
      },
      { type: "h2", text: "What sitting really does to the lumbar spine" },
      {
        type: "para",
        text: "When you sit, the pelvis tends to roll backward, flattening the natural inward curve of the lower back. The discs between your vertebrae — soft, water-rich cushions — take on uneven pressure. Studies using pressure sensors have shown that a slouched seated posture can load the lumbar discs significantly more than standing upright.",
      },
      {
        type: "quote",
        text: "The spine does not fail from a single bad day. It adapts to the shape you hold most often — so make that shape a good one.",
        cite: "Dr. A. Ramesh",
      },
      { type: "h2", text: "The ten-minute reset" },
      {
        type: "para",
        text: "You do not need a gym. What the spine craves is variation and gentle mobility. This is the routine we prescribe most often to office workers, done once in the morning and once mid-afternoon:",
      },
      {
        type: "list",
        items: [
          "Two minutes of standing back extensions — hands on hips, gently arching backward to restore the lumbar curve.",
          "Cat–cow on the floor, moving slowly through the full range for one minute.",
          "Hip flexor stretch, thirty seconds each side, to release what sitting tightens.",
          "A ninety-second walk — even to the water cooler — to rehydrate the discs through movement.",
          "Three deep diaphragmatic breaths to engage the deep core stabilisers.",
        ],
      },
      { type: "h2", text: "When an ache becomes a warning" },
      {
        type: "para",
        text: "Most desk-related back pain is mechanical and responds beautifully to movement and posture correction. But some signals deserve a specialist's eye: pain that radiates down a leg, numbness or tingling in the feet, weakness, or discomfort that wakes you at night. These can point to nerve involvement, and early assessment almost always means simpler treatment.",
      },
      {
        type: "para",
        text: "The reassuring truth is that the spine is remarkably resilient. With the right habits — and, when needed, guided physiotherapy — the vast majority of our patients return to a full, active life without ever needing surgery.",
      },
    ],
  },
  {
    id: "heart-early-signs",
    category: "Cardiology",
    title: "Reading the heart early: the signals most of us dismiss",
    excerpt:
      "Breathlessness, fatigue, a flutter at rest. Our cardiology team on the subtle cues that deserve a conversation, not a shrug.",
    author: "Dr. S. Kulkarni",
    role: "Consultant Cardiologist",
    date: "Aug 05, 2026",
    readMins: 5,
    tags: ["Heart health", "Prevention", "Screening", "Cardiology"],
    art: "linear-gradient(135deg,#16bcbf 0%,#0f989b 45%,#145d5f 100%)",
    body: [
      {
        type: "para",
        text: "The heart is a patient organ. It compensates quietly, for years, long before it asks for help. That is both its gift and its danger — by the time symptoms feel undeniable, the underlying process is often well advanced.",
      },
      {
        type: "para",
        text: "The good news is that the heart speaks earlier than most people realise. It just speaks softly. Learning its vocabulary is one of the most valuable things you can do for a long life.",
      },
      { type: "h2", text: "The signals worth a second thought" },
      {
        type: "list",
        items: [
          "Breathlessness during activities that never used to tire you — climbing a familiar staircase, walking to the station.",
          "Unusual, persistent fatigue that rest does not fully resolve.",
          "A fluttering, racing, or skipping sensation in the chest, especially at rest.",
          "Discomfort, pressure, or tightness that spreads to the jaw, neck, or left arm.",
          "Swelling in the ankles or feet that builds through the day.",
        ],
      },
      {
        type: "quote",
        text: "We would far rather see you for a symptom that turns out to be nothing than meet you in the emergency room for one that was something.",
        cite: "Dr. S. Kulkarni",
      },
      { type: "h2", text: "Numbers you should know by heart" },
      {
        type: "para",
        text: "Prevention in cardiology is refreshingly measurable. Four numbers tell most of the story: your blood pressure, your LDL cholesterol, your fasting blood sugar, and your waist circumference. Reviewed together, they let us estimate risk long before any symptom appears — and they respond, often dramatically, to changes you control.",
      },
      { type: "h2", text: "Small habits, outsized returns" },
      {
        type: "para",
        text: "The interventions with the strongest evidence are also the least glamorous: thirty minutes of brisk movement most days, a diet rich in vegetables and whole grains, restful sleep, and not smoking. For patients who adopt even two or three of these consistently, we routinely see meaningful improvements at the next review.",
      },
      {
        type: "para",
        text: "If any of the signals above feels familiar, treat it as an invitation — not an emergency, but a conversation. A short screening visit is simple, and the peace of mind is considerable.",
      },
    ],
  },
  {
    id: "first-1000-days",
    category: "Paediatrics",
    title: "The first 1,000 days: nutrition that shapes a lifetime",
    excerpt:
      "From the womb to a child's second birthday, every meal is architecture. A practical guide from our paediatric nutrition unit.",
    author: "Dr. N. Fernandes",
    role: "Paediatric Specialist",
    date: "Jul 28, 2026",
    readMins: 7,
    tags: ["Paediatrics", "Nutrition", "Child health", "Growth"],
    art: "linear-gradient(135deg,#fda36d 0%,#f58325 40%,#16bcbf 120%)",
    body: [
      {
        type: "para",
        text: "There is a window early in life when the body writes rules it will follow for decades. It runs from conception to a child's second birthday — roughly a thousand days — and during it, the brain, immune system, and metabolism are being built at a pace they will never match again.",
      },
      {
        type: "para",
        text: "Nutrition in this window is not simply about calories. It is about supplying the raw materials for construction at exactly the moment the body is building. Get it right, and the returns compound for a lifetime.",
      },
      { type: "h2", text: "Before birth: feeding two" },
      {
        type: "para",
        text: "A mother's diet in pregnancy shapes the environment her baby develops in. Adequate folate, iron, iodine, and protein are not optional extras — they are the scaffolding of a healthy nervous system. This is why we begin nutritional counselling early, well before the third trimester.",
      },
      {
        type: "quote",
        text: "You cannot out-supplement a poor foundation, and you rarely need to over-supplement a good one. Real food, in the right window, does most of the work.",
        cite: "Dr. N. Fernandes",
      },
      { type: "h2", text: "The first six months" },
      {
        type: "para",
        text: "For most infants, exclusive breastfeeding for the first six months remains the gold standard — a living food that adapts to the baby's needs and carries the mother's immunity. Where breastfeeding is not possible, modern formulas provide a safe, complete alternative, and no parent should carry guilt about that choice.",
      },
      { type: "h2", text: "Introducing solids: variety over volume" },
      {
        type: "list",
        items: [
          "Start around six months, when the baby can sit with support and shows interest in food.",
          "Offer iron-rich foods early — lentils, well-cooked meats, fortified cereals.",
          "Introduce a wide palette of flavours and textures; early variety builds lifelong acceptance.",
          "Let the child self-regulate portions — appetite is a skill best left intact.",
          "Delay added salt and sugar for as long as you comfortably can.",
        ],
      },
      { type: "h2", text: "The quiet signs of thriving" },
      {
        type: "para",
        text: "Parents often ask how to know it is working. We look less at any single meal and more at the trajectory: steady growth along the child's own curve, alert and curious behaviour, healthy sleep, and the gradual, joyful mess of a toddler learning to eat. These are the markers of a foundation being laid well.",
      },
      {
        type: "para",
        text: "If you are ever unsure — about growth, feeding, or a fussy eater — our paediatric nutrition unit is here. The earlier we partner with you, the more of this remarkable window we can make count.",
      },
    ],
  },
  {
    id: "sleep-and-recovery",
    category: "Neurology",
    title: "Why recovery lives in your sleep — and how to protect it",
    excerpt:
      "The brain does its housekeeping at night. Our neurology team on the science of deep sleep and the habits that safeguard it.",
    author: "Dr. P. Iyer",
    role: "Consultant Neurologist",
    date: "Jul 19, 2026",
    readMins: 4,
    tags: ["Neurology", "Sleep", "Brain health", "Recovery"],
    art: "linear-gradient(135deg,#4fdde0 0%,#16bcbf 50%,#117679 100%)",
    body: [
      {
        type: "para",
        text: "We tend to think of sleep as the absence of activity — the body switched off. In truth, the sleeping brain is extraordinarily busy. It consolidates memory, balances hormones, and runs a nightly cleaning cycle that clears the metabolic debris of a day's thinking.",
      },
      { type: "h2", text: "The brain's night shift" },
      {
        type: "para",
        text: "During deep, slow-wave sleep, a network of channels in the brain widens, allowing fluid to flush through and carry away waste proteins. It is, quite literally, a rinse cycle — and it happens almost exclusively when you are deeply asleep. Cut the deep stages short, and the cleaning is left unfinished.",
      },
      {
        type: "quote",
        text: "Sleep is not time stolen from a productive life. It is the maintenance that makes a productive life possible.",
        cite: "Dr. P. Iyer",
      },
      { type: "h2", text: "Protecting the deep stages" },
      {
        type: "list",
        items: [
          "Keep a consistent sleep and wake time, even on weekends — the brain rewards rhythm.",
          "Dim lights and screens in the final hour; bright light delays the sleep signal.",
          "Keep the bedroom cool and dark; a slight drop in core temperature invites deep sleep.",
          "Finish caffeine by early afternoon — its effects linger far longer than most expect.",
          "Reserve the bed for sleep, so the mind learns the association.",
        ],
      },
      { type: "h2", text: "When to seek help" },
      {
        type: "para",
        text: "Occasional poor nights are normal. Persistent trouble — loud snoring with pauses in breathing, unrefreshing sleep despite adequate hours, or daytime sleepiness that affects safety — deserves assessment. Many sleep disorders are highly treatable, and addressing them often lifts mood, focus, and long-term brain health together.",
      },
      {
        type: "para",
        text: "Treat sleep as the foundation it is, not the luxury it is often mistaken for. Few investments in your health pay back so quietly, or so completely.",
      },
    ],
  },
];

export function getPost(id: string) {
  return POSTS.find((p) => p.id === id);
}

export function relatedPosts(id: string, count = 3) {
  return POSTS.filter((p) => p.id !== id).slice(0, count);
}
