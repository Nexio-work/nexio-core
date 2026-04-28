-- D1 Schema pour Fata Plus Core

CREATE TABLE IF NOT EXISTS companies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  seats INTEGER NOT NULL DEFAULT 0,
  used_seats INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  university TEXT,
  role TEXT DEFAULT 'student',
  created_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS badges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  badge_name TEXT NOT NULL,
  score REAL,
  verified INTEGER DEFAULT 0,
  issued_at INTEGER DEFAULT (unixepoch()),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS seats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  assigned_at INTEGER DEFAULT (unixepoch()),
  FOREIGN KEY (company_id) REFERENCES companies(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS rag_memory (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT,
  content TEXT NOT NULL,
  embedding BLOB,
  created_at INTEGER DEFAULT (unixepoch())
);
