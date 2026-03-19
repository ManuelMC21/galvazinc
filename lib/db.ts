import { neon } from "@neondatabase/serverless";
import { Project, ProjectCreate } from "./types";

function getSQL() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) throw new Error("No DATABASE_URL or POSTGRES_URL env var found");
  return neon(url);
}

export async function initDB(): Promise<void> {
  const sql = getSQL();
  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id          SERIAL PRIMARY KEY,
      name        VARCHAR(255) NOT NULL,
      description TEXT,
      image_url   TEXT NOT NULL,
      category    VARCHAR(100) DEFAULT 'General',
      created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

export async function getAllProjects(): Promise<Project[]> {
  await initDB();
  const sql = getSQL();
  const rows = await sql`SELECT * FROM projects ORDER BY created_at DESC`;
  return rows as Project[];
}

export async function getProjectById(id: number): Promise<Project | null> {
  await initDB();
  const sql = getSQL();
  const rows = await sql`SELECT * FROM projects WHERE id = ${id}`;
  return (rows[0] as Project) ?? null;
}

export async function createProject(data: ProjectCreate): Promise<Project> {
  await initDB();
  const sql = getSQL();
  const rows = await sql`
    INSERT INTO projects (name, description, image_url, category)
    VALUES (${data.name}, ${data.description}, ${data.image_url}, ${data.category})
    RETURNING *
  `;
  return rows[0] as Project;
}

export async function deleteProject(id: number): Promise<void> {
  const sql = getSQL();
  await sql`DELETE FROM projects WHERE id = ${id}`;
}
