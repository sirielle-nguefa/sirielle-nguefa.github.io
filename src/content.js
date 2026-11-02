// ─────────────────────────────────────────────────────────────
// Tout le contenu du site est ici. Modifie ce fichier, pas les composants.
// Chaque texte existe en deux langues : { fr: '…', en: '…' }
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Sirielle Nguefa',
  email: 'siriellen0@gmail.com',
  github: 'https://github.com/sirielle-nguefa',
  // TODO : colle l'adresse exacte de ton profil LinkedIn
  linkedin: 'https://www.linkedin.com/in/sirielle-pontue-nguefa-ngouowoui-488511318',
}

export const ui = {
  fr: {
    nav: { about: 'Profil', work: 'Parcours', skills: 'Compétences', projects: 'Projets', contact: 'Contact' },
    switchLang: 'English',
    role: 'Data Analyst · Business Analyst',
    intro:
      "Ingénieure logicielle, je transforme des données brutes en indicateurs fiables et en décisions : qualité des données, SQL, tableaux de bord Power BI, et une base solide en développement backend.",
    ctaProjects: 'Voir les projets',
    ctaContact: 'Me contacter',
    sceneStates: ['Données brutes', 'Regroupement en cours', 'Quatre clusters identifiés'],
    scrollHint: 'Faites défiler pour lancer le clustering',
    aboutTitle: 'Profil',
    about: [
      "Ingénieure diplômée en informatique, spécialisée en ingénierie logicielle, je mets aujourd'hui mes compétences techniques et analytiques au service de projets data et business analysis.",
      "En mission pour l'INA avec Tata Consultancy Services, j'ai manipulé des données métier, conçu des API et des modèles de base de données, et contribué à la fiabilité des traitements. J'entre au MBA IA for Business de l'ESG en janvier 2027 et je recherche une alternance de 12 mois en tant que Data Analyst ou Business Analyst.",
    ],
    facts: [
      ['Recherche', 'Alternance 12 mois, dès janvier 2027'],
      ['Rythme', '3 jours entreprise, 2 jours école'],
      ['Basée', 'Paris, Île-de-France · mobile en France'],
      ['Langues', 'Français C2, anglais C1'],
    ],
    workTitle: 'Parcours',
    skillsTitle: 'Compétences',
    projectsTitle: 'Projets',
    projectsEmpty:
      'Les projets data sont en cours de publication. Retrouvez leur avancement sur mon GitHub.',
    projectsEmptyCta: 'Ouvrir mon GitHub',
    code: 'Code',
    demo: 'Démo',
    soon: 'Code bientôt publié',
    contactTitle: 'Travaillons ensemble',
    contactText:
      "Une offre d'alternance, un projet data ou une question sur mon travail : écrivez-moi, je réponds sous 48 heures.",
    copy: "Copier l'adresse",
    copied: 'Adresse copiée',
    footer: 'Conçu et développé par Sirielle Nguefa',
  },
  en: {
    nav: { about: 'About', work: 'Experience', skills: 'Skills', projects: 'Projects', contact: 'Contact' },
    switchLang: 'Français',
    role: 'Data Analyst · Business Analyst',
    intro:
      'Software engineer turning raw data into reliable metrics and decisions: data quality, SQL, Power BI dashboards, on a solid backend development foundation.',
    ctaProjects: 'See projects',
    ctaContact: 'Get in touch',
    sceneStates: ['Raw data', 'Clustering', 'Four clusters found'],
    scrollHint: 'Scroll to run the clustering',
    aboutTitle: 'About',
    about: [
      'I hold an engineering degree in computer science with a focus on software engineering, and I now apply my technical and analytical skills to data and business analysis projects.',
      'On assignment at INA, the French national audiovisual institute, with Tata Consultancy Services, I worked with business data, designed APIs and database models, and helped make data processing more reliable. I start the ESG MBA in AI for Business in January 2027 and I am looking for a 12-month work-study contract as a Data Analyst or Business Analyst.',
    ],
    facts: [
      ['Looking for', '12-month work-study, from January 2027'],
      ['Schedule', '3 days at work, 2 days at school'],
      ['Based in', 'Paris area · open to relocate in France'],
      ['Languages', 'French C2, English C1'],
    ],
    workTitle: 'Experience',
    skillsTitle: 'Skills',
    projectsTitle: 'Projects',
    projectsEmpty: 'My data projects are being published. Follow their progress on GitHub.',
    projectsEmptyCta: 'Open my GitHub',
    code: 'Code',
    demo: 'Demo',
    soon: 'Code coming soon',
    contactTitle: "Let's work together",
    contactText:
      'A work-study offer, a data project or a question about my work: write to me and I will reply within 48 hours.',
    copy: 'Copy address',
    copied: 'Address copied',
    footer: 'Designed and built by Sirielle Nguefa',
  },
}

export const experience = [
  {
    period: '04 — 10.2026',
    org: 'Tata Consultancy Services · mission INA',
    role: { fr: 'Ingénieure backend, projet Calypso', en: 'Backend engineer, Calypso project' },
    points: {
      fr: [
        "Plus de 6 évolutions fonctionnelles sur des référentiels métier : enrichissement des métadonnées, qualité des données, statuts et relations entre entités.",
        "Développement d'API REST pour transformer, traiter et restituer les données du système d'information.",
        'Conception d’un modèle de base de données centralisant configurations, valeurs par défaut et préférences de plusieurs applications métier.',
        'Fiabilité des données et des traitements : tests, analyse des anomalies, validation des réponses API.',
      ],
      en: [
        'Delivered 6+ features on business reference data: metadata enrichment, data quality, statuses and entity relationships.',
        'Built REST APIs to transform, process and serve information-system data.',
        'Designed a database model centralising configuration, defaults and user preferences for several business applications.',
        'Improved data and processing reliability through testing, anomaly analysis and API response validation.',
      ],
    },
    stack: 'Java · Spring Boot · SQL · MariaDB · API REST · Git',
  },
  {
    period: '05 — 08.2025',
    org: 'MORISET',
    role: { fr: 'Développeuse full stack, stage', en: 'Full-stack developer, internship' },
    points: {
      fr: [
        'Conception et intégration d’API REST structurant les échanges de données entre frontend, backend et bases de données.',
        'Exploitation de bases relationnelles et requêtes SQL au service des besoins fonctionnels.',
        "Automatisation de processus métier, de l'analyse du besoin à l'intégration.",
      ],
      en: [
        'Designed and integrated REST APIs structuring data exchange between frontend, backend and databases.',
        'Worked with relational databases and wrote SQL queries to meet functional needs.',
        'Automated business processes, from requirements analysis to integration.',
      ],
    },
    stack: 'PostgreSQL · SQL · API REST · Git',
  },
  {
    period: '2021 — 2026',
    org: 'Institut Universitaire Saint Jean, Yaoundé',
    role: {
      fr: 'Diplôme d’ingénieur en informatique, ingénierie logicielle, mention Très Bien',
      en: 'Engineering degree in computer science, software engineering, highest honours',
    },
    points: { fr: [], en: [] },
  },
  {
    period: '01.2027',
    org: 'MBA ESG, Paris',
    role: {
      fr: 'MBA IA for Business, manager de l’innovation numérique (niveau 7), rentrée prévue',
      en: 'MBA in AI for Business, digital innovation management (level 7), starting',
    },
    points: { fr: [], en: [] },
  },
]

export const skills = [
  { group: { fr: 'Data analysis & BI', en: 'Data analysis & BI' }, items: ['Python', 'SQL', 'Pandas', 'NumPy', 'Power BI', 'Excel'] },
  { group: { fr: 'Bases de données', en: 'Databases' }, items: ['PostgreSQL', 'MySQL', 'MariaDB', 'Modélisation relationnelle'] },
  { group: { fr: 'Intelligence artificielle', en: 'Artificial intelligence' }, items: ['Machine learning', 'NLP', 'IA générative'] },
  { group: { fr: 'Business analysis', en: 'Business analysis' }, items: ['Analyse des besoins', 'Analyse fonctionnelle', 'Reporting', 'Documentation', 'Tests fonctionnels', 'Agile'] },
  { group: { fr: 'Développement & outils', en: 'Development & tooling' }, items: ['Java', 'Spring Boot', 'API REST', 'Angular', 'React', 'TypeScript', 'Git', 'Jenkins', 'CI/CD'] },
]

// Ajoute tes projets ici. Le champ repo pointe vers le dépôt GitHub du projet.
export const projects = [
  {
    title: {
      fr: 'Plateforme d’analyse et de contrôle de la qualité des données',
      en: 'Data quality analysis and monitoring platform',
    },
    summary: {
      fr: 'Détection des valeurs manquantes, doublons et incohérences dans des jeux de données publics, calcul d’indicateurs de qualité stockés dans PostgreSQL, et tableau de bord Power BI avec recommandations.',
      en: 'Detects missing values, duplicates and inconsistencies in public datasets, computes quality metrics stored in PostgreSQL, and tracks them in a Power BI dashboard with recommendations.',
    },
    stack: ['Python', 'Pandas', 'SQL', 'PostgreSQL', 'Power BI'],
    // TODO : on mettra le lien quand le dépôt sera publié
    repo: '',
    demo: '',
  },
]
