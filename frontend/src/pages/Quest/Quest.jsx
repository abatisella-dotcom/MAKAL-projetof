import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Quest.module.css';

const API = 'http://localhost:3050';

function Quest() {
  const [perguntas, setPerguntas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  // Estados dos filtros (o que o usuário digita)
  const [filtroVestibular, setFiltroVestibular] = useState('');
  const [filtroAno, setFiltroAno] = useState('');
  const [filtroConteudo, setFiltroConteudo] = useState('');
  const [filtroPergunta, setFiltroPergunta] = useState('');
  const [filtroBncc, setFiltroBncc] = useState('');

  // O filtro "ativo" só muda quando o usuário clica em Pesquisar
  const [filtroAtivo, setFiltroAtivo] = useState({
    vestibular: '', ano: '', conteudo: '', pergunta: '', bncc: ''
  });

  useEffect(() => {
    const fetchTudo = async () => {
      try {
        setLoading(true);
        setErro(null);

        // Tenta buscar a view completa primeiro
        let data = [];
        const respCompleta = await fetch(`${API}/perguntas/completa`);

        if (respCompleta.ok) {
          data = await respCompleta.json();
        } else {
          // Se a view completa falhar, busca as perguntas e faz join manual
          const [respPerguntas, respVestibulares, respConteudos, respRespostas, respInfoads] = await Promise.all([
            fetch(`${API}/perguntas/`),
            fetch(`${API}/vestibulares/`),
            fetch(`${API}/conteudos/`),
            fetch(`${API}/respostas/`),
            fetch(`${API}/infoads/`),
          ]);

          const perguntas = respPerguntas.ok ? await respPerguntas.json() : [];
          const vestibulares = respVestibulares.ok ? await respVestibulares.json() : [];
          const conteudos = respConteudos.ok ? await respConteudos.json() : [];
          const respostas = respRespostas.ok ? await respRespostas.json() : [];
          const infoads = respInfoads.ok ? await respInfoads.json() : [];

          // Combina tudo manualmente
          data = perguntas.map(p => {
            const vest = vestibulares.find(v => v.id_vest === p.id_vest) || {};
            const cont = conteudos.find(c => c.id_conteudo === p.id_conteudo) || {};
            const resp = respostas.find(r => r.id_pergunta === p.id_pergunta) || {};
            const info = infoads.find(i => i.id_pergunta === p.id_pergunta) || {};

            return {
              ...p,
              nome_vest: vest.nome_vest || null,
              ano_prova: vest.ano_prova || null,
              nome_conteudo: cont.nome_conteudo || null,
              comentario: resp.comentario || null,
              material_apoio: resp.material_apoio || resp.texto || null,
              bncc: info.bncc || null,
            };
          });
        }

        setPerguntas(data);
      } catch (error) {
        console.error("Erro de conexão:", error);
        setErro("Não foi possível conectar ao servidor. Verifique se o backend está rodando.");
      } finally {
        setLoading(false);
      }
    };

    fetchTudo();
  }, []);

  // Aplica filtro só quando o usuário clica em Pesquisar
  const handlePesquisar = () => {
    setFiltroAtivo({
      vestibular: filtroVestibular,
      ano: filtroAno,
      conteudo: filtroConteudo,
      pergunta: filtroPergunta,
      bncc: filtroBncc,
    });
  };

  const handleLimpar = () => {
    setFiltroVestibular('');
    setFiltroAno('');
    setFiltroConteudo('');
    setFiltroPergunta('');
    setFiltroBncc('');
    setFiltroAtivo({ vestibular: '', ano: '', conteudo: '', pergunta: '', bncc: '' });
  };

  // Lógica de filtragem usando o filtroAtivo
  const perguntasFiltradas = perguntas.filter((p) => {
    const mv = !filtroAtivo.vestibular || (p.nome_vest?.toLowerCase().includes(filtroAtivo.vestibular.toLowerCase()));
    const ma = !filtroAtivo.ano || (p.ano_prova?.toString().includes(filtroAtivo.ano));
    const mc = !filtroAtivo.conteudo || (p.nome_conteudo?.toLowerCase().includes(filtroAtivo.conteudo.toLowerCase()));
    const mp = !filtroAtivo.pergunta || (p.enunciado?.toLowerCase().includes(filtroAtivo.pergunta.toLowerCase()));
    const mb = !filtroAtivo.bncc || (p.bncc?.toLowerCase().includes(filtroAtivo.bncc.toLowerCase()));
    return mv && ma && mc && mp && mb;
  });

  const handleVerQuestao = (id) => {
    navigate(`/quest/${id}`);
  };

  return (
    <div className={styles.questContainer}>
      <h1 className={styles.questTitulo}>Nossas Questões</h1>

      {/* Sistema de Pesquisa / Filtros */}
      <div className={styles.filtrosWrapper}>
        <div className={styles.filtrosContainer}>
          <input
            type="text"
            placeholder="Vestibular (ex: ENEM)"
            value={filtroVestibular}
            onChange={(e) => setFiltroVestibular(e.target.value)}
            className={styles.inputFiltro}
            onKeyDown={(e) => e.key === 'Enter' && handlePesquisar()}
          />
          <input
            type="text"
            placeholder="Ano (ex: 2024)"
            value={filtroAno}
            onChange={(e) => setFiltroAno(e.target.value)}
            className={styles.inputFiltro}
            onKeyDown={(e) => e.key === 'Enter' && handlePesquisar()}
          />
          <input
            type="text"
            placeholder="Conteúdo (ex: Realismo)"
            value={filtroConteudo}
            onChange={(e) => setFiltroConteudo(e.target.value)}
            className={styles.inputFiltro}
            onKeyDown={(e) => e.key === 'Enter' && handlePesquisar()}
          />
          <input
            type="text"
            placeholder="Palavra na pergunta"
            value={filtroPergunta}
            onChange={(e) => setFiltroPergunta(e.target.value)}
            className={styles.inputFiltro}
            onKeyDown={(e) => e.key === 'Enter' && handlePesquisar()}
          />
          <input
            type="text"
            placeholder="Código BNCC"
            value={filtroBncc}
            onChange={(e) => setFiltroBncc(e.target.value)}
            className={styles.inputFiltro}
            onKeyDown={(e) => e.key === 'Enter' && handlePesquisar()}
          />
        </div>
        <div className={styles.filtrosBotoes}>
          <button className={styles.btnPesquisar} onClick={handlePesquisar}>
            Pesquisar
          </button>
          <button className={styles.btnLimpar} onClick={handleLimpar}>
            ✕ Limpar
          </button>
        </div>
      </div>

      {erro && <p className={styles.erroText}>{erro}</p>}

      {loading ? (
        <p className={styles.loadingText}>⏳ Carregando questões...</p>
      ) : (
        <>
          <p className={styles.resultadosInfo}>
            {perguntasFiltradas.length} questão(ões) encontrada(s)
          </p>
          <div className={styles.cardsGrid}>
            {perguntasFiltradas.length > 0 ? (
              perguntasFiltradas.map((questao) => (
                <div key={questao.id_pergunta} className={styles.cardQuestao}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.conteudoTitulo}>{questao.nome_conteudo || "CONTEÚDO"}</h3>
                  </div>
                  <div className={styles.cardBody}>
                    <p className={styles.perguntaPreview}>
                      '{questao.enunciado ? questao.enunciado.substring(0, 60) + '...' : 'Prévia da questão...'}
                    </p>
                    <button
                      className={styles.btnVerQuestao}
                      onClick={() => handleVerQuestao(questao.id_pergunta)}
                    >
                      Ver questão
                    </button>
                  </div>
                  <div className={styles.cardFooter}>
                    <span>{questao.nome_vest || 'vestibular'}</span>
                    <span>{questao.ano_prova || 'ano da prova'}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noResults}></p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Quest;

