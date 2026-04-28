// Intent Parser - Détecte les intentions dans les réponses Gemma 4
// Nexio.work - Next Gen du travail à Madagascar

export type IntentType = 'quiz' | 'code' | 'orientation' | 'text'

export interface Intent {
  type: IntentType
  data?: any
  raw: string
}

/**
 * Parse une réponse de Gemma pour détecter les intents structurés
 * Format attendu de Gemma : {"type":"quiz","question":"...","options":[...]}
 */
export function parseIntent(response: string): Intent {
  // 1. Essayer de parser du JSON direct
  try {
    const json = JSON.parse(response.trim())
    if (json.type && ['quiz', 'code', 'orientation'].includes(json.type)) {
      return { type: json.type, data: json, raw: response }
    }
  } catch {
    // Pas du JSON, continuer vers regex
  }

  // 2. Détection par mots-clés (fallback)
  const lower = response.toLowerCase()
  
  if (lower.includes('question') && (lower.includes('option') || lower.includes('choix'))) {
    return { type: 'quiz', raw: response }
  }
  
  if (lower.includes('code') || lower.includes('function') || lower.includes('const ') || lower.includes('def ')) {
    return { type: 'code', raw: response }
  }
  
  if (lower.includes('orientation') || lower.includes('filière') || lower.includes('choisir')) {
    return { type: 'orientation', raw: response }
  }

  return { type: 'text', raw: response }
}

/**
 * Génère une réponse structurée pour Gemma
 * À utiliser dans le prompt système
 */
export const SYSTEM_PROMPT = `Tu es le Mentor IA de Nexio.work, spécialisé pour les jeunes à Madagascar.
Quand tu proposes un quiz, réponds au format JSON :
{"type":"quiz","question":"...","options":["A","B","C"],"correct":0}

Quand tu donnes du code, utilise le format :
{"type":"code","language":"javascript","code":"..."}

Pour l'orientation, reste en texte naturel.`
