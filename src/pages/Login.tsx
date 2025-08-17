import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [sp] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const redirect = sp.get("redirect") || "/";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    try {
      const api = await import("host/authApi").then(
        (m) => m.default ?? (m as any).authApi
      );
      await api.login(email, password);
      navigate(redirect);
    } finally {
      setPending(false);
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: "24px auto" }}>
      <h2>Entrar</h2>
      <form onSubmit={onSubmit} className="card">
        <label>Email</label>
        <input
          type="email"
          value={email}
          placeholder="exemplo@jmail.com"
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "95%", margin: "8px 0", padding: 8, borderRadius: 8 }}
        />
        <label>Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "95%", margin: "8px 0", padding: 8, borderRadius: 8 }}
        />
        <button className="btn" disabled={pending} style={{ marginTop: 12 }}>
          {pending ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}
