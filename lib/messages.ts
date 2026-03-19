import { neon } from "@neondatabase/serverless";

export interface Message {
  id: number;
  name: string;
  company: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

function getSQL() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) throw new Error("No DATABASE_URL or POSTGRES_URL env var found");
  return neon(url);
}

export async function initMessagesTable(): Promise<void> {
  const sql = getSQL();
  await sql`
    CREATE TABLE IF NOT EXISTS messages (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(255) DEFAULT '',
      company    VARCHAR(255) DEFAULT '',
      email      VARCHAR(255) DEFAULT '',
      subject    VARCHAR(500) DEFAULT '',
      message    TEXT         DEFAULT '',
      read       BOOLEAN      DEFAULT false,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

export async function getAllMessages(): Promise<Message[]> {
  await initMessagesTable();
  const sql = getSQL();
  const rows = await sql`SELECT * FROM messages ORDER BY created_at DESC`;
  return rows as Message[];
}

export async function createMessage(data: {
  name: string;
  company: string;
  email: string;
  subject: string;
  message: string;
}): Promise<Message> {
  await initMessagesTable();
  const sql = getSQL();
  const rows = await sql`
    INSERT INTO messages (name, company, email, subject, message)
    VALUES (${data.name}, ${data.company}, ${data.email}, ${data.subject}, ${data.message})
    RETURNING *
  `;
  return rows[0] as Message;
}

export async function markMessageRead(id: number): Promise<void> {
  const sql = getSQL();
  await sql`UPDATE messages SET read = true WHERE id = ${id}`;
}

export async function deleteMessage(id: number): Promise<void> {
  const sql = getSQL();
  await sql`DELETE FROM messages WHERE id = ${id}`;
}
