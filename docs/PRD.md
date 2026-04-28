# PRD Nexio.work

## Vision
Nexio.work — La next gen du travail à Madagascar. Révolutionner l'employabilité des jeunes via une plateforme SaaS pilotée par l'IA.

## Problème
- Fossé entre formations universitaires (ISPM, IST, ITUU) et marché
- Manque d'expérience pratique
- Méritocratie affaiblie par la corruption

## Solution
IA Mentor + Certificateur Objectif en mode multi-tenant auto-hébergé.

## Modules

### B2C (Étudiants)
- Orientation (test filière Design vs Backend)
- Micro-travail commission-free (Atomic Design, tickets Jira)
- Certification par Badge (quiz IA)

### B2B (Entreprises)
- Dashboard gestion seats
- Accès talents certifiés
- Évaluations objectives

## Architecture
- **Frontend** : Remix + Cloudflare Pages
- **Backend** : Cloudflare Workers + D1 + KV + R2
- **IA** : GoClaw (VPS Hetzner) + RAG + RBAC
- **Edge** : Gemma (PWA WebGPU offline)

## Personas (Recherche UX)
- **Étudiants ISPM/IST/ITUU** : Besoin d'expérience pratique, orientés vers la certification
- **Entreprises recruteuses** : Besoin de talents certifiés, pragmatiques, ROI-oriented
- **Formateurs indépendants** : Évaluation objective via badges IA

## Business Model
- Gratuit pour talents
- Payant B2B (seats)
