# Guide RAG Évolutif Nexio.work

## Architecture
- **Stockage** : D1 (rag_memory table) + vecteurs via Cloudflare Workers
- **Modèle** : GoClaw (auto-hébergé Hetzner) avec embeddings légers
- **Enrichissement** : Discussions utilisateurs → nettoyage → indexation

## Flux RAG
1. Étudiant pose question → API `/api/ask`
2. Recherche dans `rag_memory` (similarité cosinus)
3. GoClaw génère réponse avec contexte
4. Nouvelle interaction stockée périodiquement

## Enrichissement basé sur personas
- Discussions étudiants → orientation, quiz, certification
- Feedback entreprises → ajustement critères de certification

## Configuration GoClaw
```bash
# Sur VPS Hetzner
git clone https://github.com/go-claw/go-claw.git
cd go-claw && docker-compose up -d
# API disponible sur : http://144.91.96.120:8080
```

## Cloudflare Worker (RAG Endpoint)
```ts
app.post('/api/ask', async (c) => {
  const { question, user_id } = await c.req.json()
  // 1. Récupérer contexte depuis D1
  const ctx = await c.env.DB.prepare(
    'SELECT content FROM rag_memory WHERE user_id = ? ORDER BY created_at DESC LIMIT 5'
  ).bind(user_id).all()
  // 2. Appeler GoClaw
  const resp = await fetch('http://144.91.96.120:8080/api/generate', {
    method: 'POST',
    body: JSON.stringify({ prompt: question, context: ctx.results })
  })
  return c.json(await resp.json())
})
```
