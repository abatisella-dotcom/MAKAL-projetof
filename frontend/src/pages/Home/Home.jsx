import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
  const navigate = useNavigate();

  return (
    <section className={styles.homePage}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Estude com Inteligência.<br />
          Passe com Confiança.
        </h1>
        <p className={styles.heroSubtitle}>
          Transformando questões reais de vestibulares em aprendizado ativo com flashcards dinâmicos, organizados por matéria e nível de dificuldade.
        </p>
        <button className={styles.ctaButton} onClick={() => navigate('/produtos')}>
          Começar a Estudar ⚡
        </button>
      </div>

      {/* Benefits / Features Grid */}
      <div className={styles.featuresGrid}>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>⚡</div>
          <h3>Recuperação Ativa</h3>
          <p>Esforce-se para lembrar as respostas em vez de apenas reler, fortalecendo as conexões cerebrais.</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>🔄</div>
          <h3>Repetição Espaçada</h3>
          <p>Otimize o tempo revisando o conteúdo nos momentos certos, pouco antes de esquecê-lo.</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>📊</div>
          <h3>Foco no Desempenho</h3>
          <p>Monitore seu desempenho em tempo real por matéria para focar nos seus pontos fracos.</p>
        </div>
      </div>

      {/* Scientific Explanation Section */}
      <div className={styles.scientificSection}>
        <h2 className={styles.scienceTitle}>Por que usar flashcards?</h2>
        <p className={styles.scienceText}>
          Estudos na área da <strong>Psicologia Cognitiva</strong> mostram que a recuperação ativa da informação fortalece as conexões neurais e melhora significativamente a retenção a longo prazo.
        </p>
        <blockquote className={styles.scienceQuote}>
          "Uma pesquisa conduzida por Henry L. Roediger III e Jeffrey D. Karpicke, da Washington University in St. Louis, demonstrou que estudantes que praticaram a recuperação ativa do conteúdo tiveram desempenho muito superior em testes posteriores, em comparação com aqueles que apenas releram o material."
        </blockquote>
        <p className={styles.scienceText}>
          Esse fenômeno é conhecido como <strong>“efeito do teste”</strong>: quanto mais você pratica lembrar uma informação, mais forte ela se torna na memória.
        </p>
      </div>
    </section>
  );
}

export default Home;