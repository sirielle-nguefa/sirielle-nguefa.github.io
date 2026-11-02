# Portfolio — Sirielle Nguefa

Site personnel bilingue (FR/EN) avec une scène 3D interactive : au défilement, un nuage de points aléatoires se regroupe en quatre clusters, à la manière d'un algorithme de clustering.

**Stack** : React 19, Vite, Three.js via React Three Fiber (shaders GLSL sur mesure), Lenis pour le défilement fluide.

## Lancer en local

```bash
npm install
npm run dev
```

## Modifier le contenu

Tout le texte, le parcours, les compétences et les projets sont dans **`src/content.js`**. Les composants n'ont pas besoin d'être touchés.

Pour ajouter un projet, ajoute un objet au tableau `projects` (un exemple commenté est dans le fichier). Tant que le tableau est vide, la section affiche un message renvoyant vers GitHub.

## Mise en ligne sur GitHub Pages

1. Crée un dépôt nommé **`<ton-pseudo>.github.io`** et pousse ce dossier sur la branche `main`.
2. Dans le dépôt : **Settings → Pages → Source : GitHub Actions**.
3. Chaque push sur `main` relance le build et le déploiement (`.github/workflows/deploy.yml`).

Le site sera visible sur `https://<ton-pseudo>.github.io`.

## Accessibilité et performance

- Animation désactivée si l'utilisateur a choisi « réduire les animations » (état final des clusters affiché directement).
- Pas de WebGL disponible : le site reste complet, sans la scène.
- La scène 3D est chargée en différé pour que le texte s'affiche immédiatement.
- Thème clair ou sombre selon le réglage du système.
