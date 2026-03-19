import { neon } from "@neondatabase/serverless";

export interface ContactInfo {
  emails: string[];
  phones: string[];
  address: string;
  schedule: string[];
  logo_url?: string;
  social?: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
  hero?: {
    badge?: string;
    title?: string;
    subtitle?: string;
  };
}

export const DEFAULT_CONTACT: ContactInfo = {
  emails: ["info@galvazinc.com"],
  phones: ["+53 5 123 4567"],
  address: "Cuba",
  schedule: ["Lunes a Viernes: 8:00 – 18:00", "Sábados: 8:00 – 13:00"],
  logo_url: "",
  social: { linkedin: "", facebook: "", instagram: "" },
  hero: {
    badge: "Estructuras metálicas con protección anticorrosión",
    title: "Estructuras galvanizadas a medida",
    subtitle:
      "Fabricamos y galvanizamos estantes, racks, mezzanines, portones y estructuras metálicas a medida. Más de 20 años de experiencia protegiendo el acero con zinc.",
  },
};

function getSQL() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) throw new Error("No DATABASE_URL or POSTGRES_URL env var found");
  return neon(url);
}

export async function initContactTable(): Promise<void> {
  const sql = getSQL();
  await sql`
    CREATE TABLE IF NOT EXISTS contact_settings (
      id   INTEGER PRIMARY KEY DEFAULT 1,
      data JSONB NOT NULL DEFAULT '{}'
    )
  `;
  await sql`
    INSERT INTO contact_settings (id, data)
    VALUES (1, ${JSON.stringify(DEFAULT_CONTACT)}::jsonb)
    ON CONFLICT (id) DO NOTHING
  `;
}

export async function getContactInfo(): Promise<ContactInfo> {
  await initContactTable();
  const sql = getSQL();
  const rows = await sql`SELECT data FROM contact_settings WHERE id = 1`;
  if (!rows[0]) return DEFAULT_CONTACT;
  return { ...DEFAULT_CONTACT, ...(rows[0].data as ContactInfo) };
}

export async function updateContactInfo(info: ContactInfo): Promise<ContactInfo> {
  await initContactTable();
  const sql = getSQL();
  await sql`
    UPDATE contact_settings
    SET data = ${JSON.stringify(info)}::jsonb
    WHERE id = 1
  `;
  return info;
}
