import React from 'react';
import './Sobre.module.css';

function Sobre() {
  return (
    <div className="sobre-container">
      <h1 className="sobre-titulo">Sobre a MAKALGROUP</h1>
      <p className="sobre-texto-principal">
        A MAKALGROUP é dedicada a transformar a educação e a retenção de aprendizado por meio de metodologias cientificamente comprovadas, como a recuperação ativa utilizando flashcards dinâmicos e inteligentes.
      </p>

      <p className="sobre-texto-secundario">
        Nosso objetivo é guiar você a estudar com mais inteligência e menos esforço mecânico, potencializando os seus resultados em testes, vestibulares e na vida profissional.
      </p>
    </div>
  );
}

export default Sobre;
