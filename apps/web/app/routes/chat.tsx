import { useState, useRef, useEffect } from "react";
import { useNavigate } from "@remix-run/react";

type Message = { id: string; role: "user" | "assistant"; content: string; ui?: string };

export default function GenerativeChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pipeline, setPipeline] = useState<any>(null);
  const logRef = useRef<HTMLDivElement>(null);

  // Init Gemma 4 via transformers.js + WebGPU
  useEffect(() => {
    const init = async () => {
      const { pipeline } = await import("@huggingface/transformers");
      const pipe = await pipeline("text-generation", "google/gemma-4-4b-it", {
        device: "webgpu", // WebGPU backend
        dtype: "q4f16",   // Quantifié pour perf locale
      });
      setPipeline(() => pipe);
    };
    init();
  }, []);

  const send = async () => {
    if (!input.trim() || !pipeline) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    const assistantMsg: Message = { id: crypto.randomUUID(), role: "assistant", content: "" };
    setMessages((m) => [...m, assistantMsg]);

    // Génération streaming
    const chunks = await pipeline(input, { max_new_tokens: 512, stream: true });
    for await (const chunk of chunks) {
      const token = chunk[0]?.generated_text?.slice(-1) || "";
      setMessages((m) =>
        m.map((msg) => (msg.id === assistantMsg.id ? { ...msg, content: msg.content + token } : msg))
      );
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24, fontFamily: "system-ui" }}>
       <h1>Nexio.work AI Mentor</h1>
      <p style={{ color: "#666" }}>{!pipeline ? "⏳ Chargement Gemma 4 en WebGPU..." : "✅ Prêt (local, offline)"}</p>

      <div ref={logRef} style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16, minHeight: 400, marginBottom: 16, overflowY: "auto" }}>
        {messages.map((m) => (
          <div key={m.id} style={{ marginBottom: 12, textAlign: m.role === "user" ? "right" : "left" }}>
            <span style={{
              display: "inline-block",
              background: m.role === "user" ? "#000" : "#f0f0f0",
              color: m.role === "user" ? "#fff" : "#000",
              padding: "8px 12px",
              borderRadius: 12,
              maxWidth: "80%",
              whiteSpace: "pre-wrap"
            }}>
              {m.content || "..."}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Demandez une orientation, un test technique..."
          style={{ flex: 1, padding: 12, border: "1px solid #ccc", borderRadius: 8 }}
          disabled={loading || !pipeline}
        />
        <button onClick={send} disabled={loading || !pipeline} style={{ padding: "12px 24px", background: "#000", color: "#fff", border: "none", borderRadius: 8 }}>
          {loading ? "..." : "Envoyer"}
        </button>
      </div>
    </div>
  );
}
