import React, { Suspense, useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import type { AuthApi, CartApi } from "@mfe/contracts";
import LoginPage from "./pages/Login";

const SalesApp = React.lazy(() =>
  import("sales/App").catch(async (err) => {
    return import("./fallbacks/SalesFallback");
  })
);

const CartApp = React.lazy(() =>
  import("cart/App").catch(async (err) => {
    return import("./fallbacks/CartFallback");
  })
);

const CheckoutApp = React.lazy(() =>
  import("checkout/App").catch(() => import("./fallbacks/CartFallback"))
);

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [count, setCount] = useState(0);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    let unsubCart: undefined | (() => void);
    let unsubAuth: undefined | (() => void);

    // cartApi (self-remote)
    import("host/cartApi")
      .then((m) => (m.default ?? (m as any).cartApi) as CartApi)
      .then((api) => {
        if (!mounted) return;
        setCount(api.getSnapshot().count);
        unsubCart = api.subscribe((snap) => setCount(snap.count));
      });

    // authApi (self-remote)
    import("host/authApi")
      .then((m) => (m.default ?? (m as any).authApi) as AuthApi)
      .then((auth) => {
        if (!mounted) return;
        const s = auth.getSnapshot();
        setUserName(s.user?.name ?? null);
        unsubAuth = auth.subscribe((snap) =>
          setUserName(snap.user?.name ?? null)
        );
      });

    return () => {
      mounted = false;
      unsubCart?.();
      unsubAuth?.();
    };
  }, []);

  return (
    <div className="wrap">
      <header>
        <h1 style={{ margin: 0 }}>🛍️ MFE Shop (Host)</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/sales">Vendas</Link>
          <Link to="/cart" data-testid="cart-link">Carrinho ({count})</Link>
          <span className="muted">|</span>
          {userName ? (
            <span>Olá, {userName}</span>
          ) : (
            <Link to="/login">Entrar</Link>
          )}
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <small className="muted">Module Federation • React 18</small>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <Shell>
      <Suspense fallback={<div>Carregando módulo remoto…</div>}>
        <Routes>
          <Route
            path="/"
            element={<div>Bem-vindo! Use o menu para navegar.</div>}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sales/*" element={<SalesApp />} />
          <Route path="/cart/*" element={<CartApp />} />
          <Route path="/checkout/*" element={<CheckoutApp />} />
        </Routes>
      </Suspense>
    </Shell>
  );
}
