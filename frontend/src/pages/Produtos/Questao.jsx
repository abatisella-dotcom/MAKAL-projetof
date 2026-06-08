import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Questao.module.css';

function Questao() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questao, setQuestao] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mostrarResposta, setMostrarResposta] = useState(false);

  useEffect(() => {
    const fetchQuestao = async () => {
      try {
        const API = 'http://localhost:3050';

        // Tenta buscar da view completa primeiro
        const respCompleta = await fetch(`${API}/perguntas/completa`);

        if (respCompleta.ok) {
          const data = await respCompleta.json();
          const encontrada = data.find(q => q.id_pergunta === parseInt(id));
          setQuestao(encontrada || null);
        } else {
          // Fallback: busca individualmente e faz join
          const [respPergunta, respVestibulares, respConteudos, respRespostas, respInfoads] = await Promise.all([
            fetch(`${API}/perguntas/${id}`),
            fetch(`${API}/vestibulares/`),
            fetch(`${API}/conteudos/`),
            fetch(`${API}/respostas/`),
            fetch(`${API}/infoads/`),
          ]);

          const p = respPergunta.ok ? await respPergunta.json() : null;
          const vestibulares = respVestibulares.ok ? await respVestibulares.json() : [];
          const conteudos = respConteudos.ok ? await respConteudos.json() : [];
          const respostas = respRespostas.ok ? await respRespostas.json() : [];
          const infoads = respInfoads.ok ? await respInfoads.json() : [];

          if (p) {
            const vest = vestibulares.find(v => v.id_vest === p.id_vest) || {};
            const cont = conteudos.find(c => c.id_conteudo === p.id_conteudo) || {};
            const resp = respostas.find(r => r.id_pergunta === p.id_pergunta) || {};
            const info = infoads.find(i => i.id_pergunta === p.id_pergunta) || {};

            setQuestao({
              ...p,
              nome_vest: vest.nome_vest || null,
              ano_prova: vest.ano_prova || null,
              nome_conteudo: cont.nome_conteudo || null,
              comentario: resp.comentario || null,
              material_apoio: resp.material_apoio || resp.texto || null,
              bncc: info.bncc || null,
            });
          } else {
            setQuestao(null);
          }
        }
      } catch (error) {
        console.error("Erro de conexão:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestao();
  }, [id]);


  const handleVoltar = () => {
    navigate('/produtos');
  };

  const toggleResposta = () => {
    setMostrarResposta(!mostrarResposta);
  };

  if (loading) {
    return <div className={styles.loadingContainer}>Carregando questão...</div>;
  }

  if (!questao) {
    return (
      <div className={styles.errorContainer}>
        <h2></h2>
        <button onClick={handleVoltar} className={styles.btnVoltar}>Voltar aos Produtos</button>
      </div>
    );
  }

  return (
    <div className={styles.questaoContainer}>
      <button onClick={handleVoltar} className={styles.btnVoltar}>&larr; Voltar</button>

      <div className={styles.cardDetalhe}>
        <div className={styles.headerInfo}>
          <span className={styles.badge}>{questao.nome_vest || "Vestibular"} - {questao.ano_prova || "Ano"}</span>
          <span className={styles.badgeConteudo}>{questao.nome_conteudo || "Conteúdo"}</span>
          <span className={styles.badgeNivel}>{questao.dificuldade || "Nível"}</span>
        </div>

        <div className={styles.enunciadoContainer}>
          <h2 className={styles.enunciadoTitulo}>Pergunta:</h2>
          <p className={styles.enunciadoTexto}>{questao.enunciado || "Sem enunciado cadastrado."}</p>
        </div>

        <div className={styles.respostaSection}>
          <button onClick={toggleResposta} className={styles.btnMostrarResposta}>
            {mostrarResposta ? "Ocultar Resposta" : "Ver Resposta do Especialista"}
          </button>

          {mostrarResposta && (
            <div className={styles.respostaBox}>
              <h3>Comentário do Especialista:</h3>
              <p>{questao.comentario || "Nenhum comentário cadastrado para esta questão."}</p>

              {questao.material_apoio && (
                <div className={styles.materialApoio}>
                  <h4>Conteúdo Complementar:</h4>
                  <p>{questao.material_apoio}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Questao;
