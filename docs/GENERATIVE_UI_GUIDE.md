# Generative UI - Nexio.work

## Stack
- **UI Générative** : Composants React générés par l'IA (type Vercel AI SDK pattern)
- **Modèle** : Gemma 4 (4B IT) - local via WebGPU
- **Runtime** : transformers.js v3 (HuggingFace)
- **Backend** : Browser uniquement (PWA offline-ready)

## Pourquoi Gemma 4 + transformers.js ?
- **WebGPU** : Accélération GPU directe dans le navigateur
- **Quantifié (q4f16)** : ~2.5GB, charge en <10s sur fibre
- **Offline** : Aucune donnée vers le serveur, 100% RGPD/Madagascar
- **Gratuit** : Pas de coût API (contrairement à OpenAI/Claude)

## Architecture Generative UI

### 1. Chat Streaming (déjà dans `/chat`)
L'IA génère du texte token par token.

### 2. UI Components (à venir)
L'IA peut générer des composants React complets :

```tsx
// L'IA génère ce genre de réponse structurée :
{
  "type": "quiz",
  "component": "QuizCard",
  "props": {
    "question": "Quelle est la sortie de ce code ?",
    "options": ["A", "B", "C"],
    "correct": 1
  }
}
```

### 3. Schéma de rendu
```
User Input → Gemma 4 (WebGPU) → JSON UI → React Renderer → UI Générée
```

## Prochaines étapes
1. ✅ Chat streaming de base
2. ⬜ Parser les réponses Gemma pour détecter les "intents" (quiz, code, orientation)
3. ⬜ Créer une librairie de composants génériques (`QuizCard`, `CodeEditor`, `BadgeViewer`)
4. ⬜ Wire : Gemma génère JSON → React rend le composant

## Personas & Tonalité
- **Étudiants** : Transparent, encourageant, axé montée en compétences
- **Entreprises** : Pragmatique, ROI, fiabilité des talents certifiés

## Commandes utiles
```bash
# Tester WebGPU dans Chrome
# chrome://gpu -> chercher "WebGPU: Enabled"

# Taille modèle (~2.5GB first load, cached après)
# DevTools > Application > Cache Storage
```
