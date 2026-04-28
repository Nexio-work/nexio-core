# Fonctionnalités Formateurs — Nexio.work

> **Cible** : ESTI, GE-IT, IT University, ISPM, Inclusiv Academy, Nogae Academy
> **Besoin** : Outils d'évaluation automatisés, suivi étudiants, certification en masse

---

## 🎯 Ce que veulent les Formateurs (basé sur recherches)

### ESTI (480 étudiants/an, alternance 15j/15j)
- **Besoin** : Évaluer les étudiants en entreprise à distance
- **Solution Nexio** : Quiz IA générés automatiquement, scores visibles par l'école

### GE-IT (HaiRun, 3 spécialisations)
- **Besoin** : Intégrer leur plateforme IA "Predict" avec Nexio
- **Solution Nexio** : RAG évolutif nourri par les discussions étudiants

### IT University (forums emploi, coaching)
- **Besoin** : Suivi des anciens diplômés (insertion pro)
- **Solution Nexio** : Dashboard formateur → Taux d'insertion post-certification

### ISPM (réseau entreprises, stages)
- **Besoin** : Placer les étudiants en stage selon leurs badges
- **Solution Nexio** : Matching automatique badge → offre de stage

---

## 🏗️ Fonctionnalités B2B2C (Formateurs)

### 1. **Dashboard Formateur** (`/formateur/dashboard`)
```
┌─────────────────────────────────────────────┐
│  ESTI — Dashboard Formateur              │
├─────────────────────────────────────────────┤
│  📊 480 étudiants actifs                │
│  ✅ 320 ont au moins 1 badge             │
│  🎯 Taux de réussite : 78%              │
│  📈 Top badge : Backend (145)            │
├─────────────────────────────────────────────┤
│  📋 Liste étudiants                      │
│  [Nom]     [Badges]  [Score moyen]      │
│  Razafy    3 ✅       85%                │
│  Miora     2 ⚠️       62%                │
│  ...                                       │
└─────────────────────────────────────────────┘
```

### 2. **Bulk Certification** (`/formateur/bulk-certify`)
- **Fonction** : Sélectionner 50 étudiants → Attribuer un badge en 1 clic
- **Critère** : Auto-vérifie si l'étudiant a les quiz scores requis
- **Export** : Générer un PDF avec tous les badges (à donner à l'entreprise)

### 3. **Custom Quiz Builder** (`/formateur/quiz-builder`)
- **Fonction** : Créer des quiz alignés sur le programme (pas juste IA)
- **Options** :
  - Importer depuis Moodle/LMS
  - Générer par IA (Gemma 4) à partir du programme
  - Éditer manuellement (interface type Google Forms)
- **Preview** : Voir le `<QuizCard />` avant publication

### 4. **RAG Management** (`/formateur/rag`)
- **Fonction** : Voir quelles discussions étudiants enrichissent la base
- **Actions** :
  - Valider/Rejeter des extraits de discussions
  - Ajouter du contenu pédagogique (syllabus, cours)
  - Voir les questions fréquentes (FAQ automatique)

### 5. **Analytics & Insertion** (`/formateur/analytics`)
- **KPIs** :
  - Taux de certification (combien ont fini le parcours)
  - Temps moyen par badge (ex: 3 semaines pour Backend)
  - Taux d'insertion (combien de certifiés ont été recrutés)
  - ROI pour l'école (combien d'entreprises recrutent leurs étudiants)

### 6. **Intégration LMS** (`/formateur/integrations`)
- **Suppporté** : Moodle, Canvas, Google Classroom
- **Fonction** : Sync automatique des étudiants inscrits
- **Webhook** : Quand un étudiant valide → Notifier le LMS

---

## 🔌 API Endpoints pour Formateurs

### Nouveaux endpoints dans `apps/api/src/index.ts`
```typescript
// Bulk certification
app.post('/api/formateurs/certify-bulk', async (c) => {
  const { formateur_id, student_ids, badge_name } = await c.req.json()
  // Vérifier que tous ont les scores requis
  // Attribuer le badge à tous
  return c.json({ certified: student_ids.length })
})

// Analytics formateur
app.get('/api/formateurs/:id/analytics', async (c) => {
  const formateur_id = c.req.param('id')
  // Retourner taux certification, insertion, etc.
  return c.json({ certification_rate: 0.78, insertion_rate: 0.65 })
})

// Custom quiz creation
app.post('/api/formateurs/quizzes', async (c) => {
  const { formateur_id, title, questions } = await c.req.json()
  // Stocker en D1
  return c.json({ id: crypto.randomUUID() })
})

// RAG management
app.get('/api/formateurs/:id/rag-sources', async (c) => {
  // Lister les sources dans rag_memory
  return c.json({ sources: [] })
})
```

---

## 🎨 UI Components pour Formateurs

### Nouveaux composants dans `packages/ui/src/`
```
FormateurDashboard.tsx    # Vue d'ensemble étudiants
BulkCertifyModal.tsx     # Modal sélection multiple
QuizBuilder.tsx           # Éditeur de quiz (preview QuizCard)
RAGManager.tsx            # Gestion sources RAG
AnalyticsChart.tsx        # Graphiques (Recharts ou Chart.js)
```

---

## 📊 Exemple de Flow Formateur (ESTI)

```
1. Professeur ESTI se connecte → /formateur/dashboard
2. Voir : "Promotion Soamiray : 120 étudiants, 78% certifiés Backend"
3. Cliquer "Certifier en masse" → Sélectionner 30 étudiants restants
4. Système vérifie : ont-ils 3 quiz > 80% ?
   ✅ Oui → Badges attribués auto
   ❌ Non → Message : "12 étudiants n'ont pas les scores requis"
5. Exporter PDF des 120 certifiés → Envoyer à Telma (entreprise partenaire)
6. Voir analytics : "85% des certifiés ont été recrutés par Telma"
```

---

## 💰 Business Model Formateurs

| Offre | Prix (ARS) | Valeur |
|-------|------------|-------|
| **Starter** (1 promo, 100 étudiants) | **200k/mois** | Certification automatisée |
| **Pro** (5 promos, 500 étudiants) | **750k/mois** | + RAG + Analytics + LMS |
| **Enterprise** (10+ promos, illimité) | **1.5M/mois** | + API white-label + Support dédié |

**Clé** : Les universités achètent pour leurs étudiants, Nexio devient l'outil standard de certification.

---

## 🚀 Intégration avec le reste du système

```
Étudiant (B2C) ← Quiz IA → Badge ← Bulk Certify (Formateur)
                                              ↓
                                    Dashboard B2B (Entreprise voit badges)
                                              ↓
                                    Recrutement objectif (pas de favoritisme)
```

---

## 📝 Prochaines étapes (Implémentation)

### Semaine 3 (après MVP web+chat)
1. **Lundi** : Créer `FormateurDashboard.tsx` + routes API
2. **Mardi** : Bulk certification (sélection multiple + vérification scores)
3. **Mercredi** : Quiz Builder (UI + preview QuizCard)
4. **Jeudi** : RAG Manager (formateur valide les sources)
5. **Vendredi** : Analytics (graphiques + taux insertion)

---

*Document créé le 29 avril 2026 — Combler le manque sur les fonctionnalités formateurs*
