# PRD Nexio.work — Next Gen du Travail à Madagascar

> **Version** : 0.2.0 (29 avril 2026)  
> **Auteur** : Fenohery Fanomezanirina (Fefe) — CEO FATAPLUS  
> **Contexte** : Idéation post-douche + Recherches approfondies (ISPM, ESTI, Sayna, PortalJob, Midday AI)

---

## 🌍 Vision (Pourquoi Nexio.work ?)

Madagascar a **18,6 millions de jeunes** (< 30 ans, RGPH3 2024). Pourtant :
- **Fossé école-marché** : ISPM/IST/ITUU forment des théoriciens, pas des praticiens
- **Corruption** : La méritocratie est affaiblie, les candidats ne sont pas évalués objectivement
- **Fuite des cerveaux** : ~10% des 600 techniciens formés/an partent à Maurice ou en France (Passeport Talent)

**Nexio.work révolutionne l'employabilité par l'IA locale (Gemma 4 WebGPU)** :
- ✅ **0€ de coût IA** (pas d'API cloud)
- ✅ **100% offline** (fonctionne même avec connexion instable)
- ✅ **RGPD-friendly** (données ne quittent pas le navigateur)
- ✅ **Certification objective** (quiz IA, pas de favoritisme)

---

## 👥 Personas (Basés sur nos recherches)

### 1. Étudiant ISPM/IST/ITUU (B2C)
- **Profil** : 20-25 ans, Bac+2/3, peu d'expérience pratique
- **Besoin** : Orientation métier (Design vs Backend), certification reconnue, micro-travail pour financer ses études
- **Pain point** : "J'ai mon diplôme mais je ne sais pas coder en vrai"
- **Solution Nexio** : Mentor IA Gemma 4 → Quiz → Badge certifié → Missions Atomic Design

### 2. Entreprise Recruteuse (B2B)
- **Profil** : Telma, Intelcia, Konecta, Concentrix, PME locales
- **Besoin** : Talents prêts au jour 1, évaluation objective, ROI recrutement
- **Pain point** : "On reçoit 150 CV mais on ne sait pas qui sait vraiment coder"
- **Solution Nexio** : Dashboard seats → Accès talents certifiés → Voir quiz scores + badges

### 3. Formateur Indépendant / Université (B2B2C)
- **Profil** : ESTI, GE-IT, IT University, Inclusiv Academy
- **Besoin** : Outils d'évaluation automatisés, suivi des étudiants
- **Solution Nexio** : RAG évolutif s'enrichit avec les discussions

---

## 🎯 Objectifs (MVP en 2 semaines)

### B2C (Étudiants) — **Gratuit**
1. **Orientation en 3 min** : "Je suis en 2ème année ISPM, aide-moi à choisir entre Design et Backend"
2. **Quiz IA** : Gemma 4 génère des quiz personnalisés → `QuizCard` React
3. **Certification par Badge** : 3 quiz réussis = Badge vérifié (vérifié par l'IA)
4. **Micro-travail** : Missions Atomic Design (tickets Jira prêts) commission-free

### B2B (Entreprises) — **Payant (500k-2M AR/mois)**
1. **Dashboard gestion seats** : Acheter 5/10/50 seats, inviter des talents
2. **Accès talents certifiés** : Recherche par badge (Backend, Frontend, Design)
3. **Évaluations objectives** : Voir les scores de quiz, pas juste un CV
4. **Webhook GoClaw** : Réception automatique des évaluations/badges

### B2B2C (Universités) — **Partenariat (Prix sur demande)**
1. **Intégration RAG** : Discussions étudiants enrichissent la base de connaissances
2. **Bulk certification** : Certifier 100+ étudiants en une fois
3. **Suivi d'insertion** : Qui a été recruté après certification Nexio ?

---

## 🏗️ Architecture Technique (Inspirée Midday AI, simplifiée)

### Monorepo Structure
```
nexio-core/
├── apps/
│   ├── web/          # Remix + Cloudflare Pages (Frontend)
│   ├── api/          # Hono + Cloudflare Workers (Backend)
│   └── docs/         # Site vitrine (à venir)
├── packages/
│   ├── ui/           # Composants React (QuizCard, CodeEditor, BadgeViewer)
│   ├── shared/       # Utilitaires (parseIntent, helpers)
│   └── config/       # ESLint, TS, Tailwind configs
├── docs/             # PRD, guides, SEO/SEA strategy
├── ideation/         # Brainstorms, roadmap, PRD affiné
├── research/          # Études marché (Madagascar, Midday AI, concurrents)
└── infra/
    └── cloudflare/   # Workers, D1, KV, R2 configs
```

### Stack Technique
| Couche | Technologie | Pourquoi ? |
|--------|-------------|---------|
| **Frontend** | Remix + Cloudflare Pages | Edge-ready, pas de server Node |
| **UI** | Tailwind + Radix (ou Shadcn) | Design system léger |
| **Backend** | Hono + Cloudflare Workers | Ultra-rapide, serverless |
| **Database** | Cloudflare D1 (SQLite) | Serverless, pas de serveur à gérer |
| **ORM** | Drizzle ORM | Type-safe, compatible D1 |
| **IA Edge** | Gemma 4 (4B IT) + transformers.js v3 | 100% local, WebGPU, 0€ |
| **IA Cloud** | GoClaw (Hetzner) + RAG | Enrichissement contexte discussions |
| **Vector** | Cloudflare Vectorize | Recherche sémantique RAG |
| **Auth** | Cloudflare Access (ou simple JWT) | MVP = simple user/company |
| **Payments** | Stripe ou Polar | Abonnements B2B |
| **CI/CD** | GitHub Actions | Standard |
| **Hébergement** | Cloudflare (tout-en-un) | Simplification |

---

## 🚀 Fonctionnalités Détaillées

### 1. Chat IA Mentor (Gemma 4 WebGPU) ✅ Déjà fait
- **URL** : `/chat`
- **Fonction** : Chat streaming, Gemma 4 génère du texte token par token
- **Prochain** : Parser les réponses pour détecter les intents (quiz, code, orientation)
- **Prompt système** : `SYSTEM_PROMPT` dans `packages/ui/src/intent-parser.ts`

### 2. Generative UI (IA génère des composants React) ⬜ À faire
- **Flow** : Gemma génère `{type: "quiz", question: "...", options: [...]}` → React rend `<QuizCard />`
- **Composants** :
  - `QuizCard` ✅ Créé dans `packages/ui/src/QuizCard.tsx`
  - `CodeEditor` ⬜ À créer
  - `BadgeViewer` ⬜ À créer
- **Avantage unique** : Aucun concurrent ne fait ça à Madagascar

### 3. Certification par Badges ⬜ À faire
- **Flow** : 3 quiz réussis → Badge vérifié → Stocké en D1
- **API** : `POST /api/badges` (déjà dans `apps/api/src/index.ts`)
- **Types de badges** : Backend, Frontend, Design, Atomic Design, Jira-ready

### 4. Micro-travail (Contra-like) ⬜ Roadmap
- **Principe** : Talents certifiés → Missions Atomic Design (tickets Jira)
- **Commission** : 0% (modèle Sayna inverse : eux prennent une commission)
- **Paiement** : Mobile Money (Mvola, Orange Money) ou virement

### 5. Dashboard B2B ⬜ À affiner
- **URL** : `/dashboard` ✅ Déjà fait (basique)
- **Améliorations** :
  - Filtre par badges (Backend, Frontend, etc.)
  - Vue détaillée talent (scores quiz, historique badges)
  - Invitation talents par email (Resend/Brevo)

---

## 🎨 UX Writing (Tonalité)

### Pour les Jeunes (B2C)
- **Tonalité** : Transparent, encourageant, axé montée en compétences
- **Exemple** : *"Tu as fini 3 quiz backend, veux-tu ta certification ?"*

### Pour les Entreprises (B2B)
- **Tonalité** : Pragmatique, ROI, fiabilité des talents certifiés
- **Exemple** : *"12 talents certifiés Backend disponibles, scores moyens : 85%"*

---

## 📊 Business Model (Simplifié)

| Cible | Offre | Prix (ARS) | Valeur |
|-------|-------|------------|-------|
| **B2C Étudiants** | IA Mentor + Certification | **Gratuit** | Gain : Volume de talents certifiés |
| **B2B PME** | 5 seats + accès talents | **500k/mois** | Gain : Recrutement objectif |
| **B2B Grandes** | 50 seats + intégration API | **2M/mois** | Gain : ROI recrutement |
| **B2B2C Universités** | Intégration RAG + bulk certif | **Sur devis** | Gain : Suivi étudiants |

**Clé de succès** : Les étudiants amènent le volume (gratuit), les entreprises paient pour accéder aux talents certifiés.

---

## 🏆 Différenciation (Contre les Concurrents)

### Vs **Sayna.io** (le plus dangereux)
| Leur force | Notre réponse |
|-----------|----------------|
| 19 pays, gros financement | Focus Madagascar, pragmatisme |
| Gamification (6 niveaux) | IA Mentor personnalisé (Gemma 4) |
| Missions réelles payées | Micro-travail Atomic Design (Jira-ready) |
| Cloud dépendant | **Edge AI 100% offline (WebGPU)** |

**Notre angle** : *"Sayna est une école gamifiée. Nexio.work est un mentor IA qui vit dans ton navigateur, 100% offline."*

### Vs **PortalJob / MadaJOB**
| Leur force | Notre réponse |
|-----------|----------------|
| Gratuité totale | IA Mentor gratuit (Gemma 4 local) |
| 150 offres/jour | Talents certifiés IA (pas de triage de 150 CV) |

**Notre angle** : *"PortalJob c'est du papier. Nexio.work c'est de la compétence vérifiée par l'IA."*

### Vs **ESTI / GE-IT** (universités)
| Leur force | Notre réponse |
|-----------|----------------|
| Diplôme d'État | Certification IA reconnue par entreprises partenaires |
| Alternance 15j/15j | Apprentissage à ton rythme, 100% online |

**Notre angle** : *"L'université c'est 3 ans. Nexio.work c'est 3 mois de montée en compétence + certification IA."*

---

## 🚧 Roadmap (MVP en 2 semaines)

### Semaine 1 : Backend Minimal + Pages SEO
- **Lundi** : Nettoyer l'API (juste `/api/companies` + `/api/talents/certified`)
- **Mardi** : Créer pages statiques (`/`, `/for-students`, `/for-companies`)
- **Mercredi** : SEO (meta tags, structured data, sitemap)
- **Jeudi** : Test recrutement B2B (simuler 5 entreprises avec seats)
- **Vendredi** : Déploiement sur Cloudflare

### Semaine 2 : Generative UI + Quiz IA
- **Lundi** : Parser les réponses Gemma (Intent Parser ✅ déjà créé)
- **Mardi** : Créer `CodeEditor` + `BadgeViewer` components
- **Mercredi** : Wire : Gemma génère JSON → React rend le composant
- **Jeudi** : Test avec vrais étudiants ISPM/IT University
- **Vendredi** : Documentation + préparation levée de fonds

---

## 📈 KPIs (Comment mesurer le succès ?)

### B2C (Étudiants)
- Nombre de quiz complétés
- Nombre de badges délivrés
- Temps moyen pour obtenir une certification (objectif : < 1 mois)

### B2B (Entreprises)
- Nombre de seats achetés
- Taux de conversion (talents certifiés → recrutés)
- ROI recrutement (coût Nexio vs coût recrutement traditionnel)

### Technique
- Temps de chargement Gemma 4 (< 10s sur fibre)
- Disponibilité (uptime) du Chat IA
- Précision du parser d'intents (> 90%)

---

## 🔬 Risques & Mitigations

| Risque | Mitigation |
|--------|------------|
| **Gemma 4 trop lent sur vieux GPU** | Fallback vers GoClaw (cloud) si WebGPU indisponible |
| **Étudiants peu familiarisés avec IA** | Onboarding en 3 clics, vidéo de démonstration |
| **Universités résistantes au changement** | Partenariat avec ESTI (déjà ouvert à l'innovation) |
| **Sayna réagit agressivement** | Focus Madagascar (pas 19 pays), qualité > quantité |

---

## 📚 Références

- **Recherche Madagascar** : `research/ecosysteme-employabilite-madagascar-2026.md`
- **Midday AI Reference** : `research/midday-ai-reference-2026.md`
- **Analyse Concurrentielle** : `docs/COMPETITIVE_ANALYSIS.md`
- **SEO/SEA Strategy** : `docs/SEO_SEA_STRATEGY.md`
- **Generative UI Guide** : `docs/GENERATIVE_UI_GUIDE.md`
- **RAG Setup** : `docs/RAG_SETUP.md`

---

*PRD affiné le 29 avril 2026 — Idéation douche + Recherches approfondies*
