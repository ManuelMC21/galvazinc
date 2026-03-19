import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
  try {
    // Verify admin session
    const session = request.cookies.get("admin_session");
    if (!session || session.value !== "authenticated") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const form = await request.formData();
    const file = form.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No se encontró ningún archivo" },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Tipo de archivo no permitido. Use JPG, PNG, WEBP o GIF." },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "El archivo es demasiado grande. Máximo 10MB." },
        { status: 400 }
      );
    }

    const blob = await put(`projects/${Date.now()}-${file.name}`, file, {
      access: "public",
      addRandomSuffix: false,
    });

    return NextResponse.json({ url: blob.url }, { status: 201 });
  } catch (error) {
    console.error("Error uploading image:", error);
    const message =
      error instanceof Error && error.message.includes("private store")
        ? "El Blob store está configurado como privado. Cámbialo a público en el dashboard de Vercel (Storage → Settings → Access: Public)."
        : "Error al subir la imagen";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
