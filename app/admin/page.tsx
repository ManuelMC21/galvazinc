import type { Metadata } from "next";
import { getAllProjects } from "@/lib/db";
import { getContactInfo, DEFAULT_CONTACT } from "@/lib/contact";
import { getAllMessages } from "@/lib/messages";
import AdminPageClient from "./AdminPageClient";
import { Project } from "@/lib/types";
import { Message } from "@/lib/messages";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin – GalvaZinc",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  let projects: Project[] = [];
  let contactInfo = DEFAULT_CONTACT;
  let messages: Message[] = [];

  try {
    [projects, contactInfo, messages] = await Promise.all([
      getAllProjects(),
      getContactInfo(),
      getAllMessages(),
    ]);
  } catch {
    // DB might not be configured yet
  }

  return (
    <AdminPageClient
      initialProjects={projects}
      initialContactInfo={contactInfo}
      initialMessages={messages}
    />
  );
}
