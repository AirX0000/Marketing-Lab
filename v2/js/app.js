// Initial data structure for Marketing Insights Lab
const initialData = {
  cfg: {
    siteName: "Marketing Insights Lab",
    institution: "British Management University",
    tagline: "Think like marketers. Act like analysts. Create like professionals.",
    description: "A premier student-driven marketing publication, research hub, and professional community connecting academia with modern industry practice.",
    email: "marketinglab@bmu-edu.uz",
    joinUrl: "",
    newsletterUrl: "",
    adminPass: "admin123",
    socials: {
      telegram: "https://t.me/bmu_marketing_lab",
      linkedin: "https://www.linkedin.com/school/british-management-university",
      instagram: "https://www.instagram.com/bmu_marketinglab",
      youtube: "https://www.youtube.com/@BritishManagementUniversity"
    },
    stats: [
      { value: "500+", label: "Campus Members" },
      { value: "48+", label: "Published Insights" },
      { value: "100%", label: "Student-Led" },
      { value: "12", label: "Industry Partners" }
    ],
    partners: [
      "British Management University",
      "Red Bull Student Brand Manager Network",
      "Digital Marketing Association",
      "Tashkent Creative Hub",
      "Central Asia FinTech Lab"
    ]
  },
  categories: [
    { id: "Campaign Analysis", name: "Campaign Analysis", icon: "🔍", desc: "Deep deconstructions of breakthrough advertising, rebranding, and product launches." },
    { id: "Research", name: "Research & Data", icon: "📊", desc: "Data-driven investigations, consumer behavior surveys, and market trends." },
    { id: "Educational", name: "Educational Guides", icon: "🎓", desc: "Frameworks, tactical playbooks, and modern marketing methodologies." },
    { id: "Opinion", name: "Thought Leadership", icon: "💡", desc: "Critical perspectives, debates, and future-looking market forecasts." },
    { id: "News", name: "Industry Briefs", icon: "⚡", desc: "Curated updates on global tech, retail media, and consumer ecosystems." },
    { id: "Behind the Scenes", name: "Behind the Scenes", icon: "🎬", desc: "Editorial workflows, lab experiments, and project reflections." }
  ],
  posts: [
    {
      id: 1,
      c: "Campaign Analysis",
      t: "How Red Bull Built a \$10B Media Powerhouse Disguised as an Energy Drink",
      x: "An in-depth breakdown of Red Bull's non-traditional marketing blueprint: content studio ownership, event IP, and lifestyle positioning over product ads.",
      b: `Most consumer packaged goods (CPG) companies spend 20% to 30% of their revenue on traditional performance marketing and media buying. Red Bull chose a radically different path: they built a media company that happens to sell an energy drink in a silver-and-blue can.

### 1. The Strategy: Don't Buy Ads, Own the Culture
Dietrich Mateschitz famously declared that Red Bull wasn't competing for shelf space; it was competing for adrenaline. Instead of sponsoring existing sports teams, Red Bull founded its own: Formula 1 championship teams, soccer clubs across three continents, and extreme stunt operations like Felix Baumgartner's Stratos jump from the edge of space.

> "Red Bull does not sponsor events. Red Bull creates and owns the intellectual property that fans obsess over."

### 2. The Content Studio Flywheel
By forming Red Bull Media House in 2007, the brand transitioned from sponsor to production powerhouse:
- **Licensing Revenue:** High-production films and documentaries sold to Netflix, ESPN, and national broadcasters.
- **Organic Virality:** Over 15 million YouTube subscribers generating billions of organic impressions at near-zero marginal cost.
- **Zero Mention of the Product:** The can rarely appears in their flagship documentaries. The brand is synonymous with extreme human achievement.

### Key Takeaways for Student Marketers:
1. **Audience-First Architecture:** Identify the emotional peak of your target audience and build media around that feeling.
2. **IP Ownership Beats Renting:** When you own the tournament or media platform, you capture all downstream audience data and brand equity.
3. **Product as a Badge:** The physical product becomes a ticket to belong to a global community rather than merely a beverage.`,
      a: 1,
      d: "2026-10-14",
      cv: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      views: 1420
    },
    {
      id: 2,
      c: "Research",
      t: "Gen Z Consumer Behavior in Central Asia: The Rise of Social Commerce & FinTech",
      x: "Empirical survey data from 450+ university students examining payment frictionless-ness, influencer conversion credibility, and short-form video engagement.",
      b: `Over the past three years, the convergence of high mobile penetration and super-app fintech has transformed how Central Asian youth discover, evaluate, and purchase products. Our research team at Marketing Insights Lab surveyed 450 undergraduate and postgraduate students to analyze purchasing funnels.

### Key Empirical Findings:
- **78% of impulse purchases** originate on short-form platforms (Instagram Reels and Telegram channels).
- **Fintech Integration:** 89% prefer instant installment or frictionless QR checkouts over conventional bank cards.
- **Authenticity Metric:** Nano-influencers (3k–15k followers) deliver 3.4x higher conversion intent than macro-celebrities.

> "The traditional linear sales funnel has been replaced by an interactive discovery loop where content and checkout occur in a single mobile session."

### What Marketers Must Adapt:
Brands must treat Telegram and social messaging not just as notification channels, but as end-to-end CRM ecosystems with native web-apps and micro-landing experiences.`,
      a: 2,
      d: "2026-10-08",
      cv: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
      featured: false,
      views: 980
    },
    {
      id: 3,
      c: "Educational",
      t: "The Complete Guide to Brand Archetypes: Crafting Distinctive Brand Voice in 2026",
      x: "A practical framework adapted from Carl Jung and Margaret Mark to align brand storytelling, visual identity, and messaging tone.",
      b: `In a crowded digital marketplace filled with commoditized features, customers do not connect with product specifications—they connect with archetypes and human narratives.

### The 12 Classical Archetypes in Modern Context:
1. **The Hero (Nike, BMW):** Overcoming adversity through discipline and grit.
2. **The Outlaw (Harley-Davidson, Liquid Death):** Challenging convention and mocking outdated norms.
3. **The Creator (Lego, Apple, Figma):** Empowering human imagination and creative expression.
4. **The Sage (Google, BBC, McKinsey):** Demystifying complexity through rigorous knowledge.
5. **The Magician (Disney, Dyson):** Transforming ordinary reality into wonder.

### How to Apply the Framework:
- **Audit your Touchpoints:** Does your onboarding email sound like a Sage while your Instagram sounds like an Outlaw? Inconsistency erodes brand trust.
- **Define Your Enemy:** Clear brands stand against something—whether it is mediocrity, complexity, or cynicism.
- **Document Voice Pillars:** Provide teams with "We are X, but never Y" guidelines.`,
      a: 3,
      d: "2026-09-30",
      cv: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
      featured: false,
      views: 1150
    },
    {
      id: 4,
      c: "Opinion",
      t: "Will Generative AI Replace Creative Strategy or Expose Mediocre Copywriting?",
      x: "Why large language models will commoditize surface-level creative output while exponentially increasing the value of genuine brand taste and contrarian positioning.",
      b: `The widespread adoption of generative AI tools across creative departments has led to two polarized narratives: the complete elimination of creative agencies or dismissive skepticism. Both miss the deeper shift underway.

### The Rise of the 'Average Trap'
Because LLMs synthesize existing consensus from training data, their unfiltered output inevitably regresses to the statistical mean of the internet. When every competitor generates blog posts and ad variants using identical prompts, brand homogeneity skyrockets.

> "When content is virtually free to produce, differentiation and authentic human conviction become the rarest assets in commerce."

### Where True Creative Value Moves:
1. **Contrarian Truths:** Great brand positioning rests on observations that most people secretly feel but nobody has voiced aloud. AI models are explicitly trained to avoid controversial novelty.
2. **Curation and Taste:** The future creative director acts less like a copy generator and more like an art curator—filtering out the noise to preserve brand soul.
3. **Real-world Cultural Immersion:** Real insights come from speaking to students on campus, observing street culture, and understanding regional nuances.`,
      a: 5,
      d: "2026-09-22",
      cv: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      featured: false,
      views: 870
    },
    {
      id: 5,
      c: "News",
      t: "Retail Media Networks & Third-Party Cookies: What Marketers Must Prepare for in 2026",
      x: "How Amazon, Walmart, and regional e-marketplaces are capturing billions in high-margin ad spend through closed-loop first-party consumer transaction data.",
      b: `Retail Media Networks (RMNs) represent the fastest-growing advertising channel worldwide. Brands are shifting digital ad budgets away from open programmatic display into the digital storefronts of major retailers.

### Why RMNs Are Surging:
- **Closed-Loop Attribution:** Retailers can directly link an ad impression to an exact checkout receipt, eliminating guesswork in Return on Ad Spend (ROAS).
- **First-Party Transaction Data:** With third-party cookie restrictions and privacy frameworks, retailer purchase data remains pristine and verified.
- **High Purchase Intent:** Customers searching inside an e-commerce app are at the final decision stage of the buying journey.

### Strategic Implications:
Brands must rethink their packaging, digital shelf availability, and retail search optimization. Marketing and retail sales teams can no longer operate in separate silos.`,
      a: 4,
      d: "2026-09-15",
      cv: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      featured: false,
      views: 740
    },
    {
      id: 6,
      c: "Behind the Scenes",
      t: "From Classroom Theory to Real Publication: How We Built the Marketing Insights Lab",
      x: "An inside look at our editorial standards, peer review process, student mentorship structure, and how we translate university knowledge into real portfolio assets.",
      b: `University marketing courses often teach historical case studies from textbooks written a decade ago. While theoretical foundations remain essential, contemporary marketing changes weekly.

The Marketing Insights Lab was founded with a singular conviction: students should not merely study marketing—they should practice it in public, publish rigorous research, and build real portfolios before graduation.

### Our Three-Tier Editorial Workflow:
1. **The Topic Pitch:** Every piece begins with a research proposal defending why this market development matters and what evidence supports it.
2. **Editorial Peer Review:** Authors receive structured feedback from fellow student editors and faculty advisors on clarity, structure, and argument robustness.
3. **Multi-format Distribution:** The final piece is packaged as a long-form article, an executive infographic summary for LinkedIn, and a community discussion trigger.`,
      a: 1,
      d: "2026-09-05",
      cv: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      featured: false,
      views: 1320
    }
  ],
  teamV: 3,
  team: [
    {
      "id": 1,
      "n": "Nargiza Islamova",
      "r": "Faculty Lead",
      "g": "Leadership",
      "bio": "Responsible for strategic decisions, quality standards, final approval of publication materials and communication with university administration.",
      "resp": [
        "Makes strategic decisions for the Lab",
        "Sets and protects quality standards",
        "Gives final approval of publication materials",
        "Communicates with the university administration"
      ],
      "sk": [
        "Strategy",
        "Academic leadership",
        "Quality control"
      ],
      "ph": "",
      "ln": "",
      "hidden": false
    },
    {
      "id": 2,
      "n": "Darya Argentova",
      "r": "Senior Coordinator",
      "g": "Leadership",
      "bio": "Contact her about onboarding, accesses, workflows, and process-related questions.",
      "resp": [
        "Onboards new members",
        "Manages accesses and accounts",
        "Designs and maintains team workflows",
        "Answers process-related questions"
      ],
      "sk": [
        "Coordination",
        "Operations",
        "Onboarding"
      ],
      "ph": "",
      "ln": "",
      "hidden": false
    },
    {
      "id": 3,
      "n": "Darya Subotina",
      "r": "Senior Designer",
      "g": "Leadership",
      "bio": "All creative stuff is under her supervision and guidance.",
      "resp": [
        "Supervises all creative work of the Lab",
        "Guides designers and keeps the visual identity consistent",
        "Leads the marketing manager and designers"
      ],
      "sk": [
        "Art direction",
        "Visual identity",
        "Design systems"
      ],
      "ph": "",
      "ln": "",
      "hidden": false
    },
    {
      "id": 4,
      "n": "Alina Baybekova",
      "r": "Senior Editor and PR",
      "g": "Leadership",
      "bio": "Posting standards, approvals, rubrics, marketing news — nothing is missed thanks to her.",
      "resp": [
        "Owns posting standards and editorial approvals",
        "Manages rubrics and the content calendar",
        "Covers marketing news",
        "Leads PR and the Brand Ambassador"
      ],
      "sk": [
        "Editing",
        "PR",
        "Content standards"
      ],
      "ph": "",
      "ln": "",
      "hidden": false
    },
    {
      "id": 5,
      "n": "Muhammadsodiq Sotiboldiev",
      "r": "Marketing Manager",
      "g": "Management",
      "bio": "Reports to Dasha S., supports the operations and strategic positioning of the Lab.",
      "resp": [
        "Supports the day-to-day operations of the Lab",
        "Works on the strategic positioning of the Lab",
        "Reports to Darya Subotina"
      ],
      "sk": [
        "Marketing strategy",
        "Positioning",
        "Operations"
      ],
      "ph": "",
      "ln": "",
      "hidden": false
    },
    {
      "id": 6,
      "n": "Ariana Khajenassiri",
      "r": "Project Manager",
      "g": "Management",
      "bio": "Reports to Dasha A., supports the coordination of the Lab, monitors deadlines, task achievement and effective team communication.",
      "resp": [
        "Supports the coordination of the Lab",
        "Monitors deadlines and task achievement",
        "Keeps team communication effective",
        "Reports to Darya Argentova"
      ],
      "sk": [
        "Project management",
        "Planning",
        "Communication"
      ],
      "ph": "",
      "ln": "",
      "hidden": false
    },
    {
      "id": 7,
      "n": "Abduraxmonova Raxshonaxon",
      "r": "Videographer Lead + Community Manager",
      "g": "Management",
      "bio": "Supervises video content creation and communicates with the audience and community.",
      "resp": [
        "Supervises video content creation",
        "Leads the videographers",
        "Communicates with the audience and community"
      ],
      "sk": [
        "Video production",
        "Community management",
        "Storytelling"
      ],
      "ph": "",
      "ln": "",
      "hidden": false
    },
    {
      "id": 8,
      "n": "Xolmamatov Karomatillo",
      "r": "Content Manager",
      "g": "Management",
      "bio": "Supervises the content and finds new opportunities to cover.",
      "resp": [
        "Supervises the Lab's content",
        "Finds new topics and opportunities to cover",
        "Keeps the content pipeline moving"
      ],
      "sk": [
        "Content strategy",
        "Copywriting",
        "Trend research"
      ],
      "ph": "",
      "ln": "",
      "hidden": false
    },
    {
      "id": 9,
      "n": "Shermuhammad Abdullayev",
      "r": "Brand Ambassador",
      "g": "Creative & Media",
      "bio": "The face and soul of our brand. Reports to Alina and helps with attracting new people and spreading the news about the Lab to the new audience.",
      "resp": [
        "Represents the Lab as the face of the brand",
        "Attracts new people to the Lab",
        "Spreads the news about the Lab to new audiences",
        "Reports to Alina Baybekova"
      ],
      "sk": [
        "Public speaking",
        "Networking",
        "Brand representation"
      ],
      "ph": "",
      "ln": "",
      "hidden": false
    },
    {
      "id": 10,
      "n": "Ishankulova Samira",
      "r": "Videographer & Editor",
      "g": "Creative & Media",
      "bio": "Reports to Roxy. Supports the video content creation and editing according to the brand guidelines and tone of voice of the Lab.",
      "resp": [
        "Creates video content for the Lab",
        "Edits videos according to the brand guidelines",
        "Keeps the Lab's tone of voice in video",
        "Reports to Raxshonaxon (Roxy)"
      ],
      "sk": [
        "Video editing",
        "Filming",
        "Brand guidelines"
      ],
      "ph": "",
      "ln": "",
      "hidden": false
    },
    {
      "id": 11,
      "n": "Fozil Raupov",
      "r": "Videographer",
      "g": "Creative & Media",
      "bio": "Reports to Roxy. Supports the video content creation and editing according to the brand guidelines and tone of voice of the Lab.",
      "resp": [
        "Films video content for the Lab",
        "Supports video editing according to the brand guidelines",
        "Keeps the Lab's tone of voice in video",
        "Reports to Raxshonaxon (Roxy)"
      ],
      "sk": [
        "Filming",
        "Video editing",
        "Brand guidelines"
      ],
      "ph": "",
      "ln": "",
      "hidden": false
    },
    {
      "id": 12,
      "n": "Robiya Salixova",
      "r": "Designer",
      "g": "Creative & Media",
      "bio": "Supports the content creation for the Lab. Reports to Dasha S. Ensures that the design schema is applied to the posts and supports those who struggle with doing the design.",
      "resp": [
        "Supports content creation for the Lab",
        "Ensures the design schema is applied to every post",
        "Helps members who struggle with design",
        "Reports to Darya Subotina"
      ],
      "sk": [
        "Graphic design",
        "Canva / Figma",
        "Layout"
      ],
      "ph": "",
      "ln": "",
      "hidden": false
    },
    {
      "id": 13,
      "n": "Ismatov Azizbek",
      "r": "Market Research Analyst",
      "g": "Research & Tech",
      "bio": "Supports data collection, works with numbers and finds the key and interesting topics to cover for the industry case study and/or analysis.",
      "resp": [
        "Supports data collection",
        "Works with numbers and market data",
        "Finds key and interesting topics for industry case studies and analysis"
      ],
      "sk": [
        "Market research",
        "Data collection",
        "Excel"
      ],
      "ph": "",
      "ln": "",
      "hidden": false
    },
    {
      "id": 14,
      "n": "Muslim Yunuskhojayev",
      "r": "Marketing Analyst",
      "g": "Research & Tech",
      "bio": "Working with data and making the data work. Keeping up-to-date insights, analysing case reports.",
      "resp": [
        "Works with data and turns it into insights",
        "Keeps insights up to date",
        "Analyses case reports"
      ],
      "sk": [
        "Data analysis",
        "Insights",
        "Reporting"
      ],
      "ph": "",
      "ln": "",
      "hidden": false
    },
    {
      "id": 15,
      "n": "Aider Parmankulov",
      "r": "Web Developer",
      "g": "Research & Tech",
      "bio": "Working on an online brand presence and developing the Lab's infrastructure across platforms.",
      "resp": [
        "Builds and maintains the Lab's online brand presence",
        "Develops the Lab's infrastructure across platforms",
        "Supports the website and digital tools"
      ],
      "sk": [
        "Web development",
        "JavaScript",
        "Digital infrastructure"
      ],
      "ph": "",
      "ln": "",
      "hidden": false
    }
  ],
  events: [
    {
      id: 1,
      t: "Masterclass: Building Modern Brand Strategy with Industry CMOs",
      d: "2026-11-20",
      time: "15:00 - 17:00",
      p: "BMU Campus · Main Auditorium & Online Stream",
      x: "An interactive case workshop on positioning, customer segmentation, and omnichannel brand consistency with invited marketing directors.",
      spots: "80 spots available",
      status: "Upcoming"
    },
    {
      id: 2,
      t: "Lab Hackathon: 24-Hour Brand Turnaround Challenge",
      d: "2026-12-05",
      time: "10:00 - Next Day 10:00",
      p: "Innovation Hub · British Management University",
      x: "Teams will receive a live brief from a real regional enterprise and have 24 hours to research, build, and pitch a complete marketing campaign.",
      spots: "12 teams · Registration open",
      status: "Upcoming"
    },
    {
      id: 3,
      t: "Research Symposium: Central Asian Consumer Outlook 2027",
      d: "2026-10-10",
      time: "16:00 - 18:30",
      p: "Conference Hall B",
      x: "Presentation of findings from our 450-student survey on digital payments, social discovery, and youth lifestyle trends.",
      spots: "Completed",
      status: "Past"
    }
  ],
  resources: [
    {
      id: 1,
      t: "The Complete Campaign Deconstruction Canvas",
      x: "A 9-step structured framework for dissecting advertising and marketing campaigns from objectives down to ROI metrics.",
      tag: "Framework",
      format: "PDF / Notion",
      badge: "Popular"
    },
    {
      id: 2,
      t: "Marketing Insights Lab Editorial & Style Guide",
      x: "Guidelines on writing voice, data fact-checking, citation standards, and chart styling for published lab authors.",
      tag: "Guide",
      format: "Interactive Guide",
      badge: "Core"
    },
    {
      id: 3,
      t: "Brand Positioning & Archetype Worksheet",
      x: "Practical matrix to identify archetype voice pillars, competitor white spaces, and core customer value propositions.",
      tag: "Template",
      format: "Figma / Sheet",
      badge: "Essential"
    },
    {
      id: 4,
      t: "Quantitative Survey Design Cheat Sheet",
      x: "Best practices for avoiding survey bias, sizing student cohorts, and formatting Likert scale questions.",
      tag: "Research",
      format: "PDF Cheatsheet",
      badge: "Updated"
    }
  ]
};




// Safe Storage Helper (avoids DOMException / SecurityError on file://, Safari Private, strict iframes)
const safeStorage = {
  get(type, key) {
    try {
      if (typeof window !== 'undefined' && window[type]) {
        return window[type].getItem(key);
      }
    } catch (e) {}
    return null;
  },
  set(type, key, value) {
    try {
      if (typeof window !== 'undefined' && window[type]) {
        window[type].setItem(key, value);
      }
    } catch (e) {}
  },
  remove(type, key) {
    try {
      if (typeof window !== 'undefined' && window[type]) {
        window[type].removeItem(key);
      }
    } catch (e) {}
  }
};

// Application State Keys
const STATE_KEY = 'marketing_lab_v2_data';
const BOOKMARKS_KEY = 'marketing_lab_v2_bookmarks';
const AUTH_KEY = 'marketing_lab_v2_auth';
const THEME_KEY = 'marketing_lab_v2_theme';

/**
 * MarketingLabEmblem3D
 * High-performance 3D Heraldic Crest Animation Engine for British Management University Marketing Lab
 * 
 * Features:
 * - Real 3D physical levitation & breathing oscillation
 * - Dual concentric rotating technical orbit rings matching uploaded crest design
 * - Dynamic 3D gyro mouse parallax with smooth damping (lerp)
 * - Scroll-driven 3D pitch/yaw tilt and shadow projection
 * - Dynamic drop shadow that scales, blurs, and offsets realistically with 3D elevation
 * - Animated glowing energy pulse traversing the crest trendline & data nodes
 * - 3D exploded layer deconstruction on scroll with floating chassis, bars, trendline, and symbols
 * - Safe lifecycle management for zero memory leaks
 */
class MarketingLabEmblem3D {
  constructor() {
    this.stage = document.getElementById("emblem-stage");
    this.anchor = document.getElementById("emblem-3d-anchor");
    this.stack = document.getElementById("emblem-exploded-stack");
    this.layerChassis = document.getElementById("layer-chassis");
    this.layerBars = document.getElementById("layer-bars");
    this.layerTrendline = document.getElementById("layer-trendline");
    this.layerSymbols = document.getElementById("layer-symbols");
    this.shadow = document.getElementById("emblem-floor-shadow");
    this.pulseOrb = document.getElementById("emblem-pulse-orb");
    this.glare = document.getElementById("layer-glare");
    this.scrollIndicator = document.getElementById("emblem-scroll-indicator");

    if (!this.stage || !this.stack) return;

    this.trendNodes = [
      { x: 160, y: 427 },
      { x: 260, y: 370 },
      { x: 360, y: 397 },
      { x: 450, y: 420 },
      { x: 544, y: 372 },
      { x: 599, y: 350 }
    ];

    this.rx = 0;
    this.ry = 0;
    this.targetRx = 0;
    this.targetRy = 0;

    this.mouseNx = 0;
    this.mouseNy = 0;

    this.pageScroll = 0;
    this.wheelExplode = 0;
    this.explodeAmount = 0;

    // Drag-to-rotate state
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.dragRx = 0;
    this.dragRy = 0;

    this.time = 0;
    this.lastTime = performance.now();

    this.bindEvents();
    this.isRunning = true;
    this.rafId = requestAnimationFrame(t => this.loop(t));
  }

  bindEvents() {
    // Mouse movement parallax & drag
    this.mouseMoveHandler = (e) => {
      if (!this.stage) return;
      const rect = this.stage.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      this.mouseNx = nx;
      this.mouseNy = ny;

      if (this.isDragging) {
        const dx = e.clientX - this.dragStartX;
        const dy = e.clientY - this.dragStartY;
        this.dragRy = dx * 0.35;
        this.dragRx = -dy * 0.35;
      }
    };

    this.mouseDownHandler = (e) => {
      this.isDragging = true;
      this.dragStartX = e.clientX;
      this.dragStartY = e.clientY;
    };

    this.mouseUpHandler = () => {
      this.isDragging = false;
      this.dragRx *= 0.5;
      this.dragRy *= 0.5;
    };

    this.mouseLeaveHandler = () => {
      this.mouseNx = 0;
      this.mouseNy = 0;
      this.isDragging = false;
    };

    this.stage.addEventListener("mousemove", this.mouseMoveHandler, { passive: true });
    this.stage.addEventListener("mousedown", this.mouseDownHandler, { passive: true });
    window.addEventListener("mouseup", this.mouseUpHandler, { passive: true });
    this.stage.addEventListener("mouseleave", this.mouseLeaveHandler, { passive: true });

    // Touch support for mobile / tablet drag
    this.touchStartHandler = (e) => {
      if (e.touches && e.touches[0]) {
        this.isDragging = true;
        this.dragStartX = e.touches[0].clientX;
        this.dragStartY = e.touches[0].clientY;
      }
    };
    this.touchMoveHandler = (e) => {
      if (this.isDragging && e.touches && e.touches[0]) {
        const dx = e.touches[0].clientX - this.dragStartX;
        const dy = e.touches[0].clientY - this.dragStartY;
        this.dragRy = dx * 0.35;
        this.dragRx = -dy * 0.35;
      }
    };
    this.touchEndHandler = () => {
      this.isDragging = false;
    };

    this.stage.addEventListener("touchstart", this.touchStartHandler, { passive: true });
    this.stage.addEventListener("touchmove", this.touchMoveHandler, { passive: true });
    this.stage.addEventListener("touchend", this.touchEndHandler, { passive: true });

    // Direct wheel/trackpad scrolling on stage
    this.wheelHandler = (e) => {
      if (Math.abs(e.deltaY) > 1) {
        this.wheelExplode = Math.min(1, Math.max(0, this.wheelExplode + e.deltaY * 0.0035));
      }
    };
    this.stage.addEventListener("wheel", this.wheelHandler, { passive: true });

    // Page window scroll listener (cross-browser defensive)
    this.scrollHandler = () => this.onScroll();
    window.addEventListener("scroll", this.scrollHandler, { passive: true });
    document.addEventListener("scroll", this.scrollHandler, { passive: true });
    this.onScroll();

    // Click to ripple
    this.stackClickHandler = () => this.triggerRipple();
    this.stack.addEventListener("click", this.stackClickHandler);
  }

  onScroll() {
    const scrollY = (typeof window !== "undefined" && (window.pageYOffset || window.scrollY || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop))) || 0;
    // Responsive explosion: unfolds over first 320px of scroll
    this.pageScroll = Math.min(1, Math.max(0, scrollY / 450));
  }

  triggerRipple() {
    this.targetRx -= 14;
  }

  loop(timestamp) {
    if (!this.isRunning) return;

    if (!document.body.contains(this.stage)) {
      this.isRunning = false;
      return;
    }

    const dt = Math.max(0, Math.min((timestamp - this.lastTime) / 1000, 0.1));
    this.lastTime = timestamp;
    this.time += dt;

    // Target explosion is driven by page scroll or direct stage wheel scrubbing
    const target = Math.max(this.pageScroll, this.wheelExplode);
    this.explodeAmount += (target - this.explodeAmount) * 0.14;

    const exp = this.explodeAmount;

    // Natural levitation breathing oscillation
    const levitateY = Math.sin(this.time * 2.2) * (5 - exp * 2);
    const levitateRz = Math.sin(this.time * 1.5) * 1.1;

    // Calibrated isometric angles for optimal perspective & readability
    const explodePitch = exp * 26; // Tilt forward 26deg
    const explodeYaw = -exp * 22; // Yaw left 22deg
    const explodeTz = 18 + exp * 32;

    // Perspective counter-shift keeps all 4 separated layers centered in frame
    const centerShiftX = exp * 48;
    const centerShiftY = exp * 40;

    this.targetRx = -this.mouseNy * 20 + explodePitch + (this.dragRx || 0);
    this.targetRy = this.mouseNx * 24 + explodeYaw + (this.dragRy || 0);

    // Smooth inertia lerp
    this.rx += (this.targetRx - this.rx) * 0.12;
    this.ry += (this.targetRy - this.ry) * 0.12;

    // Apply 3D transform to overall Stack
    if (this.stack) {
      this.stack.style.transform = `translate(${centerShiftX.toFixed(1)}px, ${(levitateY + centerShiftY).toFixed(1)}px) rotateX(${this.rx.toFixed(2)}deg) rotateY(${this.ry.toFixed(2)}deg) rotateZ(${levitateRz.toFixed(2)}deg) translateZ(${explodeTz.toFixed(1)}px)`;
    }

    // High-depth layer separation along Z-axis (True 3D space)
    if (this.layerChassis) {
      const zChassis = exp * 10;
      this.layerChassis.style.transform = `translateZ(${zChassis.toFixed(1)}px)`;
    }

    if (this.layerBars) {
      const zBars = exp * 70;
      const shadowBlur = (exp * 16).toFixed(1);
      const shadowAlpha = (exp * 0.6).toFixed(2);
      this.layerBars.style.transform = `translateZ(${zBars.toFixed(1)}px)`;
      this.layerBars.style.filter = exp > 0.04 ? `drop-shadow(0 ${(exp * 14).toFixed(1)}px ${shadowBlur}px rgba(0,0,0,${shadowAlpha}))` : "none";
    }

    if (this.layerTrendline) {
      const zTrend = exp * 135;
      const glowBlur = (10 + exp * 18).toFixed(1);
      const glowAlpha = (0.4 + exp * 0.5).toFixed(2);
      this.layerTrendline.style.transform = `translateZ(${zTrend.toFixed(1)}px)`;
      this.layerTrendline.style.filter = `drop-shadow(0 ${(exp * 16).toFixed(1)}px ${glowBlur}px rgba(223, 183, 92, ${glowAlpha}))`;
    }

    if (this.layerSymbols) {
      const zSymbols = exp * 200;
      const shadowBlur = (exp * 22).toFixed(1);
      const shadowAlpha = (exp * 0.7).toFixed(2);
      this.layerSymbols.style.transform = `translateZ(${zSymbols.toFixed(1)}px)`;
      this.layerSymbols.style.filter = exp > 0.04 ? `drop-shadow(0 ${(exp * 20).toFixed(1)}px ${shadowBlur}px rgba(0,0,0,${shadowAlpha}))` : "none";
    }

    // Dynamic Floor Shadow physics
    if (this.shadow) {
      const shadowOffsetX = -this.ry * 1.5;
      const shadowOffsetY = this.rx * 0.9;
      const shadowScale = 1 + exp * 0.35 - (levitateY / 35);
      const shadowOpacity = Math.max(0.3, 0.92 - exp * 0.3 - (levitateY / 50));
      const shadowBlur = 12 + exp * 16;
      this.shadow.style.transform = `translate(${shadowOffsetX.toFixed(1)}px, ${shadowOffsetY.toFixed(1)}px) scale(${shadowScale.toFixed(2)})`;
      this.shadow.style.opacity = shadowOpacity.toFixed(2);
      this.shadow.style.filter = `blur(${shadowBlur.toFixed(1)}px)`;
    }

    // Specular glare position on chassis
    if (this.glare) {
      const gx = 50 + this.mouseNx * 45;
      const gy = 30 + this.mouseNy * 35;
      this.glare.style.setProperty("--glare-x", `${gx}%`);
      this.glare.style.setProperty("--glare-y", `${gy}%`);
    }

    // Traveling neon pulse orb along trendline
    if (this.pulseOrb) {
      const rawT = ((this.time * 0.5) % 1.0 + 1.0) % 1.0;
      const segCount = this.trendNodes.length - 1;
      const progressT = rawT * segCount;
      const idx = Math.min(Math.floor(progressT), segCount - 1);
      const frac = progressT - idx;
      const p0 = this.trendNodes[idx];
      const p1 = this.trendNodes[idx + 1];
      if (p0 && p1) {
        const ox = p0.x + (p1.x - p0.x) * frac;
        const oy = p0.y + (p1.y - p0.y) * frac;
        this.pulseOrb.setAttribute("cx", ox.toFixed(1));
        this.pulseOrb.setAttribute("cy", oy.toFixed(1));
      }
    }

    // Fade scroll indicator as user scrolls
    if (this.scrollIndicator) {
      const indOpacity = Math.max(0, 1 - exp * 2.8);
      this.scrollIndicator.style.opacity = indOpacity.toFixed(2);
    }

    this.rafId = requestAnimationFrame(t => this.loop(t));
  }
  destroy() {
    this.isRunning = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.stage && this.mouseMoveHandler) {
      this.stage.removeEventListener("mousemove", this.mouseMoveHandler);
      this.stage.removeEventListener("mousedown", this.mouseDownHandler);
      this.stage.removeEventListener("mouseleave", this.mouseLeaveHandler);
      this.stage.removeEventListener("touchstart", this.touchStartHandler);
      this.stage.removeEventListener("touchmove", this.touchMoveHandler);
      this.stage.removeEventListener("touchend", this.touchEndHandler);
      this.stage.removeEventListener("wheel", this.wheelHandler);
    }
    if (this.mouseUpHandler) {
      window.removeEventListener("mouseup", this.mouseUpHandler);
    }
    if (this.scrollHandler) {
      window.removeEventListener("scroll", this.scrollHandler);
      document.removeEventListener("scroll", this.scrollHandler);
    }
    if (this.stack && this.stackClickHandler) {
      this.stack.removeEventListener("click", this.stackClickHandler);
    }
  }
}

class App {
  constructor() {
    window.app = this;
    window.marketingLab = this;

    this.data = this.loadData();
    this.bookmarks = this.loadBookmarks();
    this.isAdmin = safeStorage.get('sessionStorage', AUTH_KEY) === '1';
    this.currentCategory = 'All';
    this.searchQuery = '';
    this.currentTeamDept = 'All';

    this.initTheme();
    this.initEventListeners();
    this.initRouter();
    initCard3DTilt();
    this.init3DEmblem();
    this.initReadingProgress();
  }

  loadData() {
    try {
      const saved = safeStorage.get('localStorage', STATE_KEY);
      if (saved) {
        const d = JSON.parse(saved);
        if (d.teamV !== initialData.teamV) { d.team = JSON.parse(JSON.stringify(initialData.team)); d.teamV = initialData.teamV; }
        return d;
      }
    } catch (e) {
      console.warn('Failed to parse local data, fallback to defaults');
    }
    return JSON.parse(JSON.stringify(initialData));
  }

  saveData() {
    try {
      safeStorage.set('localStorage', STATE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Storage error', e);
    }
  }

  loadBookmarks() {
    try {
      const b = safeStorage.get('localStorage', BOOKMARKS_KEY);
      return b ? JSON.parse(b) : [];
    } catch (e) {
      return [];
    }
  }

  saveBookmarks() {
    try {
      safeStorage.set('localStorage', BOOKMARKS_KEY, JSON.stringify(this.bookmarks));
      this.updateBookmarkBadge();
    } catch (e) {}
  }

  initTheme() {
    try {
      const savedTheme = safeStorage.get('localStorage', THEME_KEY);
      let prefersDark = false;
      if (typeof window !== 'undefined' && window.matchMedia && typeof window.matchMedia === 'function') {
        prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      const theme = savedTheme || (prefersDark ? 'dark' : 'light');
      if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.setAttribute('data-theme', theme);
      }
      this.updateThemeButton();
      
    } catch (e) {}
  }

  toggleTheme() {
    try {
      const current = (document.documentElement && document.documentElement.getAttribute('data-theme')) || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      if (document.documentElement) {
        document.documentElement.setAttribute('data-theme', next);
      }
      safeStorage.set('localStorage', THEME_KEY, next);
      this.updateThemeButton();
      
      this.showToast(`Switched to ${next} mode`);
    } catch (e) {}
  }

  updateThemeButton() {
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      const isDark = document.documentElement && document.documentElement.getAttribute('data-theme') === 'dark';
      btn.innerHTML = isDark ? '☀️' : '🌙';
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  navigate(routeOrHash) {
    let cleanHash = routeOrHash || '#/home';
    if (!cleanHash.startsWith('#')) {
      if (cleanHash.startsWith('/')) cleanHash = cleanHash.slice(1);
      cleanHash = '#/' + cleanHash;
    }

    try {
      const drawer = document.getElementById('mobile-drawer');
      if (drawer && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
      }
    } catch (e) {}

    try {
      if (typeof window !== 'undefined' && window.location && window.location.protocol === 'file:') {
        window.location.hash = cleanHash;
      } else if (typeof window !== 'undefined' && window.history && window.history.pushState) {
        window.history.pushState(null, '', cleanHash);
      } else if (typeof location !== 'undefined') {
        location.hash = cleanHash;
      }
    } catch (e) {
      try { if (typeof location !== 'undefined') location.hash = cleanHash; } catch(err) {}
    }
    this.handleRoute();
  }


  init3DEmblem() {
    try {
      if (this.emblem3D) {
        this.emblem3D.destroy();
        this.emblem3D = null;
      }
      const stage = document.getElementById("emblem-stage");
      if (stage) {
        this.emblem3D = new MarketingLabEmblem3D();
      }
    } catch (e) {
      console.warn("3D Emblem init error:", e);
    }
  }

  initRouter() {
    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', () => this.handleRoute());
      window.addEventListener('popstate', () => this.handleRoute());
      window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

      // Immediate click delegation for all #/... links
      document.addEventListener('click', (e) => {
        const link = e.target && e.target.closest && e.target.closest('a[href^="#/"]');
        if (link) {
          const href = link.getAttribute('href');
          if (href) {
            e.preventDefault();
            this.navigate(href);
          }
        }
      });
    }
    this.handleRoute();
  }
  initReadingProgress() {
    this.progressBar = document.getElementById('reading-progress');
    if (!this.progressBar || typeof window === 'undefined') return;

    this.progressCurrent = 0;
    this.progressTarget = 0;
    this.progressOpacity = 0;
    this.progressTargetOpacity = 0;
    this.progressTicking = false;

    this.progressScrollHandler = () => this.updateReadingProgressTarget();
    window.addEventListener('scroll', this.progressScrollHandler, { passive: true });
    window.addEventListener('resize', this.progressScrollHandler, { passive: true });
    this.updateReadingProgressTarget();
  }

  updateReadingProgressTarget() {
    if (!this.progressBar || typeof window === 'undefined') return;
    const scrollY = (window.pageYOffset || window.scrollY || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop)) || 0;
    const totalHeight = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;

    if (totalHeight > 0) {
      this.progressTarget = Math.min(1, Math.max(0, scrollY / totalHeight));
      this.progressTargetOpacity = scrollY > 6 ? 1 : 0;
    } else {
      this.progressTarget = 0;
      this.progressTargetOpacity = 0;
    }

    if (!this.progressTicking) {
      this.progressTicking = true;
      requestAnimationFrame(() => this.loopReadingProgress());
    }
  }

  loopReadingProgress() {
    if (!this.progressBar) {
      this.progressTicking = false;
      return;
    }

    // Smooth exponential damping (fluid 60/120fps glide)
    this.progressCurrent += (this.progressTarget - this.progressCurrent) * 0.16;
    this.progressOpacity += (this.progressTargetOpacity - this.progressOpacity) * 0.16;

    // Snap to target if infinitesimally close
    if (Math.abs(this.progressTarget - this.progressCurrent) < 0.0004) {
      this.progressCurrent = this.progressTarget;
    }
    if (Math.abs(this.progressTargetOpacity - this.progressOpacity) < 0.004) {
      this.progressOpacity = this.progressTargetOpacity;
    }

    this.progressBar.style.transform = `scaleX(${this.progressCurrent.toFixed(4)})`;
    this.progressBar.style.opacity = this.progressOpacity.toFixed(3);

    if (this.progressCurrent !== this.progressTarget || this.progressOpacity !== this.progressTargetOpacity) {
      requestAnimationFrame(() => this.loopReadingProgress());
    } else {
      this.progressTicking = false;
    }
  }

  handleScroll() {
    this.updateReadingProgressTarget();
  }

  handleRoute() {
    try {
      const fullHash = (typeof location !== 'undefined' && location.hash ? location.hash.replace(/^#[/]?/, '') : '') || 'home';
      const [pathOnly, queryString] = fullHash.split('?');
      const parts = (pathOnly || 'home').split('/');
      const route = parts[0] || 'home';
      const param = parts[1];

      this.updateNavLinks(route);
      if (route !== "home" && this.emblem3D) { this.emblem3D.destroy(); this.emblem3D = null; }
      try {
        if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
          window.scrollTo(0, 0);
        }
      } catch (e) {}

      const appEl = document.getElementById('app');
      if (!appEl) return;

      switch (route) {
        case 'home':
          this.renderHome(appEl);
          break;
        case 'articles':
          this.renderArticles(appEl, queryString);
          break;
        case 'article':
          this.renderArticleDetail(appEl, param);
          break;
        case 'team':
          this.renderTeam(appEl, param);
          break;
        case 'events':
          this.renderEvents(appEl);
          break;
        case 'resources':
          this.renderResources(appEl);
          break;
        case 'about':
          this.renderAbout(appEl);
          break;
        case 'join':
          this.renderJoin(appEl);
          break;
        case 'bookmarks':
          this.renderBookmarks(appEl);
          break;
        case 'admin':
          this.renderAdmin(appEl);
          break;
        default:
          this.renderHome(appEl);
      }
    } catch (err) {
      console.error('Routing error:', err);
      const appEl = document.getElementById('app');
      if (appEl && (!appEl.innerHTML || !appEl.innerHTML.trim())) {
        this.renderHome(appEl);
      }
    }
  }

  updateNavLinks(currentRoute) {
    document.querySelectorAll('.nav-link, .mobile-nav-links a').forEach(link => {
      const href = link.getAttribute('href') || '';
      const target = href.replace(/^#\/?/, '');
      if (target === currentRoute || (currentRoute === 'home' && (target === '' || target === 'home'))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    const adminLink = document.getElementById('admin-nav-item');
    if (adminLink) {
      adminLink.style.display = this.isAdmin ? 'inline-flex' : 'none';
    }

    this.updateBookmarkBadge();
  }

  updateBookmarkBadge() {
    const badge = document.getElementById('bookmark-count-badge');
    if (badge) {
      badge.textContent = this.bookmarks.length;
      badge.style.display = this.bookmarks.length > 0 ? 'inline-block' : 'none';
    }
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
    toast.innerHTML = `<span>${icon}</span> <span>${this.escape(message)}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  toggleBookmark(postId) {
    const id = Number(postId);
    const index = this.bookmarks.indexOf(id);
    if (index > -1) {
      this.bookmarks.splice(index, 1);
      this.showToast('Article removed from reading list');
    } else {
      this.bookmarks.push(id);
      this.showToast('Article saved to reading list!', 'success');
    }
    this.saveBookmarks();
    this.handleRoute();
  }

  escape(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, c => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[c]));
  }

  calcReadTime(text) {
    const words = (text || '').trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 190));
  }

  formatDate(dateStr) {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  }

  // --- RENDERING VIEWS ---

  renderHome(container) {
    const featured = this.data.posts.find(p => p.featured) || this.data.posts[0];
    const latestPosts = this.data.posts.filter(p => p.id !== (featured ? featured.id : 0)).slice(0, 3);
    const upcomingEvents = this.data.events.filter(e => e.status === 'Upcoming').slice(0, 2);

    container.innerHTML = `
      <!-- Hero -->
      <section class="hero">
        <div class="hero-scroll-track" id="hero-scroll-track">
          <div class="hero-sticky-frame" id="hero-sticky-frame">
            <div class="container hero-grid">
              <div>
                <div class="hero-tag">
                  <span>★</span> ${this.escape(this.data.cfg.institution)}
                </div>
                <h1 class="hero-title">
                  Think like marketers.<br>
                  <em>Act like analysts.</em><br>
                  Create like professionals.
                </h1>
                <p class="hero-lead">
                  ${this.escape(this.data.cfg.description)}
                </p>
                <div class="hero-actions">
                  <a href="#/articles" class="btn btn-gold">Explore Latest Research →</a>
                  <a href="#/join" class="btn btn-outline-white">Join the Community</a>
                </div>
              </div>
              <div>
                <div class="hero-emblem-widget" id="hero-emblem-widget">
                  <div class="emblem-widget-header">
                    <span class="widget-kicker">British Management University</span>
                    <h4 id="emblem-widget-title">Marketing Insights Lab</h4>
                  </div>

                  <!-- 3D Crest Stage (Pure Artwork & Scroll Animation) -->
                  <div class="emblem-stage" id="emblem-stage" title="3D Marketing Lab Crest — Move mouse or scroll down to deconstruct into 3D layers">
                    <!-- Grid Backdrop -->
                    <div class="emblem-grid-backdrop" aria-hidden="true"></div>

                    <!-- Concentric Dashed Orbit Rings -->
                    <div class="emblem-orbit-rings" aria-hidden="true">
                      <div class="emblem-ring-outer" id="emblem-ring-outer"></div>
                      <div class="emblem-ring-inner" id="emblem-ring-inner"></div>
                    </div>

                    <!-- 3D Perspective Anchor -->
                    <div class="emblem-3d-anchor" id="emblem-3d-anchor">
                      
                      <!-- Floor Cast Shadow -->
                      <div class="emblem-floor-shadow" id="emblem-floor-shadow" aria-hidden="true"></div>

                      <!-- Exploded 3D Shield Stack -->
                      <div class="emblem-exploded-stack" id="emblem-exploded-stack">
                        
                        <!-- Layer 0: Shield Base Chassis -->
                        <div class="exploded-layer layer-chassis" id="layer-chassis">
                          <img src="assets/crest-layer-chassis.png" alt="Chassis Base" class="layer-img">
                          <div class="layer-glare" id="layer-glare" aria-hidden="true"></div>
                        </div>

                        <!-- Layer 1: Market Columns / 5 Data Bars -->
                        <div class="exploded-layer layer-bars" id="layer-bars">
                          <img src="assets/crest-layer-bars.png" alt="5 Data Bars" class="layer-img">
                        </div>

                        <!-- Layer 2: Glowing Econometric Trendline & Nodes -->
                        <div class="exploded-layer layer-trendline" id="layer-trendline">
                          <img src="assets/crest-layer-trend.png" alt="Trend Spline" class="layer-img">
                          
                          <!-- Vector Neon Overlay on top of trendline -->
                          <svg class="emblem-crest-overlay" viewBox="0 0 699 779" fill="none" aria-hidden="true">
                            <path class="emblem-trend-glow" d="M160 427 L260 370 L360 397 L450 420 L544 372 L599 350" />
                            <path class="emblem-trend-line" d="M160 427 L260 370 L360 397 L450 420 L544 372 L599 350" />
                            
                            <circle class="emblem-node node-1" cx="260" cy="370" r="8" />
                            <circle class="emblem-node node-2" cx="360" cy="397" r="8" />
                            <circle class="emblem-node node-3" cx="450" cy="420" r="8" />
                            <circle class="emblem-node node-4" cx="544" cy="372" r="9" />

                            <circle class="emblem-pulse-orb" id="emblem-pulse-orb" cx="260" cy="370" r="8.5" />
                          </svg>
                        </div>

                        <!-- Layer 3: Innovation Lightbulb & Monogram M -->
                        <div class="exploded-layer layer-symbols" id="layer-symbols">
                          <div class="symbol-elem symbol-m" id="symbol-m">
                            <img src="assets/crest-layer-m.png" alt="M Monogram" class="layer-img">
                          </div>
                          <div class="symbol-elem symbol-bulb" id="symbol-bulb">
                            <img src="assets/crest-layer-bulb.png" alt="Innovation Lightbulb" class="layer-img">
                            <svg class="emblem-crest-overlay" viewBox="0 0 699 779" fill="none" aria-hidden="true">
                              <circle class="emblem-bulb-flare" cx="515" cy="198" r="45" />
                            </svg>
                          </div>
                        </div>

                      </div> <!-- /emblem-exploded-stack -->
                    </div> <!-- /emblem-3d-anchor -->

                    <!-- Subtle Scroll Hint -->
                    <div class="emblem-scroll-indicator" id="emblem-scroll-indicator" aria-hidden="true">
                      <span>↓ Scroll down to view 3D deconstruction</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Metric Stats Bar -->
      <section class="stats-bar">
        <div class="container stats-grid">
          ${this.data.cfg.stats.map(s => `
            <div class="stat-item">
              <strong>${this.escape(s.value)}</strong>
              <span>${this.escape(s.label)}</span>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Trending Ticker -->
      <div class="ticker-wrap">
        <div class="ticker-label">Trending Now</div>
        <div class="ticker-content">
          ${this.data.posts.map(p => `
            <a href="#/article/${p.id}" class="ticker-item">
              <strong>${this.escape(p.c)}:</strong> ${this.escape(p.t)}
            </a>
          `).join('')}
        </div>
      </div>

      <!-- Featured Piece & Latest -->
      <section class="section">
        <div class="container">
          <div class="section-head">
            <span class="section-eyebrow">Curated Research</span>
            <h2 class="section-title">Editor's Choice of the Month</h2>
          </div>

          ${featured ? `
            <div class="featured-card">
              <div class="featured-media">
                <img src="${this.escape(featured.cv)}" alt="${this.escape(featured.t)}">
                <span class="card-badge">${this.escape(featured.c)}</span>
              </div>
              <div class="featured-body">
                <span class="section-eyebrow">Featured Analysis</span>
                <h3 class="featured-title">
                  <a href="#/article/${featured.id}">${this.escape(featured.t)}</a>
                </h3>
                <p class="featured-desc">${this.escape(featured.x)}</p>
                <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">
                  <small style="color:var(--text-muted);font-weight:600">
                    ${this.formatDate(featured.d)} · ${this.calcReadTime(featured.b)} min read · By ${this.getAuthorName(featured.a)}
                  </small>
                  <a href="#/article/${featured.id}" class="btn btn-primary btn-sm">Read Investigation →</a>
                </div>
              </div>
            </div>
          ` : ''}

          <div style="display:flex;justify-content:space-between;align-items:flex-end;margin:40px 0 24px">
            <div>
              <span class="section-eyebrow">Fresh Insights</span>
              <h3 style="font-family:var(--font-serif);font-size:28px">Latest from the Lab</h3>
            </div>
            <a href="#/articles" class="btn btn-secondary btn-sm">View All ${this.data.posts.length} Articles →</a>
          </div>

          <div class="articles-grid">
            ${latestPosts.map(p => this.renderArticleCard(p)).join('')}
          </div>
        </div>
      </section>

      <!-- Content Categories -->
      <section class="section section-alt">
        <div class="container">
          <div class="section-head" style="text-align:center">
            <span class="section-eyebrow">Seven Knowledge Tracks</span>
            <h2 class="section-title">What We Produce & Research</h2>
            <p class="section-lead" style="margin:0 auto">Every format is designed to be read, cited, and added to a student's professional portfolio.</p>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px">
            ${this.data.categories.map(cat => `
              <div class="card" style="padding:28px;cursor:pointer" onclick="location.hash='#/articles?cat=${encodeURIComponent(cat.id)}'">
                <div style="font-size:32px;margin-bottom:14px">${cat.icon}</div>
                <h3 style="font-family:var(--font-serif);font-size:20px;margin-bottom:8px">${this.escape(cat.name)}</h3>
                <p style="font-size:14px;color:var(--text-secondary);line-height:1.5">${this.escape(cat.desc)}</p>
                <div style="margin-top:16px;color:var(--accent-primary);font-weight:700;font-size:13px">Explore Track →</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Upcoming Events Teaser -->
      ${upcomingEvents.length ? `
        <section class="section">
          <div class="container">
            <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:34px;flex-wrap:wrap;gap:16px">
              <div>
                <span class="section-eyebrow">Community & Meetups</span>
                <h2 class="section-title">Upcoming Masterclasses & Workshops</h2>
              </div>
              <a href="#/events" class="btn btn-secondary btn-sm">View Event Calendar →</a>
            </div>
            <div class="events-grid">
              ${upcomingEvents.map(e => this.renderEventCard(e)).join('')}
            </div>
          </div>
        </section>
      ` : ''}

      <!-- CTA Band -->
      <section class="section" style="padding-top:0">
        <div class="container">
          <div class="cta-band">
            <h2>Ready to Publish Real Market Work?</h2>
            <p>Join a community of students who investigate real brands, build analytical portfolios, and connect directly with industry CMOs.</p>
            <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
              <a href="#/join" class="btn btn-gold">Submit Lab Application</a>
              <a href="#/about" class="btn btn-outline-white">How Editorial Works</a>
            </div>
          </div>
        </div>
      </section>
    `;
    this.init3DEmblem();
    this.initReadingProgress();
  }

  renderArticles(container, queryString) {
    const qStr = queryString || (typeof location !== 'undefined' && location.hash && location.hash.includes('?') ? location.hash.split('?')[1] : '');
    if (qStr) {
      try {
        const urlParams = new URLSearchParams(qStr);
        if (urlParams.has('cat')) {
          this.currentCategory = urlParams.get('cat');
        }
      } catch (e) {}
    }

    const filtered = this.data.posts.filter(p => {
      const matchCat = this.currentCategory === 'All' || p.c === this.currentCategory;
      const q = this.searchQuery.toLowerCase();
      const matchSearch = !q || p.t.toLowerCase().includes(q) || p.x.toLowerCase().includes(q) || p.c.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

    container.innerHTML = `
      <section class="section">
        <div class="container">
          <div class="section-head">
            <span class="section-eyebrow">Knowledge Repository</span>
            <h1 class="section-title">Publications & Research</h1>
            <p class="section-lead">Investigative case studies, data models, and strategic breakdowns authored by BMU students.</p>
          </div>

          <div class="filter-bar">
            <div class="filter-chips">
              <button class="chip ${this.currentCategory === 'All' ? 'active' : ''}" onclick="window.app.setCategory('All')">All (${this.data.posts.length})</button>
              ${this.data.categories.map(c => `
                <button class="chip ${this.currentCategory === c.id ? 'active' : ''}" onclick="window.app.setCategory('${c.id}')">
                  ${c.icon} ${this.escape(c.name)}
                </button>
              `).join('')}
            </div>

            <div class="search-wrapper">
              <span class="search-icon">🔍</span>
              <input type="search" class="search-input" placeholder="Search insights, brands, authors..." 
                value="${this.escape(this.searchQuery)}" oninput="window.app.setSearch(this.value)">
            </div>
          </div>

          ${filtered.length ? `
            <div class="articles-grid">
              ${filtered.map(p => this.renderArticleCard(p)).join('')}
            </div>
          ` : `
            <div style="text-align:center;padding:80px 20px;background:var(--bg-surface);border-radius:var(--radius-lg);border:1px dashed var(--border-light)">
              <div style="font-size:44px;margin-bottom:12px">🔎</div>
              <h3 style="font-family:var(--font-serif);font-size:22px;margin-bottom:8px">No publications found</h3>
              <p style="color:var(--text-muted);margin-bottom:20px">Try adjusting your search terms or clearing category filters.</p>
              <button class="btn btn-secondary btn-sm" onclick="window.app.resetFilters()">Reset All Filters</button>
            </div>
          `}
        </div>
      </section>
    `;
  }

  renderArticleCard(p) {
    const isBookmarked = this.bookmarks.includes(p.id);
    return `
      <article class="card">
        <div class="card-media">
          <img src="${this.escape(p.cv || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80')}" alt="${this.escape(p.t)}" loading="lazy">
          <span class="card-badge">${this.escape(p.c)}</span>
          <button class="card-bookmark-btn ${isBookmarked ? 'active' : ''}" 
            title="${isBookmarked ? 'Remove bookmark' : 'Save bookmark'}" 
            onclick="window.app.toggleBookmark(${p.id})">
            ${isBookmarked ? '★' : '☆'}
          </button>
        </div>
        <div class="card-body">
          <h3 class="card-title">
            <a href="#/article/${p.id}">${this.escape(p.t)}</a>
          </h3>
          <p class="card-desc">${this.escape(p.x)}</p>
          <div class="card-footer">
            <span>By ${this.getAuthorName(p.a)}</span>
            <span>${this.calcReadTime(p.b)} min read</span>
          </div>
        </div>
      </article>
    `;
  }

  renderArticleDetail(container, id) {
    const post = this.data.posts.find(p => p.id === Number(id));
    if (!post) {
      location.hash = '#/articles';
      return;
    }

    const author = this.data.team.find(m => m.id === post.a) || { n: 'Marketing Lab Fellow', r: 'Student Researcher' };
    const related = this.data.posts.filter(p => p.c === post.c && p.id !== post.id).slice(0, 2);
    const isBookmarked = this.bookmarks.includes(post.id);

    // Format Markdown-like text into HTML
    const formattedContent = post.b.split(/\n\s*\n/).map(block => {
      const trimmed = block.trim();
      if (trimmed.startsWith('### ')) {
        return `<h3>${this.escape(trimmed.slice(4))}</h3>`;
      }
      if (trimmed.startsWith('> ')) {
        return `<blockquote>${this.escape(trimmed.slice(2))}</blockquote>`;
      }
      if (trimmed.startsWith('- ')) {
        const items = trimmed.split('\n').map(li => `<li>${this.escape(li.replace(/^-\s*/, ''))}</li>`).join('');
        return `<ul>${items}</ul>`;
      }
      return `<p>${this.escape(trimmed)}</p>`;
    }).join('');

    container.innerHTML = `
      <article class="reader-container">
        <a href="#/articles" class="reader-back">← Back to all publications</a>
        <div class="reader-header">
          <span class="section-eyebrow">${this.escape(post.c)}</span>
          <h1 class="reader-title">${this.escape(post.t)}</h1>
          <p class="reader-lead">${this.escape(post.x)}</p>
          <div class="reader-meta-bar">
            <div class="reader-author">
              <div style="width:40px;height:40px;border-radius:50%;overflow:hidden;border:2px solid var(--accent-primary)">
                <img src="${this.escape(author.ph || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80')}" alt="${this.escape(author.n)}" style="width:100%;height:100%;object-fit:cover">
              </div>
              <div>
                <strong style="color:var(--text-main);display:block">${this.escape(author.n)}</strong>
                <small>${this.escape(author.r)}</small>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:14px">
              <span>📅 ${this.formatDate(post.d)}</span>
              <span>⏱ ${this.calcReadTime(post.b)} min read</span>
              <button class="chip ${isBookmarked ? 'active' : ''}" onclick="window.app.toggleBookmark(${post.id})">
                ${isBookmarked ? '★ Saved' : '☆ Save for later'}
              </button>
            </div>
          </div>
        </div>

        ${post.cv ? `<img src="${this.escape(post.cv)}" alt="${this.escape(post.t)}" class="reader-cover">` : ''}

        <div class="reader-content">
          ${formattedContent}
        </div>

        <div class="reader-share">
          <strong style="font-size:14px;margin-right:8px">Share this piece:</strong>
          <button class="chip" onclick="window.app.shareArticle('tg', '${encodeURIComponent(post.t)}')">Telegram</button>
          <button class="chip" onclick="window.app.shareArticle('li', '${encodeURIComponent(post.t)}')">LinkedIn</button>
          <button class="chip" onclick="window.app.copyArticleLink()">Copy Link</button>
        </div>

        <!-- Author Bio Card -->
        <div class="card" style="margin-top:50px;padding:30px;display:flex;flex-direction:row;gap:24px;align-items:center;flex-wrap:wrap">
          <div style="width:80px;height:80px;border-radius:50%;overflow:hidden;flex-shrink:0;border:3px solid var(--border-light)">
            <img src="${this.escape(author.ph || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80')}" alt="${this.escape(author.n)}" style="width:100%;height:100%;object-fit:cover">
          </div>
          <div style="flex-grow:1">
            <span class="section-eyebrow" style="margin-bottom:2px">Author Profile</span>
            <h3 style="font-family:var(--font-serif);font-size:20px;margin-bottom:4px">${this.escape(author.n)}</h3>
            <p style="font-size:14px;color:var(--text-secondary);line-height:1.5;margin-bottom:10px">${this.escape(author.bio || author.r)}</p>
            ${author.ln ? `<a href="${this.escape(author.ln)}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm" style="display:inline-flex">${author.tg ? 'Telegram ' + this.escape(author.tg) : 'View on LinkedIn'} ↗</a>` : ''}
          </div>
        </div>

        ${related.length ? `
          <div style="margin-top:60px">
            <h3 style="font-family:var(--font-serif);font-size:24px;margin-bottom:24px">Related Research in ${this.escape(post.c)}</h3>
            <div class="articles-grid">
              ${related.map(p => this.renderArticleCard(p)).join('')}
            </div>
          </div>
        ` : ''}
      </article>
    `;
  }

  renderTeam(container) {
    const departments = ['All', 'Leadership', 'Management', 'Creative & Media', 'Research & Tech'];
    const visibleMembers = this.data.team.filter(m => this.isAdmin || (!m.hidden && !/admin/i.test(m.r)));
    const filtered = visibleMembers.filter(m => this.currentTeamDept === 'All' || m.g === this.currentTeamDept);

    container.innerHTML = `
      <section class="section">
        <div class="container">
          <div class="section-head">
            <span class="section-eyebrow">The Collective</span>
            <h1 class="section-title">The Students & Advisors Behind the Lab</h1>
            <p class="section-lead">A collaborative team of researchers, editors, creatives, and mentors driving rigorous marketing education at BMU.</p>
          </div>

          <div class="team-tabs">
            ${departments.map(d => `
              <button class="team-tab-btn ${this.currentTeamDept === d ? 'active' : ''}" 
                onclick="window.app.setTeamDept('${d}')">${d}</button>
            `).join('')}
          </div>

          <div class="team-grid">
            ${filtered.map(m => `
              <div class="team-card">
                <div class="team-avatar">
                  ${m.ph ? `<img src="${this.escape(m.ph)}" alt="${this.escape(m.n)}">` : `<div style="width:100%;height:100%;display:grid;place-items:center;font-family:var(--font-serif);font-size:30px;font-weight:700;color:#fff;background:linear-gradient(135deg,var(--accent-primary),#3a0a10)">${this.escape(m.n.split(/\s+/).slice(0,2).map(w=>w[0]).join('').toUpperCase())}</div>`}
                </div>
                <h3 class="team-name">${this.escape(m.n)}</h3>
                <div class="team-role">${this.escape(m.r)}</div>
                <p class="team-bio">${this.escape(m.bio)}</p>
                ${(m.resp && m.resp.length) ? `<ul style="text-align:left;font-size:12.5px;color:var(--text-secondary);line-height:1.5;margin:0 0 14px;padding-left:18px">${m.resp.map(x => `<li>${this.escape(x)}</li>`).join('')}</ul>` : ''}
                <div class="team-skills">
                  ${(m.sk || []).map(s => `<span class="skill-tag">${this.escape(s)}</span>`).join('')}
                </div>
                ${m.ln ? `<div style="margin-top:16px"><a href="${this.escape(m.ln)}" target="_blank" rel="noopener" style="font-size:12px;color:var(--accent-primary);font-weight:700">${m.tg ? 'Telegram ' + this.escape(m.tg) : 'Connect on LinkedIn'} ↗</a></div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  renderEvents(container) {
    container.innerHTML = `
      <section class="section">
        <div class="container">
          <div class="section-head">
            <span class="section-eyebrow">Masterclasses & Symposia</span>
            <h1 class="section-title">Interactive Events Calendar</h1>
            <p class="section-lead">Join our on-campus and virtual workshops with guest brand directors, strategists, and analytics leads.</p>
          </div>

          <div class="events-grid">
            ${this.data.events.map(e => this.renderEventCard(e)).join('')}
          </div>
        </div>
      </section>
    `;
  }

  renderEventCard(e) {
    const d = new Date(e.d);
    const day = isNaN(d) ? '15' : d.getDate();
    const month = isNaN(d) ? 'NOV' : d.toLocaleString('en', { month: 'short' }).toUpperCase();
    const isPast = e.status === 'Past';

    return `
      <div class="event-card">
        <div class="event-date-badge">
          <div class="event-day">${day}</div>
          <div class="event-month">${month}</div>
        </div>
        <div class="event-details" style="flex-grow:1">
          <h3>${this.escape(e.t)}</h3>
          <div class="event-meta">
            <span>⏰ ${this.escape(e.time || '15:00')}</span>
            <span>📍 ${this.escape(e.p)}</span>
          </div>
          <p class="event-desc">${this.escape(e.x)}</p>
          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
            ${!isPast ? `
              <button class="btn btn-primary btn-sm" onclick="window.app.openRsvpModal(${e.id})">RSVP Spot</button>
              <button class="btn btn-secondary btn-sm" onclick="window.app.downloadCalendarFile(${e.id})">📅 Add to Calendar</button>
            ` : `
              <span class="chip" style="cursor:default">Event Concluded</span>
            `}
          </div>
        </div>
      </div>
    `;
  }

  renderResources(container) {
    container.innerHTML = `
      <section class="section">
        <div class="container">
          <div class="section-head">
            <span class="section-eyebrow">Toolkits & Frameworks</span>
            <h1 class="section-title">Resources for Student Marketers</h1>
            <p class="section-lead">Download proven frameworks, stylebooks, and analytical spreadsheet models used by our lab team.</p>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px">
            ${this.data.resources.map(r => `
              <div class="card" style="padding:28px">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
                  <span class="skill-tag" style="background:var(--crimson-100);color:var(--crimson-700)">${this.escape(r.tag)}</span>
                  <small style="color:var(--text-muted);font-weight:700">${this.escape(r.format)}</small>
                </div>
                <h3 style="font-family:var(--font-serif);font-size:19px;margin-bottom:8px">${this.escape(r.t)}</h3>
                <p style="font-size:14px;color:var(--text-secondary);line-height:1.5;margin-bottom:24px">${this.escape(r.x)}</p>
                <button class="btn btn-secondary btn-sm" style="width:100%" onclick="window.app.showToast('Resource downloaded successfully!', 'success')">
                  Download Asset ⬇
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  renderAbout(container) {
    container.innerHTML = `
      <section class="section">
        <div class="container" style="max-width:860px">
          <div class="section-head">
            <span class="section-eyebrow">Origin & Mission</span>
            <h1 class="section-title">Bridging Classroom Theory with Real Market Practice</h1>
            <p class="section-lead">Founded in 2026, Marketing Insights Lab is a student-led publication and research collective connected to British Management University.</p>
          </div>

          <div class="reader-content">
            <p>Traditional marketing education moves at the speed of textbooks; digital commerce moves at the speed of weekly algorithm updates. The Marketing Insights Lab exists to solve this asymmetry.</p>

            <blockquote>
              "Our mission is to empower student analysts to dissect real market campaigns, conduct original consumer research, and publish work that commands respect in boardrooms."
            </blockquote>

            <h3>The Four Pillars of the Lab</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;margin:28px 0">
              <div class="card" style="padding:24px">
                <strong style="color:var(--accent-primary);font-size:20px;display:block;margin-bottom:6px">01. Research</strong>
                <p style="font-size:14px;color:var(--text-secondary)">Identify under-explored market shifts and gather verified empirical evidence.</p>
              </div>
              <div class="card" style="padding:24px">
                <strong style="color:var(--accent-primary);font-size:20px;display:block;margin-bottom:6px">02. Deconstruct</strong>
                <p style="font-size:14px;color:var(--text-secondary)">Turn complex data into structured, visually engaging analytical articles.</p>
              </div>
              <div class="card" style="padding:24px">
                <strong style="color:var(--accent-primary);font-size:20px;display:block;margin-bottom:6px">03. Peer Review</strong>
                <p style="font-size:14px;color:var(--text-secondary)">Refine arguments with editorial feedback from peers and senior faculty advisors.</p>
              </div>
              <div class="card" style="padding:24px">
                <strong style="color:var(--accent-primary);font-size:20px;display:block;margin-bottom:6px">04. Build Portfolio</strong>
                <p style="font-size:14px;color:var(--text-secondary)">Graduate with verified, publicly cited publications under your own name.</p>
              </div>
            </div>

            <h3>Letter from the Editorial Board</h3>
            <p>When we launched this initiative, our ambition was simple: make marketing education practical, collaborative, and globally relevant. Since then, our student authors have broken down campaigns that caught the attention of regional marketing directors, hosted international guest speakers, and built a culture of genuine curiosity.</p>
            <p>We are grateful for the ongoing guidance of British Management University and thrilled for what lies ahead.</p>
          </div>
        </div>
      </section>
    `;
  }

  renderJoin(container) {
    container.innerHTML = `
      <section class="section">
        <div class="container" style="max-width:760px">
          <div class="section-head" style="text-align:center">
            <span class="section-eyebrow">Apply for Membership</span>
            <h1 class="section-title">Join the Marketing Insights Lab</h1>
            <p class="section-lead" style="margin:0 auto">We recruit curious, driven students across all years and programmes who are eager to research, write, and publish real industry work.</p>
          </div>

          <div class="card" style="padding:40px">
            <form onsubmit="window.app.handleJoinSubmit(event)">
              <div class="form-group">
                <label class="form-label">Full Name *</label>
                <input type="text" name="name" class="form-control" placeholder="e.g. Malika Karimova" required>
              </div>

              <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
                <div class="form-group">
                  <label class="form-label">University Email *</label>
                  <input type="email" name="email" class="form-control" placeholder="name@bmu-edu.uz" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Programme & Year *</label>
                  <input type="text" name="programme" class="form-control" placeholder="e.g. BSc Marketing, Year 2" required>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Primary Track of Interest *</label>
                <select name="track" class="form-control" required>
                  ${this.data.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Why do you want to join the Lab? *</label>
                <textarea name="motivation" class="form-control" rows="4" placeholder="Tell us about a marketing topic or brand you would love to investigate..." required></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">Link to LinkedIn / Portfolio (optional)</label>
                <input type="url" name="portfolio" class="form-control" placeholder="https://linkedin.com/in/username">
              </div>

              <div style="margin-top:28px">
                <button type="submit" class="btn btn-primary" style="width:100%;padding:14px">Submit Membership Application 🚀</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    `;
  }

  renderBookmarks(container) {
    const bookmarkedPosts = this.data.posts.filter(p => this.bookmarks.includes(p.id));

    container.innerHTML = `
      <section class="section">
        <div class="container">
          <div class="section-head">
            <span class="section-eyebrow">Personal Reading List</span>
            <h1 class="section-title">Saved Articles (${bookmarkedPosts.length})</h1>
            <p class="section-lead">Articles you've bookmarked for offline study and reference.</p>
          </div>

          ${bookmarkedPosts.length ? `
            <div class="articles-grid">
              ${bookmarkedPosts.map(p => this.renderArticleCard(p)).join('')}
            </div>
          ` : `
            <div style="text-align:center;padding:80px 20px;background:var(--bg-surface);border-radius:var(--radius-lg);border:1px dashed var(--border-light)">
              <div style="font-size:44px;margin-bottom:12px">📚</div>
              <h3 style="font-family:var(--font-serif);font-size:22px;margin-bottom:8px">Your reading list is empty</h3>
              <p style="color:var(--text-muted);margin-bottom:20px">Click the star icon (☆) on any article card to save it here for later.</p>
              <a href="#/articles" class="btn btn-primary btn-sm">Browse Publications</a>
            </div>
          `}
        </div>
      </section>
    `;
  }

  renderAdmin(container) {
    if (!this.isAdmin) {
      container.innerHTML = `
        <section class="section">
          <div class="container" style="max-width:440px">
            <div class="card" style="padding:36px">
              <span class="section-eyebrow" style="color:var(--accent-primary)">Administrator Portal</span>
              <h2 style="font-family:var(--font-serif);font-size:24px;margin:8px 0 16px">Security Authentication</h2>
              <p style="font-size:14px;color:var(--text-secondary);margin-bottom:24px">Enter your administrator password to edit publications, team roster, and site settings.</p>
              
              <form onsubmit="window.app.handleAdminLogin(event)">
                <div class="form-group">
                  <label class="form-label">Admin Password</label>
                  <input type="password" id="admin-pass-input" class="form-control" placeholder="••••••••" required autofocus>
                </div>
                <div id="admin-login-error" style="color:var(--crimson-700);font-size:13px;font-weight:600;display:none;margin-bottom:16px">
                  Incorrect password. Please try again.
                </div>
                <div style="display:flex;gap:12px;align-items:center">
                  <button type="submit" class="btn btn-primary" style="flex-grow:1">Authenticate</button>
                  <a href="#/home" class="btn btn-secondary btn-sm">Cancel</a>
                </div>
              </form>
            </div>
          </div>
        </section>
      `;
      return;
    }

    container.innerHTML = `
      <section class="section">
        <div class="container">
          <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:34px;flex-wrap:wrap;gap:16px">
            <div>
              <span class="section-eyebrow">Dashboard Controls</span>
              <h1 class="section-title">Administrator Management Panel</h1>
            </div>
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
              <button class="btn btn-gold btn-sm" onclick="window.app.downloadDataBackup()">Backup JSON ⬇</button>
              <button class="btn btn-secondary btn-sm" onclick="window.app.handleAdminLogout()">Log Out</button>
            </div>
          </div>

          <!-- Summary Stats -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;margin-bottom:40px">
            <div class="card" style="padding:20px">
              <span style="font-size:12px;color:var(--text-muted);text-transform:uppercase;font-weight:700">Total Publications</span>
              <strong style="font-family:var(--font-serif);font-size:32px;color:var(--accent-primary);display:block">${this.data.posts.length}</strong>
            </div>
            <div class="card" style="padding:20px">
              <span style="font-size:12px;color:var(--text-muted);text-transform:uppercase;font-weight:700">Team Fellows</span>
              <strong style="font-family:var(--font-serif);font-size:32px;color:var(--accent-primary);display:block">${this.data.team.length}</strong>
            </div>
            <div class="card" style="padding:20px">
              <span style="font-size:12px;color:var(--text-muted);text-transform:uppercase;font-weight:700">Events Scheduled</span>
              <strong style="font-family:var(--font-serif);font-size:32px;color:var(--accent-primary);display:block">${this.data.events.length}</strong>
            </div>
          </div>

          <!-- Manage Articles -->
          <div class="card" style="padding:32px;margin-bottom:40px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
              <h3 style="font-family:var(--font-serif);font-size:22px">Publications & Analyses</h3>
              <button class="btn btn-primary btn-sm" onclick="window.app.openArticleModal()">+ Create New Article</button>
            </div>
            <div style="display:flex;flex-direction:column;gap:12px">
              ${this.data.posts.map(p => `
                <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:var(--bg-surface-elevated);border-radius:var(--radius-sm);gap:12px">
                  <div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
                    <strong>${this.escape(p.t)}</strong>
                    <small style="display:block;color:var(--text-muted)">${this.escape(p.c)} · ${p.d} · By ${this.getAuthorName(p.a)}</small>
                  </div>
                  <div style="display:flex;gap:8px;flex-shrink:0">
                    <button class="btn btn-secondary btn-sm" onclick="window.app.openArticleModal(${p.id})">Edit</button>
                    <button class="btn btn-secondary btn-sm" style="color:var(--crimson-700)" onclick="window.app.deletePost(${p.id})">Delete</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Site Configuration & Password -->
          <div class="card" style="padding:32px">
            <h3 style="font-family:var(--font-serif);font-size:22px;margin-bottom:20px">Site & Security Settings</h3>
            <form onsubmit="window.app.handleSaveSettings(event)">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
                <div class="form-group">
                  <label class="form-label">Admin Password</label>
                  <input type="text" name="adminPass" class="form-control" value="${this.escape(this.data.cfg.adminPass || 'admin123')}" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Contact Email</label>
                  <input type="email" name="email" class="form-control" value="${this.escape(this.data.cfg.email || '')}" required>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Telegram Channel URL</label>
                <input type="url" name="telegram" class="form-control" value="${this.escape(this.data.cfg.socials.telegram || '')}">
              </div>

              <div class="form-group">
                <label class="form-label">LinkedIn Page URL</label>
                <input type="url" name="linkedin" class="form-control" value="${this.escape(this.data.cfg.socials.linkedin || '')}">
              </div>

              <div style="margin-top:20px">
                <button type="submit" class="btn btn-primary">Save Settings</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    `;
  }

  // --- ACTIONS & MODALS ---

  setCategory(catId) {
    this.currentCategory = catId;
    this.handleRoute();
  }

  setSearch(q) {
    this.searchQuery = q;
    this.handleRoute();
  }

  resetFilters() {
    this.currentCategory = 'All';
    this.searchQuery = '';
    this.handleRoute();
  }

  setTeamDept(dept) {
    this.currentTeamDept = dept;
    this.handleRoute();
  }

  getAuthorName(authorId) {
    const author = this.data.team.find(m => m.id === Number(authorId));
    return author ? author.n : 'Lab Fellow';
  }

  handleAdminLogin(e) {
    e.preventDefault();
    const input = document.getElementById('admin-pass-input').value.trim();
    const expected = this.data.cfg.adminPass || 'admin123';
    if (input === expected) {
      this.isAdmin = true;
      safeStorage.set('sessionStorage', AUTH_KEY, '1');
      this.showToast('Authentication successful!', 'success');
      this.handleRoute();
    } else {
      const err = document.getElementById('admin-login-error');
      if (err) err.style.display = 'block';
    }
  }

  handleAdminLogout() {
    this.isAdmin = false;
    safeStorage.remove('sessionStorage', AUTH_KEY);
    this.showToast('Logged out of admin mode');
    location.hash = '#/home';
  }

  handleSaveSettings(e) {
    e.preventDefault();
    const form = e.target;
    this.data.cfg.adminPass = form.adminPass.value.trim();
    this.data.cfg.email = form.email.value.trim();
    this.data.cfg.socials.telegram = form.telegram.value.trim();
    this.data.cfg.socials.linkedin = form.linkedin.value.trim();
    this.saveData();
    this.showToast('Settings updated successfully!', 'success');
  }

  deletePost(id) {
    if (confirm('Are you sure you want to delete this publication?')) {
      this.data.posts = this.data.posts.filter(p => p.id !== id);
      this.saveData();
      this.showToast('Publication deleted');
      this.handleRoute();
    }
  }

  openArticleModal(postId = null) {
    const post = postId ? this.data.posts.find(p => p.id === postId) : null;
    const dialog = document.getElementById('article-modal');
    if (!dialog) return;

    dialog.innerHTML = `
      <div class="dialog-box">
        <button class="dialog-close" onclick="window.app.closeModal('article-modal')">✕</button>
        <h3 style="font-family:var(--font-serif);font-size:22px;margin-bottom:20px">
          ${post ? 'Edit Article' : 'New Publication'}
        </h3>
        <form onsubmit="window.app.saveArticleForm(event, ${postId || 'null'})">
          <div class="form-group">
            <label class="form-label">Article Title *</label>
            <input type="text" name="title" class="form-control" value="${this.escape(post ? post.t : '')}" required>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
            <div class="form-group">
              <label class="form-label">Track Category *</label>
              <select name="category" class="form-control" required>
                ${this.data.categories.map(c => `
                  <option value="${c.id}" ${post && post.c === c.id ? 'selected' : ''}>${c.name}</option>
                `).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Lead Author *</label>
              <select name="author" class="form-control" required>
                ${this.data.team.map(m => `
                  <option value="${m.id}" ${post && post.a === m.id ? 'selected' : ''}>${m.n}</option>
                `).join('')}
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Executive Summary (Subtitle) *</label>
            <textarea name="summary" class="form-control" rows="2" required>${this.escape(post ? post.x : '')}</textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Cover Image URL</label>
            <input type="url" name="cover" class="form-control" value="${this.escape(post ? post.cv : '')}" placeholder="https://images.unsplash.com/...">
          </div>
          <div class="form-group">
            <label class="form-label">Article Body (supports ### Headings and > Quotes) *</label>
            <textarea name="body" class="form-control" rows="8" required>${this.escape(post ? post.b : '')}</textarea>
          </div>
          <div class="form-group" style="display:flex;align-items:center;gap:10px">
            <input type="checkbox" name="featured" id="chk-feat" ${post && post.featured ? 'checked' : ''}>
            <label for="chk-feat" style="font-size:14px;cursor:pointer">Feature as Article of the Month</label>
          </div>
          <div style="display:flex;gap:12px;margin-top:24px">
            <button type="submit" class="btn btn-primary">Save & Publish</button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.app.closeModal('article-modal')">Cancel</button>
          </div>
        </form>
      </div>
    `;
    this.openModal(dialog.id || 'article-modal');
  }

  saveArticleForm(e, postId) {
    e.preventDefault();
    const f = e.target;
    const isNew = !postId;
    const newId = isNew ? Math.max(...this.data.posts.map(p => p.id), 0) + 1 : postId;

    const postObj = {
      id: newId,
      t: f.title.value.trim(),
      c: f.category.value,
      a: Number(f.author.value),
      x: f.summary.value.trim(),
      cv: f.cover.value.trim() || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      b: f.body.value.trim(),
      featured: f.featured.checked,
      d: isNew ? new Date().toISOString().slice(0, 10) : (this.data.posts.find(p => p.id === postId)?.d || new Date().toISOString().slice(0, 10))
    };

    if (postObj.featured) {
      this.data.posts.forEach(p => p.featured = false);
    }

    if (isNew) {
      this.data.posts.unshift(postObj);
    } else {
      const idx = this.data.posts.findIndex(p => p.id === postId);
      if (idx > -1) this.data.posts[idx] = postObj;
    }

    this.saveData();
    window.app.closeModal('article-modal');
    this.showToast('Article published successfully!', 'success');
    this.handleRoute();
  }

  openRsvpModal(eventId) {
    const ev = this.data.events.find(e => e.id === eventId);
    if (!ev) return;
    const dialog = document.getElementById('rsvp-modal');
    if (!dialog) return;

    dialog.innerHTML = `
      <div class="dialog-box">
        <button class="dialog-close" onclick="window.app.closeModal('rsvp-modal')">✕</button>
        <span class="section-eyebrow">Spot Reservation</span>
        <h3 style="font-family:var(--font-serif);font-size:22px;margin:6px 0 16px">${this.escape(ev.t)}</h3>
        <p style="font-size:14px;color:var(--text-secondary);margin-bottom:20px">📅 ${ev.d} · ⏰ ${ev.time || '15:00'} · 📍 ${this.escape(ev.p)}</p>
        
        <form onsubmit="window.app.handleRsvpSubmit(event, ${ev.id})">
          <div class="form-group">
            <label class="form-label">Full Name *</label>
            <input type="text" name="name" class="form-control" required placeholder="Your name">
          </div>
          <div class="form-group">
            <label class="form-label">Email Address *</label>
            <input type="email" name="email" class="form-control" required placeholder="student@bmu-edu.uz">
          </div>
          <div style="display:flex;gap:12px;margin-top:24px">
            <button type="submit" class="btn btn-primary" style="flex-grow:1">Confirm Free RSVP</button>
          </div>
        </form>
      </div>
    `;
    this.openModal(dialog.id || 'article-modal');
  }

  handleRsvpSubmit(e, eventId) {
    e.preventDefault();
    window.app.closeModal('rsvp-modal');
    this.showToast('Spot confirmed! We have emailed you the entry ticket.', 'success');
  }

  downloadCalendarFile(eventId) {
    const ev = this.data.events.find(e => e.id === eventId);
    if (!ev) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//BMU Marketing Insights Lab//EN
BEGIN:VEVENT
SUMMARY:${ev.t}
DESCRIPTION:${ev.x}
LOCATION:${ev.p}
DTSTART:${ev.d.replace(/-/g, '')}T100000Z
DTEND:${ev.d.replace(/-/g, '')}T120000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `event-${ev.id}.ics`;
    link.click();
    this.showToast('Calendar invite (.ics) generated!');
  }

  handleJoinSubmit(e) {
    e.preventDefault();
    e.target.reset();
    this.showToast('Thank you! Your application has been received.', 'success');
    setTimeout(() => {
      location.hash = '#/home';
    }, 1200);
  }

  shareArticle(platform, titleEncoded) {
    const url = encodeURIComponent(location.href);
    if (platform === 'tg') {
      window.open(`https://t.me/share/url?url=${url}&text=${titleEncoded}`, '_blank');
    } else if (platform === 'li') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    }
  }

  copyArticleLink() {
    navigator.clipboard.writeText(location.href).then(() => {
      this.showToast('Link copied to clipboard!');
    }).catch(() => {
      this.showToast('Could not copy link');
    });
  }

  downloadDataBackup() {
    const jsonStr = JSON.stringify(this.data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `marketing-lab-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    this.showToast('Backup JSON downloaded!');
  }


  openModal(id) {
    const dialog = document.getElementById(id);
    if (!dialog) return;
    if (typeof dialog.showModal === 'function') {
      try { dialog.showModal(); return; } catch (e) {}
    }
    dialog.setAttribute('open', '');
    dialog.style.display = 'block';
  }

  closeModal(id) {
    const dialog = document.getElementById(id);
    if (!dialog) return;
    if (typeof dialog.close === 'function') {
      try { dialog.close(); return; } catch (e) {}
    }
    dialog.removeAttribute('open');
    dialog.style.display = 'none';
  }

  initEventListeners() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    const mobileBtn = document.getElementById('mobile-nav-toggle');
    const mobileMenu = document.getElementById('mobile-drawer');
    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
      });
    }
  }
}

// Bulletproof initialization that cannot be hijacked by named DOM elements (like <main id="app">)
function startMarketingLabApp() {
  try {
    if (!(window.app instanceof App)) {
      const appInstance = new App();
      window.app = appInstance;
      window.marketingLab = appInstance;
    }
  } catch (err) {
    console.error('Fatal MarketingLabApp init error:', err);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startMarketingLabApp);
} else {
  startMarketingLabApp();
}

// Fallback direct execution
try {
  startMarketingLabApp();
} catch (e) {}
