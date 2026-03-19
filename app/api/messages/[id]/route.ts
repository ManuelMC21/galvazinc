import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { markMessageRead, deleteMessage } from "@/lib/messages";

function isAuthenticated() {
  const cookie = cookies().get("admin_session");
  return cookie?.value === "authenticated";
}

export async function PATCH(
  _request: Request,
  { params }: { params: { id: string } }
) {
  if (!isAuthenticated())
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  try {
    await markMessageRead(parseInt(params.id));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  if (!isAuthenticated())
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  try {
    await deleteMessage(parseInt(params.id));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
