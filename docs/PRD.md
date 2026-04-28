# PRD Nexio.work (Officiel)

> **Vision** : Next Gen du travail à Madagascar — Mentor IA local (Gemma 4 WebGPU) pour révolutionner l'employabilité.

---

## 🌍 Contexte Madagascar (Basé sur recherches 2026)

- **18,6M jeunes** < 30 ans (RGPH3 2024)
- **600 techniciens formés/an** (ISPM, IT University, ENI) → 10% partent à l'étranger
- **Déficit IT** : Telma, Intelcia, Konecta, Concentrix manquent de profils qualifiés
- **Programmes étatiques** : D-CLIC (1000 jeunes/2026), Asan'Ai (1300 jeunes/15 mois)

### Concurrents Identifiés
| Concurrent | Modèle | Faiblesse | Notre avantage |
|-----------|--------|------------|------------------|
| **Sayna.io** | EdTech 19 pays, gamifié | Cloud, pas offline | ✅ Edge AI (WebGPU), 0€ |
| **PortalJob** | Portail emploi gratuit | Pas de certification IA | ✅ Badges IA objectifs |
| **ESTI/GE-IT** | Écoles en alternance | 3 ans, présentiel | ✅ 3 mois, 100% online |
| **MadaJOB** | Cabinet recrutement | 150 CV à trier | ✅ Talents déjà certifiés |

---

## 👥 Personas (Recherche UX)

### B2C — Étudiant ISPM/IST/ITUU
- **Besoin** : Orientation (Design vs Backend) + Certification + Micro-travail
- **Pain** : "J'ai mon diplôme mais je ne sais pas coder en vrai"
- **Solution** : Mentor IA → Quiz → Badge → Missions Atomic Design

### B2B — Entreprises (Telma, Intelcia, etc.)
- **Besoin** : Talents prêts au jour 1, évaluation objective
- **Pain** : "150 CV mais qui sait vraiment coder ?"
- **Solution** : Dashboard seats → Accès talents certifiés → Scores quiz

### B2B2C — Universités (ESTI, IT University)
- **Besoin** : Outils évaluation automatisés, suivi étudiants
- **Solution** : RAG évolutif + Bulk certification

---

## 🚀 Fonctionnalités MVP (2 semaines)

### 1. Chat IA Mentor (✅ Déjà fait)
- **URL** : `/chat`
- **Tech** : Gemma 4 (4B IT) + transformers.js v3 + WebGPU
- **Prompt système** : `SYSTEM_PROMPT` (packages/ui/src/intent-parser.ts)

### 2. Intent Parser + Generative UI (⚡ En cours)
- **Parser** : `parseIntent()` → détecte quiz/code/orientation
- **Composants** :
  - `QuizCard` ✅ (packages/ui/src/QuizCard.tsx)
  - `CodeEditor` ⚡ À créer
  - `BadgeViewer` ⚡ À créer
- **Flow** : Gemma génère `{type:"quiz",...}` → React rend `<QuizCard />`

### 3. Certification par Badges (⚡ À faire)
- **API** : `POST /api/badges` (déjà dans apps/api/src/index.ts)
- **Règle** : 3 quiz réussis = Badge vérifié
- **Stockage** : D1 (rag_memory table)

### 4. Dashboard B2B (✅ Déjà fait, à affiner)
- **URL** : `/dashboard`
- **Fonction** : Gestion seats, vue talents certifiés
- **Améliorations** : Filtres par badges, détail talent

### 5. Pages SEO (⚡ À faire)
- `/` — Landing (recrutement IT Madagascar)
- `/for-students` — Orientation + certification
- `/for-companies` — Dashboard B2B, talents certifiés
- `/simulation-entretien` — Outil IA (lead magnet)

---

## 🏗️ Architecture Technique (Midday AI inspire)

```
nexio-core/
├── apps/
│   ├── web/      # Remix + Cloudflare Pages
│   ├── api/       # Hono + Cloudflare Workers
│   └── docs/     # Site vitrine (à venir)
├── packages/
│   ├── ui/       # QuizCard, CodeEditor, BadgeViewer
│   ├── shared/   # Intent parser, helpers
│   └── config/   # ESLint, TS, Tailwind
├── docs/          # PRD, guides, SEO/SEA
├── ideation/      # PRD affiné, brainstorms
├── research/      # Madagascar ecosystem, Midday ref
└── infra/         # Cloudflare (D1, KV, R2)
```

| Couche | Technologie |
|--------|------------|
| Frontend | Remix + Cloudflare Pages |
| Backend | Hono + Cloudflare Workers |
| UI | Tailwind + Radix/Shadcn |
| Database | Cloudflare D1 (SQLite) + Drizzle ORM |
| IA Edge | Gemma 4 (WebGPU) + transformers.js |
| IA Cloud | GoClaw (Hetzner) + RAG |
| Vector | Cloudflare Vectorize |
| Payments | Stripe/Polar |
| CI/CD | GitHub Actions |

---

## 💰 Business Model

| Cible | Offre | Prix (ARS) |
|-------|-------|------------|
| **B2C Étudiants** | Mentor IA + Certification | **Gratuit** |
| **B2B PME** | 5 seats + accès talents | **500k/mois** |
| **B2B Grandes** | 50 seats + API | **2M/mois** |
| **B2B2C Universités** | RAG + bulk certif | **Sur devis** |

**Clé** : Les étudiants amènent le volume (gratuit), les entreprises paient.

---

## 📈 KPIs

### B2C
- Nombre quiz complétés
- Nombre badges délivrés
- Temps moyen certification (< 1 mois)

### B2B
- Nombre seats achetés
- Taux conversion (certifié → recruté)
- ROI recrutement

---

## 🔬 Risques & Mitigations

| Risque | Mitigation |
|-------|------------|
| Gemma 4 lent sur vieux GPU | Fallback GoClaw (cloud) |
| Étudiants peu familiers IA | Onboarding 3 clics + vidéo |
| Résistance universités | Partenariat ESTI (déjà ouvert) |
| Sayna réagit | Focus Madagascar (pas 19 pays) |

---

## 📚 Références

- **Recherche écosystème** : `research/ecosysteme-employabilite-madagascar-2026.md`
- **Référence Midday AI** : `research/midday-ai-reference-2026.md`
- **Analyse concurrentielle** : `docs/COMPETITIVE_ANALYSIS.md`
- **PRD détaillé (idéation douche)** : `ideation/PRD_NEXIO_WORK.md`
- **Generative UI Guide** : `docs/GENERATIVE_UI_GUIDE.md`
- **RAG Setup** : `docs/RAG_SETUP.md`
- **SEO/SEA Strategy** : `docs/SEO_SEA_STRATEGY.md`

---

*Version 0.2.0 — 29 avril 2026 — Basé sur recherches + idéation post-douche*
