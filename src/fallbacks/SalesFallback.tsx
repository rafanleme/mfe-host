import React from 'react';

export default function SalesFallback() {
  return (
    <div>
      <h3>Vendas indisponível</h3>
      <p style={{opacity:.8}}>
        Não consegui carregar o microfrontend <code>sales</code>.
        Verifique se ele está rodando em <code>http://localhost:3001</code>.
      </p>
    </div>
  );
}