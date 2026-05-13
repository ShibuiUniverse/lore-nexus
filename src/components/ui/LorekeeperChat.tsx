import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME: Message = {
  role: "assistant",
  content:
    "The scrolls are open. Ask what you will of the Shibui Universe — its peoples, its history, its artifacts. Choose your words carefully. Some truths must be earned.",
};

export function LorekeeperChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Build history excluding the welcome message (index 0)
      const history = nextMessages
        .slice(1, -1) // skip welcome + the just-added user msg
        .map((m) => ({ role: m.role, content: m.content }));

      const { data, error } = await supabase.functions.invoke("lorekeeper", {
        body: { message: trimmed, history },
      });

      if (error) throw error;

      const reply: string =
        data?.reply ?? "The scrolls are silent on this matter.";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "The connection to the scrolls has frayed. Try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      {/* ── Floating button ─────────────────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open Lorekeeper chat"
        className="fixed bottom-6 right-6 z-[10000] flex items-center gap-2 rounded-full px-4 py-3 text-sm font-display tracking-widest uppercase transition-all duration-300 select-none"
        style={{
          background:
            "linear-gradient(135deg, hsl(0 72% 18%) 0%, hsl(0 72% 10%) 100%)",
          border: "1px solid hsl(0 72% 35%)",
          color: "hsl(38 60% 65%)",
          boxShadow:
            "0 0 16px hsla(0,72%,40%,0.25), inset 0 1px 0 hsla(38,60%,65%,0.1)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 0 28px hsla(0,72%,50%,0.45), inset 0 1px 0 hsla(38,60%,65%,0.15)";
          (e.currentTarget as HTMLButtonElement).style.borderColor =
            "hsl(0 72% 50%)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 0 16px hsla(0,72%,40%,0.25), inset 0 1px 0 hsla(38,60%,65%,0.1)";
          (e.currentTarget as HTMLButtonElement).style.borderColor =
            "hsl(0 72% 35%)";
        }}
      >
        {/* Scroll icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        Lorekeeper
      </button>

      {/* ── Backdrop ────────────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[10001]"
          style={{ background: "rgba(0,0,0,0.65)" }}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Panel ───────────────────────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-label="Lorekeeper chat"
        aria-modal="true"
        className="fixed inset-y-0 right-0 z-[10002] flex flex-col w-full sm:max-w-sm transition-transform duration-300"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          background:
            "linear-gradient(180deg, hsl(30 15% 7%) 0%, hsl(30 12% 6%) 100%)",
          borderLeft: "1px solid hsl(30 20% 18%)",
          boxShadow: isOpen ? "-8px 0 40px rgba(0,0,0,0.6)" : "none",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 shrink-0"
          style={{
            borderBottom: "1px solid hsl(30 20% 14%)",
            background:
              "linear-gradient(135deg, hsl(0 72% 12%) 0%, hsl(30 15% 8%) 100%)",
          }}
        >
          <div>
            <h2
              className="font-display text-base tracking-[0.2em] uppercase"
              style={{ color: "hsl(38 60% 65%)" }}
            >
              The Lorekeeper
            </h2>
            <p
              className="font-body text-xs italic mt-0.5"
              style={{ color: "hsl(30 20% 45%)" }}
            >
              Ask of the Shibui Universe
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close"
            className="rounded-sm p-1 transition-colors"
            style={{ color: "hsl(30 20% 45%)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color =
                "hsl(38 60% 65%)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color =
                "hsl(30 20% 45%)")
            }
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              {msg.role === "assistant" && (
                <span
                  className="font-display text-xs tracking-[0.15em] uppercase px-1"
                  style={{ color: "hsl(38 60% 50%)" }}
                >
                  Lorekeeper
                </span>
              )}
              <div
                className="max-w-[88%] rounded-md px-3 py-2 font-body text-sm leading-relaxed break-words whitespace-pre-wrap"
                style={
                  msg.role === "user"
                    ? {
                        background: "hsl(0 72% 18%)",
                        border: "1px solid hsl(0 72% 28%)",
                        color: "hsl(0 20% 88%)",
                      }
                    : {
                        background: "hsl(30 15% 11%)",
                        border: "1px solid hsl(30 20% 18%)",
                        color: "hsl(30 15% 78%)",
                      }
                }
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Loading dots */}
          {isLoading && (
            <div className="flex flex-col items-start gap-1">
              <span
                className="font-display text-xs tracking-[0.15em] uppercase px-1"
                style={{ color: "hsl(38 60% 50%)" }}
              >
                Lorekeeper
              </span>
              <div
                className="flex items-center gap-1.5 rounded-md px-4 py-3"
                style={{
                  background: "hsl(30 15% 11%)",
                  border: "1px solid hsl(30 20% 18%)",
                }}
              >
                {[0, 1, 2].map((n) => (
                  <span
                    key={n}
                    className="block w-1.5 h-1.5 rounded-full animate-bounce"
                    style={{
                      background: "hsl(38 60% 50%)",
                      animationDelay: `${n * 150}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input bar */}
        <form
          onSubmit={handleSubmit}
          className="shrink-0 flex gap-2 px-4 py-4"
          style={{ borderTop: "1px solid hsl(30 20% 14%)" }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask of the scrolls..."
            disabled={isLoading}
            // text-base (16px) prevents iOS Safari auto-zoom on focus
            className="flex-1 rounded-md px-3 py-2 text-base font-body outline-none transition-colors disabled:opacity-50"
            style={{
              background: "hsl(30 15% 10%)",
              border: "1px solid hsl(30 20% 20%)",
              color: "hsl(30 15% 82%)",
            }}
            onFocus={(e) =>
              ((e.target as HTMLInputElement).style.borderColor =
                "hsl(0 72% 40%)")
            }
            onBlur={(e) =>
              ((e.target as HTMLInputElement).style.borderColor =
                "hsl(30 20% 20%)")
            }
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-md px-4 py-2 text-xs font-display tracking-widest uppercase transition-all disabled:opacity-40"
            style={{
              background: "hsl(0 72% 36%)",
              color: "hsl(38 60% 80%)",
              border: "1px solid hsl(0 72% 45%)",
            }}
            onMouseEnter={(e) => {
              if (!(e.currentTarget as HTMLButtonElement).disabled) {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "hsl(0 72% 44%)";
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "hsl(0 72% 36%)";
            }}
          >
            Ask
          </button>
        </form>
      </div>
    </>
  );
}
