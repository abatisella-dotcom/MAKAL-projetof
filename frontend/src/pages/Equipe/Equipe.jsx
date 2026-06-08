import styles from './Equipe.module.css';
import Cards from '../../components/Cards/Cards'


import anabe from '../../assets/imgs/anabe.png';
import eu from '../../assets/imgs/eu.png';
import manso from '../../assets/imgs/manso.jpg';
import alice from '../../assets/imgs/alice.png';
import mariaLuisa from '../../assets/imgs/mariaLuisa.png';



const cards = [
    {
      id: 1, titulo: 'AnaBê',
      conteudo: '', codigo: "", capa: anabe
    },
    {
      id: 2, titulo: 'Ana Koso',
      conteudo: '', codigo: "", capa: eu
    },
    {
      id: 3, titulo: 'Maria Manso',
      conteudo: '', codigo: "", capa: manso
    },
    {
      id: 4, titulo: 'Maria Alice',
      conteudo: '', codigo: "", capa: alice
    },
    {
      id: 5, titulo: 'Maria Dias',
      conteudo: '', codigo: "", capa: mariaLuisa
    },
   
  ];




function Home() {
  return (
    <section className={styles.homePage}>
      <h2 className={styles.title}></h2>
      <h2 className= {styles.sobrenostexto}>
        Representantes do MakalGroup 
      </h2>
      <div className={styles.divbranca1}>  
      </div>
      <div id="Cards"></div>
      <section className={styles.Cardsgrid}>
        {cards.map(item => (
          <Cards key={item.id} {...item} />
        ))}
      </section>
    </section>
  )
}

export default Home