import React from 'react';

function Sobre() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', color: '#fff', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', background: 'linear-gradient(45deg, #ff7b00, #ffae00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sobre a MAKALGROUP</h1>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#ddd' }}>
        A MAKALGROUP é dedicada a transformar a educação e a retenção de aprendizado por meio de metodologias cientificamente comprovadas, como a recuperação ativa utilizando flashcards dinâmicos e inteligentes.
      </p>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#aaa', marginTop: '1rem' }}>
        Nosso objetivo é guiar você a estudar com mais inteligência e menos esforço mecânico, potencializando os seus resultados em testes, vestibulares e na vida profissional.
      </p>
    </div>
  );
}

export default Sobre;
