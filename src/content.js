// ─────────────────────────────────────────────────────────────
// Tout le contenu du site est ici. Modifie ce fichier, pas les composants.
// Chaque texte existe en deux langues : { fr: '…', en: '…' }
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Sirielle Nguefa',
  email: 'siriellen0@gmail.com',
  // TODO : remplace par tes vrais liens
  github: 'https://github.com/VOTRE-PSEUDO',
  linkedin: 'https://www.linkedin.com/in/VOTRE-PROFIL',
  location: { fr: 'Île-de-France', en: 'Paris area, France' },
}

export const ui = {
  fr: {
    nav: { about: 'Profil', work: 'Parcours', skills: 'Compétences', projects: 'Projets', contact: 'Contact' },
    switchLang: 'English',
    role: 'Ingénieure logicielle · Data & IA',
    intro:
      "Je construis des systèmes qui transforment des données brutes en informations exploitables : pipelines, modèles de machine learning et traitement du langage naturel, sur des bases backend solides.",
    ctaProjects: 'Voir les projets',
    ctaContact: 'Me contacter',
    sceneStates: ['Données brutes', 'Regroupement en cours', 'Quatre clusters identifiés'],
    scrollHint: 'Faites défiler pour lancer le clustering',
    aboutTitle: 'Profil',
    about: [
      "Diplômée du cycle ingénieur de CESI, j'ai commencé par le développement fullstack avant de me spécialiser en data et en intelligence artificielle, avec un intérêt particulier pour le NLP et le machine learning.",
      "En mission pour l'INA via Tata Consultancy Services, j'ai travaillé sur des backends de production : modélisation, API, migrations, revues de code. Cette rigueur d'ingénierie, je l'applique aujourd'hui à mes projets data.",
    ],
    facts: [
      ['Formation', 'Ingénieure CESI'],
      ['Spécialité', 'NLP, machine learning, data engineering'],
      ['Basée', 'Île-de-France'],
      ['Langues', 'Français, anglais'],
    ],
    workTitle: 'Parcours',
    skillsTitle: 'Compétences',
    projectsTitle: 'Projets',
    projectsEmpty:
      'Les premiers projets data sont en cours de publication. Retrouvez leur avancement sur mon GitHub.',
    projectsEmptyCta: 'Ouvrir mon GitHub',
    code: 'Code',
    demo: 'Démo',
    contactTitle: 'Travaillons ensemble',
    contactText:
      "Une offre, un projet data ou simplement une question sur mon travail : écrivez-moi, je réponds sous 48 heures.",
    copy: "Copier l'adresse",
    copied: 'Adresse copiée',
    footer: 'Conçu et développé par Sirielle Nguefa',
  },
  en: {
    nav: { about: 'About', work: 'Experience', skills: 'Skills', projects: 'Projects', contact: 'Contact' },
    switchLang: 'Français',
    role: 'Software engineer · Data & AI',
    intro:
      'I build systems that turn raw data into usable insight: pipelines, machine learning models and natural language processing, on solid backend foundations.',
    ctaProjects: 'See projects',
    ctaContact: 'Get in touch',
    sceneStates: ['Raw data', 'Clustering', 'Four clusters found'],
    scrollHint: 'Scroll to run the clustering',
    aboutTitle: 'About',
    about: [
      'I graduated from the CESI engineering programme. I started out in fullstack development, then specialised in data and artificial intelligence, with a particular focus on NLP and machine learning.',
      'On assignment at INA, the French national audiovisual institute, through Tata Consultancy Services, I worked on production backends: data modelling, APIs, migrations and code review. I now bring that engineering discipline to my data projects.',
    ],
    facts: [
      ['Education', 'CESI engineering degree'],
      ['Focus', 'NLP, machine learning, data engineering'],
      ['Based in', 'Paris area, France'],
      ['Languages', 'French, English'],
    ],
    workTitle: 'Experience',
    skillsTitle: 'Skills',
    projectsTitle: 'Projects',
    projectsEmpty: 'My first data projects are being published. Follow their progress on GitHub.',
    projectsEmptyCta: 'Open my GitHub',
    code: 'Code',
    demo: 'Demo',
    contactTitle: "Let's work together",
    contactText:
      'A job offer, a data project or a question about my work: write to me and I will reply within 48 hours.',
    copy: 'Copy address',
    copied: 'Address copied',
    footer: 'Designed and built by Sirielle Nguefa',
  },
}

// TODO : vérifie les dates
export const experience = [
  {
    period: '2025 — 2026',
    org: 'Tata Consultancy Services · INA',
    role: { fr: 'Développeuse fullstack, stage de fin d’études', en: 'Fullstack developer, final-year internship' },
    points: {
      fr: [
        'Backend de configuration générique et scalable (Spring Boot, Angular) au service de plusieurs plateformes.',
        'Évolutions de bout en bout du module dossiers : entités, DTO, API, migrations Liquibase et tests, en cycle de revue GitLab.',
        'Application de démonstration prouvant la généricité du backend sur trois plateformes clientes.',
      ],
      en: [
        'Generic, scalable configuration backend (Spring Boot, Angular) serving several platforms.',
        'End-to-end features in the case-file module: entities, DTOs, APIs, Liquibase migrations and tests, through GitLab code review.',
        'Demo application proving the backend works generically across three client platforms.',
      ],
    },
  },
  {
    period: '2024',
    org: 'MORISET',
    role: { fr: 'Développeuse fullstack, stage', en: 'Fullstack developer, internship' },
    points: {
      // TODO : décris en une ou deux lignes ce que tu as construit chez MORISET
      fr: ['Développement d’applications web, du front-end à la base de données.'],
      en: ['Built web applications, from the front end to the database.'],
    },
  },
  {
    period: '2021 — 2026',
    org: 'CESI École d’Ingénieurs',
    role: { fr: 'Cycle ingénieur, spécialisation data & IA', en: 'Engineering degree, data & AI track' },
    points: { fr: [], en: [] },
  },
]

export const skills = [
  { group: { fr: 'Data & IA', en: 'Data & AI' }, items: ['Python', 'SQL', 'pandas', 'scikit-learn', 'NLP', 'Machine learning'] },
  { group: { fr: 'Backend', en: 'Backend' }, items: ['Java', 'Spring Boot', 'API REST', 'OpenAPI', 'Liquibase', 'Keycloak'] },
  { group: { fr: 'Frontend', en: 'Frontend' }, items: ['Angular', 'React', 'TypeScript', 'Three.js'] },
  { group: { fr: 'Outils', en: 'Tooling' }, items: ['Git', 'GitLab', 'IntelliJ IDEA', 'WSL2'] },
]

// Ajoute tes projets ici. Exemple :
// {
//   title: { fr: 'Analyse de sentiment de critiques de films', en: 'Movie review sentiment analysis' },
//   summary: { fr: 'Fine-tuning de CamemBERT…', en: 'Fine-tuned CamemBERT…' },
//   stack: ['Python', 'Transformers', 'FastAPI'],
//   metric: { value: '91 %', label: { fr: 'F1-score', en: 'F1 score' } },   // optionnel
//   repo: 'https://github.com/…',
//   demo: '',                                                                 // optionnel
// },
export const projects = []
