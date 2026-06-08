import React from 'react';

function Contato() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', color: '#fff', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', background: 'linear-gradient(45deg, #ff7b00, #ffae00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Contato</h1>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#ddd' }}>
        Tem alguma dúvida, sugestão ou feedback? Adoraríamos ouvir você!
      </p>
      <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <p style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>📬 <strong>E-mail:</strong> contato@makalgroup.com</p>
        <p style={{ fontSize: '1.1rem', margin: '0' }}>📞 <strong>Telefone:</strong> +55 (11) 99999-9999</p>
      </div>
    </div>
  );
}

export default Contato;
