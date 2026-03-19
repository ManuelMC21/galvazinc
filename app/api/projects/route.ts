import { NextRequest, NextResponse } from "next/server";
import { getAllProjects, createProject } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const projects = await getAllProjects();
    return NextResponse.json(projects, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Error al obtener los proyectos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, image_url, category } = body;

    if (!name || !image_url) {
      return NextResponse.json(
        { error: "Nombre e imagen son requeridos" },
        { status: 400 }
      );
    }

    const project = await createProject({
      name,
      description: description ?? "",
      image_url,
      category: category ?? "General",
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Error al crear el proyecto" },
      { status: 500 }
    );
  }
}
