"use client";

import { useState } from "react";
import {
  Mail,
  MailOpen,
  Trash2,
  Loader2,
  ChevronDown,
  ChevronUp,
  Inbox,
} from "lucide-react";
import { Message } from "@/lib/messages";
import { formatDate } from "@/lib/utils";

export default function MessagesViewer({
  initialMessages,
}: {
  initialMessages: Message[];
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const markRead = async (id: number) => {
    setLoadingId(id);
    try {
      await fetch(`/api/messages/${id}`, { method: "PATCH" });
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, read: true } : m))
      );
    } finally {
      setLoadingId(null);
    }
  };

  const remove = async (id: number) => {
    if (!confirm("¿Eliminar este mensaje?")) return;
    setLoadingId(id);
    try {
      await fetch(`/api/messages/${id}`, { method: "DELETE" });
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (expandedId === id) setExpandedId(null);
    } finally {
      setLoadingId(null);
    }
  };

  const toggleExpand = (id: number) => {
    const isOpening = expandedId !== id;
    setExpandedId(isOpening ? id : null);
    if (isOpening) {
      const msg = messages.find((m) => m.id === id);
      if (msg && !msg.read) markRead(id);
    }
  };

  const unread = messages.filter((m) => !m.read).length;

  if (messages.length === 0) {
    return (
      <div className="text-center py-24 bg-steel-800/50 rounded-2xl border border-steel-700">
        <Inbox className="w-12 h-12 text-steel-600 mx-auto mb-4" />
        <p className="text-steel-400 font-medium">No hay mensajes todavía</p>
        <p className="text-steel-600 text-sm mt-1">
          Los mensajes del formulario de contacto aparecerán aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {unread > 0 && (
        <p className="text-brand-400 text-sm font-medium">
          {unread} mensaje{unread !== 1 ? "s" : ""} sin leer
        </p>
      )}

      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`border rounded-xl overflow-hidden transition-all ${
            msg.read
              ? "bg-steel-800/40 border-steel-700"
              : "bg-steel-800 border-brand-500/30 shadow-lg shadow-brand-500/5"
          }`}
        >
          {/* Header row */}
          <button
            onClick={() => toggleExpand(msg.id)}
            className="w-full flex items-center gap-4 p-5 text-left hover:bg-steel-700/30 transition-colors"
          >
            <div className="shrink-0">
              {msg.read ? (
                <MailOpen className="w-5 h-5 text-steel-500" />
              ) : (
                <Mail className="w-5 h-5 text-brand-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`font-medium text-sm ${
                    msg.read ? "text-steel-300" : "text-white"
                  }`}
                >
                  {msg.name || "Sin nombre"}
                </span>
                {msg.company && (
                  <span className="text-steel-500 text-xs">· {msg.company}</span>
                )}
                {!msg.read && (
                  <span className="text-xs bg-brand-500/20 text-brand-400 px-2 py-0.5 rounded-full font-medium">
                    Nuevo
                  </span>
                )}
              </div>
              <p className="text-steel-500 text-xs mt-0.5">
                {msg.email} · {formatDate(msg.created_at)}
              </p>
              {msg.subject && (
                <p
                  className={`text-sm mt-1 truncate ${
                    msg.read ? "text-steel-500" : "text-steel-300"
                  }`}
                >
                  {msg.subject}
                </p>
              )}
            </div>
            {expandedId === msg.id ? (
              <ChevronUp className="w-4 h-4 text-steel-500 shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 text-steel-500 shrink-0" />
            )}
          </button>

          {/* Expanded body */}
          {expandedId === msg.id && (
            <div className="px-5 pb-5">
              <div className="border-t border-steel-700 pt-4">
                <p className="text-steel-300 text-sm whitespace-pre-wrap leading-relaxed">
                  {msg.message}
                </p>
                <div className="flex items-center gap-4 mt-5">
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || "tu consulta")}`}
                    className="text-xs text-brand-400 hover:text-brand-300 font-semibold transition-colors"
                  >
                    Responder por email →
                  </a>
                  <button
                    onClick={() => remove(msg.id)}
                    disabled={loadingId === msg.id}
                    className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors ml-auto disabled:opacity-50"
                  >
                    {loadingId === msg.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
