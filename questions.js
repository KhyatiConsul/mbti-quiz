
const QUESTIONS = [

  {
    id: 1,
    axis: "I / E",
    log: "Observation Log #01",
    text: "When surrounded by people for long periods, what becomes exhausting first?",
    options: [
      { text: "Constant perception",    score: "I" },
      { text: "Incomplete interaction", score: "E" }
    ]
  },
  {
    id: 2,
    axis: "I / E",
    log: "Observation Log #02",
    text: "When something important happens, what is your first instinct?",
    options: [
      { text: "Process privately", score: "I" },
      { text: "Share immediately", score: "E" }
    ]
  },
  {
    id: 3,
    axis: "I / E",
    log: "Observation Log #03",
    text: "In unfamiliar environments, what becomes sharper?",
    options: [
      { text: "Observation", score: "I" },
      { text: "Interaction", score: "E" }
    ]
  },
  {
    id: 4,
    axis: "I / E",
    log: "Observation Log #04",
    text: "What feels more natural?",
    options: [
      { text: "Being deeply understood by a few", score: "I" },
      { text: "Being connected to many",          score: "E" }
    ]
  },
  {
    id: 5,
    axis: "I / E",
    log: "Observation Log #05",
    text: "When emotionally overwhelmed, where does your attention move?",
    options: [
      { text: "Inward",  score: "I" },
      { text: "Outward", score: "E" }
    ]
  },

  {
    id: 6,
    axis: "N / S",
    log: "Observation Log #06",
    text: "Which detail stays with you longer?",
    options: [
      { text: "Hidden meaning", score: "N" },
      { text: "Exact reality",  score: "S" }
    ]
  },
  {
    id: 7,
    axis: "N / S",
    log: "Observation Log #07",
    text: "What do you trust more?",
    options: [
      { text: "Patterns",  score: "N" },
      { text: "Evidence",  score: "S" }
    ]
  },
  {
    id: 8,
    axis: "N / S",
    log: "Observation Log #08",
    text: "When listening to someone, what captures you first?",
    options: [
      { text: "Implication",       score: "N" },
      { text: "Literal statement", score: "S" }
    ]
  },
  {
    id: 9,
    axis: "N / S",
    log: "Observation Log #09",
    text: "Which feels more engaging?",
    options: [
      { text: "Possibility", score: "N" },
      { text: "Presence",    score: "S" }
    ]
  },
  {
    id: 10,
    axis: "N / S",
    log: "Observation Log #10",
    text: "What naturally draws your attention?",
    options: [
      { text: "Symbolism", score: "N" },
      { text: "Detail",    score: "S" }
    ]
  },

  {
    id: 11,
    axis: "T / F",
    log: "Observation Log #11",
    text: "When someone disappoints you, what affects you first?",
    options: [
      { text: "Irrationality",     score: "T" },
      { text: "Emotional meaning", score: "F" }
    ]
  },
  {
    id: 12,
    axis: "T / F",
    log: "Observation Log #12",
    text: "When making difficult decisions, what concerns you more?",
    options: [
      { text: "Being unfair",    score: "T" },
      { text: "Hurting someone", score: "F" }
    ]
  },
  {
    id: 13,
    axis: "T / F",
    log: "Observation Log #13",
    text: "What matters more during conflict?",
    options: [
      { text: "Clarity",     score: "T" },
      { text: "Sensitivity", score: "F" }
    ]
  },
  {
    id: 14,
    axis: "T / F",
    log: "Observation Log #14",
    text: "What do you value more in others?",
    options: [
      { text: "Competence",      score: "T" },
      { text: "Emotional depth", score: "F" }
    ]
  },
  {
    id: 15,
    axis: "T / F",
    log: "Observation Log #15",
    text: "What is harder to tolerate?",
    options: [
      { text: "Inconsistency",      score: "T" },
      { text: "Emotional coldness", score: "F" }
    ]
  },

  {
    id: 16,
    axis: "J / P",
    log: "Observation Log #16",
    text: "Which feeling creates more discomfort?",
    options: [
      { text: "Uncertainty", score: "J" },
      { text: "Limitation",  score: "P" }
    ]
  },
  {
    id: 17,
    axis: "J / P",
    log: "Observation Log #17",
    text: "How do you approach the future?",
    options: [
      { text: "Constructing it", score: "J" },
      { text: "Discovering it",  score: "P" }
    ]
  },
  {
    id: 18,
    axis: "J / P",
    log: "Observation Log #18",
    text: "What feels safer?",
    options: [
      { text: "Structure",    score: "J" },
      { text: "Open options", score: "P" }
    ]
  },
  {
    id: 19,
    axis: "J / P",
    log: "Observation Log #19",
    text: "What damages your motivation faster?",
    options: [
      { text: "Chaos",      score: "J" },
      { text: "Repetition", score: "P" }
    ]
  },
  {
    id: 20,
    axis: "J / P",
    log: "Observation Log #20",
    text: "Which feels more restrictive?",
    options: [
      { text: "Disorder",       score: "J" },
      { text: "Predictability", score: "P" }
    ]
  }
];


const ARCHETYPES = {
  INTJ: "The Strategist",
  INTP: "The Observer",
  ENTJ: "The Commander",
  ENTP: "The Provocateur",
  INFJ: "The Archivist",
  INFP: "The Dreamwalker",
  ENFJ: "The Guide",
  ENFP: "The Flamebearer",
  ISTJ: "The Keeper",
  ISFJ: "The Guardian",
  ESTJ: "The Executor",
  ESFJ: "The Anchor",
  ISTP: "The Mechanic",
  ISFP: "The Drifter",
  ESTP: "The Catalyst",
  ESFP: "The Performer"
};

const DESCRIPTIONS = {
  INTJ: [
    "You detach emotionally first, then decide whether something deserves access to you.",
    "Your mind builds structures long before the world notices the collapse.",
    "Control is not obsession for you. It is how you prevent chaos from entering.",
    "<a href='https://medium.com/@khyati1516/intj-8270eeef4b90'>Read more</a>"
  ],

  INTP: [
    "You examine reality the way others examine theories.",
    "You trust patterns more than certainty.",
    "Most people live outwardly. You primarily exist inside cognition itself.",
    "<a href='https://medium.com/@khyati1516/intp-b3e904572368'>Read more</a>"
  ],

  ENTJ: [
    "You instinctively organize disorder the moment you enter it.",
    "You struggle to respect potential that never becomes action.",
    "Competence is not impressive to you- it is expected.",
    "<a href='https://medium.com/@khyati1516/entj-d55385c98bc1'>Read more</a>"
  ],

  ENTP: [
    "You test people by disrupting certainty.",
    "Your mind moves faster than emotional processing often allows.",
    "You are rarely searching for answers. You are searching for intellectual expansion.",
    "<a href='https://medium.com/@khyati1516/entp-ff735829ae75'>Read more</a>"
  ],

  INFJ: [
    "You notice what people suppress before they realize they are suppressing it.",
    "Your intuition forms conclusions long before logic catches up.",
    "You carry emotional depth privately because exposure feels irreversible.",
    "<a href='https://medium.com/@khyati1516/infj-cc747de3ecf0'>Read more</a>"
  ],

  INFP: [
    "You experience emotional reality symbolically rather than literally.",
    "You disappear into inner worlds when reality feels emotionally insufficient.",
    "You mourn versions of life that never even happened.",
    "<a href='https://medium.com/@khyati1516/infp-02464285c72d'>Read more</a>"
  ],

  ENFJ: [
    "You instinctively shape yourself around the emotional needs of others.",
    "You carry people emotionally even when nobody notices the weight.",
    "You know how to make people feel seen while quietly feeling unseen yourself.",
    "<a href='https://medium.com/@khyati1516/enfj-0de087f2fd36'>Read more</a>"
  ],

  ENFP: [
    "You chase intensity because stillness forces confrontation with yourself.",
    "You romanticize possibility more than reality.",
    "Your warmth hides exhaustion more often than people realize.",
    "<a href='https://medium.com/@khyati1516/enfp-f019b3745571'>Read more</a>"
  ],

  ISTJ: [
    "You learned early that reliability prevents collapse.",
    "You trust consistency more than emotional promises.",
    "You carry responsibility quietly because depending on others feels dangerous.",
    "<a href='https://medium.com/@khyati1516/istj-a974f0ebf831'>Read more</a>"
  ],

  ISFJ: [
    "You remember emotional details others fail to notice entirely.",
    "You often love people through endurance rather than expression.",
    "You disappear into caretaking so deeply that people forget to ask how you are."
  ],

  ESTJ: [
    "You associate control with safety more than power.",
    "You respect discipline because chaos once taught you consequences.",
    "You often become the structure others emotionally rely on."
  ],

  ESFJ: [
    "You monitor emotional harmony constantly, even when exhausted.",
    "You fear becoming emotionally unnecessary more than being alone.",
    "You give warmth instinctively while neglecting your own emotional depletion."
  ],

  ISTP: [
    "You trust self-sufficiency because dependence once felt unsafe.",
    "You observe everything while revealing almost nothing.",
    "You solve emotional discomfort through distance before vulnerability."
  ],

  ISFP: [
    "You protect your inner world as if exposure could damage it permanently.",
    "Beauty affects you emotionally in ways difficult to explain logically.",
    "You retreat quietly whenever reality becomes emotionally invasive."
  ],

  ESTP: [
    "You keep moving because stillness feels psychologically dangerous.",
    "You trust direct experience more than abstraction.",
    "You transform emotional heaviness into momentum before it fully reaches you."
  ],

  ESFP: [
    "You learned to create light before anyone noticed your darkness.",
    "Your emotional intensity hides beneath performance and movement.",
    "You fear being forgotten more than being misunderstood."
  ]
};


const ANALYSIS_LINES = [
  { text: "Initializing behavioral analysis...",        type: "dim" },
  { text: "Cross-referencing 20 response vectors...",   type: "dim" },
  { text: "Mapping I/E axis distribution...",           type: "normal" },
  { text: "Mapping N/S axis distribution...",           type: "normal" },
  { text: "Mapping T/F axis distribution...",           type: "normal" },
  { text: "Mapping J/P axis distribution...",           type: "normal" },
  { text: "Calculating pattern volatility...",          type: "dim" },
  { text: "Identifying dominant perception style...",   type: "dim" },
  { text: "Matching against archive records...",        type: "highlight" },
  { text: "Profile classification complete.",           type: "highlight" }
];