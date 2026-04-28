# Midday AI - Open-Source SaaS Reference for Nexio.work

Analyse de la structure et du stack technique de Midday AI (14.1k stars, AGPL-3.0) pour inspirer l'architecture de Nexio.work.

---

## 📂 Structure du Monorepo Midday

### Arborescence (extraite de GitHub)
```
midday/
├── apps/
│   ├── api/          # API (NestJS ou Next.js API routes)
│   ├── dashboard/    # Dashboard Next.js (Frontend principal)
│   ├── website/      # Site vitrine (Next.js, Vercel)
│   ├── worker/       # Background jobs (Trigger.dev?)
│   └── mobile/      # Expo/React Native (mobile client)
├── packages/
│   ├── ui/           # Shared UI components (Shadcn + Tailwind)
│   ├── utils/        # Utilitaires partagés
│   ├── db/           # Prisma client + migrations
│   └── contracts/    # DTO schemas (partagés API ↔ Frontend)
├── infra/
│   ├── compose/      # Docker Compose stacks (dev + GPU)
│   ├── docker/       # Dockerfiles (CPU/GPU inference)
│   └── terraform/    # IaC (cloud deployment)
└── docs/             # Documentation (README, guides)
```

### Stack Technique Midday
| Couche | Technologie | Usage |
|--------|-------------|------|
| **Runtime** | Bun | Remplace Node.js (plus rapide) |
| **Frontend** | Next.js 14 (App Router) | Dashboard + Website |
| **Mobile** | Expo/React Native | Client mobile |
| **UI** | Shadcn + TailwindCSS | Design system cohérent |
| **Backend** | NestJS (API) ou Next.js API | Business logic multi-tenant |
| **Database** | Supabase (PostgreSQL) | Auth, Storage, Realtime |
| **ORM** | Prisma | Type-safe DB access |
| **Background** | Trigger.dev | Jobs planifiés (indexing, evals) |
| **Email** | Resend | Transactional & marketing emails |
| **Payments** | Polar | Traitement paiements |
| **Search** | Typesense | Recherche rapide |
| **Analytics** | OpenPanel | Événements & tracking |
| **IA** | Gemini + OpenAI | Assistant financier |
| **CI/CD** | GitHub Actions | Automatisation |
| **Hébergement** | Railway (API) + Vercel (Web) + Cloudflare (CDN) | Déploiement |

---

## 🎯 Adaptations pour Nexio.work

### 1. Structure Proposée (Inspirée Midday)
```
nexio-work/
├── apps/
│   ├── web/          # Remix + Cloudflare Pages (frontend principal)
│   ├── api/          # Cloudflare Workers + Hono (backend)
│   ├── docs/         # Site documentation (Docusaurus? ou Remix)
│   └── mobile/       # Expo (optionnel, plus tard)
├── packages/
│   ├── ui/           # 🆕 Composants React (QuizCard, CodeEditor, BadgeViewer)
│   ├── shared/       # Utilitaires partagés (parseIntent, helpers)
│   ├── config/       # Configs ESLint, TS, Tailwind
│   └── contracts/    # Schémas DTO (partagés API ↔ Web)
├── docs/             # 📚 Documentation produit (PRD, guides, SEO)
├── research/          # 🔬 Recherches (écosystème Madagascar, concurrents, Midday ref)
├── infra/
│   ├── cloudflare/  # Cloudflare Workers, D1, KV, R2 configs
│   ├── docker/       # Dockerfiles (GoClaw, local dev)
│   └── terraform/   # IaC (Hetzner, scalable infra)
├── ideation/         # 💡 Idées, brainstorms, roadmap, features à venir
└── scripts/          # Outils CLI, migrations, seeds
```

### 2. Stack Technique Aligné
| Couche | Midday AI | Nexio.work (notre choix) | Why |
|--------|-----------|-------------------------|-----|
| **Monorepo** | Bun workspaces | pnpm workspaces | Standard, compatible Remix |
| **Frontend** | Next.js 14 | Remix + Cloudflare Pages | Edge-ready, pas de server Node |
| **UI** | Shadcn + Tailwind | Tailwind + Radix (ou Shadcn) | Design system léger |
| **Backend** | NestJS | Hono + Cloudflare Workers | Ultra-rapide, edge computing |
| **Database** | Supabase (PostgreSQL) | Cloudflare D1 + KV | Serverless, pas de serveur à gérer |
| **ORM** | Prisma | Drizzle ORM (pour D1) | Type-safe, compatible Cloudflare |
| **IA** | Gemini + OpenAI | Gemma 4 (WebGPU local) + GoClaw | 0€ coût, offline, RGPD |
| **Search** | Typesense | Cloudflare Vectorize (RAG) | Natif Cloudflare |
| **Email** | Resend | Resend ou Brevo | Transactional emails |
| **Payments** | Polar | Stripe ou Polar | Abonnements B2B |
| **Analytics** | OpenPanel | Simple Analytics ou Plausible | Privacy-friendly |
| **CI/CD** | GitHub Actions | GitHub Actions | Standard |
| **Hébergement** | Railway + Vercel + Cloudflare | Cloudflare (tout-en-un) | Simplification, pas de serveurs multiples |

---

## 🚀 Ce qu'on peut Copier de Midday

### 1. **Organisation des Apps**
- Séparer `web` (frontend) et `api` (backend) → ✅ Déjà fait
- Ajouter `docs` (site vitrine) → 🔜 À faire (`/for-students`, `/for-companies`)
- Mobile plus tard (Expo) → 🔜 Roadmap

### 2. **Packages Partagés**
- `ui/` pour les composants génériques → ✅ Déjà créé (`packages/ui/`)
- `contracts/` pour les schémas API → 🔜 À faire (Zod ou TypeScript interfaces)
- `shared/` pour les utilitaires → ✅ Déjà là (`packages/shared/`)

### 3. **Infra as Code**
- Utiliser Cloudflare nativement → ✅ Déjà (`infra/cloudflare.toml`)
- Ajouter Docker pour GoClaw local → 🔜 À faire
- Terraform pour Hetzner (GoClaw) → 🔜 Plus tard

### 4. **CI/CD & Quality**
- GitHub Actions pour tests/lint/deploy → 🔜 À faire
- Boucles d'évaluation (evals) pour l'IA → 🔜 Réutiliser leur pattern

---

## 📉 Différences Stratégiques

| | **Midday AI** | **Nexio.work** |
|--|----------------|----------------|
| **Cible** | Freelancers (US/EU) | Jeunes Madagascar (B2C) + Entreprises (B2B) |
| **Focus** | Facturation, temps, finances | Employabilité, certification IA, micro-travail |
| **IA** | Assistant financier (Gemini) | Mentor IA local (Gemma 4 WebGPU) |
| **Business Model** | SaaS payant | Freemium (B2C gratuit, B2B payant) |
| **Edge** | Cloud (Vercel/Cloudflare) | Edge + Offline (PWA WebGPU) |
| **Localisation** | Global | 🇲🇬 Madagascar (focus local d'abord) |

---

## 💡 Idées Récupérées de Midday

1. **Dashboard unifié** : Tout en un (Midday = facturation + temps + fichiers) → Nexio = orientation + quiz + badges + micro-travail
2. **Assistant IA intégré** : Midday a un assistant financier → Nexio a un Mentor IA (Gemma 4)
3. **Magic Inbox** : Midday matche factures/reçus → Nexio matche quiz/badges avec profils entreprises
4. **Export facile** : Midday exporte en CSV → Nexio exporte profils certifiés en PDF (pour entreprises)

---

## 🚧 Prochaines Étapes Structurelles

1. **Créer le dossier `ideation/`** pour brainstorms et roadmap
2. **Ajouter `contracts/` dans packages** (Zod schemas pour API)
3. **Setup Drizzle ORM** pour D1 (remplace Prisma de Midday)
4. **Créer site vitrine** (`apps/docs` ou pages dans `apps/web`)
5. **GitHub Actions** pour lint/test/deploy automatique

---

*Référence créée le 29 avril 2026 pour aligner Nexio.work sur les best-practices des SaaS open-source à succès.*
