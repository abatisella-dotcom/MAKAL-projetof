import styles from './Home.module.css';

function Home() {
  return (
    <section className={styles.homePage}>
      <h2 className={styles.title}></h2>
      <h2>
        Estude com Inteligência. <br />
        Passe com Confiança.
      </h2>
      <div className={styles.divbranca1}>
        <p>
          Transformando questões reais de vestibulares em aprendizado ativo com flashcards dinâmicos, organizados por matéria e nível de dificuldade.
        </p>
      </div>
  <h1>Por que usar flashcards?</h1>
      <div className={styles.fleshcards}>

  <div className={styles.cardzinho}>
    <p>
      Estudos na área da Psicologia Cognitiva mostram que a recuperação ativa da informação fortalece as conexões neurais e melhora significativamente a retenção a longo prazo.
    </p>
  </div>

  <div className={styles.cardzinho}>
    <p>
      Uma pesquisa conduzida por Henry L. Roediger III e Jeffrey D. Karpicke, da Washington University in St. Louis, demonstrou que estudantes que praticaram a recuperação ativa do conteúdo tiveram desempenho muito superior em testes posteriores, em comparação com aqueles que apenas releram o material.
    </p>
  </div>

  <div className={styles.cardzinho}>
    <p>
      Esse fenômeno é conhecido como “efeito do teste”: quanto mais você pratica lembrar uma informação, mais forte ela se torna na memória.
    </p>
  </div>
</div>
      </section>
  )
}

export default Home