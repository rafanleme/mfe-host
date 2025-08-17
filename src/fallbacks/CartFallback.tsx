import React from 'react';

export default function CartFallback() {
  return (
    <div>
      <h3>Carrinho indisponível</h3>
      <p style={{opacity:.8}}>
        Não consegui carregar o microfrontend <code>cart</code>.
        Verifique se ele está rodando em <code>http://localhost:3002</code>.
      </p>
    </div>
  );
}
