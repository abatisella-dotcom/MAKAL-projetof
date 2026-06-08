// CardJogo.jsx;
import './Cards.css';

const CardJogo = ({ 

  titulo,
  conteudo,
  capa
}) => {
    
  return (
    <div className="card-jogo">

      <div className="card-info">
        <h3 className="card-titulo">{titulo}</h3>
        <p className="card-conteudo">{conteudo}</p>
      </div>
      <div className="card-imagem-container">
        <img 
          src={capa} 
          alt={`Capa do jogo ${titulo}`}
          className="card-imagem"
        />
      </div>
    </div>
  );
};

export default CardJogo;