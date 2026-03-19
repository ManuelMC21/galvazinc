import { NextRequest, NextResponse } from "next/server";
import { getContactInfo, updateContactInfo, ContactInfo } from "@/lib/contact";

export async function GET() {
  try {
    const info = await getContactInfo();
    return NextResponse.json(info);
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return NextResponse.json(
      { error: "Error al obtener la información de contacto" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = request.cookies.get("admin_session");
    if (!session || session.value !== "authenticated") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const info = await updateContactInfo(body as ContactInfo);
    return NextResponse.json(info);
  } catch (error) {
    console.error("Error updating contact info:", error);
    return NextResponse.json(
      { error: "Error al actualizar la información de contacto" },
      { status: 500 }
    );
  }
}
