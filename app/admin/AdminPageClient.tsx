"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import AdminDashboard from "./AdminDashboard";
import { Project } from "@/lib/types";
import { ContactInfo } from "@/lib/contact";
import { Message } from "@/lib/messages";

export default function AdminPageClient({
  initialProjects,
  initialContactInfo,
  initialMessages,
}: {
  initialProjects: Project[];
  initialContactInfo: ContactInfo;
  initialMessages: Message[];
}) {
  const [authenticated, setAuthenticated] = useState(false);

  if (!authenticated) {
    return <LoginForm onSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <AdminDashboard
      initialProjects={initialProjects}
      initialContactInfo={initialContactInfo}
      initialMessages={initialMessages}
      onLogout={() => setAuthenticated(false)}
    />
  );
}
