export interface Project {
  id: number;
  name: string;
  description: string;
  image_url: string;
  category: string;
  created_at: string;
}

export type ProjectCreate = Omit<Project, "id" | "created_at">;

export const CATEGORIES = [
  "General",
  "Industrial",
  "Construcción",
  "Infraestructura",
  "Energía",
  "Minería",
  "Transporte",
] as const;

export type Category = (typeof CATEGORIES)[number];
