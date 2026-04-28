import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  DB: D1Database
  SESSIONS: KVNamespace
  PORTFOLIOS: R2Bucket
  GOCLAW_API: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', cors())

// B2B Dashboard - Liste entreprises (seats)
app.get('/api/companies', async (c) => {
  const { results } = await c.env.DB.prepare(
    'SELECT id, name, seats, created_at FROM companies LIMIT 50'
  ).all()
  return c.json(results)
})

// B2B - Créer une entreprise avec seats
app.post('/api/companies', async (c) => {
  const { name, seats } = await c.req.json()
  const id = crypto.randomUUID()
  await c.env.DB.prepare(
    'INSERT INTO companies (id, name, seats, used_seats) VALUES (?, ?, ?, 0)'
  ).bind(id, name, seats).run()
  return c.json({ id, name, seats })
})

// Talents certifiés (pour B2B)
app.get('/api/talents/certified', async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT u.id, u.name, u.university, GROUP_CONCAT(b.badge_name) as badges
     FROM users u
     JOIN badges b ON u.id = b.user_id
     WHERE b.verified = 1
     GROUP BY u.id
     LIMIT 50`
  ).all()
  return c.json(results)
})

// Webhook GoClaw - réception évaluation
app.post('/webhook/goclaw', async (c) => {
  const payload = await c.req.json()
  // Stocker résultat évaluation/badge
  await c.env.DB.prepare(
    'INSERT INTO badges (user_id, badge_name, score, verified) VALUES (?, ?, ?, 1)'
  ).bind(payload.user_id, payload.badge, payload.score).run()
  return c.json({ ok: true })
})

export default app
