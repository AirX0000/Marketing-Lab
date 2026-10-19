// Initial data structure for Marketing Insights Lab
export const initialData = {
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
  team: [
    {
      id: 1,
      n: "Ayder Parmankulov",
      r: "Editor-in-Chief & Co-Founder",
      g: "Leadership",
      bio: "Leads the editorial vision, publication roadmap, and university brand partnerships for the Lab. Passionate about strategic positioning and brand architecture.",
      resp: [
        "Oversee editorial board and approval of all published insights",
        "Lead corporate partnerships and guest speaker series",
        "Represent the Lab across university academic and industry boards"
      ],
      sk: ["Brand Strategy", "Editorial Leadership", "Campaign Architecture", "Project Management"],
      ph: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      ln: "https://linkedin.com",
      hidden: false
    },
    {
      id: 2,
      n: "Dmitriy Kim",
      r: "Head of Research & Analytics",
      g: "Research & Strategy",
      bio: "Quantitative researcher focusing on consumer psychology, behavioral economics, and survey modeling in emerging markets.",
      resp: [
        "Design empirical survey methodologies and sample architectures",
        "Lead data verification and statistical fact-checking",
        "Mentor junior researchers on quantitative analysis frameworks"
      ],
      sk: ["Consumer Insights", "SPSS / Python", "Data Visualization", "Market Sizing"],
      ph: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      ln: "https://linkedin.com",
      hidden: false
    },
    {
      id: 3,
      n: "Malika Alimova",
      r: "Campaign Analysis Director",
      g: "Editorial",
      bio: "Brand strategist deconstructing multinational and regional marketing cases with a focus on positioning and media ROI.",
      resp: [
        "Curate monthly campaign analysis pipeline",
        "Conduct competitive brand audits and channel teardowns",
        "Coach authors on compelling narrative structure"
      ],
      sk: ["Case Analysis", "Competitive Audits", "Creative Direction", "Media Planning"],
      ph: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      ln: "https://linkedin.com",
      hidden: false
    },
    {
      id: 4,
      n: "Sardor Rakhimov",
      r: "News & Trends Editor",
      g: "Editorial",
      bio: "Tracks daily breakthroughs in adtech, retail media networks, and consumer digital habits across Central Asia and EMEA.",
      resp: [
        "Publish the weekly Marketing Radar digest",
        "Verify source citations and industry interview quotes",
        "Coordinate quick-turnaround industry brief analyses"
      ],
      sk: ["Trend Forecasting", "Copywriting", "Tech Journalism", "SEO Strategy"],
      ph: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      ln: "https://linkedin.com",
      hidden: false
    },
    {
      id: 5,
      n: "Kamila Tursunova",
      r: "Creative & Brand Visual Lead",
      g: "Creative & Design",
      bio: "Visual storyteller shaping the visual language, typography systems, and infographics for all publication artifacts.",
      resp: [
        "Maintain brand identity guidelines across web and social channels",
        "Produce high-fidelity article covers, diagrams, and carousels",
        "Supervise UI/UX design and typography systems"
      ],
      sk: ["Figma", "Visual Identity", "Typography", "Infographic Design"],
      ph: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      ln: "https://linkedin.com",
      hidden: false
    },
    {
      id: 6,
      n: "Jasur Mirzayev",
      r: "Events & Community Producer",
      g: "Creative & Design",
      bio: "Coordinates marketing workshops, roundtables, and student-industry networking meetups at British Management University.",
      resp: [
        "Organize quarterly industry speaker sessions and panels",
        "Coordinate participant logistics, venue, and live streaming",
        "Manage post-event documentation and community engagement"
      ],
      sk: ["Event Production", "Speaker Relations", "Community Management", "PR"],
      ph: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
      ln: "https://linkedin.com",
      hidden: false
    },
    {
      id: 7,
      n: "Dr. Alistair Finch",
      r: "Faculty Academic Advisor",
      g: "Advisory",
      bio: "Senior Lecturer in Marketing and Strategy at British Management University. Supporting student researchers with academic rigor and global connections.",
      resp: [
        "Advise on academic integrity and research methodology",
        "Connect student researchers with global academic networks",
        "Facilitate curriculum integration and faculty guidance"
      ],
      sk: ["Academic Mentorship", "Curriculum Strategy", "International Marketing", "Publishing"],
      ph: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
      ln: "https://linkedin.com",
      hidden: false
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
